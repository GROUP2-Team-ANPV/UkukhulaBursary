async function getUniversityData(id) {
  const response = await fetch(
    `http://localhost:5263/api/UniversityAdmin/GetUniversityAndTheirStudents?universityID=${id}`,
    {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  return data;
}

const universityStudents = document.querySelector(".students");
const fundedStudents = document.querySelector(".funded");

getUniversityData(1).then((data) => {
  renderStudents(data.students);
  fundedStudents.textContent = getFundedStudents(data.students);
});

function getFundedStudents(students) {
  return students.filter((student) => student.applicationStatus === "Approved")
    .length;
}

function renderStudents(students) {
  students.forEach((student) => {
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
    bursaryAmount.textContent = `R${student.amount}`;
    studentItem.appendChild(studentName);
    studentItem.appendChild(applicationStatus);
    studentItem.appendChild(bursaryAmount);
    universityStudents.appendChild(studentItem);
  });
}
