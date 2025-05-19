const isValidUUID = function (uuid) {
  const regex = /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/i;
  return regex.test(uuid);
};

module.exports = {
  isValidUUID,
};
