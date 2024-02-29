const allocationYear = document.getElementById("year");
let allocations = null;

async function getBBDAllocationsData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

allocationYear.addEventListener("change", () => {
  const getDisplayData = allocations.find(
    (allocation) => allocation.year == allocationYear.value
  );

  displayFunds(getDisplayData);
});

getBBDAllocationsData("http://localhost:5263/api/BBDAdmin/GetAllBBDFunds").then(
  (data) => {
    allocations = data;
    populateAllocationsSelect(data.sort((a, b) => b.year - a.year));

    const latestYearData = data.find(
      (allocation) => allocation.year == allocationYear.value
    );

    displayFunds(latestYearData);
  }
);

function populateAllocationsSelect(data) {
  data.forEach((allocation) => {
    const option = document.createElement("option");
    option.value = allocation.year;
    option.textContent = allocation.year;
    allocationYear.appendChild(option);
  });
}

const funds = document.querySelector(".funds__balance");

function displayFunds(data) {
  funds.textContent = formatMoney(data.budget);
}

function formatMoney(amount) {
  return amount.toLocaleString("en-ZA", {
    style: "currency",
    currency: "ZAR",
  });
}
