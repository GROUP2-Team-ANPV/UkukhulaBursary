import getApplicationConstants from "../api/GetApplicationConstants.js";
import { updateApplicationStatus } from "../api/UpdateApplicationStatus.js";
import formatMoney from "./format_money.js";
import populateStatusSelect from "./populate_status_select.js";

function populateStudentModal(student) {
  const studentInfo = [];
  const generateLinkButton = document.createElement("button");
  generateLinkButton.textContent = "Generate Link";
  generateLinkButton.classList.add("button");
  generateLinkButton.classList.add("generate-link");

  for (let [key, value] of Object.entries(student)) {
    const label = key.replace(/([A-Z])/g, " $1").toLowerCase();

    const infoItem = document.createElement("li");
    let infoValue;
    let infoLabel;

    if (
      !label.includes("i d") &&
      label !== "first name" &&
      label !== "last name"
    ) {
      infoItem.classList.add("info");
      if (label === "status" && value === "Review") {
        infoLabel = document.createElement("label");
        infoLabel.setAttribute("for", "status");
        infoLabel.textContent = "status";
        infoValue = document.createElement("select");
        infoValue.name = "status";
        infoValue.id = "status";
        infoValue.required = true;
        const option = document.createElement("option");
        option.value = "0";
        option.textContent = "Select Status";
        infoValue.appendChild(option);

        getApplicationConstants().then(({ status }) => {
          infoValue.append(...populateStatusSelect(status));
        });
      } else {
        infoLabel = document.createElement("p");
        infoLabel.classList.add("label");
        infoValue = document.createElement("p");
        infoValue.classList.add("value");

        infoLabel.textContent = label;

        if (label === "amount") {
          value = formatMoney(value);
        }
        if (label.includes("date") && value !== null) {
          value = value.split("T")[0];
        }

        infoValue.textContent = value;
      }

      infoItem.appendChild(infoLabel);
      infoItem.appendChild(infoValue);
      if (label === "status" && value === "Review") {
        const saveButton = document.createElement("button");
        saveButton.textContent = "Save";
        saveButton.type = "submit";
        saveButton.classList.add("button");
        saveButton.classList.add("update-status");
        infoItem.appendChild(saveButton);

        saveButton.addEventListener("click", async (event) => {
          event.preventDefault();
          await updateApplicationStatus(student.fundRequestID, {
            status: infoValue.value,
            comment: "",
          });
        });
      }

      studentInfo.push(infoItem);
    }
  }

  // to be moved to helpers
  generateLinkButton.addEventListener("click", () => {
    // Define the expiration time in minutes
    const expirationTimeInMinutes = 60; 
    
    // Generate a random upload token 
    const uploadToken = Math.random().toString(36).substring(2, 15);
    
    
    const requestId = student.requestID;
    console.log(requestId);
   
    // Calculate the expiration timestamp
    const expirationTimestamp = Date.now() + expirationTimeInMinutes * 60 * 1000; // Current time + expiration time
    
    // Generate the upload link with the token, expiration timestamp, and request ID
    const uploadLink = 'https://blue-glacier-0afa9fa10.5.azurestaticapps.net?token=' + uploadToken + '&expires=' + expirationTimestamp + '&requestId=' + requestId;
    
    // Add the link element to the page
    console.log(uploadLink);
  });

  studentInfo.push(generateLinkButton);
  return studentInfo;
}
export default populateStudentModal;
