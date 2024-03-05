import AbstractViews from "./AbstractViews.js";
import renderUniversities from "../helpers/render_universities.js";
import renderStudents from "../helpers/render_students.js";
import getBBDAllocationsData from "../api/GetBBDAllocationData.js";
import { allocateFunds } from "../api/Allocatefunds.js";

export default class extends AbstractViews {
  constructor() {
    super();
    this.setTitle("University DashBoard");
    this.setPageHeading("Dashboard");
    this.setCSS("/static/CSS/AdminDashboard.css");
    this.setPageHeading("Dashboard");
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
    const studentInfoContainer = document.querySelector(".student__info");
    const studentNameContainer = document.querySelector(".name");
    const documentBody = document.querySelector("body");
    const studentInfoModal = document.querySelector(".student__info-modal");
    const closeStudentInfoModal = document.querySelector(".close-button");
    const allocationbutton = documentBody.querySelector(".allocate-fund-button")

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

      usedAmount.textContent = formatMoney(selectedYearData.remainingBudget);
      displayFunds(selectedYearData);

      allocationYear.addEventListener("change", (event) => {
        selectedYearData = getSelectedYearData(event.target.value, allocations);

        usedAmount.textContent = formatMoney(selectedYearData.remainingBudget);
        displayFunds(selectedYearData);
      });

      universitiesContainer.append(...renderUniversities(universities));
      studentsContainer.append(
        ...renderStudents(
          students,
          studentInfoModal,
          studentNameContainer,
          documentBody,
          studentInfoContainer
        )
      );
    });

    closeStudentInfoModal.addEventListener("click", () => {
      studentInfoModal.style.transitionDelay = "1s";
      studentInfoModal.classList.remove("show");
      documentBody.classList.remove("no-scroll");
    });

    allocationbutton.addEventListener("click", async () => {
      await allocateFunds();
    
  });
  }
}
