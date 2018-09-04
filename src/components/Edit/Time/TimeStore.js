import urls from "../../../urls";
import axios from "../../../http";
import Vue from 'vue';
import {DateTime, Settings} from 'luxon';
import {Day} from './Day';

Settings.defaultLocale = 'fr';

const TimeStore = new Vue({
	name: 'TimeStore',
	data: () => ({
		state: {
			days: [],
			selected: [],
			active: false,
			hasLoaded: false,
		}
	}),
	computed: {
		now() {
			let now = DateTime.local();
			return DateTime.local(2000, 1, 1, now.hour, now.minute);
		},
		today() {
			let today = DateTime.local().weekdayLong;
			return this.state.days.find(i => i.name === today);
		},
		isOpen() {
			let slot = this.today.slots[0];
			while (slot) {
				if (slot.interval.contains(this.now)) return slot.start;
				slot = slot.next;
			}
			return false;
		},
		nextTimeOpen() {
			const initial = this.today.name;
			let iterator = this.today;

			do {
				let slot;
				if (iterator.count) {
					slot = iterator.slots[0];

					do {
						if (slot.interval.isAfter(this.now)) {

							return slot;
						}
						slot = slot.next;

					} while (slot);
				}
				iterator = iterator.next;

			} while (iterator.name !== initial);

			return null;
		},
		pretty() {
			let str = '';
			this.state.days.forEach(i => {str += `\n${i.pretty}`;});
			return str;
		}
	},
	methods: {
		fetchData() {
			axios.get(urls.days).then(response => {
				response.data.forEach((day, idx) => {
					this.initData(day, idx);
				});
				this.state.hasLoaded = true;
			});
		},
		initData(day, idx) {
			this.state.days.push(new Day(day, idx));
		},
		unselectAll() {
			this.state.days.forEach(i => {i.checked = false;});
		},
		start() {
			this.state.active = true;
		},
		end() {
			this.unselectAll();
		}

	},
	created() {
		this.fetchData();
	}

});

export default TimeStore;
