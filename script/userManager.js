export let usersData = [];
export let currentUserIndex = 0;

export async function loadUserData() {
  const storedData = localStorage.getItem("usersData");
  if (storedData) {
    usersData = JSON.parse(storedData);
  } else {
    try {
      const response = await fetch("../data/data.json");
      const data = await response.json();
      usersData = data;
      saveUserDataToLocalStorage();
    } catch (error) {
      return console.error("Erreur de chargement des données:", error);
    }
  }
}

export function saveUserDataToLocalStorage() {
  localStorage.setItem("usersData", JSON.stringify(usersData));
}

export function getCurrentUser() {
  return usersData[currentUserIndex];
}

export function setCurrentUserIndex(index) {
  currentUserIndex = index;
}
