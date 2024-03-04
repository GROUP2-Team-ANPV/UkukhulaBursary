function renderStudents(
  allStudents,
  studentInfoModal,
  studentNameContainer,
  documentBody,
  populateStudentModal,
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

    const application = document.createElement("p");
    application.classList.add("view__application");
    application.textContent = "Application";
    const seeApplication = document.createElement("i");
    seeApplication.classList.add("bx", "bx-right-top-arrow-circle", "bx-sm");
    application.append(seeApplication);

    listItem.append(studentName, university, application);

    application.addEventListener("click", async () => {
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
