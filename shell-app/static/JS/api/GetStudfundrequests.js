const token = sessionStorage.getItem("token");
export async function getfundrequests() {
  const response = await fetch(
    "http://localhost:5263//api/UniversityAdmin/GetAllFundRequests",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  let result = await response.json();
  return result;
}
