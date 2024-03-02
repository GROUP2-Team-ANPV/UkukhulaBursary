import AbstractViews from "./AbstractViews.js";
import { getUniversityData } from "../api/GetUniversityData.js";
import populateStudentModal from "../helpers/populate_student_info.js";
import formatMoney from "../helpers/format_money.js";
import renderHODs from "../helpers/render_HODs.js";

export default class extends AbstractViews {
  constructor() {
    super();
    this.setTitle("University DashBoard");
    this.setCSS("/static/CSS/AdminDashboard.css");
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

    getUniversityData(1).then((data) => {
      renderStudents(data.students, studentInfoContainer);
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

    const documentBody = document.querySelector("body");
    const studentInfoModal = document.querySelector(".student__info-modal");
    const closeStudentInfoModal = document.querySelector(".close-button");

    closeStudentInfoModal.addEventListener("click", () => {
      studentInfoModal.style.transitionDelay = "1s";
      studentInfoModal.classList.remove("show");
      documentBody.classList.remove("no-scroll");
    });

    function renderStudents(students, studentInfoContainer) {
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
        bursaryAmount.textContent = formatMoney(student.amount);

        studentItem.appendChild(studentName);
        studentItem.appendChild(applicationStatus);
        studentItem.appendChild(bursaryAmount);
        universityStudents.appendChild(studentItem);

        studentItem.addEventListener("click", () => {
          studentInfoModal.style.transitionDelay = "0s";

          studentInfoContainer.textContent = "";
          studentNameContainer.textContent = `${student.firstName} ${student.lastName}`;
          studentInfoContainer.append(...populateStudentModal(student));

          studentInfoModal.classList.add("show");
          window.scrollTo(0, 0);
          documentBody.classList.add("no-scroll");
        });
      });
    }

    function renderFundsBalance(funds) {
      fundsBalance.textContent = formatMoney(funds);
    }

    function renderUsedFunds(funds) {
      usedFunds.textContent = formatMoney(funds);
    }
  }
}
