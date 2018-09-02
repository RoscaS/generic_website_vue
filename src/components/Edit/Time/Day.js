import {Slot} from './Slot';
import {getTime} from './utils';


class Day {
	constructor(day, idx) {
		this.slots = [];
		this.name = day;
		this.index = idx;
		this.checked = false;
		this.min = getTime(0, 0);
		this.max = getTime(23, 59);
	}

	get count() { return this.slots.length; }

	get firstSlot() { return this.count ? this.slots[0] : null; }

	get lastSlot() { return this.count ? this.slots[this.count - 1] : null; }

	upper() {
		return this.name[0].toUpperCase() + this.name.slice(1, this.name.length);
	}

	setSlot(from, to) {
		let slot = new Slot(from, to, this, this.count -1);
		if (slot.interval) {
			if (!this.count || this.isValid(slot)) {
				this.slots.push(slot);
				this.setMinMax();
			}
		}
	}

	isValid(slot) {
		for (let i of this.slots) {
			if (slot.interval.overlaps(i.interval)) {
				console.log(`Error (Day.isValid(): slot overlap`);
				return false;
			}
		}
		return true;
	}

	setMinMax() {
		this.min = this.lastSlot.interval.end;
		this.max = getTime(23, 59);
		// this.max = this.firstSlot.interval.start;
	}

	removeSlot(idx) {
		// delete this.slots[idx];
		console.log(this.pretty)
		this.slots.splice(idx, 1)
		console.log(this.pretty)
	}

	get pretty() {
		let l = x => x.length < 8 ? ' '.repeat(8 - x.length) : '';
		let str = `${this.name}:${l(this.name)}\t`;
		this.slots.forEach(i => str += `${i.pretty}\t`);
		return str;
	}
}

export {Day};
