const csv = require('csv');
const fs = require("fs");
const Transform = require('stream').Transform;

const attributionString = "This file adapted from the The Database of British and Irish Hills (http://www.hills-database.co.uk/downloads.html), licenced under CC BY 3.0 (https://creativecommons.org/licenses/by/3.0/deed.en_GB)";
const columnHeaders = "[Number,Name,Classification,Height(m),Longitude,Latitude]"
const header = `{
"__comment": "${attributionString}",
"__header": "${columnHeaders}",
"points_to_load": [
`;
const footer = `
]
}
`;

class HeaderFooterTransformer extends Transform {
	constructor() {
		super();
		this.first = true;
	}

	_transform(chunk, enc, cb) {
		if (this.first === true) {
			this.push(header);
			this.first = false;
		}
		this.push(chunk);
		cb();
	}

	_flush(cb) {
		this.push(footer);
		cb();
	}
}

const classesMap = { //used for mapping and filtering, by filtering in only the things we want
	'Ma': 'Ma',
	'Hu': 'Hu',
	'4': 'TU',
	'3': 'TU',
	'2': 'TU',
	'1': 'TU',
	'0': 'TU',
	'Sim': 'Sim',
	'M': 'M',
	'C': 'C',
	'G': 'G',
	'D': 'D',
	'5D': '5D',
	'5H': '5H',
	'Hew': 'Hew',
	'N': 'N',
	'5': '5',
	'W': 'W',
	'WO': 'W',
	'SIB': 'SIB',
	'CoU': 'CouT',
	'CoA': 'CouT',
	'CoL': 'CouT'
}

function extractColumns(record) {
	if (record.length > 1) {
		var classification = record[10];
		if (classification == null) {
			console.log(record)
		}
		if (classification.indexOf(';') > -1) {
			throw new Error("Classification string already contains semi-colons; our replacement could break something. String is: " + classification);
		}
		var classes = classification.split(',');
		let allClasses = [];
		classes.forEach((classString) => {
			if (classString.endsWith('=')) {
				classString = classString.substring(0, classString.length - 1);
			}
			if (classString.length > 0 
					&& !classString.startsWith('s') 
					&& !classString.startsWith('x') //i.e. it isn't a sub or a deletion
					&& (classString in classesMap)) {
				allClasses.push(classesMap[classString]);
			}
		});
		allClasses = Array.from(new Set(allClasses));
		if (allClasses.length > 0) {
			classification = allClasses.join(';');
			return [
				record[0], //Number
				record[1], //Name
				classification, //Classification
				record[13], //Metres
				//record[30], //hill-bagging link //they appear to all just be http://www.hill-bagging.co.uk/googlemaps.php?qu=S&rf=[id] but some of them are different - so we'll construct them ourselves on the front end
				record[34], //Longitude
				record[33], //Latitude
			];
		} else {
			return null;
		}
	} else {
		return null;
	}
}

let first = true;
let second = true;
function formatLine(record) {
	let columns = JSON.stringify(extractColumns(record));
	if (first === true) {
		first = false;
		return '';
	} else {
		let columns = extractColumns(record);
		if (columns != null) {
			let columnString = JSON.stringify(columns);
			if (second) {
				second = false;
				return columnString;
			} else {
				return ',\n' + columnString;
			}
		} else {
			return '';
		}
	}
}

fs.createReadStream("hills.csv")
	.pipe(csv.parse())
	.pipe(csv.transform(formatLine))
	.pipe(new HeaderFooterTransformer())
	.pipe(fs.createWriteStream("../js/bundles/hills/data.json"));
