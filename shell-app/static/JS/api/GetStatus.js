export async function getStatus() {
  const response = await fetch(
    "http://localhost:5263/api/ConstantTables/GetStatus",
    {
      method: "GET",
    }
  );

  const result = await response.json();
  return result;
}
