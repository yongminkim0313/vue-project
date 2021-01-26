const mapper = require('mybatis-mapper');
const path = require('path');
const fs = require('fs');
const mapperPath = path.join(__dirname, '../', "./mapper");
const mapperFormat = { language: 'sql', indent: '  ' };
const winston = require('./winstonConfig');


var files = fs.readdirSync(mapperPath);

files.forEach(file => {
    winston.debug("createMapper: " + file);
    mapper.createMapper([path.join(mapperPath, file)]);
})


function get(mapperName, sqlId, param) {
    return mapper.getStatement(mapperName, sqlId, param, { language: 'sql', indent: '  ' });
}
module.exports = {
    get
}