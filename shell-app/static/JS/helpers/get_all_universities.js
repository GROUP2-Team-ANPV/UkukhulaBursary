const token = sessionStorage.getItem("token");
async function getAllUniversities(url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

export default getAllUniversities;