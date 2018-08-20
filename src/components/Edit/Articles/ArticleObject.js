import GalleriesStore from '../Galleries/GalleriesStore';
import {Name, Price, Description} from "../FieldsModels";


class Item {
  constructor(image) {
    this.id = image.id;
    this.name = new Name(image.name);
    this.price = new Price(image.price);
    this.position = image.position;
    this.category = image.category;
    this.description = new Description(image.description, 200, 2);
    this.image = this.getImage(image.image);
  }

  getImage(id) {
    try {
      let img = GalleriesStore.getImage('Articles', id);
      if (img) this.image = img;
    } catch (e) { setTimeout(() => { this.getImage(id); }, 100);}
  }
}

class Category {
  constructor(category) {
    this.id = category.id;
    this.slug = category.slug;
    this.name = new Name(category.name);
    this.description = new Description(category.description, 1000, 4);
    this.position = category.position;
    this.items = this.setItems(category.items);
  }

  setItems(items, lst = []) {
    items.forEach(i => {lst.push(new Item(i));});
    return lst;
  }
}


export {Category};
