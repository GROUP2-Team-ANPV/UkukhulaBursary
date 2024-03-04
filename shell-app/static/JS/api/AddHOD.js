const token = sessionStorage.getItem("token");
export async function AddHOD(hodData) {
  try {
    const response = await fetch(
      "http://localhost:5263//api/BBDAdmin/AddUniversityUser",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(hodData),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.statusText;
    console.log("Response data:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}
