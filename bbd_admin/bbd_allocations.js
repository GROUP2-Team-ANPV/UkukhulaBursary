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
    "http://localhost:5263/api/UniversityAdmin/GetAllStudents"
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

  usedAmount.textContent = formatMoney(
    selectedYearData.budget - selectedYearData.remainingBudget
  );
  displayFunds(selectedYearData);

  allocationYear.addEventListener("change", (event) => {
    selectedYearData = getSelectedYearData(event.target.value, allocations);

    usedAmount.textContent = formatMoney(
      selectedYearData.budget - selectedYearData.remainingBudget
    );
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

function renderStudents(allStudents) {
  const studentsList = allStudents.map((student) => {
    const listItem = document.createElement("li");
    listItem.classList.add("student");

    const studentName = document.createElement("h3");
    studentName.classList.add("student__name");
    studentName.textContent = `${student.firstName} ${student.lastName}`;

    const gender = document.createElement("p");
    gender.classList.add("student__gender");
    gender.textContent = student.gender;

    const race = document.createElement("p");
    race.classList.add("student__race");
    race.textContent = student.race;

    const university = document.createElement("p");
    university.classList.add("student__university");
    university.textContent = student.university;

    listItem.append(studentName, gender, race, university);

    return listItem;
  });

  students.append(...studentsList);
}
