const token = sessionStorage.getItem("token");
export async function getStatus() {
  const response = await fetch(
    "hhttps://ukukhulaapi2024.azurewebsites.net/api/ConstantTables/GetStatus",
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
