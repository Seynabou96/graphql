//--------------------------------Endpoint SignIn---------------------::

import { HomeHandler } from "./methods.js";

const graphqlEndpointSignIn = 'https://learn.zone01dakar.sn/api/auth/signin';


//-------------------------JWT---------------------------------//

const StockJWT = async (data) => {
    localStorage.setItem("jwt", data)
    window.location.reload();
    // HomeHandler()
}

//-------------------------Handle Error---------------------------------//

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

//-------------------------CRYPTAGE---------------------------------//

function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}


//-------------------------SIGN IN---------------------------------//

export const SignIn = (loginData) => {
    let credentials = `${loginData.username}:${loginData.password}`;
    let base64Credentials = utf8_to_b64(credentials)
    let authorizationHeader = `Basic ${base64Credentials}`;
    // En-tête à inclure dans la requête HTTP
    let headers = {
        'Authorization': authorizationHeader,
        'Content-Type': 'application/json',

    };
    // Options de la requête Fetch
    let fetchOptions = {
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
