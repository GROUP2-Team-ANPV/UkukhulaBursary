export async function getGender() {
  const response = await fetch(
    "http://localhost:5263/api/ConstantTables/GetGender",
    {
      method: "GET",
    }
  );

  const result = await response.json();
  return result;
}
