console.log("Page JAvaScripte | AUTHENTICATION")

// Password visibility ON/OFF
const eye = document.querySelector(".icon-eye");
const eyeoff = document.querySelector(".icon-eye-off");
const passwordField = document.querySelector("input[type=password]");
/* eye.addEventListener("click", () => {
    eye.style.display = "none";
    eyeoff.style.display = "block";
    passwordField.type = "text";
});  */ 
eyeoff.addEventListener("click", () => {
    eyeoff.style.display = "none";
    eye.style.display = "block";
    passwordField.type = "text";
});
eye.addEventListener("click", () => {
    eye.style.display = "none";
    eyeoff.style.display = "block";
    passwordField.type = "password";
});  

// export function ajoutListenerEnvoyerAvis() {
//     const formulaireAvis = document.querySelector(".formulaire-avis");
//     formulaireAvis.addEventListener("submit", function (event) {
//     /* ... */
//     });
// }
 
// import { ajoutListenersAvis, ajoutListenerEnvoyerAvis } from "./avis.js";
// // Récupération des pièces depuis le fichier JSON
// const reponse = await fetch('http://localhost:8081/pieces/');
// const pieces = await reponse.json();
// // on appelle la fonction pour ajouter le listener au formulaire
// ajoutListenerEnvoyerAvis()

// Désactivation du comportement par défaut du navigateur
// event.preventDefault();

// Création de l’objet du nouvel avis.
/* const login = {
    email: event.target.querySelector("[name=email-id").value,
    password: event.target.querySelector("[name=password-id]").value,
 }; */
 // Création de la charge utile au format JSON
/* const toLogin = JSON.stringify(login); */
// Appel de la fonction fetch avec toutes les informations nécessaires
/* fetch("http://localhost:5678/api-docs/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: toLogin
}); */
// body: '{ "email": "sophie.bluel@test.tld","password": "S0phie"}'

// export function ajoutListenerEnvoyerAvis() {
//     const formulaireAvis = document.querySelector(".formulaire-avis");
//     formulaireAvis.addEventListener("submit", function (event) {
//     /* ... */
//     });
// }
 
// import { ajoutListenersAvis, ajoutListenerEnvoyerAvis } from "./avis.js";
// // Récupération des pièces depuis le fichier JSON
// const reponse = await fetch('http://localhost:8081/pieces/');
// const pieces = await reponse.json();
// // on appelle la fonction pour ajouter le listener au formulaire
// ajoutListenerEnvoyerAvis()



// fetch("api-docs/users/login", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: '{ "email": "sophie.bluel@test.tld","password": "S0phie"}'
// });