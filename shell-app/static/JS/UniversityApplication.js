import {
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
  isValidOptionValue,
} from "./data_validation/DataValiadation.js";
import displayNotification from "./data_validation/Notification.js";
export function UniversityApplicationScript() {
  const universityForm = document.querySelector(".university-form");

  async function handleAddUniversity(event) {
    const feedbackContainer = document.querySelector(".feedback");
    const feedbackHeading = document.querySelector(".feedback__heading");
    const feedbackMessage = document.querySelector(".feedback__message");
    event.preventDefault();
    const universityData = {};
    const formData = new FormData(universityForm);

    for (const [key, value] of formData) {
      universityData[key] = value.trim();
    }

    if (!isValidEmail(universityData.email)) {
      displayNotification("Error", "Invalid email address", "danger");
      return;
    }

    if (!isValidPhoneNumber(universityData.phoneNumber)) {
      displayNotification("Error", "Invalid phone number", "danger");
      return;
    }

    if (!isValidName(universityData.universityName)) {
      displayNotification("Error", "Invalid university name", "danger");
      return;
    }

    if (!isValidName(universityData.firstName)) {
      displayNotification("Error", "Invalid first name", "danger");
      return;
    }

    if (!isValidName(universityData.lastName)) {
      displayNotification("Error", "Invalid last name", "danger");
      return;
    }

    if (!isValidOptionValue(universityData.provinceID)) {
      displayNotification("Error", "Please select a province", "danger");
      return;
    }

    if (!isValidOptionValue(universityData.departmentID)) {
      displayNotification("Error", "Please select a department", "danger");
      return;
    }

    try {
      const response = await fetch(
        "https://ukukhulaapi2024.azurewebsites.net/api/BBDAdmin/AddUniversity",
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(universityData),
        }
      );

      if (response.statusText === "OK") {
        displayNotification(
          "Success",
          "University added successfully",
          "success"
        );
        universityForm.reset();
      }
    } catch (error) {
      displayNotification(
        "Error",
        "An error occured while adding the University",
        "danger"
      );
    }
  }
  universityForm.addEventListener("submit", handleAddUniversity);
}
