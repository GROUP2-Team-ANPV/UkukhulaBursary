import { StudentapplicationScript } from "../StudentApplication.js";
import getApplicationConstants from "../api/GetApplicationConstants.js";
import populateDepartmentSelect from "../helpers/populate_department_select.js";
import populateEthnicitySelect from "../helpers/populate_ethnicity_select.js";
import populateGenderSelect from "../helpers/populate_gender_select.js";
import populateUniversitySelect from "../helpers/populate_university_select.js";
import AbstractViews from "./AbstractViews.js";

export default class extends AbstractViews {
  constructor() {
    super();
    this.setTitle("StudentApplication");
  }

  async getHtml() {
    const html = await fetch("/static/HTML/StudentApplication.html").then(
      (data) => data.text()
    );
    return html;
  }
  async getJS() {
    const university = document.getElementById("university");
    const genderSelect = document.getElementById("gender");
    const race = document.getElementById("race");
    const department = document.getElementById("department");

    getApplicationConstants().then((data) => {
      const universities = data.universities.map(({ id, universityName }) => {
        return { id, universityName };
      });

      const departments = data.departments.map(({ id, name }) => {
        return { id, name };
      });

      const gender = data.gender.map(({ id, name }) => {
        return { id, name };
      });

      const ethnicity = data.race.map(({ id, name }) => {
        return { id, name };
      });

      university.append(...populateUniversitySelect(universities));

      department.append(...populateDepartmentSelect(departments));

      genderSelect.append(...populateGenderSelect(gender));

      race.append(...populateEthnicitySelect(ethnicity));

      StudentapplicationScript();
    });
  }
}
