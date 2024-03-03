function populateStudentsTable(
  students,
  modalWrapper,
  applicationModal,
  documentBody,
  populateStudentModal,
  studentNameContainer
) {
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

    application.addEventListener("click", () => {
      applicationModal.style.transitionDelay = "0s";

      modalWrapper.innerHTML = "";
      studentNameContainer.textContent = `${student.firstName} ${student.lastName}`;
      modalWrapper.append(...populateStudentModal(student));

      applicationModal.classList.add("show");
      window.scrollTo(0, 0);
      documentBody.classList.add("no-scroll");
    });

    edit.addEventListener("click", () => {
      applicationModal.style.transitionDelay = "0s";
      modalWrapper.innerHTML = "";
      modalWrapper.innerHTML = `
      <form class="form application-form">
      <header class="form__header">
        <h2>Ukukhula Bursary</h2>
        <h3>(Student)</h3>
      </header>

      <section class="form__controls-container">
        <fieldset class="form__details-container">
          <legend class="form__details-header">Student Details</legend>
          <ul class="form__controls">
            <li class="form__control">
              <label for="first-name">First Name</label>
              <input type="text" id="first-name" name="firstName" value=${student.firstName} required />
            </li>
            <li class="form__control">
              <label for="last-name">Last Name</label>
              <input type="text" id="last-name" name="lastName" value=${student.lastName} required />
            </li>
            <li class="form__control">
              <label for="id-number">ID Number </label>
              <input type="text" id="id-number" name="idNumber" value=${student.idNumber} required />
            </li>
            <li class="form__control">
              <label for="birthdate">Birthdate </label>
              <input type="date" id="birthdate" name="birthdate" value=${student.birthdate} required />
            </li>
            <li class="form__control">
              <label for="gender">Gender</label>
              <select id="gender" name="genderId" value=${student.gender} required>
                <option value="0">Select Gender</option>
                <!-- Get from the database -->
              </select>
            </li>
            <li class="form__control">
              <label for="race">Ethnicity:</label>
              <select id="race" name="raceId" required>
                <option value="0">Select Ethnicity</option>
                <!-- Get from the database -->
              </select>
            </li>
          </ul>
        </fieldset>
        <fieldset class="form__details-container">
          <legend class="form__details-header">Contact details</legend>
          <ul class="form__controls">
            <li class="form__control">
              <label for="phone">Phone Number</label>
              <input type="tel" id="phone" name="phoneNumber" required />
            </li>
            <li class="form__control">
              <label for="email">Email</label>
              <input type="email" id="email" name="email" required />
            </li>
          </ul>
        </fieldset>
        <fieldset class="form__details-container">
          <legend class="form__details-header">Academic Details</legend>
          <ul class="form__controls">
            <li class="form__control">
              <label for="department">Department</label>
              <select id="department" name="departmentId">
                <option value="0">Select Department</option>
                <!-- To be populate by data from the server -->
              </select>
            </li>
            <li class="form__control">
              <label for="grade">Grade Average</label>
              <input type="text" id="grade" name="grade" required />
            </li>
            <li class="form__control">
              <label for="university">university</label>
              <select name="universityID" id="university">
                <option value="0">Select University</option>
                <!-- FEtch from the database -->
              </select>
            </li>
          </ul>
        </fieldset>
        <fieldset class="form__details-container">
          <legend class="form__details-header">Financial Details</legend>
          <ul class="form__controls">
            <li class="form__control">
              <label for="amount-needed">Amount Needed </label>
              <input
                type="number"
                id="amount-needed"
                name="amount"
                min="0"
                step="0.01"
                required
              />
            </li>
          </ul>
        </fieldset>
        <fieldset class="form__details-container">
          <ul class="form__controls">
            <li class="form__control">
              <label for="motivation">Motivational Statement:</label><br />
              <textarea
                id="motivation"
                name="motivation"
                rows="5"
                required
              ></textarea>
            </li>
          </ul>
        </fieldset>
      </section>

      <button type="submit" class="form__submit">Submit</button>
    </form>`;

      applicationModal.classList.add("show");
      window.scrollTo(0, 0);
      documentBody.classList.add("no-scroll");
    });

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
