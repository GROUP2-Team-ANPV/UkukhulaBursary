export async function getAllUniversities() {
  const response = await fetch(
    "http://localhost:5263/api/BBDAdmin/GetAllUniversities",
    {
      method: "GET",
    }
  );

  const result = await response.json();
  return result;
}
