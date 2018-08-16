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


class Category {
  constructor(options) {
    this.id = options.id;
    this.slug = options.slug;
    this.name = new Name(options.name);
    this.description = new Description(options.description, 1000, 4);
    this.position = options.position;
    this.items = this.setItems(options.items);
  }

  setItems(items, lst = []) {
    items.forEach(item => {lst.push(new Item(item));});
    return lst
  }

}

class Item {
  constructor(options) {
    this.id = options.id;
    this.name = new Name(options.name);
    this.price = new Price(options.price);
    this.position = options.position;
    this.category = options.category;
    this.description = new Description(options.description, 200, 2);
    this.image = ((x) => GalleriesStore.getImage('Articles', x))(options.image)
  }
}

export {
  Category,
};
