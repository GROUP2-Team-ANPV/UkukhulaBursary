import fetchData from "../helpers/FetchData.js";
import { getAllDepartments } from "./GetDepartments.js";
import { getGender } from "./GetGender.js";
import { getRace } from "./GetRace.js";
import { getStatus } from "./GetStatus.js";
import { getAllUniversities } from "./GetUniversities.js";

export async function getUniversityData(id) {
  const data = await fetchData(
    `https://ukukhulaapi2024.azurewebsites.net/api/UniversityAdmin/GetUniversityAndTheirStudents?universityID=${id}`
  );

  const departments = await getAllDepartments();

  const universities = await getAllUniversities();

  const gender = await getGender();

  const race = await getRace();

  const status = await getStatus();

  return { data, departments, universities, gender, race, status };
}
