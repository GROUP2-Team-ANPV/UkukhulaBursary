const token = sessionStorage.getItem("token");
export async function AddUniversity(university) {
  try {
    const response = await fetch(
      "https://ukukhulaapi2024.azurewebsites.net/api/BBDAdmin/AddUniversity",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(university),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.statusText;
    console.log("Response data:", data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
