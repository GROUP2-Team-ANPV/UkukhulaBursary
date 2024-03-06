import { parseJwt } from "../JwtDecoder.js";
import { getStatus } from "../api/GetStatus.js";
import { updateApplicationStatus } from "../api/UpdateApplicationStatus.js";
import formatMoney from "./format_money.js";
import populateStatusSelect from "./populate_status_select.js";

async function populateStudentModal(student) {
  const userRole = parseJwt(sessionStorage.getItem("token"));

  const studentInfo = [];

  // Create the button for generating links
  const generateLinkButton = document.createElement("button");
  generateLinkButton.textContent = "Generate Link";
  generateLinkButton.classList.add("button");
  generateLinkButton.classList.add("generate-link");


  // Create the button for getting links
  const getLinkButton = document.createElement("button");
  getLinkButton.textContent = "Get Links";
  getLinkButton.classList.add("button");
  getLinkButton.classList.add("get-link");

  // Event listener for the get link button
getLinkButton.addEventListener("click", async () => {
  try {
    const linksResponse = await fetch(`http://localhost:5263/api/UniversityAdmin/GetDocumentByFundRequestID?FundID=${student.requestID}`);

    // Check if response status is ok
    if (!linksResponse.ok) {
      throw new Error(`Failed to fetch links. Status: ${linksResponse.status}`);
    }

    const reader = linksResponse.body.getReader();
    const { value, done } = await reader.read();

    // Check if response body is empty
    if (done || !value) {
      alert("The document is pending");
      return;
    }

    const linksText = new TextDecoder("utf-8").decode(value); // Decode response body

    console.log("Response:", linksText); // Log the response text

    const linksData = JSON.parse(linksText); // Attempt to parse the response as JSON

    // Check if linksData is empty or not an array
    if (!Array.isArray(linksData) || linksData.length === 0) {
      console.error("Error: Empty or invalid JSON response");
      return;
    }

    // Show an alert with the response data
    alert(`Received ${linksData.length} links from the server`);

    // Assuming linksData contains an array of links
    linksData.forEach(link => {
      const linkButton = document.createElement("button");
      linkButton.textContent = `${link.documentType}`;
      linkButton.classList.add("button");
      linkButton.classList.add("link-button");

      // Event listener for each link button
      linkButton.addEventListener("click", () => {
        // Handle click event for this specific link button
        // For example, open the document using link.documentPath
        window.open(link.documentPath);
      });

      studentInfo.push(linkButton);
    });
  } catch (error) {
    console.error("Error getting links:", error);
  }
});


  // Append getLinkButton to studentInfo array
  studentInfo.push(getLinkButton);

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
        infoValue.append(...populateStatusSelect(await getStatus()));
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
    const recipientEmail = student.email; // Assuming student is an object with email property
    const expirationTimeInMinutes = 60;
    const uploadToken = Math.random().toString(36).substring(2, 15);
    const requestId = student.requestID;
    const expirationTimestamp = Date.now() + expirationTimeInMinutes * 60 * 1000;
    const uploadLink = "https://blue-glacier-0afa9fa10.5.azurestaticapps.net?token=" +
      uploadToken +
      "&expires=" +
      expirationTimestamp +
      "&requestId=" +
      requestId;
  
    // Construct the mailto link with the message and embedded link
    const mailtoLink = `mailto:${recipientEmail}?subject=Upload Document&body=Dear ${student.firstName + " " + student.lastName}, Please click the following link to upload your document: ${uploadLink}`;
  
    // Open the default email client
    window.location.href = mailtoLink;
  });

  if (userRole === "University Admin") {
    studentInfo.push(generateLinkButton);
  }
  
  return studentInfo;
}

export default populateStudentModal;
