import fetchData from "../helpers/FetchData.js";

export async function getUniversityData(id) {
  const data = await fetchData(
    `https://ukukhulaapi2024.azurewebsites.net/api/UniversityAdmin/GetUniversityAndTheirStudents?universityID=${id}`
  );

  const departments = await fetchData(
    "https://ukukhulaapi2024.azurewebsites.net/api/ConstantTables/GetDepartment"
  );

  const universities = await fetchData(
    "https://ukukhulaapi2024.azurewebsites.net/api/BBDAdmin/GetAllUniversities"
  );

  const gender = await fetchData(
    "https://ukukhulaapi2024.azurewebsites.net/api/ConstantTables/GetGender"
  );

  const race = await fetchData(
    "https://ukukhulaapi2024.azurewebsites.net/api/ConstantTables/GetRace"
  );

  const status = await fetchData(
    "https://ukukhulaapi2024.azurewebsites.net/api/ConstantTables/GetStatus"
  );

  return { data, departments, universities, gender, race, status };
}
