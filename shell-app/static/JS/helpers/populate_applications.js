async function populateTableWithApplication(applications) {
    const tableBody = document.querySelector(".table");

    applications.forEach((application) => {
        const newRow = tableBody.insertRow();
        const cells = [
            application.firstName,
            application.lastName,
            application.university,
            application.amount,
            application.status
        ];

        cells.forEach((cellData) => {
            const cell = newRow.insertCell();
            cell.textContent = cellData;
        });
    });
}

export default populateTableWithApplication;
