import { getUniversityData } from "../api/GetUniversityData.js";
import populateRepresentativesTable from "../helpers/PopulateRepresentativesTable.js";
import AbstractViews from "./AbstractViews.js";

export default class extends AbstractViews {
  constructor() {
    super();
    this.setTitle("Representatives");
    this.setCSS("/static/CSS/Universities.css");
    this.setPageHeading("Represetatives");
  }

  async getHtml() {
    const html = await fetch("/static/HTML/Representatives.html").then((data) =>
      data.text()
    );
    return html;
  }
  async getJS() {
    const representativesTableBody = document.querySelector(".table tbody");
    const universityID = sessionStorage.getItem("universityID");

    getUniversityData(universityID).then(({ data }) => {
      console.log(representativesTableBody);
      representativesTableBody.append(
        ...populateRepresentativesTable(data.headOfDepartment)
      );
    });
  }
}
