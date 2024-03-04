export async function getfundrequests() {
  const response = await fetch(
    "https://ukukhulaapi2024.azurewebsites.net/api/UniversityAdmin/GetAllFundRequests",
    {
      method: "GET",
    }
  );

  let result = await response.json();
  return result;
}
