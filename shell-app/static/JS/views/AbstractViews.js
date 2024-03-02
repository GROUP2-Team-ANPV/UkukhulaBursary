export default class {
  constructor() {}

  setTitle(title) {
    document.title = title;
  }

  setPageHeading(heading) {
    document.querySelector("#page-heading").innerHTML = heading;
  }

  setCSS(href) {
    document.querySelector("#content-css").setAttribute("href", href);
  }

  async getHtml() {
    return "";
  }
  async getJS() {}
}
