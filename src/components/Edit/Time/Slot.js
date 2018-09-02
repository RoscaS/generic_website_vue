import {Interval} from 'luxon';
import {getTime} from './utils';


class Slot {
	constructor(from, to, day, idx) {
		this.interval = Slot.setInterval(from, to);
		this.index = idx;
		this.day = day;
	}

	get start() { return this.interval.start.toFormat('HH:mm'); }

	get end() { return this.interval.end.toFormat('HH:mm'); }

	static setInterval(from, to) {
		let start = getTime(from[0], from[1]);
		let end = getTime(to[0], to[1]);
		let slot = Interval.fromDateTimes(start, end);

		if (slot.invalid) {
			console.log(`Error (Slot.validate(): ${slot.invalid}`);
			return null;

		} else {
			return slot;
		}
	}

	get pretty() {
		let start = this.interval.start.toFormat('HH:mm');
		let end = this.interval.end.toFormat('HH:mm');
		return `${start} - ${end}`;
	}

	remove() {
		let index = this.day.slots.indexOf(this);
		this.day.removeSlot(index);
	}
}


export {Slot};
