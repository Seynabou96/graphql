import { IndexHTML, HomeHTML, graphqlQuery } from "./templates.js";
import { jwt } from "./script.js";
// import { Charts } from "./charts.js";
const graphqlEndpointSignIn = 'https://learn.zone01dakar.sn/api/auth/signin';
const graphqlEndpoint = "https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql";


//-------------------------INDEX---------------------------------//C
export const IndexHandler = () => {
    document.body.innerHTML = IndexHTML
    const form = document.getElementById("form");

    // // console.log("form", form);
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            // Données de login
            let loginData = {
                username: (document.getElementById('username')).value,
                password: (document.getElementById('password')).value
            };
            SignIn(loginData)
        })
    }
}
const StockJWT = async (data) => {
    // console.log("data", data);
    localStorage.setItem("jwt", data)
    window.location.reload();

}
var couleurs = [
    '#FF0000', // Rouge
    '#00FF00', // Vert
    '#0000FF', // Bleu
    '#FFFF00', // Jaune
    '#FF00FF', // Magenta
    '#00FFFF', // Cyan
    '#FFA500', // Orange
    '#800080', // Violet
    '#008000', // Vert foncé
    '#000080', // Bleu foncé
    '#800000', // Marron
    '#808000', // Olive
    '#008080', // Sarcelle
    '#C0C0C0', // Argent
    '#FFFFFF'  // Blanc
];
const HandleError = () => {
    let p = document.createElement('p')
    p.innerHTML = "Bad Credentials! Try again!!!"
    p.style.color = "red"
    let id = document.getElementById('paragraph')
    if (!id) {
        p.id = "paragraph"
        form.appendChild(p)
    }

}

function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}
function PourcentageRation(up,down){
    let ratio= up+down;

return (up *100) / ratio;
}

const SignIn = (loginData) => {
    const credentials = `${loginData.username}:${loginData.password}`;
    const base64Credentials = utf8_to_b64(credentials)
    const authorizationHeader = `Basic ${base64Credentials}`;

    // En-tête à inclure dans la requête HTTP
    const headers = {
        'Authorization': authorizationHeader,
        'Content-Type': 'application/json',

    };

    // Options de la requête Fetch
    const fetchOptions = {
        method: 'POST',
        headers: headers,
    };
    fetch(graphqlEndpointSignIn, fetchOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return HandleError()
            }
        })
        .then(data => {
            // console.log("in extra", data);
            if (data !== undefined) {
                StockJWT(data)
            }
        })
        .catch(error => {
            console.error('Erreur lors de la requête GraphQL:', error);
        });

}


//-------------------------HOME---------------------------------//C

export const HomeHandler = () => {
    // console.log("in home");
    document.body.innerHTML = HomeHTML
    const headers = {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',

    };

    // Options de la requête Fetch
    const fetchOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ query: graphqlQuery })
    };

    fetch(graphqlEndpoint, fetchOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                // console.log("error detected");
            }
        })
        .then(data => {
            // console.log("in extra", data);
            let transaction = []
            let totalxp = 0
            let Amount = []
            let time = []

            let user = data.data.User[0]
            transaction = data.data.Transaction
            let skill = data.data.Skills
         let skills = FormatSkills(skill)
            transaction.forEach(element => {
                totalxp += element.amount
                Amount.push(element.amount)
                time.push({ nom: element.path, amount: element.amount })
            });
            totalxp = Math.round(totalxp / 1000)
            user["totalXP"] = totalxp + " XP"
            user["amount"] = Amount
            user["time"] = time
            user['skills'] = skills
            user["levels"]=user.events[0].level
            // console.log("user", skills);
            // // console.log("transac,time,amount", transaction,Amount,time);
            display(user)
            
        })
        .catch(error => {
            console.error('Erreur lors de la requête GraphQL:', error);
        });

}

