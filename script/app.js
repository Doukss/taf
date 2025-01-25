// app.js
import { loadUserData } from "./userManager.js";
import { displayUserData } from "./displayManager.js";
import { addTransaction } from "./transactionManager.js";
import { setupNavigation } from "./navigation.js";
import { closeTransactionPopup, closeUserPopup, openTransactionPopup, openUserPopup } from "./modal.js";

document.addEventListener("DOMContentLoaded", () => {
  loadUserData().then(() => {
    displayUserData();
  });

  document
    .getElementById("transactionForm")
    .addEventListener("submit", addTransaction);
  setupNavigation();
  document
    .getElementById("addTransactionButton")
    .addEventListener("click", openTransactionPopup);

    document.getElementById("addUserButton")
    .addEventListener("click", openUserPopup);

    document.getElementById("closeUserModal")
    .addEventListener("click", closeUserPopup);

  document
    .getElementById("closeModal")
    .addEventListener("click", closeTransactionPopup);
});



