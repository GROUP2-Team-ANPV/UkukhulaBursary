const token = sessionStorage.getItem("token");
export async function AddStudent(student){
  console.log("Student data:", student);
   try {
    const response =  await fetch('http://localhost:5263/api/UniversityAdmin/StudentFundRequest', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(student), 
   })
     
    if (!response.ok) {
         throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.statusText;
    console.log("Response data:", data);
  
   } catch(error){      
      console.error('Error:', error);
   }
        
}