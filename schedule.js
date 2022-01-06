const golfers = [
	{ name: 'Player One', carpool: '', teeTime: false },
	{ name: 'Player Two', carpool: 'Player Nine', teeTime: false },
	{ name: 'Player Three', carpool: '', teeTime: false },
	{ name: 'Player Four', carpool: '', teeTime: true },
	{ name: 'Player Five', carpool: 'Player Thirteen', teeTime: false },
	{ name: 'Player Six', carpool: '', teeTime: false },
	{ name: 'Player Seven', carpool: '', teeTime: false },
	{ name: 'Player Eight', carpool: '', teeTime: false },
	{ name: 'Player Nine', carpool: 'Player Two', teeTime: false },
	{ name: 'Player Ten', carpool: '', teeTime: true },
	{ name: 'Player Eleven', carpool: '', teeTime: false },
	{ name: 'Player Twelve', carpool: '', teeTime: false },
	{ name: 'Player Thirteen', carpool: 'Player Five', teeTime: false },
	{ name: 'Player Fourteen', carpool: '', teeTime: false },
	{ name: 'Player Fifteen', carpool: '', teeTime: false },
	{ name: 'Player Sixteen', carpool: '', teeTime: false },
	{ name: 'Player Seventeen', carpool: '', teeTime: false },
	{ name: 'Player Eighteen', carpool: '', teeTime: true },
	{ name: 'Player Nineteen', carpool: '', teeTime: false },
	{ name: 'Player Twenty', carpool: '', teeTime: false },
	{ name: 'Player Twentyone', carpool: '', teeTime: false },
	{ name: 'Player Twentytwo', carpool: '', teeTime: false },
	{ name: 'Player Twentythree', carpool: '', teeTime: false },
	{ name: 'Player TwentyFour', carpool: '', teeTime: true },
	{ name: 'Player TwentyFive', carpool: '', teeTime: false },
	{ name: 'Player TwentySix', carpool: '', teeTime: false },
	{ name: 'Player TwentySeven', carpool: '', teeTime: false },
	{ name: 'Player TwentyEight', carpool: '', teeTime: false },
	{ name: 'Player TwentyNine', carpool: '', teeTime: false },
	{ name: 'Player Thirty', carpool: '', teeTime: false },
	{ name: 'Player ThirtyOne', carpool: '', teeTime: false },
	{ name: 'Player ThirtyTwo', carpool: '', teeTime: true },
	{ name: 'Player ThirtyThree', carpool: '', teeTime: false },
	{ name: 'Player ThirtyFour', carpool: '', teeTime: false },
	{ name: 'Player ThirtyFive', carpool: '', teeTime: false },
	{ name: 'Player ThirtySix', carpool: '', teeTime: false },
	{ name: 'Player ThirtySeven', carpool: '', teeTime: false },
	{ name: 'Player ThirtyEight', carpool: '', teeTime: true },
	{ name: 'Player ThirtyNine', carpool: '', teeTime: false },
	{ name: 'Player Forty', carpool: '', teeTime: false },
	{ name: 'Player FortyOne', carpool: '', teeTime: false },
	{ name: 'Player FortyTwo', carpool: '', teeTime: false },
	{ name: 'Player FortyThree', carpool: '', teeTime: false },
	{ name: 'Player FortyFour', carpool: '', teeTime: false },
	{ name: 'Player FortyFive', carpool: '', teeTime: false },
	{ name: 'Player FortySix', carpool: '', teeTime: true },
	{ name: 'Player FortySeven', carpool: '', teeTime: false },
	{ name: 'Player FortyEight', carpool: '', teeTime: false },
	{ name: 'Player FORTYNINE', carpool: '', teeTime: false },
	{ name: 'Player FIFTY', carpool: '', teeTime: false },
	{ name: 'Player FIFTYONE', carpool: '', teeTime: false },
	{ name: 'Player FIFTYTWO', carpool: '', teeTime: true },
	{ name: 'Player FIFTYTHREE', carpool: '', teeTime: false },
];

const schedule = { startTime: '16:00:00' };

const course = { interval: 7, timeslots: 12 };

const randomizeGolfers = (golfers) => {
	let currentIndex = golfers.length,
		randomIndex;

	//While there remains elements to shuffle
	while (currentIndex !== 0) {
		//Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		//and swap it with the current element
		[golfers[currentIndex], golfers[randomIndex]] = [golfers[randomIndex], golfers[currentIndex]];
	}

	return golfers;
};

const addTimeInterval = (currTime, interval) => {
	let times = [0, 0, 0];
	let max = times.length;

	let a = currTime.split(':');
	let b = interval.split(':');

	//normalize values
	for (let i = 0; i < max; i++) {
		a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i]);
		b[i] = isNaN(parseInt(b[i])) ? 0 : parseInt(b[i]);
	}

	//store values
	for (let i = 0; i < max; i++) {
		times[i] = a[i] + b[i];
	}

	let hours = times[0];
	let minutes = times[1];
	let seconds = times[2];

	if (seconds >= 60) {
		let m = (seconds / 60) << 0;
		minutes += m;
		seconds -= 60 * m;
	}

	if (minutes >= 60) {
		let h = (minutes / 60) << 0;
		hours += h;
		minutes -= 60 * h;
	}

	return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
};

