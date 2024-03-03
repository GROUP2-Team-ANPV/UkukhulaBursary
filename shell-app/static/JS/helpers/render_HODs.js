function renderHODs(universityHODs) {
  const HODsList = [];

  universityHODs.forEach((hod) => {
    const hodItem = document.createElement("li");
    hodItem.classList.add("hod");
    const hodName = document.createElement("h3");
    hodName.classList.add("hod__name");
    const department = document.createElement("p");
    department.classList.add("department");
    const email = document.createElement("a");
    email.href = `mailto:${hod.email}`;

    hodName.textContent = `${hod.firstName} ${hod.lastName}`;
    department.textContent = hod.departmentName;
    email.textContent = hod.email;

    hodItem.appendChild(hodName);
    hodItem.appendChild(department);
    hodItem.appendChild(email);
    HODsList.push(hodItem);
  });

  return HODsList;
}

export default renderHODs;
