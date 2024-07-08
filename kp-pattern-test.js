var knitout = require('knitout');
k = new knitout.Writer({carriers:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]});
k.addHeader('Machine','SWGXYZ');
k.addHeader('Gauge','15');
k.addHeader('Position','Center');

const {testPattern} = require('./pattern');


let startingRow = [0,0,0,0,0,0,0,0,0,0,0,0,0];


let carrier = "6";
let width = 65;
let height = 65;
const front = width%2;

k.inhook(carrier);

// cast on both beds and knit 2 rows
for (let s=width; s>0; s--) {
	if (s%2==front) {
		k.tuck("-", "f"+(s-1), carrier);
	}
	else {
		k.tuck("-", "b"+(s-1), carrier);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
	}
}
for (let s=2; s<=width; s++) {
	if (s%2==front) {
		k.knit("+", "f"+(s-1), carrier);
	}
	else{
		k.knit("+", "b"+(s-1), carrier);
	}
}

for (let s=width; s>0; s--) {
	if (s%2==front) {
		k.knit("-", "f"+(s-1), carrier);
		 
	}
	else {
		k.knit("-", "b"+(s-1), carrier);
		                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
	}
}

for (let s=2; s<=width; s++) {
	if (s%2==front) {
		k.knit("+", "f"+(s-1), carrier);
	}
	else{
		k.knit("+", "b"+(s-1), carrier);
	}
}

for (let s=width; s>0; s--) {
	if (s%2==front) {
		k.xfer("f"+(s-1), "b"+(s-1));
		 
	}
}



k.releasehook(carrier);


function kp(pattern) {
	// Go through each row
	// In each row, go through each stitch
	let thisRow = pattern[0];
	let previousRow = startingRow;

	for (let i=0; i<height; i++) {
		if (i>0) {
			thisRow = pattern[i % pattern.length];
			previousRow = pattern[(i + pattern.length - 1) % pattern.length];
		}
		let output = "";
		// In each row, go through each stitch

		// "transfer pass" doesn't matter direction
		for (let j= width-1; j>=0; j--){
			// if the pattern says "1" at this location in the pattern, purl
			// otherwise, knit
			//DEBUGGG
			// console.log(previousRow);
			// console.log(i);
			if (thisRow[j % thisRow.length] == previousRow[j % thisRow.length]) {
				// no transfers needed
			}

			else if (thisRow[j % thisRow.length] == 1 && previousRow[j % thisRow.length] == 0) {
				k.xfer("b"+j, "f"+j);
			}
			else if (thisRow[j % thisRow.length] == 0 && previousRow[j % thisRow.length] == 1) { 
				k.xfer("f"+j, "b"+j);
			}
			else {
				console.log("weird number in the pattern?", thisRow[j] );
			}
		}

		// "knitting passes", which have a direction
		if (i%2 == 0) { // if this is an even row, go leftwards
			for (let j= width-1; j>=0; j--){
				// if the pattern says "1" at this location in the pattern, purl
				// otherwise, knit
				if (thisRow[j % thisRow.length] == 1) {
					// xfer("b"+j, "f"+j);
					k.knit("-", "f"+j, carrier);
				}
				else {
					// xfer("f"+j, "b"+j);
					k.knit("-", "b"+j, carrier);
				}
			}
		}

		else { // if this is an odd row, go rightwards
			for (let j=0; j< width; j++){
				if (thisRow[j % thisRow.length] == 1) {
					// xfer("b"+j, "f"+j);
					k.knit("+", "f"+j, carrier);
				}
				else {
					// xfer("f"+j, "b"+j);
					k.knit("+", "b"+j, carrier);
				}
			}
		}
	}

	for (let j=width-1; j>=0; j--){
		// reset back bed knits to front
		if (thisRow[j % thisRow.length] == 0) {
			k.xfer("b"+j, "f"+j);
		}
	}

}

kp(testPattern);

k.outhook(carrier);

k.write('kp-pattern-test.k');












