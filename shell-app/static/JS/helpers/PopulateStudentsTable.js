import populateStudentModal from "./populate_student_info.js";

function populateStudentsTable(
  allStudents,
  studentInfoModal,
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

    const university = document.createElement("p");
    university.classList.add("student__university");
    university.textContent = student.university;

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

    listItem.append(studentName, university, status, actions);

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
