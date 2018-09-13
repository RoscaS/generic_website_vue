import Vue from "vue";
import axios from "../../../http";

const SectionsStore = new Vue({
	data: () => ({
		name: "SectionsStore",
		state: {
			stores: [],
			activeTab: 0,
			loading: false,
			active: null,
			editItem: null,
		}
	}),
	computed: {

	},
	methods: {

	},
});

export default SectionsStore;
