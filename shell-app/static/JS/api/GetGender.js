export async function getGender() {
  const response = await fetch(
    "https://ukukhulaapi2024.azurewebsites.net/api/ConstantTables/GetGender",
    {
      method: "GET",
    }
  );

  const result = await response.json();
  return result;
}
