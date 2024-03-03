export async function updateApplicationStatus(applicationID, statusUpdate) {
  try {
    const response = await fetch(
      `http://localhost:5263/api/BBDAdmin/${applicationID}/UpdateStatus`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(statusUpdate),
      }
    );
  } catch (error) {
    console.error("Error:", error);
  }
}
