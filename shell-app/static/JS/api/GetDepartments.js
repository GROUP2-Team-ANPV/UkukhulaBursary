const token = sessionStorage.getItem("token");
export async function getAllDepartments() {
  const response = await fetch(
    "http://localhost:5263//api/ConstantTables/GetDepartment",
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
