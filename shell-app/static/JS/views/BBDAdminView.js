import AbstractViews from "./AbstractViews.js";
import renderUniversities from "../helpers/render_universities.js";
import renderStudents from "../helpers/render_students.js";
import getBBDAllocationsData from "../api/GetBBDAllocationData.js";

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
    const studentsContainer = document.querySelector(".students");

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
      studentsContainer.append(...renderStudents(students));
    });

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
