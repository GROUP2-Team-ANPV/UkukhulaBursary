export async function getAllDepartments() {
  const response = await fetch(
    "https://ukukhulaapi2024.azurewebsites.net/api/ConstantTables/GetDepartment",
    {
      method: "GET",
    }
  );

  const result = await response.json();
  return result;
}
