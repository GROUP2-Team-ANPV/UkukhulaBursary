import getApplicationConstants from "../api/GetApplicationConstants.js";
import formatMoney from "./format_money.js";
import populateStatusSelect from "./populate_status_select.js";

function populateStudentModal(student) {
  const studentInfo = [];
  const form = document.createElement("form");
  form.classList.add("info");

  for (let [key, value] of Object.entries(student)) {
    const label = key.replace(/([A-Z])/g, " $1").toLowerCase();

    if (
      !label.includes("i d") &&
      label !== "first name" &&
      label !== "last name"
    ) {
      let infoLabel;
      let infoValue;

      const infoItem = document.createElement("li");
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
      studentInfo.push(infoItem);
    }
  }
  return studentInfo;
}

export default populateStudentModal;
