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

  const token = sessionStorage.getItem("token");

  const fetchLinksAndPopulateInfo = async () => {
    try {
      const linksResponse = await fetch(`https://ukukhulaapi2024.azurewebsites.net/api/UniversityAdmin/GetDocumentByFundRequestID?FundID=${student.requestID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!linksResponse.ok) {
        throw new Error(`Failed to fetch links. Status: ${linksResponse}`);
      }

      const reader = linksResponse.body.getReader();
      const { value } = await reader.read();

      const linksText = new TextDecoder("utf-8").decode(value);
      const linksData = JSON.parse(linksText);

      if (!Array.isArray(linksData) || linksData.length === 0) {
        const linkButton = document.createElement("li");
        linkButton.textContent = `The document is pending`;
        linkButton.classList.add("info");
        studentInfo.push(linkButton);
        if (userRole === "University Admin") {
          studentInfo.push(generateLinkButton);
        }
        return;
      }

      linksData.forEach(link => {
        const linkButton = document.createElement("li");
        linkButton.textContent = `Download ${link.documentType}`;
        linkButton.classList.add("link-info");

        linkButton.addEventListener("click", () => {
          window.open(link.documentPath);
        });

        studentInfo.push(linkButton);
      });
    } catch (error) {
      console.error("Error getting links:", error);
    }
  };




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
        saveButton.addEventListener("click", (e) => {
          e.preventDefault();
          location.href = "/";
        });
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

  const downloadAllHeader = document.createElement("p");
  downloadAllHeader.classList.add("label");
  downloadAllHeader.textContent = "Documents";
  studentInfo.push(downloadAllHeader);

  await fetchLinksAndPopulateInfo();

  // to be moved to helpers
  generateLinkButton.addEventListener("click", () => {
    const recipientEmail = student.email;
    let message;
    fetch(`http://localhost:5263/api/Auth/Login?email=${recipientEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    })
      .then(response => response.json())

      .then(responseData => {
        console.log(responseData);
        message = responseData.message;
        const requestId = student.requestID;
        const uploadLink = "https://blue-glacier-0afa9fa10.5.azurestaticapps.net?token=" +
          message +
          "&requestId=" +
          requestId;
        const recipientEmailEncoded = encodeURIComponent(recipientEmail);
        const subjectEncoded = encodeURIComponent(`Upload Document - ${student.firstName} ${student.lastName}`);
        const bodyEncoded = encodeURIComponent(`Dear ${student.firstName} ${student.lastName},\n\nPlease upload the required documents for your application by clicking the link below:\n ${uploadLink}\n\nThank you.`);

        const mailtoLink = `mailto:${recipientEmailEncoded}?subject=${subjectEncoded}&body=${bodyEncoded}`;

        window.location.href = mailtoLink;
      })
      .catch(error => {
        console.error('Error:', error);
      });

  });



  return studentInfo;
}

export default populateStudentModal;
