import axios from "../../../http";
import SectionStore from './SectionsStore';
import urls from "../../../urls";

class Section {
	constructor(name) {
		this.id = null;
		this.name = name;
		this.title = null;
	}
}
