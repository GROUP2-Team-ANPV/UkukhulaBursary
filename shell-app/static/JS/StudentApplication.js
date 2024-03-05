import {
  isValidPhoneNumber,
  isValidEmail,
  isValidIDNumber,
  isValidOptionValue,
} from "./data_validation/DataValiadation.js";
const token = sessionStorage.getItem("token");
export function StudentapplicationScript() {
  const form = document.querySelector(".application-form");
  const birthdateInput = document.getElementById("birthDate");
  const genderSelect = document.getElementById("gender");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const amountInput = document.getElementById("amount-needed");
  const gradeInput = document.getElementById("grade");
  const feedbackContainer = document.querySelector(".feedback");
  const feedbackHeading = document.querySelector(".feedback__heading");
  const feedbackMessage = document.querySelector(".feedback__message");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const amount = parseFloat(amountInput.value);
    if (amount <= 0 || isNaN(amount)) {
      alert("Amount needed must be greater than zero.");
      return;
    }

    const grade = parseInt(gradeInput.value);
    if (isNaN(grade)) {
      alert("Grade must be a valid integer.");
      return;
    }

    const formData = new FormData(form);
    const studentData = {};
    formData.forEach((value, key) => {
      if (
        key === "genderID" ||
        key === "departmentID" ||
        key === "raceID" ||
        key === "universityID" ||
        key === "grade"
      ) {
        studentData[key] = parseInt(value);
      } else if (key === "amount") {
        studentData[key] = parseFloat(value);
      } else {
        studentData[key] = value;
      }
    });

    if (!isValidOptionValue(studentData.universityID)) {
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

    if (!isValidOptionValue(studentData.departmentID)) {
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

    if (!isValidIDNumber(studentData.idNumber)) {
      feedbackHeading.textContent = "Error";
      feedbackMessage.textContent = "Invalid ID Number";
      feedbackContainer.style.backgroundColor = "var(--danger)";
      feedbackContainer.classList.add("feedback--show");
      setTimeout(() => {
        feedbackContainer.classList.remove("feedback--show");
        feedbackHeading.textContent = "";
        feedbackMessage.textContent = "";
        feedbackContainer.style.backgroundColor = "";
      }, 3000);
      return;
    } else {
      const yearPrefix = studentData.idNumber.charAt(0) === "0" ? "20" : "19";
      const year = yearPrefix + studentData.idNumber.substring(0, 2);
      const month = studentData.idNumber.substring(2, 4);
      const day = studentData.idNumber.substring(4, 6);
      const birthdateString = `${year}-${month}-${day}`;

      birthdateInput.value = birthdateString;

      const genderDigit = parseInt(studentData.idNumber.charAt(6));
      const genderValue = genderDigit >= 5 ? 1 : 2;
      genderSelect.value = genderValue;
    }

    if (!isValidEmail(studentData.email)) {
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

    if (!isValidPhoneNumber(studentData.phoneNumber)) {
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

    try {
      const response = await fetch(
        "https://ukukhulaapi2024.azurewebsites.net/api/UniversityAdmin/StudentFundRequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(studentData),
        }
      );

      if (response.statusText === "OK") {
        form.reset();
        alert("Student application submitted successfully");
      }
    } catch (error) {
      console.error("Error:", error);
      feedbackHeading.textContent = "Error";
      feedbackMessage.textContent = `An error occurred while submitting the application: ${error}`;
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
  });
}
