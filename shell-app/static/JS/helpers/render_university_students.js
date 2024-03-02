import formatMoney from "./format_money.js";

function renderStudents(
  students,
  studentInfoModal,
  studentInfoContainer,
  studentNameContainer,
  populateStudentModal,
  documentBody
) {
  const studentsList = students.map((student) => {
    const studentItem = document.createElement("li");
    studentItem.classList.add("student");
    const studentName = document.createElement("h3");
    studentName.classList.add("student__name");
    const applicationStatus = document.createElement("p");
    applicationStatus.classList.add(
      "student__status",
      student.applicationStatus.toLowerCase()
    );

    const bursaryAmount = document.createElement("p");
    bursaryAmount.classList.add("student__amount");

    studentName.textContent = `${student.firstName} ${student.lastName}`;
    applicationStatus.textContent = student.applicationStatus;
    bursaryAmount.textContent = formatMoney(student.amount);

    studentItem.appendChild(studentName);
    studentItem.appendChild(applicationStatus);
    studentItem.appendChild(bursaryAmount);

    studentItem.addEventListener("click", () => {
      studentInfoModal.style.transitionDelay = "0s";

      studentInfoContainer.textContent = "";
      studentNameContainer.textContent = `${student.firstName} ${student.lastName}`;
      studentInfoContainer.append(...populateStudentModal(student));

      studentInfoModal.classList.add("show");
      window.scrollTo(0, 0);
      documentBody.classList.add("no-scroll");
    });

    return studentItem;
  });

  return studentsList;
}

export default renderStudents;
