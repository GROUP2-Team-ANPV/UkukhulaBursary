import getAllDepartments from "../helpers/get_departments.js";
import getAllProvinces from "../helpers/get_provinces.js";

const provinceSelect = document.querySelector("#province");
const departmentSelect = document.querySelector("#department");

async function getDataForSelect() {
  const provinces = await getAllProvinces(
    "http://localhost:5263/api/ConstantTables/GetProvinces"
  );

  const departments = await getAllDepartments(
    "http://localhost:5263/api/ConstantTables/GetDepartment"
  );

  return { provinces, departments };
}

getDataForSelect().then(({ provinces, departments }) => {
  for (const province of provinces) {
    const option = document.createElement("option");
    option.value = province.id;
    option.textContent = province.name;
    provinceSelect.appendChild(option);
  }

  for (const department of departments) {
    const option = document.createElement("option");
    option.value = department.id;
    option.textContent = department.name;
    departmentSelect.appendChild(option);
  }
});

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
