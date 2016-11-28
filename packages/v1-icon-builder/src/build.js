const fs = require('fs');
const glob = require('glob');
const mustache = require('mustache');
const path = require('path');
const rimraf = require('rimraf');

const stripSvgTagExpression = /.*<svg.*[\r\n\t]*.*preserve">/g;
const stripSvgEndTag = /<\/svg>/;
const template = fs.readFileSync(path.join(__dirname, 'tmpl', 'SvgIcon.js.mustache'), {encoding: 'utf-8'});
const svgToJsx = svgPath => {
    const rawSvg = fs.readFileSync(svgPath, {encoding: 'utf-8'});
    const svgData = rawSvg.replace(stripSvgTagExpression, '').replace(stripSvgEndTag, '').trim();
    return mustache.render(template, {
        svgIconName: path.basename(svgPath),
        svgData
    });
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
