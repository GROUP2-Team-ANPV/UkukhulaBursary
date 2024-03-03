import { StudentapplicationScript } from "../StudentApplication.js";
import { getUniversityData } from "../api/GetUniversityData.js";
import populateDepartmentSelect from "../helpers/populate_department_select.js";
import populateEthnicitySelect from "../helpers/populate_ethnicity_select.js";
import populateGenderSelect from "../helpers/populate_gender_select.js";
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
    const universitySelect = document.getElementById("university");
    const genderSelect = document.getElementById("gender");
    const raceSelect = document.getElementById("race");
    const departmentSelect = document.getElementById("department");
    const studentsTable = document.querySelector("table");
    const universityID = sessionStorage.getItem("universityID");
    const modalWrapper = document.querySelector(".modal-wrapper");
    const applicationModal = document.querySelector(".application-modal");
    const documentBody = document.querySelector("body");
    const closeApplicationModal = document.querySelector(".close-button");
    const studentNameContainer = document.querySelector(".name");

    getUniversityData(universityID).then(
      ({ data, universities, departments, gender, race }) => {
        studentsTable.append(
          ...populateStudentsTable(
            data.students,
            modalWrapper,
            applicationModal,
            documentBody,
            populateStudentModal,
            studentNameContainer
          )
        );

        const allUniversities = universities.map(({ id, universityName }) => {
          return { id, universityName };
        });

        const allDepartments = departments.map(({ id, name }) => {
          return { id, name };
        });

        const genders = gender.map(({ id, name }) => {
          return { id, name };
        });

        const ethnicity = race.map(({ id, name }) => {
          return { id, name };
        });

        // universitySelect.append(...populateUniversitySelect(allUniversities));

        // departmentSelect.append(...populateDepartmentSelect(allDepartments));

        // genderSelect.append(...populateGenderSelect(genders));

        // raceSelect.append(...populateEthnicitySelect(ethnicity));

        // StudentapplicationScript();
      }
    );

    closeApplicationModal.addEventListener("click", () => {
      applicationModal.classList.remove("show");
      documentBody.classList.remove("no-scroll");
    });
  }
}
