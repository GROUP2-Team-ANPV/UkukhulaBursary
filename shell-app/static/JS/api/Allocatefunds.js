const token = sessionStorage.getItem("token");

export async function allocateFunds() {
  try {
    const response = await fetch(
      "https://ukukhulaapi2024.azurewebsites.net/api/BBDAdmin/UpdateUniversityFunds",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );

    console.log("Response status:", response.status);

    if (!response.ok) {
      console.error("Response details:", await response.text());
    }

    return response.status;
  } catch (error) {
    console.error("Error during fetch:", error);
    throw error; // Rethrow the error to be caught by the caller if needed
  }
}
