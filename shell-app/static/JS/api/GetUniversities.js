 export async function getAllUniversities() {
  
  const response = await fetch(
    "http://localhost:5263/api/BBDAdmin/GetAllUniversities",
    {
      method: "GET",
    }
  );

  let result = await response.json();
  return result
}
