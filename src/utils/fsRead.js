const fs = require('fs').promises;

const readerJSON = async (path) => {
    try {
        const data = await fs.readFile(path);
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

module.exports = {
    readerJSON,
};
