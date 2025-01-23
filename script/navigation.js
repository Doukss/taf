import {
  currentUserIndex,
  usersData,
  setCurrentUserIndex,
} from "./userManager.js";
import { displayUserData } from "./displayManager.js";

export function setupNavigation() {
  document.getElementById("prevButton").addEventListener("click", function () {
    if (currentUserIndex > 0) {
      setCurrentUserIndex(currentUserIndex - 1);
      updateNavigationButtons();
      displayUserData();
    }
  });

  document.getElementById("nextButton").addEventListener("click", function () {
    if (currentUserIndex < usersData.length - 1) {
      setCurrentUserIndex(currentUserIndex + 1);
      updateNavigationButtons();
      displayUserData();
    }
  });
}

function updateNavigationButtons() {
  document.getElementById("prevButton").disabled = currentUserIndex === 0;
  document.getElementById("nextButton").disabled =
    currentUserIndex === usersData.length - 1;
}
