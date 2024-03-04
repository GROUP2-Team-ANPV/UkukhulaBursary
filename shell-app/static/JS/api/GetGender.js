const token = sessionStorage.getItem("token");
export async function getGender() {
  const response = await fetch(
    "http://localhost:5263//api/ConstantTables/GetGender",
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
