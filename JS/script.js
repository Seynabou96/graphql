//----------------------------------IMPORTATIONS----------------------------------//
import { HomeHandler, IndexHandler } from "./methods.js";


//----------------------------------VARIABLES------------------------------------//
export let jwt = localStorage.getItem("jwt");
//----------------------------------LOGIC SPA-----------------------------------//
if (jwt === null) {
    IndexHandler()
} else {
    HomeHandler()
}


