// utils/validation.ts

export const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePhone = (phone: string) => {
  // Indian mobile: 10 digits, starts with 6-9
  const regex = /^[6-9]\d{9}$/;
  return regex.test(phone);
};

export const validateRequired = (value: string) => {
  return value.trim() !== "";
};

export const validatePincode = (pincode: string) => {
  const regex = /^[1-9][0-9]{5}$/;
  return regex.test(pincode);
};