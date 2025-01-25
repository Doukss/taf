document.getElementById("transactionForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche l'envoi du formulaire
  
    // Réinitialisation des erreurs existantes
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((msg) => msg.remove());
  
    let isValid = true;
  
    // Validation du champ "Date"
    const transactionDate = document.getElementById("transactionDate");
    if (!transactionDate.value) {
      displayError(transactionDate, "La date est obligatoires.");
      isValid = false;
    }
  
    // Validation du champ "Numéro"
    const transactionNumber = document.getElementById("transactionNumber");
    if (!transactionNumber.value) {
      displayError(transactionNumber, "Le numéro de transaction est obligatoire.");
      isValid = false;
    } else if (!/^\d+$/.test(transactionNumber.value)) {
      displayError(transactionNumber, "Le numéro doit contenir uniquement des chiffres.");
      isValid = false;
    }
  
    // Validation du champ "Type de transaction"
    const transactionType = document.getElementById("transactionType");
    if (!transactionType.value) {
      displayError(transactionType, "Le type de transaction est obligatoire.");
      isValid = false;
    }else if (transactionType.value < montant){
      displayError(transactionType, "Le montant doit supperieur ou egal à la solde.");

    }

    
  
    // Validation du champ "Montant"
    const transactionAmount = document.getElementById("transactionAmount");
    if (!transactionAmount.value) {
      displayError(transactionAmount, "Le montant est obligatoire.");
      isValid = false;
    } 
  
    
  });
  
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
  const montant = document.getElementById("userMontant");

  // Récupérer les éléments d'erreur
  const prenomError = document.getElementById("prenomError");
  const nomError = document.getElementById("nomError");
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

  // Validation du montant
  if (!montant.value.trim()) {
    montantError.textContent = "Le montant est obligatoire.";
    isValid = false;
  } else if (isNaN(montant.value) || parseFloat(montant.value) <= 0) {
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