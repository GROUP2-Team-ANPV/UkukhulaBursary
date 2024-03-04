export async function getAllUniversities() {
  const response = await fetch(
    "https://ukukhulaapi2024.azurewebsites.net/api/BBDAdmin/GetAllUniversities",
    {
      method: "GET",
    }
  );

  const result = await response.json();
  return result;
}
