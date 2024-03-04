export function UniversityApplicationScript() {
  const universityForm = document.querySelector(".university-form");

  async function handleAddUniversity(event) {
    const feedbackContainer = document.querySelector(".feedback");
    const feedbackHeading = document.querySelector(".feedback__heading");
    const feedbackMessage = document.querySelector(".feedback__message");
    event.preventDefault();
    const universityData = {};
    const formData = new FormData(universityForm);

    for (const [key, value] of formData) {
      universityData[key] = value;
    }

    try {
      const response = await fetch(
        "http://localhost:5263/api/BBDAdmin/AddUniversity",
        {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(universityData),
        }
      );

      if (response.statusText === "OK") {
        universityForm.reset();
        feedbackHeading.textContent = "Success";
        feedbackMessage.textContent = "University added successfully";

        feedbackContainer.style.backgroundColor = "var(--success)";
      }
    } catch (error) {
      feedbackHeading.textContent = "Error";
      feedbackMessage.textContent =
        "An error occured while adding the University";
      feedbackContainer.style.backgroundColor = "var(--danger)";
    } finally {
      feedbackContainer.classList.add("feedback--show");

      setTimeout(() => {
        feedbackContainer.classList.remove("feedback--show");
        feedbackHeading.textContent = "";
        feedbackMessage.textContent = "";
        feedbackContainer.style.backgroundColor = "";
      }, 3000);
    }
  }
  universityForm.addEventListener("submit", handleAddUniversity);
}
