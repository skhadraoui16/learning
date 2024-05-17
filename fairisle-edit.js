var knitout = require('knitout');
k = new knitout.Writer({carriers:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]});
k.addHeader('Machine','SWGXYZ');
k.addHeader('Gauge','15');
k.addHeader('X-Presser-Mode','auto');
k.addHeader('Position','Center');

testPattern = require('./pattern.js');

let startingRow = [0,0,0,0,0,0,0,0,0,0,0,0,0];

let carrierA = "3";
let carrierB = "6";
let height = 65;
let width = 65;
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

// Go through each row
function fairisle (pattern, height, width) {
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




kp(testPattern);












