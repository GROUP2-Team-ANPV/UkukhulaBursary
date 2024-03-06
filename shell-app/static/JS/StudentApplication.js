import {
  isValidPhoneNumber,
  isValidEmail,
  isValidIDNumber,
  isValidOptionValue,
  isValidName,
} from "./data_validation/DataValiadation.js";
import displayNotification from "./data_validation/Notification.js";

const token = sessionStorage.getItem("token");

export function StudentapplicationScript() {
  const form = document.querySelector(".application-form");
  const idNumberInput = document.getElementById("id-number");
  const birthdateInput = document.getElementById("birthDate");
  const genderSelect = document.getElementById("gender");
  const amountInput = document.getElementById("amount-needed");
  const gradeInput = document.getElementById("grade");

  idNumberInput.addEventListener("input", function () {
    const idNumber = idNumberInput.value.trim();

    if (isValidIDNumber(idNumber)) {
      const yearPrefix = idNumber.charAt(0) === "0" ? "20" : "19";
      const year = yearPrefix + idNumber.substring(0, 2);
      const month = idNumber.substring(2, 4);
      const day = idNumber.substring(4, 6);
      const birthdateString = `${year}-${month}-${day}`;
      birthdateInput.value = birthdateString;
      const genderDigit = parseInt(idNumber.charAt(6));
      const genderValue = genderDigit >= 5 ? 1 : 2;
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

    const formData = new FormData(form);
    const studentData = {};
    formData.forEach((value, key) => {
      studentData[key] = value;
    });

    if (!isValidName(studentData.firstName)) {
      displayNotification("Error", "Invalid first name", "danger");
      return;
    }

    if (!isValidName(studentData.lastName)) {
      displayNotification("Error", "Invalid last name", "danger");
      return;
    }

    if (!isValidOptionValue(studentData.raceID)) {
      displayNotification("Error", "Please select Ethnicity", "danger");
      return;
    }

    if (!isValidOptionValue(studentData.universityID)) {
      displayNotification("Error", "Please select a university", "danger");
      return;
    }

    if (!isValidOptionValue(studentData.departmentID)) {
      displayNotification("Error", "Please select a department", "danger");
      return;
    }

    if (!isValidIDNumber(studentData.idNumber)) {
      displayNotification("Error", "Invalid ID Number", "danger");
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
      displayNotification("Error", "Invalid email address", "danger");
      return;
    }

    if (!isValidPhoneNumber(studentData.phoneNumber)) {
      displayNotification("Error", "Invalid phone number", "danger");
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
        displayNotification(
          "Success",
          "Application submitted successfully",
          "success"
        );
        form.reset();
      }
    } catch (error) {
      displayNotification(
        "Error",
        `An error occurred while submitting the application: ${error}`,
        "danger"
      );
    }
  });
}
