const token = sessionStorage.getItem("token");
export async function getfundrequests() {
  const response = await fetch(
    "hhttps://ukukhulaapi2024.azurewebsites.net/api/UniversityAdmin/GetAllFundRequests",
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
