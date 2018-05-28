function pad(str, depth) {
  return str.padStart(str.length + depth * 2);
}

function printFile(file, depth) {
  return pad(
    `file('${file.id}', function(){ return import('${file.path}'); },
    ${file.id.match(/\.json$/) ? `function() { return ''; }` : `function(){ return import('!!raw-loader!${file.path}');}`},
    ${file.path.match(/packages\/.*\/src/) ? `function(){ return import('!!component-metadata-loader!${file.path}');}` : 'null'}
    )`,
    depth,
  );
}

function printDir(dir, depth = 0) {
  return [
    pad(`dir('${dir.id}', [`, depth),
    dir.children
      .map(
        child =>
          child.type === 'dir'
            ? printDir(child, depth + 1)
            : printFile(child, depth + 1),
    )
      .join(',\n'),
    pad(`])`, depth),
  ].join('\n');
}

module.exports = { printDir, printFile, pad };
