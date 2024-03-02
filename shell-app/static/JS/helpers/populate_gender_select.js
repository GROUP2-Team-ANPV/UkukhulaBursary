function populateGenderSelect(allGenders) {
  return allGenders.map((gender) => {
    const option = document.createElement("option");
    option.value = gender.id;
    option.textContent = gender.name;
    return option;
  });
}

export default populateGenderSelect;
