import {
  isValidEmail,
  isValidName,
  isValidOptionValue,
  isValidPhoneNumber,
} from "./data_validation/DataValiadation.js";

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

    if (!isValidPhoneNumber(hodData.phoneNumber)) {
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

    if (!isValidName(hodData.firstName)) {
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

    if (!isValidName(hodData.lastName)) {
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

    if (!isValidOptionValue(hodData.departmentID)) {
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

    if (!isValidOptionValue(hodData.universityID)) {
      feedbackHeading.textContent = "Error";
      feedbackMessage.textContent = "Please select a university";
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
        "https://ukukhulaapi2024.azurewebsites.net/api/BBDAdmin/AddUniversityUser",
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(hodData),
        }
      );
      const data = response.statusText;
      if (data === "OK") {
        hodForm.reset();
        feedbackHeading.textContent = "Success";
        feedbackMessage.textContent = "Head of Department added successfully";

        feedbackContainer.style.backgroundColor = "var(--success)";
      }
    } catch (error) {
      feedbackHeading.textContent = "Error";
      feedbackMessage.textContent =
        "An error occured while adding the Head of Department";
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
  hodForm.addEventListener("submit", handleAddHOD);
}
