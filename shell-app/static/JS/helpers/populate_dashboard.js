function populateDashboard(role) {
  const menuItems = [];
  if (role == "BBD Admin") {
    const universitiesItem = document.createElement("li");
    const universities = document.createElement("a");
    universities.href = "/universities";
    universities.setAttribute("data-link", "");
    const i = document.createElement("i");
    i.classList.add("bx", "bxs-school");
    const universitiesText = document.createElement("span");
    universitiesText.classList.add("text");
    universitiesText.textContent = "Universities";
    universities.append(i, universitiesText);
    universitiesItem.append(universities);
    menuItems.push(universitiesItem);
  } else if (role == "University Admin") {
    const hodItem = document.createElement("li");
    const hodAnchor = document.createElement("a");
    hodAnchor.href = "/representatives";
    hodAnchor.setAttribute("data-link", "");
    const i = document.createElement("i");
    i.classList.add("bx", "bxs-user-badge");
    const hodText = document.createElement("span");
    hodText.classList.add("text");
    hodText.textContent = "Representatives";
    hodAnchor.append(i, hodText);
    hodItem.append(hodAnchor);
    menuItems.push(hodItem);
  }
  return menuItems;
}

export default populateDashboard;
