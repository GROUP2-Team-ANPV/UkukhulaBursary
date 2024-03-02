function populateEthnicitySelect(ethnicity) {
  return ethnicity.map((ethnic) => {
    const option = document.createElement("option");
    option.value = ethnic.id;
    option.textContent = ethnic.name;
    return option;
  });
}

export default populateEthnicitySelect;
