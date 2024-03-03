import { StudentapplicationScript } from "../StudentApplication.js";
import getApplicationConstants from "../api/GetApplicationConstants.js";
import { getUniversityData } from "../api/GetUniversityData.js";
import populateDepartmentSelect from "../helpers/populate_department_select.js";
import populateEthnicitySelect from "../helpers/populate_ethnicity_select.js";
import populateGenderSelect from "../helpers/populate_gender_select.js";
import populateStudentsTable from "../helpers/populate_students_table.js";
import populateUniversitySelect from "../helpers/populate_university_select.js";
import AbstractViews from "./AbstractViews.js";

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

    getUniversityData(universityID).then(
      ({ data, universities, departments, gender, race }) => {
        console.log(data);
        studentsTable.append(...populateStudentsTable(data.students));

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

        universitySelect.append(...populateUniversitySelect(allUniversities));

        departmentSelect.append(...populateDepartmentSelect(allDepartments));

        genderSelect.append(...populateGenderSelect(genders));

        raceSelect.append(...populateEthnicitySelect(ethnicity));

        StudentapplicationScript();
      }
    );
  }
}