import populateStudentModal from "./populate_student_info.js";

function renderStudents(
  allStudents,
  studentInfoModal,
  studentNameContainer,
  documentBody,
  studentInfoContainer
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

    const applicationStatus = document.createElement("p");
    applicationStatus.classList.add(
      "student__status",
      student.status.toLowerCase()
    );
    applicationStatus.textContent = student.status;

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

    listItem.append(
      studentName,
      university,
      applicationStatus,
      viewApplication
    );

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

export default renderStudents;
