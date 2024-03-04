const token = sessionStorage.getItem("token");
export async function getAllDepartments() {
  const response = await fetch(
    "hhttps://ukukhulaapi2024.azurewebsites.net/api/ConstantTables/GetDepartment",
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
