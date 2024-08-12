import validate from 'uuid-validate';

//Function for validating required input fields from request
export const validateInput = (input) => {
    for (let key in input) {
      if (input.hasOwnProperty(key)) {
        let value = input[key];
        if (!value) {
          return { valid: false, message: `${key} cannot be empty` };
        } else if (!validate(value)) {
          return { valid: false, message: `${key} must be a valid UUID` };
        }
      }
    }
    return { valid: true };
};

export const validateInteger = (input) => {
  for (let key in input) {
    if (input.hasOwnProperty(key)) {
      let value = input[key];
      if (typeof value !== 'number' || !Number.isInteger(value)) {
        return { valid: false, message: `${key} must be an integer` };
      }
    }
  }
  return { valid: true };
};

export const validateString = (input) => {
  const maxLength = 100;

  for (let key in input) {
    if (input.hasOwnProperty(key)) {
      let value = input[key];

      // Skip validation if value is empty, null, or undefined
      if (value === "" || value === null || value === undefined) {
        continue;
      }

      if (typeof value !== 'string') {
        return { valid: false, message: `${key} must be a string` };
      } else if (value.length > maxLength) {
        return { valid: false, message: `${key} cannot exceed ${maxLength} characters` };
      }
    }
  }
  return { valid: true };
};
