const hodForm = document.querySelector(".hod-form");

hodForm.addEventListener("submit", handleAddHOD);

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

async function handleAddHOD(event) {
  event.preventDefault();
  const hodData = {};
  const formData = new FormData(hodForm);

  for (const [key, value] of formData) {
    hodData[key] = value;
  }

  const response = await fetch(
    "http://localhost:5263/api/BBDAdmin/AddUniversityUser",
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(hodData),
    }
  );

}
