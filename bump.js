#! /usr/bin/env node

fs = require('fs')

var currentDir = process.cwd()

var spacer = ''

fs.readFile(currentDir + '/package.json', 'utf8', function (err, data) {
	if (err) {
		return console.log(err);
	}

	if(data.contains('\t')){
		spacer = '\t'
	}
	else {
		spacer = '   '
	}

	var data = JSON.parse(data)
	var v = data.version.split('.')
	var version = {
		'major': parseInt(v[0]),
		'minor': parseInt(v[1]),
		'patch': parseInt(v[2])
	}

	var args = process.argv

	if(args.contains('major')){
		version.major++
	}
	if(args.contains('minor')){
		version.minor++
	}
	if(args.contains('patch')){
		version.patch++
	}

	data.version = versionString(version)

	fs.writeFile("package.json", JSON.stringify(data, null, spacer), function(err) {
		if (err) {
			return console.log(err);
		}
	});
});

// Helpers

function versionString(version){
	return version.major + '.' + version.minor + '.' + version.patch
}


// Why is the hell are these not default? Ugh.

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

String.prototype.contains = function(it) { return this.indexOf(it) != -1; };