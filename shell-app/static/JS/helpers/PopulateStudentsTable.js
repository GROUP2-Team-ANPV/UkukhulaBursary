function populateStudentsTable(students) {
  const rows = [];

  students.forEach((student) => {
    const row = document.createElement("tr");
    const firstName = document.createElement("td");
    const lastName = document.createElement("td");
    const gender = document.createElement("td");
    const race = document.createElement("td");
    const status = document.createElement("td");
    const actions = document.createElement("td");
    actions.classList.add("actions");
    const application = document.createElement("p");
    application.classList.add("view__application", "dark");
    application.textContent = "view";
    const seeApplication = document.createElement("i");
    seeApplication.classList.add("bx", "bx-right-top-arrow-circle", "bx-sm");
    application.append(seeApplication);
    actions.appendChild(application);

    const edit = document.createElement("p");
    edit.classList.add("edit__application", "dark");
    edit.textContent = "edit";
    const editApplication = document.createElement("i");
    editApplication.classList.add("bx", "bx-edit-alt", "bx-sm");
    edit.append(editApplication);
    actions.appendChild(edit);

    firstName.textContent = student.firstName;
    lastName.textContent = student.lastName;
    gender.textContent = student.gender;
    race.textContent = student.race;
    status.textContent = student.applicationStatus;

    row.appendChild(firstName);
    row.appendChild(lastName);
    row.appendChild(gender);
    row.appendChild(race);
    row.appendChild(status);
    row.appendChild(actions);

    rows.push(row);
  });

  return rows;
}

export default populateStudentsTable;
