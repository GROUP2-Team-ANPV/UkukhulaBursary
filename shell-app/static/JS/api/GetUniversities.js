const universitySelect = document.getElementById("university");

async function getAllUniversities() {
  const response = await fetch(
    "http://localhost:5263/api/BBDAdmin/GetAllUniversities",
    {
      method: "GET",
    }
  );

  let result = await response.json();
  for (const university of result) {
    const option = document.createElement("option");
    option.value = university.id;
    option.textContent = university.universityName;
    universitySelect.appendChild(option);
  }
}
getAllUniversities();