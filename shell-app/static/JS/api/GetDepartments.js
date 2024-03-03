export async function getAllDepartments() {
  const response = await fetch(
    "http://localhost:5263/api/ConstantTables/GetDepartment",
    {
      method: "GET",
    }
  );

  let result = await response.json();
  return result;
}
