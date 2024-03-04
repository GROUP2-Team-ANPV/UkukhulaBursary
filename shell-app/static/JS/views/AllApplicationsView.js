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
  async getJS() {}
}
