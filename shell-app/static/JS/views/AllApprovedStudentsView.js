import AbstractViews from "./AbstractViews.js";

export default class extends AbstractViews {
  constructor() {
    super();
    this.setTitle("Funded Students");
    this.setPageHeading("Students");
    this.setCSS("/static/CSS/Universities.css");
  }

  async getHtml() {
    const html = await fetch("/static/HTML/AllApprovedStudents.html").then(
      (data) => data.text()
    );
    return html;
  }

  async getJS() {}
}
