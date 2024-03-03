function populateStatusSelect(statuses) {
  return statuses.map((status) => {
    const option = document.createElement("option");
    option.value = status.id;
    option.textContent = status.name;
    return option;
  });
}

export default populateStatusSelect;
