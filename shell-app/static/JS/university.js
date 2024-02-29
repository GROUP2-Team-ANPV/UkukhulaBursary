export function UniversityApplicationScript(){
  console.log("Script loaded: AdUniverdity.js");
const universityForm = document.querySelector(".university-form");

universityForm.addEventListener("submit", handleAddUniversity);

async function handleAddUniversity(event) {
  event.preventDefault();
  const universityData = {};
  const formData = new FormData(universityForm);

  for (const [key, value] of formData) {
    universityData[key] = value;
  }

  const response = await fetch("http://localhost:5263/Admin/AddUniversity", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(universityData),
  });
}
}

