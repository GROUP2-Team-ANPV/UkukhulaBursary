// Function to get URL parameters
function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  const results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Get the request ID from the URL
const requestId = getUrlParameter("requestId");

// Add event listener to the form
document
  .getElementById("uploadForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const idDocumentFile = document.getElementById("id_document").files[0];
    const transcriptFile = document.getElementById("transcript").files[0];
    const cvFile = document.getElementById("cv").files[0];

    const filesToUpload = [];

    if (cvFile) {
      filesToUpload.push({ file: cvFile, documentType: 1 }); // CV
    }

    if (transcriptFile) {
      filesToUpload.push({ file: transcriptFile, documentType: 2 }); // Transcript
    }

    if (idDocumentFile) {
      filesToUpload.push({ file: idDocumentFile, documentType: 3 }); // ID
    }

    if (filesToUpload.length === 0) {
      // No file selected
      document.getElementById("message").innerHTML =
        "<span style='color: red; font-weight: bold;'>Please select a file to upload</span>";
      return;
    }

    uploadFilesSequentially(filesToUpload, 0);
  });

function uploadFilesSequentially(filesToUpload, index) {
  if (index >= filesToUpload.length) {
    document.getElementById("message").innerHTML =
      "<span style='color: green; font-weight: bold;'>All files uploaded successfully!</span>";
    return;
  }

  const formData = new FormData();
  formData.append("file", filesToUpload[index].file);
  formData.append("documentType", filesToUpload[index].documentType);

  const xhr = new XMLHttpRequest();
  xhr.open(
    "POST",
    `https://ukukhulaapi2024.azurewebsites.net/api/Student/${requestId}/UploadDocument`,
    true
  ); // Pass requestId variable

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      // Request was successful
      document.getElementById("message").innerHTML =
        "<span style='color: green; font-weight: bold;'>" +
        xhr.responseText +
        "</span>";
      uploadFilesSequentially(filesToUpload, index + 1); // Upload next file
    } else {
      // Request failed
      document.getElementById("message").innerHTML =
        "<span style='color: red; font-weight: bold;'>Error uploading file</span>";
    }
  };

  xhr.onerror = function () {
    // Network errors
    document.getElementById("message").innerHTML =
      "<span style='color: red; font-weight: bold;'>Network error occurred while uploading file</span>";
  };

  xhr.send(formData);

  document.getElementById("uploadForm").reset();
}
