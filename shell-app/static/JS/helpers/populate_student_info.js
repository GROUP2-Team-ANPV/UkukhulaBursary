import formatMoney from "./format_money.js";

function populateStudentModal(student) {
  const studentInfo = [];

  for (let [key, value] of Object.entries(student)) {
    const label = key.replace(/([A-Z])/g, " $1").toLowerCase();

    if (
      label != "student i d" &&
      label !== "first name" &&
      label !== "last name"
    ) {
      const infoItem = document.createElement("li");
      infoItem.classList.add("info");
      const infoLabel = document.createElement("p");
      infoLabel.classList.add("label");
      const infoValue = document.createElement("p");
      infoValue.classList.add("value");

      infoLabel.textContent = label;

      if (label === "amount") {
        value = formatMoney(value);
      }
      if (label === "birth date") {
        value = value.split("T")[0];
      }

      infoValue.textContent = value;
      infoItem.appendChild(infoLabel);
      infoItem.appendChild(infoValue);
      studentInfo.push(infoItem);
    }
  }
  return studentInfo;
}

export default populateStudentModal;
