function isValidPhoneNumber(phoneNumber) {
  const phoneRegex = /^(\+27|0)?[1678][0-9]{8}$/;
  return phoneRegex.test(phoneNumber);
}

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function isValidName(name) {
  const nameRegex = /^[a-zA-Z]+$/;
  return nameRegex.test(name);
}

function isValidOptionValue(value) {
  return value !== "0";
}

export { isValidPhoneNumber, isValidEmail, isValidName, isValidOptionValue };
