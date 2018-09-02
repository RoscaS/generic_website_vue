import {Info, Settings} from 'luxon';
import {Day} from './Day';

Settings.defaultLocale = 'fr';

class OpeningHours {
	constructor() {
		this.init();
	}

	static get weekDays() { return Info.weekdays('long'); }

	init() {
		OpeningHours.weekDays.forEach((day, idx) => {
			this[day] = new Day(day, idx);
		});
	}

	get pretty() {
		let str = '';
		for (let day in this) str += `\n${this[day].pretty}`
		return str;
	}
}

export default new OpeningHours
