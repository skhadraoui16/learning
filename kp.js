
var knitout = require('../../knitout-frontend-js/knitout');
k = new knitout.Writer({carriers:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]});
blk.addHeader('Machine','SWGXYZ');
k.addHeader('Gauge','15');
k.addHeader('X-Presser-Mode','auto');
k.addHeader('Position','Center');

testPattern = require('./pattern');

let startingRow = [0,0,0,0,0,0,0,0];

let carrierA = "3";
let carrierB = "6";

// function knit(dir, needle, carrier) {
// 	console.log("knit", dir, needle, carrier);
// }
// function xfer(fromNeedle, toNeedle) {
// 	console.log("transfer", fromNeedle, toNeedle);
// }

// Go through each row
function fairisle (pattern) {
	for (let i=0; i<pattern.length; i++) {
		console.log("starting row: "+i);
		let thisRow = pattern[i];
		let output = "";
		// In each row, go through each stitch

		if (i%2 == 0) {
			for (let j=thisRow.length-1; j>=0; j--){
				// if the pattern says "1" at this location in the pattern, knit with carrierA; otherwise, carrierB
				// (all front bed knits)
				let carrier = carrierB;
				if (thisRow[j] == 1) {
					carrier = carrierA;
				}
				k.knit("-", "f"+j, carrier);
			}
		}

		else {
			for (let j=0; j<thisRow.length; j++){
				// if the pattern says "1" at this location in the pattern, knit with carrierA; otherwise, carrierB
				// (all front bed knits)
				let carrier = carrierB;
				if (thisRow[j] == 1) {
					carrier = carrierA;
				}
				k.knit("+", "f"+j, carrier);
			}
		}
	}
}

// // no transfers needed
// if ((this == 1 && previous == 1) || (this == 0 && previous == 0))

// is (this == prev)

// // transfers needed
// if (this == 0 && previous == 1) {xfer front to back}
// if (this == 1 && previous == 0) {xfer back to front}

function kp(pattern) {
	// Go through each row
	// In each row, go through each stitch
	let thisRow = pattern[0];
	let previousRow = startingRow;

	for (let i=0; i<pattern.length; i++) {
		if (i>0) {
			thisRow = pattern[i];
			previousRow = pattern[i-1];
		}
		console.log("starting row: "+i);
		let output = "";
		// In each row, go through each stitch

		// "transfer pass" doesn't matter direction
		for (let j=thisRow.length-1; j>=0; j--){
			// if the pattern says "1" at this location in the pattern, purl
			// otherwise, knit
			if (thisRow[j] == previousRow[j]) {
				// no transfers needed
			}

			else if (thisRow[j] == 1 && previousRow[j] == 0) {
				k.xfer("b"+j, "f"+j);
			}
			else if (thisRow[j] == 0 && previousRow[j] == 1) {
				k.xfer("f"+j, "b"+j);
			}
			else {
				console.log("weird number in the pattern?", thisRow[j] );
			}
		}

		// "knitting passes", which have a direction
		if (i%2 == 0) { // if this is an even row, go leftwards
			for (let j=thisRow.length-1; j>=0; j--){
				// if the pattern says "1" at this location in the pattern, purl
				// otherwise, knit
				if (thisRow[j] == 1) {
					// xfer("b"+j, "f"+j);
					k.knit("-", "f"+j, carrierA);
				}
				else {
					// xfer("f"+j, "b"+j);
					k.knit("-", "b"+j, carrierA);
				}
			}
		}

		else { // if this is an odd row, go rightwards
			for (let j=0; j<thisRow.length; j++){
				if (thisRow[j] == 1) {
					// xfer("b"+j, "f"+j);
					k.knit("+", "f"+j, carrierA);
				}
				else {
					// xfer("f"+j, "b"+j);
					k.knit("+", "b"+j, carrierA);
				}
			}
		}
	}

	for (let j=thisRow.length-1; j>=0; j--){
		// reset back bed knits to front
		if (thisRow[j] == 0) {
			k.xfer("b"+j, "f"+j);
		}
	}

}

kp(testPattern);












