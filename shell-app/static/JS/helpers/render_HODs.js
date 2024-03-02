function renderHODs(universityHODs) {
  const HODsList = [];

  universityHODs.forEach((hod) => {
    const hodItem = document.createElement("li");
    hodItem.classList.add("hod");
    const hodName = document.createElement("h3");
    hodName.classList.add("hod__name");
    const hodEmail = document.createElement("p");
    hodEmail.classList.add("email");
    const email = document.createElement("a");
    email.href = `mailto:${hod.email}`;
    email.textContent = hod.email;

    hodName.textContent = `${hod.firstName} ${hod.lastName}`;
    hodEmail.textContent = hod.email;
    hodItem.appendChild(hodName);
    hodItem.appendChild(hodEmail);
    hodItem.appendChild(email);
    HODsList.push(hodItem);
  });

  return HODsList;
}

export default renderHODs;