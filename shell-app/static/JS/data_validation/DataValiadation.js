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

function isValidIDNumber(idNumber) {
  if (!/^\d{13}$/.test(idNumber) || !luhnChecksum(idNumber)) {
    return false;
  }
  return true;
}

const luhnChecksum = (idNumber) => {
  let idSequenceSum = 0;

  for (let i = idNumber.length - 1; i >= 0; i--) {
    if (i % 2 !== 0) {
      let doubledValue = parseInt(idNumber[i] * 2);

      if (doubledValue > 9) {
        const stringToNum = doubledValue.toString();
        doubledValue = parseInt(stringToNum[0]) + parseInt(stringToNum[1]);
      }
      idSequenceSum += doubledValue;
    } else {
      idSequenceSum += parseInt(idNumber[i]);
    }
  }

  return idSequenceSum % 10 === 0;
};

export {
  isValidPhoneNumber,
  isValidEmail,
  isValidName,
  isValidOptionValue,
  isValidIDNumber,
};
