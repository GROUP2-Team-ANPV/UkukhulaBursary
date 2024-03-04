import getAllUniversities from "../helpers/get_all_universities.js";
import getDepartments from "../helpers/get_departments.js";
import getEthnicity from "../helpers/get_ethnicity.js";
import getGender from "../helpers/get_gender.js";
import getStatus from "../helpers/get_status.js";

async function getApplicationConstants() {
  const departments = await getDepartments(
    "http://localhost:5263//api/ConstantTables/GetDepartment"
  );

  const universities = await getAllUniversities(
    "http://localhost:5263//api/BBDAdmin/GetAllUniversities"
  );

  const gender = await getGender(
    "http://localhost:5263//api/ConstantTables/GetGender"
  );

  const race = await getEthnicity(
    "http://localhost:5263//api/ConstantTables/GetRace"
  );

  const status = await getStatus(
    "http://localhost:5263//api/ConstantTables/GetStatus"
  );

  return { departments, universities, gender, race, status };
}

export default getApplicationConstants;
