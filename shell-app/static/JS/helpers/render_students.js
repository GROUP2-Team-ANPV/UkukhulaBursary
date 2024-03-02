function renderStudents(allStudents) {
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
    application.classList.add("student__application");
    application.textContent = "Application";
    const seeApplication = document.createElement("i");
    seeApplication.classList.add("bx", "bxs-right-top-arrow-circle", "bx-sm");
    application.append(seeApplication);
    // application.style.textDecoration = "underline";

    listItem.append(studentName, university, application);

    return listItem;
  });

  return studentsList;
}

export default renderStudents;
