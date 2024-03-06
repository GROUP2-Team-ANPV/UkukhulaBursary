import {
  isValidEmail,
  isValidName,
  isValidOptionValue,
  isValidPhoneNumber,
} from "./data_validation/DataValiadation.js";
import displayNotification from "./data_validation/Notification.js";

const token = sessionStorage.getItem("token");
export function HeadOfDeaprtmentApplicationScript({
  universities,
  departments = [],
}) {
  const universitySelect = document.getElementById("university");
  const hodForm = document.querySelector(".hod-form");

  for (const university of universities) {
    const option = document.createElement("option");
    option.value = university.id;
    option.textContent = university.universityName;
    universitySelect.appendChild(option);
  }

  const departmentSelect = document.getElementById("department");
  for (const department of departments) {
    const option = document.createElement("option");
    option.value = department.id;
    option.textContent = department.name;
    departmentSelect.appendChild(option);
  }

  async function handleAddHOD(event) {
    const feedbackContainer = document.querySelector(".feedback");
    const feedbackHeading = document.querySelector(".feedback__heading");
    const feedbackMessage = document.querySelector(".feedback__message");
    event.preventDefault();
    const hodData = {};
    const formData = new FormData(hodForm);

    for (const [key, value] of formData) {
      hodData[key] = value;
    }

    if (!isValidEmail(hodData.email)) {
      displayNotification("Error", "Invalid email address", "danger");
      return;
    }

    if (!isValidPhoneNumber(hodData.phoneNumber)) {
      displayNotification("Error", "Invalid phone number", "danger");
      return;
    }

    if (!isValidName(hodData.firstName)) {
      displayNotification(
        "Error",
        "First name must contain letters only",
        "danger"
      );
      return;
    }

    if (!isValidName(hodData.lastName)) {
      displayNotification(
        "Error",
        "Last name must contain letters only",
        "danger"
      );
      return;
    }

    if (!isValidOptionValue(hodData.departmentID)) {
      displayNotification("Error", "Please select a department", "danger");
      return;
    }

    if (!isValidOptionValue(hodData.universityID)) {
      displayNotification("Error", "Please select a university", "danger");
      return;
    }

    try {
      const response = await fetch(
        "https://ukukhulaapi2024.azurewebsites.net/api/BBDAdmin/AddUniversityUser",
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(hodData),
        }
      );

      if (response.statusText === "OK") {
        displayNotification(
          "Success",
          "HUniversity Representative added successfully",
          "success"
        );
        hodForm.reset();
      }
    } catch (error) {
      displayNotification(
        "Error",
        "An error occured while adding the Head of Department",
        "danger"
      );
    }
  }
  hodForm.addEventListener("submit", handleAddHOD);
}
