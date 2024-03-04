import { HeadOfDeaprtmentApplicationScript } from "../HeadOfDepartment.js";
import { getAllUniversities } from "../api/GetUniversities.js";
import { getAllDepartments } from "../api/GetDepartments.js";
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
    const newHod = document.getElementById("new-hod");
    const documentBody = document.querySelector("body");
    const HodModal = document.querySelector(".hod-modal");
    const closeInfoModal = document.querySelector(".close-button");
    const representativesTableBody = document.querySelector(".table tbody");
    const universityID = sessionStorage.getItem("universityID");
    const departments = await getAllDepartments();
    const universities = await getAllUniversities();

    getUniversityData(universityID).then(({ data }) => {
      representativesTableBody.append(
        ...populateRepresentativesTable(data.headOfDepartment)
      );
    });

    newHod.addEventListener("click", () => {
      HodModal.classList.add("show");
      window.scrollTo(0, 0);
      documentBody.classList.add("no-scroll");
    });

    closeInfoModal.addEventListener("click", () => {
      if (HodModal.classList.contains("show")) {
        HodModal.classList.remove("show");
      }
      documentBody.classList.remove("no-scroll");
    });

    HeadOfDeaprtmentApplicationScript({ universities, departments });
  }
}
