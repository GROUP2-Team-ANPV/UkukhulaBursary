import getAllUniversities from "../helpers/get_all_universities.js";
import getDepartments from "../helpers/get_departments.js";
import getEthnicity from "../helpers/get_ethnicity.js";
import getGender from "../helpers/get_gender.js";

async function getApplicationConstants() {
  const departments = await getDepartments(
    "http://localhost:5263/api/ConstantTables/GetDepartment"
  );

  const universities = await getAllUniversities(
    "http://localhost:5263/api/BBDAdmin/GetAllUniversities"
  );

  const gender = await getGender(
    "http://localhost:5263/api/ConstantTables/GetGender"
  );

  const race = await getEthnicity(
    "http://localhost:5263/api/ConstantTables/GetRace"
  );

  return { departments, universities, gender, race };
}

export default getApplicationConstants;
