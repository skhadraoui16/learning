var knitout = require('knitout');
k = new knitout.Writer({carriers:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]});
k.addHeader('Machine','SWGXYZ');
k.addHeader('Gauge','15');
k.addHeader('X-Presser-Mode','auto');
k.addHeader('Position','Center');

testPattern = require('./pattern');

let startingRow = [0,0,0,0,0,0,0,0];

let carrierA = "3";
let carrierB = "6";
let width = 65;
let height = 65;
let front = width%2;

k.inhook(carrier);

for (let s=width; s>0; s--) {
	if (s%2==front) {
		k.knit("-", "f"+s, carrier);
	}
	else {
		k.knit("-", "b"+s, carrier);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
	}
}
for (let s=1; s<=width; s++) {
	if (s%2==front) {
		k.knit("+", "f"+s, carrier);
	}
	else{
		k.knit("+", "b"+s, carrier);
	}
}

k.releasehook(carrier);


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












