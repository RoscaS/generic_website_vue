import urls from "../../../urls";
import axios from "../../../http";
import Vue from 'vue';
import {Settings} from 'luxon';
import {Day} from './Day';

Settings.defaultLocale = 'fr';

const TimeStore = new Vue({
	name: 'TimeStore',
	data: () => ({
		state: {
			days: [],
			selected: [],
			active: false,
		}
	}),
	computed: {
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
			});
		},
		initData(day, idx) {
			this.state.days.push(new Day(day, idx));
		},
		unselectAll() {
			this.state.days.forEach(i => {i.checked = false});
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
