import GalleriesStore from '../Galleries/GalleriesStore';
import {Title, SubTitle, Text, Icon} from "../FieldsModels";


class Base {
  constructor(name) {
    this.name = name;
    this.url = `${name.toLowerCase()}/1/`;
    this.isDirty = false;
    this.backup = {};
  }
  getImage(id) {
    try {
      let img = GalleriesStore.getImage('misc', id);
      if (img) this.state.image = img;
    } catch (e) { setTimeout(() => { this.getImage(id); }, 100);}
  }
}

class Promo extends Base {
  constructor(section) {
    super(section.name);
    this.state = {
      title: new Title(section.title),
      text: new Text(section.text),
      image: this.getImage(section.image.id)
    }
  }
}

class Presentation extends Base {
  constructor(section) {
    super(section.name);
    this.state = {
      title: new Title(section.title),
      sub_title: new SubTitle(section.sub_title),
      text1: new Text(section.text1, 1),
      text2: new Text(section.text2, 2),
      image: this.getImage(section.image.id)
    }
  }
}

export {Promo, Presentation};