const display = (user) => {
    // Charts(user)
    let divInfo = document.getElementById('User')
    let divInfouser = document.getElementById('infosuser')
    // console.log(divInfo, divInfouser);
    let h3 = document.createElement('h3')
    h3.innerHTML = `Welcome ${user.firstName} ${user.lastName}!!!`
    h3.style.color = "#fff"
    divInfo.appendChild(h3)

    let another = `
    <div class="user-info">
    <h2>User Information</h2>
    <div class="info-item">
        <span class="label">Name:</span>
        <span class="value">${user.firstName} ${user.lastName}</span>
    </div>
    <div class="info-item">
        <span class="label">Email:</span>
        <span class="value">${user.email}</span>
    </div>
    <div class="info-item">
        <span class="label">Login:</span>
        <span class="value">${user.login}</span>
    </div>


</div>

    `
    divInfouser.innerHTML = another
    // let skills=[]
    let skill = user["skills"]
    // console.log("skill",skill);

   console.log("user",user);
    console.log("skill", skill);
    let skills = skill.map(objet => objet["amount"]);
    console.log("bef", skills);
    const divgrades=document.getElementById("grades")
    let grades=document.createElement('span')
    grades.innerHTML=user.levels
    grades.className="bigNum"
    divgrades.appendChild(grades)
    const divxp=document.getElementById("XP")
    let totalxp=document.createElement('span')
    totalxp.innerHTML=user.totalXP
    totalxp.className="bigNum"
    divxp.appendChild(totalxp)
    CreateCircle(user.totalUp,user.totalDown)
    t(skills)

    // Sélection du bouton de déconnexion
var logoutButton = document.getElementById('formlogout');

// Ajout d'un gestionnaire d'événement pour le clic sur le bouton de déconnexion
logoutButton.addEventListener('click', function(event) {
    // Empêcher le comportement par défaut du bouton (soumission du formulaire)
    event.preventDefault();
    // Effectuer d'autres actions de déconnexion ici (par exemple, redirection de l'utilisateur, appel AJAX, etc.)
    // Par exemple :
    localStorage.removeItem('jwt');
    window.location.reload();

});
}
function mise_a_l_echelle(valeurs, echelle_maximale) {
    console.log('recu', valeurs, echelle_maximale);
    let valeur_min = Math.min(...valeurs);
    let valeur_max = Math.max(...valeurs);

    let valeurs_echelle = [];
    valeurs.forEach(function (valeur) {
        let nouvelle_valeur = (valeur - valeur_min) * (echelle_maximale / (valeur_max - valeur_min));
        valeurs_echelle.push(nouvelle_valeur);
    });

    return valeurs_echelle;
}
const CreateCircle=(up,down)=>{
    // Nouvelle valeur pour le tracé et le texte
var newValue =Math.round( PourcentageRation(up,down)); // Par exemple, une nouvelle valeur de 80%
console.log("newvalue",newValue);
// Sélection de l'élément <path> et mise à jour de l'attribut stroke-dasharray
var path = document.getElementById('pathcircle');
path.setAttribute('stroke-dasharray', newValue + ', 100');

// Sélection de l'élément <text> et mise à jour du contenu texte
var text = document.querySelector('.percentage');
text.textContent = newValue + '%';

}
const t = (skills) => {
    // import { DrawSVGPlugin } from '@/js/vendors/gsap/plugins/DrawSVGPlugin';

    var container = document.getElementById('container');
    var graphMeasurement = document.getElementById('graph-measurement');
    var allCircles = document.getElementsByTagName('circle');
    var allLines = document.getElementsByTagName('line');
    
    // console.log("in t",skills);
    var destArray = mise_a_l_echelle(skills, 300)
    console.log(allCircles.length,allLines.length,destArray.length);
    console.log("desarray",destArray);
    // console.log('tab',destaArray);
    // var destArray = [15, 152, 28, 170, 5, 93, 44, 122, 179, 170, 20, 54, 65];
    TweenMax.set(container, {
        //   position: 'absolute',
        //   xPercent: -50,
        //   left: '50%',
        //   top: '50%',
        //   yPercent: -50,
        backgroundColor: 'rgba(30, 39, 38, 0.3)',
        borderRadius: 10,
        padding: 40
    })
    // TweenMax.set(allCircles, {
    //     attr: {
    //         fill: '#FFFFFF',
    //         r: 5
    //     },
    //     transformOrigin: '50% 50%',
    //     scale: 0
    // });
    // Changer les couleurs des cercles
for (var i = 0; i < allCircles.length; i++) {
    TweenMax.set(allCircles[i], {
        attr: {
            fill: couleurs[i], // Utilisez l'index modulo la longueur du tableau de couleurs pour obtenir une couleur différente pour chaque cercle
            r: 5
        },
        transformOrigin: '50% 50%',
        scale: 0
    });
}
    TweenMax.set([allLines], {
        attr: {
            stroke: '#18B5DD'
        },
        drawSVG: '100% 100%',
        strokeWidth: 2
    })
    TweenMax.set([graphMeasurement], {
        attr: {
            stroke: '#18B5DD'
        },
        drawSVG: '100% 100%',
        strokeWidth: 1
    })
    TweenMax.set([allCircles, allLines], {
        y: '+=300'
    });
    TweenMax.set(graphMeasurement, {
        y: '+=280',
        alpha: 0.3
    });
    TweenMax.set('svg', {
        alpha: 1
    });

    TweenMax.to(graphMeasurement, 3, {
        drawSVG: '0% 100%',
        delay: 1,
        ease: Power2.easeInOut
    });

    for (var i = 0; i < allCircles.length; i++) {

        TweenMax.to(allCircles[i], 2, {
            attr: {
                cy: '-=' + destArray[i]
            },
            onUpdate: moveLines,
            onUpdateParams: [i],
            delay: i / 5,
            ease: Power4.easeInOut
        });

        if (allLines[i]) {
            TweenMax.to(allLines[i], 1, {
                drawSVG: '400',
                delay: i / 5,
                ease: Power4.easeInOut
            })
        }

        TweenMax.to(allCircles[i], 1, {
            scale: 1,
            delay: i / 5,
            ease: Power4.easeInOut
        });

    }

    function moveLines(i) {
        if (allLines[i]) {
            TweenMax.set(allLines[i], {
                attr: {
                    'x2': allCircles[i].getAttribute('cx'),
                    'y2': allCircles[i].getAttribute('cy')
                }
            });
            TweenMax.set(allLines[i], {
                attr: {
                    'x1': allCircles[i + 1].getAttribute('cx'),
                    'y1': allCircles[i + 1].getAttribute('cy')
                }
            });
        }
    }

}

function FormatSkills(tableauObjets){
    let tableauAccumule=[]
// Parcourir chaque objet dans le tableau d'objets
for (let i = 0; i < tableauObjets.length; i++) {
    let objet = tableauObjets[i];
    let trouve = false;

    // Vérifier si le type existe déjà dans le tableau accumulé
    for (let j = 0; j < tableauAccumule.length; j++) {
        if (tableauAccumule[j].type === objet.type) {
            tableauAccumule[j].amount+=objet.amount // Augmenter l'âge si le type existe déjà
            trouve = true;
            break;
        }
    }

    // Si le type n'existe pas encore, ajouter un nouvel objet avec âge à 1
    if (!trouve) {
        tableauAccumule.push({ type: objet.type, amount: objet.amount });
    }}
    return tableauAccumule
}

