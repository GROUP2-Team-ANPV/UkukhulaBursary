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
    
      
    
      return data;
    
  }
  