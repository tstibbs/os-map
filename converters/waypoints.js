const xlsx = require('xlsx');
const CombinedStream = require('combined-stream2');
const stream = require('stream');

const Converter = require('./converter');

const attributionString = "";
const columnHeaders = "TODO"


class WaypointsConverter extends Converter {
	constructor() {
		super(attributionString, columnHeaders);
	}
	
	extractColumns(record) {
		if (record.length > 1) {
			return [
				record[0], //National_ID
				record[4], //Grid_Reference
				record[10] //Category
			];
		} else {
			return null;
		}
	}
	
	_streamString(str) {
		var s = new stream.Readable();
		s.push(str);
		s.push('\n');
		s.push(null);
		return s;
	}

	_readSheet(fileName) {
		var workbook = xlsx.readFile(fileName);
		var sheets = Object.keys(workbook.Sheets).filter(sheet => !/^Sheet\d$/.test(sheet));
		if (sheets.length > 1) {
			throw new Error(`We only know how to deal with a single sheet of data: ${sheets}`);
		}
		var str = xlsx.utils.sheet_to_csv(workbook.Sheets[sheets[0]]);
		//remove first line
		var body = str.substring(str.indexOf('\n') + 1, str.length - 1)
		//now stream it
		return this._streamString(body);
	}
	
	writeOut2(inputs, output) {
		var combinedStream = CombinedStream.create();
		inputs.forEach(input => combinedStream.append(this._readSheet(input)));
		this.writeOutStream(combinedStream, output);
	}
}

//TODO all the files
//TODO add a 'type' element to each record, so we knows for sure if it's a milestone, toll house etc. The 'category' field doesn't seem very reliable.

(new WaypointsConverter()).writeOut2(['tolls.xls', 'milestones.xls'], './out.json');
