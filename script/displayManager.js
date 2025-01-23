import { getCurrentUser } from "./userManager.js";

export function displayUserData() {
  const user = getCurrentUser();

  // Mise à jour des informations de l'utilisateur
  document.querySelector("h2").textContent = `${user.prenom} ${user.nom}`;
  document.querySelector(
    "p:nth-child(2)"
  ).textContent = `Téléphone : ${user.telephone}`;
  document.querySelector(
    "p:nth-child(3)"
  ).textContent = `Email : ${user.email}`;
  document.querySelector(
    "p:nth-child(4)"
  ).textContent = `Montant : ${user.montant}€`;
  document.querySelector("img").src = user.photo;

  // Affichage des transactions
  const transactionsTable = document.getElementById("transactionsTable");
  transactionsTable.innerHTML = "";
  user.transactions.forEach((transaction) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="px-4 py-2">${transaction.date}</td>
      <td class="px-4 py-2">${transaction.numero}</td>
      <td class="px-4 py-2">${transaction.type}</td>
      <td class="px-4 py-2">${transaction.montant}€</td>
    `;
    transactionsTable.appendChild(row);
  });
}
