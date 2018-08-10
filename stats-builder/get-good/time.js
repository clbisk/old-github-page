/**
 * @name incTimeDiscrete
 * @description when you are a baby, actions take discrete time. as time passes, needs are lowered
 * @function
 * @param you
 * @param time - the amount of time that has passed
 */
function incTimeDiscrete( you, time ) {
	for (var need in you.needs) {
		you.decNeed(need, time);
	}
}

function incTimeContinuous() {
	var conversionFactor = 1; //1ms is 1 in game time
}