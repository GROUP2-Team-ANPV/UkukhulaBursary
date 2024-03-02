function renderUniversities(allUniversities) {
  const universitiesList = allUniversities.map((university) => {
    const listItem = document.createElement("li");
    listItem.classList.add("university");

    const universityName = document.createElement("h3");
    universityName.classList.add("university__name");
    universityName.textContent = university.universityName;

    const contactPerson = document.createElement("p");
    contactPerson.classList.add("university__contact");
    contactPerson.textContent = university.contactPerson;

    const email = document.createElement("a");
    email.classList.add("university__email");
    email.href = `mailto:${university.email}`;
    email.textContent = university.email;

    listItem.append(universityName, contactPerson, email);

    return listItem;
  });

  return universitiesList;
}

export default renderUniversities;
