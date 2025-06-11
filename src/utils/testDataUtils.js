const fs = require('fs');
const path = require('path');

const testDataDir = path.join(__dirname, '../testdata');
const credentialsPath = path.join(testDataDir, 'credentials.json');

function saveCredentials(data) {
    if (!fs.existsSync(testDataDir)) {
        fs.mkdirSync(testDataDir);
    }
    fs.writeFileSync(credentialsPath, JSON.stringify(data, null, 2));
}

function getCredentials() {
    if (!fs.existsSync(credentialsPath)) {
        throw new Error('Credentials file does not exist');
    }
    return JSON.parse(fs.readFileSync(credentialsPath));
}

module.exports = { saveCredentials, getCredentials };
