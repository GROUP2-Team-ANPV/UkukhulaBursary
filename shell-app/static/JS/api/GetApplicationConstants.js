import getAllUniversities from "../helpers/get_all_universities.js";
import getDepartments from "../helpers/get_departments.js";
import getEthnicity from "../helpers/get_ethnicity.js";
import getGender from "../helpers/get_gender.js";
import getStatus from "../helpers/get_status.js";

async function getApplicationConstants() {
  const departments = await getDepartments(
    "hhttps://ukukhulaapi2024.azurewebsites.net/api/ConstantTables/GetDepartment"
  );

  const universities = await getAllUniversities(
    "hhttps://ukukhulaapi2024.azurewebsites.net/api/BBDAdmin/GetAllUniversities"
  );

  const gender = await getGender(
    "hhttps://ukukhulaapi2024.azurewebsites.net/api/ConstantTables/GetGender"
  );

  const race = await getEthnicity(
    "hhttps://ukukhulaapi2024.azurewebsites.net/api/ConstantTables/GetRace"
  );

  const status = await getStatus(
    "hhttps://ukukhulaapi2024.azurewebsites.net/api/ConstantTables/GetStatus"
  );

  return { departments, universities, gender, race, status };
}

export default getApplicationConstants;
