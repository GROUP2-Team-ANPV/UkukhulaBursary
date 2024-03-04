import getAllStudents from "../helpers/get_all_students.js";
import getBBDFunds from "../helpers/get_bbd_funds.js";
import getAllUniversities from "../helpers/get_all_universities.js";

async function getBBDAllocationsData() {
  const allocations = await getBBDFunds(
    "http://localhost:5263//api/BBDAdmin/GetAllBBDFunds"
  );

  const universities = await getAllUniversities(
    "http://localhost:5263//api/BBDAdmin/GetAllUniversities"
  );

  const students = await getAllStudents(
    "http://localhost:5263//api/UniversityAdmin/GetAllFundRequests"
  );

  return { allocations, universities, students };
}

export default getBBDAllocationsData;
