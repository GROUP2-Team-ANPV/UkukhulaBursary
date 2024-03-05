import formatMoney from "./format_money.js";

function populateStudentsTable(
  allStudents,
  studentInfoModal,
  applicationModal,
  studentInfoContainer,
  studentNameContainer,
  populateStudentModal,
  documentBody
) {
  const studentsList = allStudents.map((student) => {
    const listItem = document.createElement("li");
    listItem.classList.add("student");

    const studentName = document.createElement("h3");
    studentName.classList.add("student__name");
    studentName.textContent = `${student.firstName} ${student.lastName}`;

    const BursaryAmount = document.createElement("p");
    BursaryAmount.textContent = formatMoney(student.amount);

    const email = document.createElement("a");
    email.classList.add("student__email");
    email.textContent = student.email;
    email.href = `mailto:${student.email}`;

    const status = document.createElement("p");
    status.classList.add(
      "student__status",
      student.applicationStatus.toLowerCase()
    );
    status.textContent = student.applicationStatus;

    const actions = document.createElement("section");
    actions.classList.add("actions");

    const viewApplication = document.createElement("p");
    viewApplication.classList.add("view__application");
    viewApplication.textContent = "View";
    const viewApplicatonIcon = document.createElement("i");
    viewApplicatonIcon.classList.add(
      "bx",
      "bx-right-top-arrow-circle",
      "bx-sm"
    );
    viewApplication.append(viewApplicatonIcon);

    const edit = document.createElement("p");
    edit.classList.add("edit__application", "transparent");
    edit.textContent = "edit";
    const editApplication = document.createElement("i");
    editApplication.classList.add("bx", "bx-edit-alt", "bx-sm");
    edit.append(editApplication);

    actions.appendChild(viewApplication);
    actions.appendChild(edit);

    listItem.append(studentName, email, BursaryAmount, status, actions);

    viewApplication.addEventListener("click", async () => {
      studentInfoModal.style.transitionDelay = "0s";

      studentInfoContainer.textContent = "";
      studentNameContainer.textContent = `${student.firstName} ${student.lastName}`;
      studentInfoContainer.append(...(await populateStudentModal(student)));

      studentInfoModal.classList.add("show");
      window.scrollTo(0, 0);
      documentBody.classList.add("no-scroll");
    });

    edit.addEventListener("click", () => {
      applicationModal.style.transitionDelay = "0s";

      applicationModal.classList.add("show");
      window.scrollTo(0, 0);
      documentBody.classList.add("no-scroll");
    });

    return listItem;
  });

  return studentsList;
}

export default populateStudentsTable;