const testTime = (time) => {
	let times = [0, 0, 0];
	let max = times.length;

	let a = time.split(':');

	//normalize values
	for (let i = 0; i < max; i++) {
		a[i] = isNaN(parseInt(a[i])) ? 0 : parseInt(a[i]);
	}

	//store values
	for (let i = 0; i < max; i++) {
		times[i] = a[i];
	}

	let hours = times[0];
	let minutes = times[1];
	let seconds = times[2];

	if (hours >= 16 && minutes >= 30) {
		return true;
	} else {
		return false;
	}
};

const filterArray = (arr1, arr2) => {
	const filtered = arr1.filter((el) => {
		return arr2.indexOf(el) === -1;
	});
	return filtered;
};

generateSchedule(golfers, schedule, course);

function generateSchedule(golfers, schedule, course) {
	//Deterime Max Golfers
	const maxGolfers = course.timeslots * 4;

	//Create initial Variables
	const initialGolfers = golfers;
	const initialStartTime = schedule.startTime;
	const interval = '00:' + ('0' + course.interval).slice(-2) + ':00';

	//Create the Waiting List and Usuable Golfers Array
	let waitingList = [];
	let usableGolfers = [];

	//Create Final Array to be filled
	let finalTeeTimeArray = [];

	//More initial variables to be filled and changed
	let currTime = initialStartTime;
	let group = { teeTime: currTime, golfers: [] };
	let groupNum = 0;

	//Trim the list of golfers if there is more than the max number of golfers
	if (initialGolfers.length > maxGolfers) {
		while (initialGolfers.length > maxGolfers) {
			waitingList.push(initialGolfers[golfers.length - 1]);
			initialGolfers.pop();
		}
		usableGolfers = randomizeGolfers(golfers);
	} else {
		usableGolfers = randomizeGolfers(golfers);
	}

	//Make a first pass of the golfers to filter out those with a tee time restriction
	let teeTimeRestrictions = [];
	let unrestrictedGolfers = [];
	usableGolfers.forEach((golfer) => {
		golfer.teeTime ? teeTimeRestrictions.push(golfer) : unrestrictedGolfers.push(golfer);
	});

	//Start filling a new Golfer Array with unrestricted golfers until it passes the time restriction
	let timeTestPassed = false;
	let newGolferArray = [];
	unrestrictedGolfers.forEach((golfer, i) => {
		if (!timeTestPassed) {
			if (groupNum < 3) {
				console.log('Added to Array');
				newGolferArray.push(golfer);
				groupNum++;
			} else if (groupNum === 3) {
				console.log('Added to Array');
				newGolferArray.push(golfer);
				currTime = addTimeInterval(currTime, interval);
				console.log(currTime);
				const timeTest = testTime(currTime);
				if (timeTest) {
					timeTestPassed = true;
					console.log('It is Passed 4:30');
					//Once it is passed the time restriction of 4:30 combine the rest of the unrestricted golfers and restricted golfers, then randomize. Then add this one the end of the already scheduled golfers
					const combineArray = teeTimeRestrictions.concat(unrestrictedGolfers);
					console.log('Combine Array: ', combineArray);
					const filteredArray = filterArray(combineArray, newGolferArray);
					const randomFilteredArray = randomizeGolfers(filteredArray);
					newGolferArray = newGolferArray.concat(randomFilteredArray);
				} else {
					groupNum = 0;
					console.log('reset');
				}
			}
		}
	});

	//Reset the variables
	groupNum = 0;
	currTime = schedule.startTime;

	//Before setting final tee times will need to iterate through array and look for car pooling people. Once one is found, will need to find the matching person and splice them out of their current position (unless within 1-12 golfers away from original person) and splice them back in at a random interval (1-12) from original golfer to make sure they are within 3 tee times of eachother

	for (let i = 0; i < newGolferArray.length; i++) {
		let name = '';
		if (newGolferArray[i].carpool) {
			name = newGolferArray[i].carpool;
			const golferIndex = newGolferArray.findIndex((obj) => {
				if (obj.name === name) {
					return true;
				}

				return false;
			});

			if (golferIndex > i) {
				if (golferIndex > i + 11) {
					const newPosition = Math.floor(Math.random() * 11);
					const golferMoving = newGolferArray[golferIndex];
					newGolferArray.splice(golferIndex, 1);
					newGolferArray.splice(newPosition + i, 0, golferMoving);
				}
			}
		}
	}

	console.log('New Golfer Array: ', newGolferArray);

	//Finally iterate through the golfer array and place them in their tee time slots.
	newGolferArray.forEach((golfer, i) => {
		if (groupNum < 3) {
			group.golfers.push(golfer);
			groupNum++;
			if (i === newGolferArray.length - 1) {
				finalTeeTimeArray.push(group);
			}
		} else {
			group.golfers.push(golfer);
			currTime = addTimeInterval(currTime, interval);
			finalTeeTimeArray.push(group);
			group = { teeTime: currTime, golfers: [] };
			groupNum = 0;
		}
	});

	console.log('Tee times: ', finalTeeTimeArray);

	// return teeTimes;
}
