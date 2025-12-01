const bcrypt = require('bcryptjs');

const hash = async (data) => {
    const salt = await bcrypt.genSalt(10);
    const result = await bcrypt.hash(data, salt);
    return result;
}

module.exports = hash;