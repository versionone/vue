const fs = require('fs');
const glob = require('glob');
const mustache = require('mustache');
const path = require('path');
const rimraf = require('rimraf');

const stripSvgTagExpression = /.*s/g;
const template = fs.readFileSync(path.join(__dirname, 'tmpl', 'SvgIcon.js'), {encoding: 'utf-8'});
const svgToJsx = svgPath => {
    const rawSvg = fs.readFileSync(svgPath, {encoding: 'utf-8'});
    const svgData = '';
    console.log(rawSvg.replace(stripSvgTagExpression, ''));
    throw new Error('Not Implemented Error');
};

const copySvgToComponent = outputDir => (svgPath) => {
    const componentString = svgToJsx(svgPath);
    const destPath = path.join(outputDir, path.basename(svgPath));
    fs.writeFileSync(destPath, componentString);
};

const run = ({svgDir, outputDir}, cb = () => {
}) => {
    rimraf.sync(outputDir);
    fs.mkdirSync(outputDir);
    const files = glob.sync(path.join(svgDir, '*.svg'));
    files.forEach(copySvgToComponent(outputDir));

    cb();
};

module.exports.run = run;
