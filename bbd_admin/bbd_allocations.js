import getBBDFunds from "../helpers/get_bbd_funds.js";

const allocationYear = document.getElementById("year");
const usedAmount = document.querySelector(".used");
const funds = document.querySelector(".funds__balance");

async function getBBDAllocationsData() {
  const allocations = await getBBDFunds(
    "http://localhost:5263/api/BBDAdmin/GetAllBBDFunds"
  );

  return { allocations };
}

function populateAllocationsSelect(data) {
  data.forEach((allocation) => {
    const option = document.createElement("option");
    option.value = allocation.year;
    option.textContent = allocation.year;
    allocationYear.appendChild(option);
  });
}

function displayFunds(data) {
  funds.textContent = formatMoney(data.budget);
}

function formatMoney(amount) {
  return amount.toLocaleString("en-ZA", {
    style: "currency",
    currency: "ZAR",
  });
}

function getSelectedYearData(year, allocations) {
  return allocations.find((allocation) => allocation.year == year);
}

getBBDAllocationsData().then(({ allocations }) => {
  populateAllocationsSelect(allocations.sort((a, b) => b.year - a.year));

  let selectedYearData = getSelectedYearData(allocationYear.value, allocations);

  usedAmount.textContent = formatMoney(
    selectedYearData.budget - selectedYearData.remainingBudget
  );
  displayFunds(selectedYearData);

  allocationYear.addEventListener("change", (event) => {
    selectedYearData = getSelectedYearData(event.target.value, allocations);

    usedAmount.textContent = formatMoney(
      selectedYearData.budget - selectedYearData.remainingBudget
    );
    displayFunds(selectedYearData);
  });
});
