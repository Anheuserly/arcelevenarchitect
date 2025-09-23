export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

export const validateIFSC = (ifsc: string): boolean => {
  const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  return ifscRegex.test(ifsc);
};

export const validateAccountNumber = (accountNumber: string): boolean => {
  return accountNumber.length >= 9 && accountNumber.length <= 18;
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};