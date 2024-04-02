import { IndexHTML, HomeHTML } from "./templates.js";
import { graphqlQuery } from "./utiles.js";
import { jwt } from "./script.js";
import { SignIn } from "./signin.js";

const graphqlEndpoint = "https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql";


export const generateColors = (numColors) => {
    let colors = [];
    for (let i = 0; i < numColors; i++) {
        // Générer une couleur aléatoire au format hexadecimal
        let color = "#" + Math.floor(Math.random() * 16777215).toString(16);
        colors.push(color);
    }
    return colors;
}


const FirstSection = (user) => {
    let divInfo = document.getElementById('User')
    let divInfouser = document.getElementById('infosuser')
    let h3 = document.createElement('h3')
    h3.innerHTML = `Welcome ${user.Infos.firstName} ${user.Infos.lastName}!!!`
    h3.style.color = "#fff"
    divInfo.appendChild(h3)

    let another = `
    <div class="user-info">
    <h2>User Information</h2>
    <div class="info-item">
        <span class="label">Name:</span>
        <span class="value">${user.Infos.firstName} ${user.Infos.lastName}</span>
    </div>
    <div class="info-item">
        <span class="label">Email:</span>
        <span class="value">${user.Infos.email}</span>
    </div>
    <div class="info-item">
        <span class="label">Login:</span>
        <span class="value">${user.Infos.login}</span>
    </div>


</div>



    `
    let gradesandxp = `

    <div class="user-info">
    <h2>Level and XP Amount</h2>
    <div class="info-item">
        <span class="label">Level:</span>
        <span class="value">${user.Levels} </span>
    </div>
    <div class="info-item">
        <span class="label">XP :</span>
        <span class="value">${user.Totalxp}</span>
    </div>
  
    </div>`

    divInfouser.innerHTML = another + gradesandxp


}

const LogOut = () => {

    var logoutButton = document.getElementById('formlogout');

    if (logoutButton) {
        logoutButton.addEventListener('click', function (event) {
            event.preventDefault();
            localStorage.removeItem('jwt');
            window.location.reload();
            // IndexHandler()

        });
    }
}

const LineSVG = async (skills) => {
    const conteneurSVG = document.querySelector("#container svg"); // Remplacez "votre-conteneur-svg" par l'ID de votre conteneur SVG

    let x1 = Math.round(800 / skills.length)
    let x2 = 0
    let tabx = []
    for (let i = 0; i < skills.length - 1; i++) {
        // Création de l'élément <line>
        // console.log("index", i, x1, x2);
        tabx.push(x1)
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line");

        // Définition des attributs de la line
        line.setAttribute("stroke", "#4AC900"); // Couleur de la line
        line.setAttribute("stroke-width", "4"); // Largeur de la line
        line.setAttribute("stroke-miterlimit", "10"); // Limite de longueur des pointes
        line.setAttribute("fill", "none"); // Coordonnée y du point de fin de la line

        // Coordonnées du début de la line (x1, y1) et du point de fin de la line (x2, y2)
        line.setAttribute("x1", `${x1}`); // Coordonnée x du début de la line
        line.setAttribute("y1", "11"); // Coordonnée y du début de la line
        line.setAttribute("x2", `${x2}`); // Coordonnée x du point de fin de la line
        line.setAttribute("y2", "11"); // Coordonnée y du point de fin de la line

        // Ajout de la line à votre élément SVG existant (par exemple, à votre conteneur SVG)

        x2 = x1
        x1 += 50
        conteneurSVG.appendChild(line);
    }

    return tabx
}
const CircleSVG = async (tabX) => {
    let container = document.querySelector('#container svg')
    let g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    for (let i = 0; i < tabX.length + 1; i++) {
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle"); // Créez un élément <circle>
        if (i === 0) {
            // Définissez les attributs du cercle
            circle.setAttribute("cx", "10.5"); // Coordonnée x du centre du cercle
            circle.setAttribute("cy", "10.5"); // Coordonnée y du centre du cercle
            circle.setAttribute("r", "10.5"); // Rayon du cercle
            circle.setAttribute("fill", "#FF8300"); // Couleur de remplissage du cercle

            // Ajoutez le cercle à votre élément SVG
        } else {
            // console.log('test',tabX[i - 1] + 0.5);
            // Définissez les attributs du cercle
            circle.setAttribute("cx", `${tabX[i - 1] + 0.5}`); // Coordonnée x du centre du cercle
            circle.setAttribute("cy", "10.5"); // Coordonnée y du centre du cercle
            circle.setAttribute("r", "10.5"); // Rayon du cercle
            circle.setAttribute("fill", "#FF8300"); // Couleur de remplissage du cercle

            // Ajoutez le cercle à votre élément SVG
        }
        g.appendChild(circle);

    }
    container.appendChild(g)


}

