import axios from "../../../http";
import {Interval} from 'luxon';
import {getTime} from './utils';
import Tools from "../../../utils/tools";

const url = 'slots/';


class Slot {
	constructor(from, to, day, id, idx) {
		this.interval = this.setInterval(from, to);
		this.index = idx;
		this.day = day;
		this.id = id;
	}

	get start() { return this.interval.start.toFormat('HH:mm'); }

	get end() { return this.interval.end.toFormat('HH:mm'); }

	get pretty() {
		let start = this.interval.start.toFormat('HH:mm');
		let end = this.interval.end.toFormat('HH:mm');
		return `${start} - ${end}`;
	}

	setInterval(from, to) {
		let start = getTime(from[0], from[1]);
		let end = getTime(to[0], to[1]);
		let slot = Interval.fromDateTimes(start, end);

		if (slot.invalid) {
			Tools.message('intervalIncoherent');

			return null;

		} else {
			return slot;
		}
	}

	getForm() {
		let formData = new FormData();
		formData.append("day", this.day.name);
		formData.append("start", this.interval.start.toISO());
		formData.append("end", this.interval.end.toISO());
		return formData;

	}

	postSlot() {
		axios
			.post(url, this.getForm())
			.then(response => {
				Tools.message('intervalNew');
				this.id = response.data.id;
			})
			.catch(error => {console.log(error)})
	}

	deleteSlot() {
		axios.delete(`${url}${this.id}/`).then(response => {console.log('deleted');});
	}

	remove() {
		let index = this.day.slots.indexOf(this);
		this.deleteSlot();
		this.day.removeSlot(index);
	}
}


export {Slot};
