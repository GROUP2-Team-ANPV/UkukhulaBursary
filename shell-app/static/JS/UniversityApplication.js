import { AddUniversity } from "./api/AddUniversity.js";

export function UniversityApplicationScript(){
  const universityForm = document.querySelector(".university-form");

  universityForm.addEventListener("submit", handleAddUniversity);

  async function handleAddUniversity(event) {
    event.preventDefault();
    const universityData = {};
    const formData = new FormData(universityForm);
    
    for (const [key, value] of formData) {
      universityData[key] = value;
    }
    console.log(universityData)
    await AddUniversity(universityData)
}
}

