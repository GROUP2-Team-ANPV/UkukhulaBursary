const token = sessionStorage.getItem("token");
export async function updateApplicationStatus(applicationID, statusUpdate) {
  try {
    const response = await fetch(
      `http://localhost:5263//api/BBDAdmin/${applicationID}/UpdateStatus`,
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
