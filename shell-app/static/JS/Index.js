import LoginView from "./views/LoginView.js";
import UniversityApplicationView from "./views/UniversityApplicationView.js";
import StudentApplicationView from "./views/StudentApplicationView.js";
import AdminDashboardView from "./views/AdminDashboardView.js";

const navigateTo = (url) => {
  history.replaceState(null, null, url);
  router();
};

const router = async () => {
  const routes = [
    { path: "/universityappliction", view: UniversityApplicationView },
    {path : "/studentapplication", view: StudentApplicationView},
     {path: "/login", view:LoginView},
     {path : "/dashboard", view: AdminDashboardView}
    // {path: "/settings", view:(() => console.log("Viewing Settings"))}
  ];

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
  document.querySelector("#content").innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);
document.addEventListener("DOMContentLoaded", () => {
  
  document.body.addEventListener("click", (e) => {
    const targetLink = e.target.closest("[data-link]");

    if (targetLink) {
      e.preventDefault();
      navigateTo(targetLink.href);
    }
  });
  router();
});

const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

allSideMenu.forEach((item) => {
  const li = item.parentElement;

  item.addEventListener("click", function () {
    allSideMenu.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

const menuBar = document.querySelector("#header nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function () {
  sidebar.classList.toggle("hide");
});

const searchButton = document.querySelector(
  "#header nav form .form-input button"
);
const searchButtonIcon = document.querySelector(
  "#header nav form .form-input button .bx"
);
const searchForm = document.querySelector("#header nav form");

searchButton.addEventListener("click", function (e) {
  if (window.innerWidth < 576) {
    e.preventDefault();
    searchForm.classList.toggle("show");
    if (searchForm.classList.contains("show")) {
      searchButtonIcon.classList.replace("bx-search", "bx-x");
    } else {
      searchButtonIcon.classList.replace("bx-x", "bx-search");
    }
  }
});

if (window.innerWidth < 768) {
  sidebar.classList.add("hide");
} else if (window.innerWidth > 576) {
  searchButtonIcon.classList.replace("bx-x", "bx-search");
  searchForm.classList.remove("show");
}

window.addEventListener("resize", function () {
  if (this.innerWidth > 576) {
    searchButtonIcon.classList.replace("bx-x", "bx-search");
    searchForm.classList.remove("show");
  }
});
