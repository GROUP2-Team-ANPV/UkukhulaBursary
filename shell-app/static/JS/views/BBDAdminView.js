import AbstractViews from "./AbstractViews.js";
import getAllStudents from "../helpers/get_all_students.js";
import getBBDFunds from "../helpers/get_bbd_funds.js";
import getAllUniversities from "../helpers/get_all_universities.js";
import renderUniversities from "../helpers/render_universities.js";

export default class extends AbstractViews {
  constructor() {
    super();
    this.setTitle("University DashBoard");
    this.setCSS("/static/CSS/AdminDashboard.css");
  }

  async getHtml() {
    const html = await fetch("/static/HTML/BBDDashboard.html").then((data) =>
      data.text()
    );
    return html;
  }
  async getJS() {
    const allocationYear = document.getElementById("year");
    const usedAmount = document.querySelector(".used");
    const funds = document.querySelector(".funds__balance");
    const fundedUniversitiesCount = document.querySelector(".funded");
    const universitiesContainer = document.querySelector(".universities");
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

      let selectedYearData = getSelectedYearData(
        allocationYear.value,
        allocations
      );

      usedAmount.textContent = formatMoney(selectedYearData.amountUsed);
      displayFunds(selectedYearData);

      allocationYear.addEventListener("change", (event) => {
        selectedYearData = getSelectedYearData(event.target.value, allocations);

        usedAmount.textContent = formatMoney(selectedYearData.amountUsed);
        displayFunds(selectedYearData);
      });

      universitiesContainer.append(...renderUniversities(universities));
      renderStudents(students);
    });

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

        listItem.append(studentName, university);

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

    async function rejectStudent(
      applicationId,
      comment = "There is no space "
    ) {
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
  }
}
