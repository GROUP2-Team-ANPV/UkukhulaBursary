async function populateTableWithUniversities(universities) {
  const tableBody = document.querySelector(".table");

  universities.forEach((university) => {
    const newRow = tableBody.insertRow(tableBody.rows.length);
    const values = Object.values(university);

    for (let i = 1; i < values.length - 2; i++) {
      const cell = newRow.insertCell();
      cell.innerHTML = values[i];
    }
  });
}

export default populateTableWithUniversities;
