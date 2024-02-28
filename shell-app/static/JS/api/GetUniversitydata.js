export async function getUniversityData(id) {
    const response = await fetch(
        `http://localhost:5263/api/UniversityAdmin/GetUniversityAndTheirStudents?universityID=${id}`,
        {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      const data = await response.json();
    
      // Store the data in session storage
      sessionStorage.setItem("universityData", JSON.stringify(data));
    
      return data;
    
  }
  