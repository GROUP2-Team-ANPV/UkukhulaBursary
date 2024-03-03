export function HeadOfDeaprtmentScript(result) {
    const universitySelect = document.getElementById("university");

  
  for (const university of result) {
    const option = document.createElement("option");
    option.value = university.id;
    option.textContent = university.universityName;
    universitySelect.appendChild(option);
  }

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

}