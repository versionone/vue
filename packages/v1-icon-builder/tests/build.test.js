import fs from 'fs';
import path from 'path';
import {track} from 'temp';
import * as builder from '../src/build';

const fsUtils = track();
const svgDir = path.join(__dirname, 'testFixtures');

test.skip('the CLI tool exports a main function', () => {
    expect(builder.run).to.be.a('function');
});

test.skip('the run function can output a corresponding SVG component file in the output directory for each SVG file in an input directory', done => {
    const tempPath = createOutputDir();
    const getExpectedText = getExpected(svgDir);
    const getActualText = getActual(tempPath);
    builder.run({
        svgDir,
        outputDir: tempPath
    }, () => {
        expect(getExpectedText('add.svg')).to.equal(getActualText('AddIcon.js'));
        expect(getExpectedText('another.svg')).to.equal(getActualText('AnotherIcon.js'));
        cleanup(done);
    });
});

test.skip('an index file is generated that exports every icon', (done) => {
    const tempPath = createOutputDir();
    builder.run({
        svgDir,
        outputDir: tempPath
    }, () => {
        expect(getIndexContents(tempPath)).to.equal(stripNonEssentialCharacters(`import AddIconComponent from './AddIcon';
export const AddIcon = AddIconComponent;
import AnotherIconComponent from './AnotherIcon';
export const AnotherIcon = AnotherIconComponent;`));
        cleanup(done);
    });
});

function createOutputDir() {
    return fsUtils.mkdirSync();
}

function cleanup(done) {
    fsUtils.cleanupSync();
    done();
}

function getExpected(svgDir) {
    return (fileName) => stripNonEssentialCharacters(fs.readFileSync(path.join(svgDir, `${fileName}.txt`), {encoding: 'utf-8'}));
}

function getActual(outputDir) {
    return (fileName) => stripNonEssentialCharacters(fs.readFileSync(path.join(outputDir, fileName), {encoding: 'utf-8'}));
}

function getIndexContents(outputDir) {
    return stripNonEssentialCharacters(fs.readFileSync(path.join(outputDir, 'index.js'), {encoding: 'utf-8'}));
}

function stripNonEssentialCharacters(value) {
    return value.replace(/\s\t*/g, '');
}
