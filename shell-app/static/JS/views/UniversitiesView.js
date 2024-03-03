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
    const newHod = document.getElementById("new-hod")
    const documentBody = document.querySelector("body");
    const ApplicationModal = document.querySelector(".application-modal");
    const HodModal = document.querySelector(".hod-modal")
    const closeInfoModal = document.querySelectorAll(".close-button");
    const universities = await getAllUniversities();
    await populateTableWithUniversities(universities);
    newUniversity.addEventListener("click", () => {
      ApplicationModal.classList.add("show");
      window.scrollTo(0, 0);
      documentBody.classList.add("no-scroll");
    });

    closeInfoModal.forEach(button => {
      button.addEventListener("click", () => {
        if (ApplicationModal.classList.contains("show")) {
          ApplicationModal.classList.remove("show");
        } else {
          HodModal.classList.remove("show");
        }
    
        documentBody.classList.remove("no-scroll");
      });
    });
    newHod.addEventListener("click", () => {
      HodModal.classList.add("show");
      window.scrollTo(0, 0);
      documentBody.classList.add("no-scroll");
    });


    UniversityApplicationScript();
  }
}
