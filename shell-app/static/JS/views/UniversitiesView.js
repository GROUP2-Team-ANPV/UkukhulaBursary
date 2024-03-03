import AbstractViews from "./AbstractViews.js";
import { UniversityApplicationScript } from "../UniversityApplication.js";
import populateTableWithUniversities from "../helpers/populate_universites_on_table.js";
import { getAllUniversities } from "../api/GetUniversities.js";


export default class extends AbstractViews {  constructor() {
    super();
    this.setTitle("Universities");
    this.setPageHeading("Universities");
    this.setCSS("/static/CSS/Universities.css");
    this.setPageHeading("Universities");
  }

  async getHtml() {
    const html = await fetch("/static/HTML/Universities.html").then((data) =>
      data.text()
    );
    return html;
  }

  async getJS() {
    const newUniversity = document.getElementById("new-university");
    const documentBody = document.querySelector("body");
    const ApplicationModal = document.querySelector(".application-modal");
    const closeInfoModal = document.querySelector(".close-button");
    const universities = await getAllUniversities();
    await populateTableWithUniversities(universities);
    newUniversity.addEventListener("click", () => {
      ApplicationModal.classList.add("show");
      window.scrollTo(0, 0);
      documentBody.classList.add("no-scroll");
    });

    closeInfoModal.addEventListener("click", () => {
      ApplicationModal.classList.remove("show");
      documentBody.classList.remove("no-scroll");
    });

    UniversityApplicationScript();
  }
}
