import {
  isValidPhoneNumber,
  isValidEmail,
  isValidIDNumber,
} from "./data_validation/DataValiadation.js";
const token = sessionStorage.getItem("token");
export function StudentapplicationScript() {
  try {
    const form = document.querySelector(".application-form");
    const idNumberInput = document.getElementById("id-number");
    const birthdateInput = document.getElementById("birthDate");
    const genderSelect = document.getElementById("gender");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
    const amountInput = document.getElementById("amount-needed");
    const gradeInput = document.getElementById("grade");

  // idNumberInput.addEventListener("input", function () {
  //   const idNumber = idNumberInput.value.trim();

  //   if (isValidIDNumber(idNumber)) {
  //     // Extract birthdate from ID number
  //     const yearPrefix = idNumber.charAt(0) === "0" ? "20" : "19";
  //     const year = yearPrefix + idNumber.substring(0, 2);
  //     const month = idNumber.substring(2, 4);
  //     const day = idNumber.substring(4, 6);
  //     const birthdateString = `${year}-${month}-${day}`;

  //     // Populate birthdate field
  //     birthdateInput.value = birthdateString;

  //     // Extract gender from ID number
  //     const genderDigit = parseInt(idNumber.charAt(6));
  //     const genderValue = genderDigit >= 5 ? 1 : 2; // Male: 1, Female: 2

  //     // Populate gender select field with gender name
  //     genderSelect.value = genderValue;
  //   } else feedbackHeading.textContent = "Error";
  //   feedbackMessage.textContent = "Invalid ID Number";
  //   feedbackContainer.style.backgroundColor = "var(--danger)";
  //   feedbackContainer.classList.add("feedback--show");
  //   setTimeout(() => {
  //     feedbackContainer.classList.remove("feedback--show");
  //     feedbackHeading.textContent = "";
  //     feedbackMessage.textContent = "";
  //     feedbackContainer.style.backgroundColor = "";
  //   }, 3000);
  //   return;
  // });

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

      const phone = phoneInput.value.trim();
      if (!validatePhoneNumber(phone)) {
        alert("Please enter a valid South African phone number.");
        return;
      }

      const email = emailInput.value.trim();
      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      const formData = new FormData(form);
      const studentData = {};
      formData.forEach((value, key) => {
        if (key === 'genderID' || key === 'departmentID' || key === 'raceID' || key === 'universityID' || key === 'grade') {
          studentData[key] = parseInt(value); // Convert to integer
        } else if (key === 'amount') {
          studentData[key] = parseFloat(value); // Convert to decimal
        } else {
          studentData[key] = value;
        }
      });

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
      // Extract birthdate from ID number
      const yearPrefix = studentData.idNumber.charAt(0) === "0" ? "20" : "19";
      const year = yearPrefix + studentData.idNumber.substring(0, 2);
      const month = studentData.idNumber.substring(2, 4);
      const day = studentData.idNumber.substring(4, 6);
      const birthdateString = `${year}-${month}-${day}`;

      // Populate birthdate field
      birthdateInput.value = birthdateString;

      // Extract gender from ID number
      const genderDigit = parseInt(studentData.idNumber.charAt(6));
      const genderValue = genderDigit >= 5 ? 1 : 2; // Male: 1, Female: 2

      // Populate gender select field with gender name
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

    // Validate phone number
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
        "http://localhost:5263//api/UniversityAdmin/StudentFundRequest",
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

function validateSaId(idNumber) {
  return idNumber.length === 13;
}
