import getAllStudents from "../helpers/get_all_students.js";
import getBBDFunds from "../helpers/get_bbd_funds.js";
import getAllUniversities from "../helpers/get_all_universities.js";

async function getBBDAllocationsData() {
  const allocations = await getBBDFunds(
    "hhttps://ukukhulaapi2024.azurewebsites.net/api/BBDAdmin/GetAllBBDFunds"
  );

  const universities = await getAllUniversities(
    "hhttps://ukukhulaapi2024.azurewebsites.net/api/BBDAdmin/GetAllUniversities"
  );

  const students = await getAllStudents(
    "hhttps://ukukhulaapi2024.azurewebsites.net/api/UniversityAdmin/GetAllFundRequests"
  );

  return { allocations, universities, students };
}

export default getBBDAllocationsData;
