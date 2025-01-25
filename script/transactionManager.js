import { getCurrentUser, saveUserDataToLocalStorage } from "./userManager.js";
import { displayUserData } from "./displayManager.js";
import { closeTransactionPopup } from "./modal.js";

export function addTransaction(event) {
  event.preventDefault();

  const date = document.getElementById("transactionDate").value;
  const numero = document.getElementById("transactionNumber").value;
  const type = document.getElementById("transactionType").value;
  const montant = parseFloat(
    document.getElementById("transactionAmount").value
  );  

  if (!date || !numero || !type || isNaN(montant) || montant <= 0) {
    alert("Tous les champs doivent être remplis correctement.");
    return;
  }

  const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((msg) => msg.remove());
  
    let isValid = true;
  
    if (!date) {
      displayError(date, "La date est obligatoires.");
      isValid = false;
    }
  
    if (!numero) {
      displayError(numero, "Le numéro  est obligatoire.");
      isValid = false;
    } else if (!/^\d+$/.test(numero)) {
      displayError(numero, "Le numéro doit contenir uniquement des chiffres.");
      isValid = false;
    }
  
    if (!type) {
      displayError(type, "Le type de transaction est obligatoire.");
      isValid = false;
    }

    if (!montant) {
      displayError(montant, "Le montant est obligatoire.");
      isValid = false;
    } 

    if(!isValid){
      return;
    }
  


  

  const newTransaction = {
    date: date,
    numero: numero,
    type: type,
    montant: type === "retrait" || type === "transfert" ? -montant : montant,
  };

  const user = getCurrentUser();
  user.transactions.push(newTransaction);
  user.montant += newTransaction.montant;

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
  inputElement.parentNode.appendChild(errorMessage);
}