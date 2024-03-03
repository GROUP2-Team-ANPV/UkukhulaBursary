import AbstractViews from "./AbstractViews.js";
import { getUniversityData } from "../api/GetUniversityData.js";
import populateStudentModal from "../helpers/populate_student_info.js";
import formatMoney from "../helpers/format_money.js";
import renderHODs from "../helpers/render_HODs.js";
import renderStudents from "../helpers/render_university_students.js";

export default class extends AbstractViews {
  constructor() {
    super();
    this.setTitle("University DashBoard");
    this.setPageHeading("Dashboard");
    this.setCSS("/static/CSS/AdminDashboard.css");
    this.setPageHeading("Dashboard");
  }

  async getHtml() {
    const html = await fetch("/static/HTML/UniversityDashboard.html").then(
      (data) => data.text()
    );
    return html;
  }

  async getJS() {
    const universityStudents = document.querySelector(".students");
    const fundedStudents = document.querySelector(".funded");
    const hods = document.querySelector(".hods");
    const fundsBalance = document.querySelector(".funds__balance");
    const usedFunds = document.querySelector(".used");
    const studentInfoContainer = document.querySelector(".student__info");
    const studentNameContainer = document.querySelector(".name");
    const documentBody = document.querySelector("body");
    const studentInfoModal = document.querySelector(".student__info-modal");
    const closeStudentInfoModal = document.querySelector(".close-button");
    const universityID = sessionStorage.getItem("universityID");

    getUniversityData(universityID).then(({ data }) => {
      universityStudents.append(
        ...renderStudents(
          data.students,
          studentInfoModal,
          studentInfoContainer,
          studentNameContainer,
          populateStudentModal,
          documentBody
        )
      );

      fundedStudents.textContent = getFundedStudents(data.students);
      hods.append(...renderHODs(data.headOfDepartment));

      // year to be replaced with current year
      const funds = data.fundAllocation.filter(
        (funds) => funds.year === 2023
      )[0];
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
      return students.filter(
        (student) => student.applicationStatus === "Approved"
      ).length;
    }

    closeStudentInfoModal.addEventListener("click", () => {
      studentInfoModal.style.transitionDelay = "1s";
      studentInfoModal.classList.remove("show");
      documentBody.classList.remove("no-scroll");
    });

    function renderFundsBalance(funds) {
      fundsBalance.textContent = formatMoney(funds);
    }

    function renderUsedFunds(funds) {
      usedFunds.textContent = formatMoney(funds);
    }
  }
}
