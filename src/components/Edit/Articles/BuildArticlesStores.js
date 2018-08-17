import GalleriesStore from '../Galleries/GalleriesStore';


class Input {
  constructor({data, label, type = null, len = null}) {
    this.data = data;
    this.label = label;
    this.type = type;
    this.len = len;
  }
}

class Name extends Input {
  constructor(name) {
    super({data: name, label: 'Nom', len: 30});
  }
}

class Price extends Input {
  constructor(price) {
    super({data: price, label: 'Prix', type: 'number'});
    this.min = 0;
  }
}

class Description extends Input {
  constructor(description, len, rows) {
    super({data: description, label: 'Description', type: 'textarea', len: len});
    this.rows = rows;
  }
}


class Item {
  constructor(image) {
    this.id = image.id;
    this.name = new Name(image.name);
    this.price = new Price(image.price);
    this.position = image.position;
    this.category = image.category;
    this.description = new Description(image.description, 200, 2);
    this.image = ((x) => GalleriesStore.getImage('Articles', x))(image.image)
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
    return lst
  }
}



export {Category};
