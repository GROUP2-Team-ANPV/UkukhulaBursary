const token = sessionStorage.getItem("token");
export async function updateApplicationStatus(applicationID, statusUpdate) {
  try {
    const response = await fetch(
      `https://ukukhulaapi2024.azurewebsites.net/api/BBDAdmin/${applicationID}/UpdateStatus`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(statusUpdate),
      }
    );
  } catch (error) {
    console.error("Error:", error);
  }
}
