import { AddStudent } from "./api/AddStudent.js";

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

    idNumberInput.addEventListener("input", function () {
      const idNumber = idNumberInput.value.trim();
      const idLength = idNumber.length;

      if (idLength === 13 && validateSaId(idNumber)) {
        const yearPrefix = idNumber.charAt(0) === '0' ? '20' : '19';
        const year = yearPrefix + idNumber.substring(0, 2);
        const month = idNumber.substring(2, 4);
        const day = idNumber.substring(4, 6);
        const birthdateString = `${year}-${month}-${day}`;
        birthdateInput.value = birthdateString;

        const genderDigit = parseInt(idNumber.charAt(6));
        const genderValue = genderDigit >= 5 ? 1 : 2; // Female: 2, Male: 1
        genderSelect.value = genderValue;
      }
    });

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

      try {
        await AddStudent(studentData);
      } catch (error) {
        console.log("Error adding student:", error);
      }

      form.reset();
    });
  } catch (error) {
    console.error("Error initializing the application:", error);
  }
}

function validateSaId(idNumber) {
  return idNumber.length === 13;
}

function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^(\+27|0)?[1678][0-9]{8}$/;
    return phoneRegex.test(phoneNumber);
}

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}
