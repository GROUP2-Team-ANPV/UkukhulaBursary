import getAllProvinces from "./get_provinces.js";
const provinceSelect = document.querySelector("#province");

getAllProvinces("http://localhost:5263/api/ConstantTables/GetProvinces").then(
  (provinces) => {
    for (const province of provinces) {
      const option = document.createElement("option");
      option.value = province.id;
      option.textContent = province.name;
      provinceSelect.appendChild(option);
    }
  }
);

const universityForm = document.querySelector(".university-form");

universityForm.addEventListener("submit", handleAddUniversity);

async function handleAddUniversity(event) {
  event.preventDefault();
  const universityData = {};
  const formData = new FormData(universityForm);

  for (const [key, value] of formData) {
    universityData[key] = value;
  }

  const response = await fetch(
    "http://localhost:5263/api/BBDAdmin/AddUniversity",
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(universityData),
    }
  );
}
