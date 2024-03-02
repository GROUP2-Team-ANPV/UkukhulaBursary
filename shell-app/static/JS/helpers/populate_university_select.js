function populateUniversitySelect(universities) {
  return universities.map((university) => {
    const option = document.createElement("option");
    option.value = university.id;
    option.textContent = university.universityName;
    return option;
  });
}

export default populateUniversitySelect;
