export default function displayNotification(type, message, statusColor) {
  const feedbackContainer = document.querySelector(".feedback");
  const feedbackHeading = document.querySelector(".feedback__heading");
  const feedbackMessage = document.querySelector(".feedback__message");

  feedbackHeading.textContent = type;
  feedbackMessage.textContent = message;
  feedbackContainer.style.backgroundColor = `var(--${statusColor})`;
  feedbackContainer.classList.add("feedback--show");
  setTimeout(() => {
    feedbackContainer.classList.remove("feedback--show");
    feedbackHeading.textContent = "";
    feedbackMessage.textContent = "";
    feedbackContainer.style.backgroundColor = "";
  }, 3000);
}
