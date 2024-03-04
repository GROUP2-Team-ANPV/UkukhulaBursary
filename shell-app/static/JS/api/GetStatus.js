export async function getStatus() {
  const response = await fetch(
    "https://ukukhulaapi2024.azurewebsites.net/api/ConstantTables/GetStatus",
    {
      method: "GET",
    }
  );

  const result = await response.json();
  return result;
}
