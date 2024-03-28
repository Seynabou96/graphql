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

console.log("hello");

// const skill=[{type:"skill",amount:12},{type:"prog",amount:12},{type:"skill",amount:23}]

// console.log("bef", skills);
// console.log('last',FormatSkills(tableauObjets)); 