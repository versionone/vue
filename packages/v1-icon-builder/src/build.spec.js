import fs from 'fs';
import path from 'path';
import {track} from 'temp';
import * as builder from './build';

const fsUtils = track();
const svgDir = path.join(__dirname, '..', 'testFixtures');

suite('SVG build CLI', () => {
    test('the CLI tool exports a main function', () => {
        expect(builder.run).to.be.a('function');
    });

    test('the main function can output a corresponding SVG component file in the output directory for each SVG file in an input directory', done => {
        const tempPath = createOutputDir();
        const getExpectedText = getExpected(svgDir);
        const getActualText = getActual(tempPath);
        builder.run({
            svgDir,
            outputDir: tempPath
        }, () => {
            expect(getExpectedText('add.svg')).to.equal(getActualText('add.svg'));
            expect(getExpectedText('add-icon.svg')).to.equal(getActualText('add-icon.svg'));
            cleanup(done);
        });
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
    return (fileName) => fs.readFileSync(path.join(svgDir, `${fileName}.txt`), {encoding: 'utf-8'});
}

function getActual(outputDir) {
    return (fileName) => fs.readFileSync(path.join(outputDir, fileName), {encoding: 'utf-8'});
}
