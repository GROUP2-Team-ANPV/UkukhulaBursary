const token = sessionStorage.getItem("token");
export async function getAllUniversities() {
  const response = await fetch(
    "https://ukukhulaapi2024.azurewebsites.net/api/BBDAdmin/GetAllUniversities",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();
  return result;
}
