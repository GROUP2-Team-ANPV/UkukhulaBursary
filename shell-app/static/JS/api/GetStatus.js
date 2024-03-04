const token = sessionStorage.getItem("token");
export async function getStatus() {
  const response = await fetch(
    "http://localhost:5263//api/ConstantTables/GetStatus",
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
