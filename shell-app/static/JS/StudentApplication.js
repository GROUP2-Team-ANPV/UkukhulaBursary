import { AddStudent } from "./api/AddStudent.js";


export function StudentapplicationScript() {
  
    console.log("page loaded")
    try {
      const form = document.querySelector('.application-form');
      
      form.addEventListener('submit', async function (event) {
            event.preventDefault();

            const formData = new FormData(form);
            const studentData = {};
            formData.forEach((value, key) => {
            studentData[key] = value;
            });

            

            
            if (studentData) {
                await AddStudent(studentData);
                console.log("Student added successfully");
            }else{
                console.log("Error adding student:", error);
            }
            
            form.reset();
        });
        
    } catch (error) {
      console.error("Error initializing the application:", error);
      
    }
  
}


