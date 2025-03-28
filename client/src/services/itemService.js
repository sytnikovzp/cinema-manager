import * as yup from 'yup';

// =============================================
// Validation schemas

export const TITLE_NAME_SCHEMA = yup
  .string()
  .trim('Input cannot contain leading or trailing spaces')
  .min(2, 'Input must be at least 2 characters')
  .max(60, 'Input cannot exceed 60 characters')
  .matches(
    /^[A-Z][a-zA-Z0-9\s'–:.-]+(?:\s[A-Z][a-zA-Z0-9\s'–:.-]+)*$/,
    'Input must start with an uppercase letter [A-Z] and can contain letters [A-z], digits, spaces, apostrophes, and dashes.'
  )
  .required('Input is a required field');

export const STRING_SCHEMA = yup.string();
export const DATE_SCHEMA = yup.date();
export const ARRAY_SCHEMA = yup.array();

// =============================================
// Functions for *Item components

export const calculateAge = (birthDate, deathDate) => {
  const birth = new Date(birthDate);
  const endDate = deathDate ? new Date(deathDate) : new Date();

  let age = endDate.getFullYear() - birth.getFullYear();

  const monthDifference = endDate.getMonth() - birth.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && endDate.getDate() < birth.getDate())
  ) {
    age--;
  }

  return age;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};
