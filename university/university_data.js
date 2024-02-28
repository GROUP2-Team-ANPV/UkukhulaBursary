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
const hods = document.querySelector(".hods");
const fundsBalance = document.querySelector(".funds__balance");
const usedFunds = document.querySelector(".used");

getUniversityData(1).then((data) => {
  renderStudents(data.students);
  fundedStudents.textContent = getFundedStudents(data.students);
  renderHODs(data.headOfDepartment);

  // year to be replaced with current year
  const funds = data.fundAllocation.filter((funds) => funds.year === 2023)[0];
  renderFundsBalance(funds ? funds.balance : 0);

  renderUsedFunds(
    data.students.reduce((acc, student) => {
      if (student.applicationStatus === "Approved") {
        return acc + student.amount;
      } else {
        return acc;
      }
    }, 0)
  );
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

function renderHODs(universityHODs) {
  universityHODs.forEach((hod) => {
    const hodItem = document.createElement("li");
    hodItem.classList.add("hod");
    const hodName = document.createElement("h3");
    hodName.classList.add("hod__name");
    const hodEmail = document.createElement("p");
    hodEmail.classList.add("email");
    const email = document.createElement("a");
    email.href = `mailto:${hod.email}`;
    email.textContent = hod.email;

    hodName.textContent = `${hod.firstName} ${hod.lastName}`;
    hodEmail.textContent = hod.email;
    hodItem.appendChild(hodName);
    hodItem.appendChild(hodEmail);
    hodItem.appendChild(email);
    hods.appendChild(hodItem);
  });
}

function renderFundsBalance(funds) {
  fundsBalance.textContent = formatMoney(funds);
}

function renderUsedFunds(funds) {
  usedFunds.textContent = formatMoney(funds);
}

function formatMoney(amount) {
  return amount.toLocaleString("en-ZA", {
    style: "currency",
    currency: "ZAR",
  });
}
