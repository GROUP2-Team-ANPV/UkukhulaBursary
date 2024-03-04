export async function updateApplicationStatus(applicationID, statusUpdate) {
  try {
    const response = await fetch(
      `https://ukukhulaapi2024.azurewebsites.net/api/BBDAdmin/${applicationID}/UpdateStatus`,
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
