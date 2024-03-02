async function getAllStudents(url) {
  const response = await fetch(url, {
    method: "GET",
  });
  const data = await response.json();
  return data;
}

export default getAllStudents;
