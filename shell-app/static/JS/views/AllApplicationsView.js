import { getfundrequests } from "../api/GetStudfundrequests.js";
import populateTableWithAppilcation from "../helpers/populate_applications.js";
import AbstractViews from "./AbstractViews.js";

export default class extends AbstractViews {
  constructor() {
    super();
    this.setTitle("Applications");
    this.setCSS("/static/CSS/Universities.css");
    this.setPageHeading("Applications");
  }

  async getHtml() {
    const html = await fetch("/static/HTML/AllApplications.html").then((data) =>
      data.text()
    );
    return html;
  }
  async getJS() {
    console.log("loaded");
    const applications = await getfundrequests();
    await populateTableWithAppilcation(applications);
  }
}
