import StudentApplicationView from "./views/StudentApplicationView.js";
import UniversityDashboardView from "./views/UniversityDashboardView.js";
import BBDAdminView from "./views/BBDAdminView.js";
import { parseJwt } from "./JwtDecoder.js";
import UniversitiesView from "./views/UniversitiesView.js";

let userRole = parseJwt(sessionStorage.getItem("token"));
let routes = [];

const navigateTo = (url) => {
  history.replaceState(null, null, url);
  router();
};

const router = async () => {
  if (userRole == "BBD Admin") {
    routes = [
      { path: "/admin", view: BBDAdminView },
      { path: "/universities", view: UniversitiesView },
    ];
  } else if (userRole == "University Admin") {
    routes = [
      { path: "/", view: UniversityDashboardView },
      { path: "/studentapplication", view: StudentApplicationView },
    ];
  }
  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  if (!match) {
    match = {
      route: routes[0],
      isMatch: true,
    };
  }
  const view = new match.route.view();
  const allSideMenu = document.querySelectorAll("#sidebar  li a");

  allSideMenu.forEach((item) => {
    const li = item.parentElement;
    const url = window.location.href.toString();
    const aurl = item.getAttribute("href").toString();

    if (url.includes(aurl) && aurl.includes(url.slice(url.length - 1))) {
      li.classList.add("active");
      item.firstChild;
    } else {
      li.classList.remove("active");
    }
  });

  document.querySelector("#content").innerHTML = await view.getHtml();
  await view.getJS();
};

if (sessionStorage.getItem("token") == null) {
  window.location.href = "/login";
}

window.addEventListener("popstate", router);
document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logout");

  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    sessionStorage.clear();
    window.location.href = "/login";
  });
  document.body.addEventListener("click", (e) => {
    const targetLink = e.target.closest("[data-link]");

    if (targetLink) {
      e.preventDefault();

      navigateTo(targetLink.href);
    }
  });
  router();
});

const menuBar = document.querySelector("#header nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function () {
  sidebar.classList.toggle("hide");
});

const head = document.querySelector("head");

const cssLink = document.createElement("link");
cssLink.setAttribute("id", "content-css");
cssLink.setAttribute("rel", "stylesheet");
head.appendChild(cssLink);
