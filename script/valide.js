
  
  function displayError(inputElement, message) {
    const errorMessage = document.createElement("div");
    errorMessage.textContent = message;
    errorMessage.classList.add("error-message");
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "0.875rem";
    inputElement.parentNode.appendChild(errorMessage);
  }
  
  window.addEventListener("click", (event) => {
    if (event.target === transactionPopup) {
      transactionPopup.classList.add("hidden");
    }
    if (event.target === userPopup) {
      userPopup.classList.add("hidden");
    }
  });

function validateForm(form) {
  let isValid = true;
  const fields = form.querySelectorAll("input, select, textarea");

  fields.forEach((field) => {
    const errorElement = field.nextElementSibling;
  
    if (!field.value.trim()) {
      // Vérifier le nom ou un attribut spécifique du champ
      if (field.name === "date") {
        errorElement.textContent = "La date  est obligatoire.";
      } else if (field.name === "numero") {
        errorElement.textContent = "Le numero est positif.";
      } else if (field.name === "montant") {
        errorElement.textContent = "Le montant est obligatoire.";
      } else {
        errorElement.textContent = "Ce champ est obligatoire.";
      }
      isValid = false;
    } else {
      errorElement.textContent = ""; // Réinitialiser les erreurs si le champ est valide
    }
  });
  

  return isValid;
}
document.addEventListener("DOMContentLoaded", async () => {
  await loadUserData();
  if (users.length > 0) {
    displayUserData();
    setupNavigation();
    setupPopups();
  } else {
    console.warn("Aucun utilisateur disponible.");
  }
});
// validation des champs pour ajouter utilisateur
document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Empêche l'envoi du formulaire

  // Récupérer les champs
  const prenom = document.getElementById("userPrenom");
  const nom = document.getElementById("userNom");
  const photo = document.getElementById("userPhoto");
  const montant = document.getElementById("userMontant");


  // Récupérer les éléments d'erreur
  const prenomError = document.getElementById("prenomError");
  const nomError = document.getElementById("nomError");
  const photoError = document.getElementById("photoError");
  const montantError = document.getElementById("montantError");

  let isValid = true;

  // Validation du prénom
  if (!prenom.value.trim()) {
    prenomError.textContent = "Le prénom est obligatoire.";
    isValid = false;
  } else {
    prenomError.textContent = ""; // Pas d'erreur
  }

  // Validation du nom
  if (!nom.value.trim()) {
    nomError.textContent = "Le nom est obligatoire.";
    isValid = false;
  } else {
    nomError.textContent = ""; // Pas d'erreur
  }

  // Validation du photo
  if (!photo.value.trim()) {
    photoError.textContent = "Le photo est obligatoire.";
    isValid = false;
  } else {
    photoError.textContent = ""; // Pas d'erreur
  }

  // Validation du montant
  if (!montant.value.trim()) {
    montantError.textContent = "Le montant est obligatoire.";
    isValid = false;
    montantError.textContent = "Veuillez entrer un montant valide (nombre supérieur à 0).";
    isValid = false;
  } else {
    montantError.textContent = ""; // Pas d'erreur
  }

  // Si tous les champs sont valides
  if (isValid) {
    alert("Formulaire valide ! Données envoyées.");
    // Vous pouvez soumettre le formulaire ou effectuer une action
  }
});

