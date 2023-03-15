const fs = require('fs').promises;
const path = require('path');

const writerJSON = async (talker) => {
  const talkerPath = path.join(__dirname, '../talker.json');
  try {
    const data = JSON.stringify(talker, null, 2);
    return await fs.writeFile(talkerPath, data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

module.exports = {
    writerJSON,
};
