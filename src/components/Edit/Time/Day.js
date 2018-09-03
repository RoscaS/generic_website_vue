import {Slot} from './Slot';
import {DateTime} from 'luxon';
import {getTime} from './utils';
import TimeStore from './TimeStore';
import Tools from "../../../utils/tools";


class Day {
	constructor(day, idx) {
		this.slots = [];
		this.name = day.name;
		this.index = idx;
		this.checked = false;
		this.min = getTime(0, 0);
		this.max = getTime(23, 59);
		this.initSlots(day.slots);
	}

	get count() { return this.slots.length; }

	get firstSlot() { return this.count ? this.slots[0] : null; }

	get lastSlot() { return this.count ? this.slots[this.count - 1] : null; }

	get next() {
		if (this.index === 6) return TimeStore.state.days[0];
		else return TimeStore.state.days[this.index + 1];
	}

	get prev() {
		if (this.index === 0) return TimeStore.state.days[6];
		else return TimeStore.state.days[this.index - 1];
	}

	upper() {
		return this.name[0].toUpperCase() + this.name.slice(1, this.name.length);
	}

	initSlots(slots) {
		slots.forEach(slot => {
			let start = DateTime.fromISO(slot.start);
			let end = DateTime.fromISO(slot.end);
			let from = [start.hour, start.minute];
			let to = [end.hour, end.minute];
			this.slots.push(new Slot(from, to, this, slot.id, this.count));
			this.setMinMax();
		});
	}

	setSlot(from, to) {
		let slot = new Slot(from, to, this, this.count -1);
		if (slot.interval) {
			if (!this.count || this.isValid(slot)) {
				this.slots.push(slot);
				slot.postSlot();
				this.setMinMax();
			}
		}
	}

	isValid(slot) {
		for (let i of this.slots) {
			if (slot.interval.overlaps(i.interval)) {
				Tools.message('intervalOverlap');
				return false;
			}
		}
		return true;
	}

	setMinMax() {
		this.min = this.lastSlot.interval.end;
		this.max = getTime(23, 59);
	}

	removeSlot(idx) {
		this.slots.splice(idx, 1)
	}

	get pretty() {
		let l = x => x.length < 8 ? ' '.repeat(8 - x.length) : '';
		let str = `${this.name}:${l(this.name)}\t`;
		this.slots.forEach(i => str += `${i.pretty}\t`);
		return str;
	}
}

export {Day};
