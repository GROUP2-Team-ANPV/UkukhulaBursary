import { AddHOD } from "./api/AddHOD.js";

export  function HeadOfDeaprtmentApplicationScript(result) {
    const universitySelect = document.getElementById("university");
    const hodForm = document.querySelector(".hod-form")

  
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
        console.log(hodData)
        if (hodData) {
            await AddHOD(hodData);
            console.log("HOD added successfully");
        }else{
            console.log("Error adding HOD:", error);
        }
        
        hodForm.reset();


    }
    hodForm.addEventListener("submit", handleAddHOD);

}