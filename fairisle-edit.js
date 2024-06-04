var knitout = require('knitout');
k = new knitout.Writer({carriers:["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]});
k.addHeader('Machine','SWGXYZ');
k.addHeader('Gauge','15');
k.addHeader('Position','Center');

const {testPattern} = require('./pattern.js');

let startingRow = [0,0,0,0,0,0,0,0,0,0,0,0,0];

let carrierA = "3";
let carrierB = "6";
let height = 65;
let width = 65;
let Wmax = width-1; // max width
let Wmin = 0; // min width

//cast on front bed

k.inhook(carrierA);

for (let s = Wmax; s >= Wmin; s -= 1) {
	if ((Wmax - s) % 2 == 0) {
		k.tuck("-", 'f' + s, carrierA);
	}
}

for (let s = Wmin; s <= Wmax; s += 1) {
	if ((Wmax - s) % 2 !== 0) {
		k.tuck("+", 'f' + s, carrierA);
	}
}

//knit 2 plain rows
for (let s = Wmax; s >= Wmin; s -= 1) {
	k.knit("-", 'f' + s, carrierA);
}
for (let s = Wmin; s <= Wmax; s += 1) {
	k.knit("+", 'f' + s, carrierA);
}

k.releasehook(carrierA);
k.inhook(carrierB);

for (let s = Wmax; s >= Wmin; s -= 1) {
	k.knit("-", 'f' + s, carrierB);
}
for (let s = Wmin; s <= Wmax; s += 1) {
	k.knit("+", 'f' + s, carrierB);
}
k.releasehook(carrierB);

// Go through each row
//how to have it repeat based on my height and width??
function fairisle (pattern) {
	for (let i=0; i < height; i++) {
		let thisRow = pattern[i % pattern.length];
		// console.log(pattern);
		// console.log(i);
		let output = "";
		// In each row, go through each stitch
		if (i%2 == 0) {
			for (let j= width-1; j>=0; j--){
				// if the pattern says "1" at this location in the pattern, knit with carrierA; otherwise, carrierB
				// (all front bed knits)
				
				if (thisRow[j % thisRow.length] == 1) {
					k.knit("-", "f"+j, carrierA);
				}
				else{
					k.miss("-", "f"+j, carrierA);
				}
			}
			for (let j= width-1; j>=0; j--){
				// if the pattern says "1" at this location in the pattern, knit with carrierA; otherwise, carrierB
				// (all front bed knits)
				
				if (thisRow[j % thisRow.length] == 0) {
					k.knit("-", "f"+j, carrierB);
				}
				else{
					k.miss("-", "f"+j, carrierB);
				}
			}

		}

		else {
			for (let j=0; j< width; j++){
				// if the pattern says "1" at this location in the pattern, knit with carrierA; otherwise, carrierB
				// (all front bed knits)
				//let carrier = carrierB;
				if (thisRow[j % thisRow.length] == 1) {
					k.knit("+", "f"+j, carrierA);
				}
				else{
					k.miss("+", "f"+j, carrierA);
				}
			}
			for (let j=0; j< width; j++){
				// if the pattern says "1" at this location in the pattern, knit with carrierA; otherwise, carrierB
				// (all front bed knits)
				//let carrier = carrierB;
				if (thisRow[j % thisRow.length] == 0) {
					k.knit("+", "f"+j, carrierB);
				}
				else{
					k.miss("+", "f"+j, carrierB);
				}
				
			}
		}
	}
}


fairisle(testPattern);

k.outhook(carrierA);

k.outhook(carrierB);


k.write('fairisle-edit.k');











