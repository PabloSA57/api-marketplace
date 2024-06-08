const bcrypt = require("bcrypt");

async function isValidPassword(password, passwordHash) {
  return await bcrypt.compare(password, passwordHash);
}

function passwordHash(password) {
  return bcrypt.hashSync(password, Number.parseInt(10));
}

module.exports = { isValidPassword, passwordHash };
