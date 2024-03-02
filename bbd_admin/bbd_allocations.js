import getAllStudents from "../helpers/get_all_students.js";
import getBBDFunds from "../helpers/get_bbd_funds.js";
import getAllUniversities from "../helpers/get_universities.js";

const allocationYear = document.getElementById("year");
const usedAmount = document.querySelector(".used");
const funds = document.querySelector(".funds__balance");
const fundedUniversitiesCount = document.querySelector(".funded");
const universities = document.querySelector(".universities");
const students = document.querySelector(".students");

async function getBBDAllocationsData() {
  const allocations = await getBBDFunds(
    "http://localhost:5263/api/BBDAdmin/GetAllBBDFunds"
  );

  const universities = await getAllUniversities(
    "http://localhost:5263/api/BBDAdmin/GetAllUniversities"
  );

  const students = await getAllStudents(
    "http://localhost:5263/api/UniversityAdmin/GetAllFundRequests"
  );

  return { allocations, universities, students };
}

function populateAllocationsSelect(data) {
  data.forEach((allocation) => {
    const option = document.createElement("option");
    option.value = allocation.year;
    option.textContent = allocation.year;
    allocationYear.appendChild(option);
  });
}

function displayFunds(data) {
  funds.textContent = formatMoney(data.budget);
  fundedUniversitiesCount.textContent = data.fundedUniversities;
}

function formatMoney(amount) {
  return amount.toLocaleString("en-ZA", {
    style: "currency",
    currency: "ZAR",
  });
}

function getSelectedYearData(year, allocations) {
  return allocations.find((allocation) => allocation.year == year);
}

getBBDAllocationsData().then(({ allocations, universities, students }) => {
  populateAllocationsSelect(allocations.sort((a, b) => b.year - a.year));

  let selectedYearData = getSelectedYearData(allocationYear.value, allocations);

  usedAmount.textContent = formatMoney(selectedYearData.amountUsed);
  displayFunds(selectedYearData);

  allocationYear.addEventListener("change", (event) => {
    selectedYearData = getSelectedYearData(event.target.value, allocations);

    usedAmount.textContent = formatMoney(selectedYearData.amountUsed);
    displayFunds(selectedYearData);
  });

  renderUniversities(universities);
  renderStudents(students);
});

function renderUniversities(allUniversities) {
  const universitiesList = allUniversities.map((university) => {
    const listItem = document.createElement("li");
    listItem.classList.add("university");

    const universityName = document.createElement("h3");
    universityName.classList.add("university__name");
    universityName.textContent = university.universityName;

    const contactPerson = document.createElement("p");
    contactPerson.classList.add("university__contact");
    contactPerson.textContent = university.contactPerson;

    const email = document.createElement("a");
    email.classList.add("university__email");
    email.href = `mailto:${university.email}`;
    email.textContent = university.email;

    listItem.append(universityName, contactPerson, email);

    return listItem;
  });

  universities.append(...universitiesList);
}

function showStudentInfo(student) {
  const popup = document.createElement("div");
  popup.classList.add("popup");

  const studentName = document.createElement("h3");
  studentName.classList.add("student__name");
  studentName.textContent = `${student.firstName} ${student.lastName}`;

  const email = document.createElement("p");
  email.textContent = `Email: ${student.email}`;

  const phoneNumber = document.createElement("p");
  phoneNumber.textContent = `Phone Number: ${student.phoneNumber}`;

  const gender = document.createElement("p");
  gender.classList.add("student__gender");
  gender.textContent = student.gender;

  const race = document.createElement("p");
  race.classList.add("student__race");
  race.textContent = student.race;

  popup.append(studentName, email, phoneNumber, gender, race);

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.addEventListener("click", () => {
    popup.remove();
  });

  popup.appendChild(closeButton);

  document.body.appendChild(popup);
}

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

    const statusSelect = document.createElement("select");
    statusSelect.classList.add("student__status");

    const applicationId = `${student.fundRequestID}`;

    const options = ["approve", "reject", "pending"];
    options.forEach((optionValue) => {
      const option = document.createElement("option");
      option.value = optionValue;
      option.textContent = optionValue;
      statusSelect.appendChild(option);
    });

    statusSelect.value = student.status;

    statusSelect.addEventListener("change", async (event) => {
      const newStatus = event.target.value;
      try {
        if (newStatus === "approve") {
          await approveStudent(applicationId);
        } else if (newStatus === "reject") {
          await rejectStudent(applicationId);
        }

        student.status = newStatus;
      } catch (error) {
        console.error(error.message);
        statusSelect.value = student.status;
      }
    });

    listItem.append(studentName, university, statusSelect);

    studentName.addEventListener("click", () => {
      showStudentInfo(student);
    });

    return listItem;
  });

  students.append(...studentsList);
}

async function approveStudent(applicationId) {
  const apiUrl = `http://localhost:5263/api/BBDAdmin/${applicationId}/approve`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to approve student");
  }

  return response.json();
}

async function rejectStudent(applicationId, comment = "There is no space ") {
  const apiUrl = `http://localhost:5263/api/BBDAdmin/${applicationId}/reject?comment=${comment}`;
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to reject student");
  }

  return response.json();
}
