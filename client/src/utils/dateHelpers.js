import { isValid, parse } from 'date-fns';
import { enGB } from 'date-fns/locale';

const parseDateString = (value, originalValue) => {
  if (typeof originalValue === 'string') {
    const parsedDate = parse(originalValue, 'dd MMMM yyyy', new Date(), {
      locale: enGB,
    });
    return isValid(parsedDate) ? parsedDate : new Date('');
  }
  return originalValue;
};

const stripTime = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const calculateAge = (birthDate, deathDate) => {
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

export { calculateAge, parseDateString, stripTime };
