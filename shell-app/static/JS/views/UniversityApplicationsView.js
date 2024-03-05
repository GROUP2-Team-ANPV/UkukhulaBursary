import { StudentapplicationScript } from "../StudentApplication.js";
import { getUniversityData } from "../api/GetUniversityData.js";
import populateDepartmentSelect from "../helpers/populate_department_select.js";
import populateEthnicitySelect from "../helpers/populate_ethnicity_select.js";
import populateStudentsTable from "../helpers/populateStudentsTable.js";
import populateUniversitySelect from "../helpers/populate_university_select.js";
import AbstractViews from "./AbstractViews.js";
import populateStudentModal from "../helpers/populate_student_info.js";

export default class extends AbstractViews {
  constructor() {
    super();
    this.setTitle("StudentApplication");
    this.setCSS("/static/CSS/Universities.css");
    this.setPageHeading("Applications");
  }

  async getHtml() {
    const html = await fetch("/static/HTML/StudentsApplications.html").then(
      (data) => data.text()
    );
    return html;
  }
  async getJS() {
    const newSpplication = document.getElementById("new-application");
    const universitySelect = document.getElementById("university");
    const raceSelect = document.getElementById("race");
    const departmentSelect = document.getElementById("department");
    const universityStudents = document.querySelector(".students");
    const studentNameContainer = document.querySelector(".name");
    const universityID = sessionStorage.getItem("universityID");
    const applicationModal = document.querySelector(".application-modal");
    const studentInfoContainer = document.querySelector(".student__info");
    const studentInfoModal = document.querySelector(".student__info-modal");
    const documentBody = document.querySelector("body");
    const closeInfoModal = document.querySelectorAll(".close-button");

    getUniversityData(universityID).then(
      ({ data, universities, departments, race }) => {
        const allUniversities = universities
          .filter((university) => university.id === parseInt(universityID))
          .map(({ id, universityName }) => {
            return { id, universityName };
          });

        const allDepartments = departments.map(({ id, name }) => {
          return { id, name };
        });

        const ethnicity = race.map(({ id, name }) => {
          return { id, name };
        });

        newSpplication.addEventListener("click", () => {
          applicationModal.classList.add("show");
          window.scrollTo(0, 0);
          documentBody.classList.add("no-scroll");
        });

        universitySelect.append(...populateUniversitySelect(allUniversities));

        departmentSelect.append(...populateDepartmentSelect(allDepartments));

        raceSelect.append(...populateEthnicitySelect(ethnicity));

        universityStudents.append(
          ...populateStudentsTable(
            data.students,
            studentInfoModal,
            applicationModal,
            studentInfoContainer,
            studentNameContainer,
            populateStudentModal,
            documentBody
          )
        );
        StudentapplicationScript();
      }
    );

    closeInfoModal.forEach((button) => {
      button.addEventListener("click", () => {
        if (applicationModal.classList.contains("show")) {
          applicationModal.classList.remove("show");
        } else {
          studentInfoModal.classList.remove("show");
        }

        documentBody.classList.remove("no-scroll");
      });
    });
  }
}
