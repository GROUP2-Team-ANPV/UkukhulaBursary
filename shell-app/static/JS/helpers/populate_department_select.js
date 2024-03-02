function populateDepartmentSelect(departments) {
  return departments.map((department) => {
    const option = document.createElement("option");
    option.value = department.id;
    option.textContent = department.name;
    return option;
  });
}

export default populateDepartmentSelect;
