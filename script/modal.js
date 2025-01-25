export function closeTransactionPopup() {
  document.getElementById("transactionPopup").classList.add("hidden");
}

export function openTransactionPopup() {
  document.getElementById("transactionPopup").classList.remove("hidden");
}

export function openUserPopup() {
  document.getElementById("userPopup").classList.remove("hidden");
}

export function closeUserPopup() {
  document.getElementById("userPopup").classList.add("hidden");
}