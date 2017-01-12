const Transform = require('stream').Transform;
const csv = require('csv');
const fs = require('fs');

function header(attributionString, columnHeaders) {
return `{
"__comment": "${attributionString}",
"__header": "${columnHeaders}",
"points_to_load": [
`;
}
const footer = `
]
}
`;

class HeaderFooterTransformer extends Transform {
	constructor(attribution, columnHeaders) {
		super();
		this._attribution = attribution;
		this._columnHeaders = columnHeaders;
		this._first = true;
	}

	_transform(chunk, enc, cb) {
		if (this._first === true) {
			this.push(header(this._attribution, this._columnHeaders));
			this._first = false;
		}
		this.push(chunk);
		cb();
	}

	_flush(cb) {
		this.push(footer);
		cb();
	}
}

class Converter {
	constructor(attribution, columnHeaders) {
		this._attribution = attribution;
		this._columnHeaders = columnHeaders;
		this._first = true;
		this._second = true;
	}

	_formatLine(record) {
		if (this._first === true) { // header row
			this._first = false;
			return '';
		} else {
			let columns = this.extractColumns(record);
			if (columns != null) {
				let columnString = JSON.stringify(columns);
				if (this._second) {
					this._second = false;
					return columnString;
				} else {
					return ',\n' + columnString;
				}
			} else {
				return '';
			}
		}
	}
	
	extractColumns(record) {
		throw new Error("abstract");
	}

	writeOut(input, output) {
		fs.createReadStream(input)
			.pipe(csv.parse())
			.pipe(csv.transform(this._formatLine.bind(this)))
			.pipe(new HeaderFooterTransformer(this._attribution, this._columnHeaders))
			.pipe(process.stdout);
	}
}

module.exports = Converter;