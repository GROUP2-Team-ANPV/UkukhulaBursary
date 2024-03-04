import {
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
  isValidOptionValue,
} from "./data_validation/DataValiadation.js";
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
      universityData[key] = value;
    }

    console.log(universityData);

    if (!isValidEmail(universityData.email)) {
      feedbackHeading.textContent = "Error";
      feedbackMessage.textContent = "Invalid email address";
      feedbackContainer.style.backgroundColor = "var(--danger)";
      feedbackContainer.classList.add("feedback--show");
      setTimeout(() => {
        feedbackContainer.classList.remove("feedback--show");
        feedbackHeading.textContent = "";
        feedbackMessage.textContent = "";
        feedbackContainer.style.backgroundColor = "";
      }, 3000);
      return;
    }

    if (!isValidPhoneNumber(universityData.phoneNumber)) {
      feedbackHeading.textContent = "Error";
      feedbackMessage.textContent = "Invalid phone number";
      feedbackContainer.style.backgroundColor = "var(--danger)";
      feedbackContainer.classList.add("feedback--show");
      setTimeout(() => {
        feedbackContainer.classList.remove("feedback--show");
        feedbackHeading.textContent = "";
        feedbackMessage.textContent = "";
        feedbackContainer.style.backgroundColor = "";
      }, 3000);
      return;
    }

    if (!isValidName(universityData.universityName)) {
      feedbackHeading.textContent = "Error";
      feedbackMessage.textContent = "Invalid university name";
      feedbackContainer.style.backgroundColor = "var(--danger)";
      feedbackContainer.classList.add("feedback--show");
      setTimeout(() => {
        feedbackContainer.classList.remove("feedback--show");
        feedbackHeading.textContent = "";
        feedbackMessage.textContent = "";
        feedbackContainer.style.backgroundColor = "";
      }, 3000);
      return;
    }

    if (!isValidName(universityData.firstName)) {
      feedbackHeading.textContent = "Error";
      feedbackMessage.textContent = "Invalid first name";
      feedbackContainer.style.backgroundColor = "var(--danger)";
      feedbackContainer.classList.add("feedback--show");
      setTimeout(() => {
        feedbackContainer.classList.remove("feedback--show");
        feedbackHeading.textContent = "";
        feedbackMessage.textContent = "";
        feedbackContainer.style.backgroundColor = "";
      }, 3000);
      return;
    }

    if (!isValidName(universityData.lastName)) {
      feedbackHeading.textContent = "Error";
      feedbackMessage.textContent = "Invalid last name";
      feedbackContainer.style.backgroundColor = "var(--danger)";
      feedbackContainer.classList.add("feedback--show");
      setTimeout(() => {
        feedbackContainer.classList.remove("feedback--show");
        feedbackHeading.textContent = "";
        feedbackMessage.textContent = "";
        feedbackContainer.style.backgroundColor = "";
      }, 3000);
      return;
    }

    if (!isValidOptionValue(universityData.provinceID)) {
      feedbackHeading.textContent = "Error";
      feedbackMessage.textContent = "Please select a province";
      feedbackContainer.style.backgroundColor = "var(--danger)";
      feedbackContainer.classList.add("feedback--show");
      setTimeout(() => {
        feedbackContainer.classList.remove("feedback--show");
        feedbackHeading.textContent = "";
        feedbackMessage.textContent = "";
        feedbackContainer.style.backgroundColor = "";
      }, 3000);
      return;
    }

    if (!isValidOptionValue(universityData.departmentID)) {
      feedbackHeading.textContent = "Error";
      feedbackMessage.textContent = "Please select a department";
      feedbackContainer.style.backgroundColor = "var(--danger)";
      feedbackContainer.classList.add("feedback--show");
      setTimeout(() => {
        feedbackContainer.classList.remove("feedback--show");
        feedbackHeading.textContent = "";
        feedbackMessage.textContent = "";
        feedbackContainer.style.backgroundColor = "";
      }, 3000);
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
        universityForm.reset();
        feedbackHeading.textContent = "Success";
        feedbackMessage.textContent = "University added successfully";

        feedbackContainer.style.backgroundColor = "var(--success)";
      }
    } catch (error) {
      feedbackHeading.textContent = "Error";
      feedbackMessage.textContent =
        "An error occured while adding the University";
      feedbackContainer.style.backgroundColor = "var(--danger)";
    } finally {
      feedbackContainer.classList.add("feedback--show");

      setTimeout(() => {
        feedbackContainer.classList.remove("feedback--show");
        feedbackHeading.textContent = "";
        feedbackMessage.textContent = "";
        feedbackContainer.style.backgroundColor = "";
      }, 3000);
    }
  }
  universityForm.addEventListener("submit", handleAddUniversity);
}
