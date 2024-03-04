 export async function getAllUniversities() {
  
  const response = await fetch(
    "https://ukukhulaapi2024.azurewebsites.net/api/BBDAdmin/GetAllUniversities",
    {
      method: "GET",
    }
  );

  let result = await response.json();
  return result
}