function PourcentageRatio(up, down) {
    let ratio = up + down;

    return (up * 100) / ratio;
}

const CreateCircle = (up, down, audit) => {
    // Nouvelle valeur pour le tracé et le texte
    var newValue = Math.round(PourcentageRatio(up, down));
    let value = 100-newValue // Par exemple, une nouvelle valeur de 80%
    // Sélection de l'élément <path> et mise à jour de l'attribut stroke-dasharray
    var path = document.getElementById('pathcircle');
    path.setAttribute('stroke-dasharray', newValue + ', 100');

    // Sélection de l'élément <text> et mise à jour du contenu texte
    var text = document.querySelector('.percentage');
    text.textContent = newValue + '%';
    let color = ["none", "#3c9ee5", "#eee"]
    let label = ["Ratio : " + audit.toFixed(1),newValue+"% UP : " + CalculXp(up), value+"% DOWN : " + CalculXp(down)]

    for (let index = 0; index < color.length; index++) {
        LegendGraph("legendcircle", color[index], label[index])
    }

}

const DrawGraphSkilss = async (user) => {
    // import { DrawSVGPlugin } from '@/js/vendors/gsap/plugins/DrawSVGPlugin';
    let skill = user["Skills"]
    let skills = await skill.map(objet => objet["amount"]);
    let labels = await skill.map(objet => (objet["type"]).split("_")[1]);
    // const pourcentages = skills.map(valeur =>Math.round( calculerPourcentage(valeur)));
    // console.log("skills",pourcentages);
    let colors = generateColors(skills.length)
    var container = document.getElementById('container');
    var graphMeasurement = document.getElementById('graph-measurement');
    var allCircles = document.getElementsByTagName('circle');
    // console.log("log",allCircles);
    var allLines = document.getElementsByTagName('line');
    // console.log(allLines.length);
    var destArray = Echelle(skills, 300)
    // console.log('skills',destArray.length,allCircles.length,allLines.length);

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

    for (var i = 0; i < allCircles.length; i++) {
        TweenMax.set(allCircles[i], {
            attr: {
                fill: colors[i],
            },
            transformOrigin: '50% 50%',
            scale: 0
        });
    }
    TweenMax.set([allLines], {
        attr: {
            stroke: '#18B5DD'
        },
        // drawSVG: '100% 100%',
        strokeWidth: 2
    })
    TweenMax.set([graphMeasurement], {
        attr: {
            stroke: '#18B5DD'
        },
        // drawSVG: '100% 100%',
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
        // drawSVG: '0% 100%',
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
                // drawSVG: '400',
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
    // let legend= document.getElementById("legendgraph")
    for (let index = 0; index < colors.length; index++) {
        LegendGraph("legendgraph", colors[index], labels[index])

    }

    var dynamicText = document.getElementById('dynamicText');

    // Parcourir les cercles et ajouter des événements pour mettre à jour le texte
    for (var i = 0; i < allCircles.length; i++) {
        let skill = skills[i]
        let label = labels[i]
        // console.log(labels[i]);

        allCircles[i].addEventListener('mouseover', function (event) {
            event.preventDefault()
            dynamicText.textContent = `${label} : ${skill}%`; // Mettre à jour le texte avec la couleur
            dynamicText.style.visibility = "visible"; // Afficher le texte
        });

        allCircles[i].addEventListener('mouseout', function (event) {
            event.preventDefault()

            dynamicText.style.visibility = "hidden"; // Masquer le texte lorsque vous ne survolez plus un cercle
        });
    }

}

function Echelle(valeurs, echelle_maximale) {
    let valeur_min = Math.min(...valeurs);
    let valeur_max = Math.max(...valeurs);
    let valeurs_echelle = [];
    valeurs.forEach(function (valeur) {
        let nouvelle_valeur = (valeur - valeur_min) * (echelle_maximale / (valeur_max - valeur_min));
        valeurs_echelle.push(nouvelle_valeur);
    });

    return valeurs_echelle;
}
//-------------------------FormatsSkills---------------------------------//

function FormatSkills(tableauObjets) {
    let tableauAccumule = []
    // Parcourir chaque objet dans le tableau d'objets
    for (let i = 0; i < tableauObjets.length; i++) {
        let objet = tableauObjets[i];
        let trouve = false;
        // Vérifier si le type existe déjà dans le tableau accumulé
        for (let j = 0; j < tableauAccumule.length; j++) {
            if (tableauAccumule[j].type === objet.type) {
                tableauAccumule[j].amount += objet.amount // Augmenter l'âge si le type existe déjà
                trouve = true;
                break;
            }
        }
        // Si le type n'existe pas encore, ajouter un nouvel objet avec âge à 1
        if (!trouve) {
            tableauAccumule.push({ type: objet.type, amount: objet.amount });
        }
    }
    return tableauAccumule
}
const LegendGraph = (id, color, attribut) => {
    let legend = document.getElementById(`${id}`)
    let div0 = document.createElement('div')
    div0.className = "legend-item"
    let div = document.createElement('div')

    div.className = "legend-color"
    div.style.backgroundColor = color
    let div1 = document.createElement('div')
    div1.className = "legend-label"
    div1.textContent = attribut
    div0.appendChild(div)
    div0.appendChild(div1)
    legend.appendChild(div0)

}

const CalculXp = (xp) => {

    if (xp < 1000000) {
        return Math.round((xp / 1000).toFixed(2)) + " KB"
    }
    return (xp / 1000000).toFixed(2) + " MB"

}

const Display = async (user) => {
    FirstSection(user)
    let tabx = await LineSVG(user.Skills)
    // console.log(tabx[tabx.length-1]);
    const svg = document.querySelector("#container svg")
    svg.setAttribute("viewBox",`0 -1 ${tabx[tabx.length-1]+10} 450`,)
    CircleSVG(tabx)
    DrawGraphSkilss(user)
    CreateCircle(user.Infos.totalUp, user.Infos.totalDown, user.Infos.auditRatio)


}

//-------------------------INDEX---------------------------------//
export const IndexHandler = () => {
    document.body.innerHTML = IndexHTML
    const form = document.getElementById("form");

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

//-------------------------HOME---------------------------------//C

export const HomeHandler = () => {

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
                console.log("error detected");
            }
        })
        .then(data => {
            let result = data.data.User[0]
            let transaction = data.data.Transaction
            let skill = data.data.Skills
            let totalxp = 0
            let User = {
                Infos: [],
                Totalxp: 0,
                Amount: [],
                Time: [],
                Levels: 0,
                Skills: []
            }
            let skills = FormatSkills(skill)
            transaction.forEach(element => {
                totalxp += element.amount
                User.Amount.push(element.amount)
                User.Time.push({ nom: element.path, amount: element.amount })
            });

            User.Infos = result
            // totalxp = Math.round(totalxp / 1000)
            User.Totalxp = CalculXp(totalxp, "xp")
            User.Skills = skills
            User["Levels"] = result.events[0].level
            Display(User)

        })
        .catch(error => {
            console.error('Erreur lors de la requête GraphQL:', error);
        });

    LogOut()
}
