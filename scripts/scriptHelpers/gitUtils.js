const execSync = require('./cliUtils').execSync;

module.exports.lastCommitIsHead = () => {
    const log = execSync('git log');
    const version = (`${log.split('\n')[4]} `).replace(/\s*(\S*).*/, '$1');
    return version.toLowerCase() === 'head';
};
