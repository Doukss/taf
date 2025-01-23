export function closeTransactionPopup() {
  document.getElementById("transactionPopup").classList.add("hidden");
}

export function openTransactionPopup() {
  document.getElementById("transactionPopup").classList.remove("hidden");
}
