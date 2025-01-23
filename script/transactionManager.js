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
