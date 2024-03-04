export async function getfundrequests() {
 
    const response = await fetch(
      "http://localhost:5263/api/UniversityAdmin/GetAllFundRequests",
      {
        method: "GET",
      }
    );
 
    let result = await response.json();
    return result
  }