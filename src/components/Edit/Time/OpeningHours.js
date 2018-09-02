import axios from "../../../http";
import Vue from 'vue';
import {Settings} from 'luxon';
import {Day} from './Day';

Settings.defaultLocale = 'fr';
const url = 'days/';


const OpeningHours = new Vue({
	name: 'OpeningHours',
	data: () => ({
		days: [],
	}),
	computed: {
		pretty() {
				let str = '';
				for (let day in this) str += `\n${this[day].pretty}`
				return str;
			}
	},
	methods: {
		fetchData() {
			axios.get(url).then(response => {
				response.data.forEach((day, idx) => {
					this.initData(day, idx)
				});
			})
		},
		initData(day, idx) {
			this.days.push(new Day(day, idx))
		}

	},
	created() {
		this.fetchData();
	}

});

export default OpeningHours
