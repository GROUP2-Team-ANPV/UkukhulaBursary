function populateRepresentativesTable(representatives) {
  const rows = [];

  representatives.forEach((representative) => {
    const row = document.createElement("tr");
    const firstName = document.createElement("td");
    const lastName = document.createElement("td");
    const department = document.createElement("td");
    const email = document.createElement("td");
    const phone = document.createElement("td");

    firstName.textContent = representative.firstName;
    lastName.textContent = representative.lastName;
    department.textContent = representative.departmentName;
    email.textContent = representative.email;
    phone.textContent = representative.phoneNumber;

    row.appendChild(firstName);
    row.appendChild(lastName);
    row.appendChild(department);
    row.appendChild(email);
    row.appendChild(phone);

    rows.push(row);
  });

  return rows;
}

export default populateRepresentativesTable;
