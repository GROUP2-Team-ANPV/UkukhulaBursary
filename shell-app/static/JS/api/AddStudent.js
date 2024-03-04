
export async function AddStudent(student){
  
   try {
    const response =  await fetch('https://ukukhulaapi2024.azurewebsites.net/api/UniversityAdmin/StudentFundRequest', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          
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