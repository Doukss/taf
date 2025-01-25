import { getCurrentUser, saveUserDataToLocalStorage } from "./userManager.js";
import { displayUserData } from "./displayManager.js";
import { closeTransactionPopup } from "./modal.js";

export function addTransaction(event) {
  event.preventDefault();

  const date = document.getElementById("transactionDate");
  const numero = document.getElementById("transactionNumber");
  const type = document.getElementById("transactionType");
  const montant = document.getElementById("transactionAmount");

  // Réinitialiser les messages d'erreur existants
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((msg) => msg.remove());

  let isValid = true;

  // Validation des champs
  if (!date.value) {
    displayError(date, "La date est obligatoire.");
    isValid = false;
  }

  if (!numero.value) {
    displayError(numero, "Le numéro de transaction est obligatoire.");
    isValid = false;
  } else if (!/^\d+$/.test(numero.value)) {
    displayError(numero, "Le numéro doit contenir uniquement des chiffres.");
    isValid = false;
  }

  if (!type.value) {
    displayError(type, "Le type de transaction est obligatoire.");
    isValid = false;
  }

  if (!montant.value || isNaN(montant.value) || montant.value <= 0) {
    displayError(montant, "Le montant doit être un nombre positif.");
    isValid = false;
  } else {
    const user = getCurrentUser();
    const parsedMontant = parseFloat(montant.value);
    if ((type.value === "retrait" || type.value === "transfert") && parsedMontant > user.montant) {
      displayError(montant, "Le montant ne peut pas dépasser le solde disponible.");
      isValid = false;
    }
  }

  if (!isValid) {
    return; // Arrêter l'exécution si une validation échoue
  }

  // Création de la transaction
  const newTransaction = {
    date: date.value,
    numero: numero.value,
    type: type.value,
    montant: type.value === "retrait" || type.value === "transfert" ? -parseFloat(montant.value) : parseFloat(montant.value),
  };

  const user = getCurrentUser();
  user.transactions.push(newTransaction);
  user.montant += newTransaction.montant;

  // Sauvegarder les données et mettre à jour l'affichage
  saveUserDataToLocalStorage();
  closeTransactionPopup();
  displayUserData();
}

function displayError(inputElement, message) {
  const errorMessage = document.createElement("div");
  errorMessage.textContent = message;
  errorMessage.classList.add("error-message");
  errorMessage.style.color = "red";
  errorMessage.style.fontSize = "0.875rem";
  errorMessage.style.marginTop = "4px";
  inputElement.parentNode.appendChild(errorMessage);
}

// Écouteur d'événement pour le formulaire
const transactionForm = document.getElementById("transactionForm");
transactionForm.addEventListener("submit", addTransaction);