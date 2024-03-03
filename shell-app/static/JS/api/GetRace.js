export async function getRace() {
  const response = await fetch(
    "http://localhost:5263/api/ConstantTables/GetRace",
    {
      method: "GET",
    }
  );

  const result = await response.json();
  return result;
}
