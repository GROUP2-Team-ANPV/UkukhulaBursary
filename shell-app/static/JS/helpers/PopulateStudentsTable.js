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

    listItem.append(studentName, university, status, viewApplication);

    viewApplication.addEventListener("click", async () => {
      studentInfoModal.style.transitionDelay = "0s";

      studentInfoContainer.textContent = "";
      studentNameContainer.textContent = `${student.firstName} ${student.lastName}`;
      studentInfoContainer.append(...(await populateStudentModal(student)));

      studentInfoModal.classList.add("show");
      window.scrollTo(0, 0);
      documentBody.classList.add("no-scroll");
    });

    return listItem;
  });

  return studentsList;
}

export default populateStudentsTable;
