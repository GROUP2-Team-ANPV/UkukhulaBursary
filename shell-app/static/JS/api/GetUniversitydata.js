import fetchData from "../helpers/FetchData.js";

export async function getUniversityData(id) {
  const data = await fetchData(
    `http://localhost:5263/api/UniversityAdmin/GetUniversityAndTheirStudents?universityID=${id}`
  );

  const departments = await fetchData(
    "http://localhost:5263/api/ConstantTables/GetDepartment"
  );

  const universities = await fetchData(
    "http://localhost:5263/api/BBDAdmin/GetAllUniversities"
  );

  const gender = await fetchData(
    "http://localhost:5263/api/ConstantTables/GetGender"
  );

  const race = await fetchData(
    "http://localhost:5263/api/ConstantTables/GetRace"
  );

  const status = await fetchData(
    "http://localhost:5263/api/ConstantTables/GetStatus"
  );

  return { data, departments, universities, gender, race, status };
}
