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
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
};
