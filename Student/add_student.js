const studentApplicationForm = document.querySelector(".application-form");

studentApplicationForm.addEventListener("submit", handleStudentApplication);

async function handleStudentApplication(event) {
  event.preventDefault();
  const StudentData = {};
  const formData = new FormData(studentApplicationForm);

  for (const [key, value] of formData) {
    StudentData[key] = value;
  }

  const response = await fetch("http://localhost:5263/api/UniversityAdmin/StudentFundRequest", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(StudentData),
  });
}
