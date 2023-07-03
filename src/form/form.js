import "../assets/styles/styles.scss";
import "./form.scss";
import { openModal } from "../assets/javascripts/modal";

const form = document.querySelector("form");
const errorElement = document.querySelector("#errors");
const btnCancel = document.querySelector(".btn-secondary");
let errors = [];
let contactId;

// Nous allons créer une fonction asynchrone que nous invoquons de suite.
// Nous parsons l’URL de la page et vérifions si nous avons un paramètre id.
// Si nous avons un id, nous récupérons l’article correspondant.
const initForm = async () => {
  const params = new URL(window.location.href);
  contactId = params.searchParams.get("id");
  if (contactId) {
    const response = await fetch(`https://restapi.fr/api/article/${contactId}`);
    if (response.status < 300) {
      const contact = await response.json();
      fillForm(contact);
    }
  }
};

initForm();

// Nous remplissons tous les champs de notre formulaire en créant des références
// et en utilisant les informations récupérées du serveur.
const fillForm = (contact) => {
  const nom = document.querySelector('input[name="nom"]');
  const prenom = document.querySelector('input[name="prenom"]');
  const email = document.querySelector('input[name="email"]');
  const objet = document.querySelector('input[name="objet"]');
  const content = document.querySelector("textarea");
  nom.value = contact.nom || "";
  prenom.value = contact.prenom || "";
  email.value = contact.email || "";
  objet.value = objet.title || "";
  content.value = contact.content || "";
};

btnCancel.addEventListener("click", async () => {
  const result = await openModal(
    "Si vous quittez la page, vous allez perdre votre article"
  );
  if (result) {
    window.location.assign("./index.html");
  }
});

// Lorsque nous éditons, nous ne créons pas de nouvelle ressource sur le serveur.
// Nous n’utilisons donc pas une requête POST mais une requête PATCH.
// Pas PUT car nous ne remplaçons pas la ressource distante (nous gardons
// la date de création et l’id).
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const contact = Object.fromEntries(formData.entries());
  if (formIsValid(contact)) {
    try {
      const json = JSON.stringify(contact);
      let response;
      if (contactId) {
        response = await fetch(`https://restapi.fr/api/article/${contactId}`, {
          method: "PATCH",
          body: json,
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        response = await fetch("https://restapi.fr/api/article", {
          method: "POST",
          body: json,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      if (response.status < 299) {
        window.location.assign("./index.html");
      }
    } catch (e) {
      console.error("e : ", e);
    }
  }
});

const formIsValid = (contact) => {
  errors = [];
  if (
    !contact.nom ||
    !contact.prenom ||
    !contact.content ||
    !contact.email ||
    !contact.objet
  ) {
    errors.push("Vous devez renseigner tous les champs");
  } else {
    errors = [];
  }
  if (errors.length) {
    let errorHTML = "";
    errors.forEach((e) => {
      errorHTML += `<li>${e}</li>`;
    });
    errorElement.innerHTML = errorHTML;
    return false;
  } else {
    errorElement.innerHTML = "";
    return true;
  }
};
