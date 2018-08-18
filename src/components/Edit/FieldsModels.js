
class Field {
  constructor({data, label, type = null, len = null}) {
    this.data = data;
    this.label = label;
    this.type = type;
    this.len = len;
  }
}

// ARTICLES
class Name extends Field {
  constructor(name) {
    super({data: name, label: 'Nom', len: 30});
  }
}

class Price extends Field {
  constructor(price) {
    super({data: price, label: 'Prix', type: 'number'});
    this.min = 0;
  }
}

class Description extends Field {
  constructor(description, len, rows) {
    super({data: description, label: 'Description', type: 'textarea', len: len});
    this.rows = rows;
  }
}

// TEXTS

class Title extends Field {
  constructor(title) {
    super({data: title, label: 'Titre', len: 35})
  }
}

class SubTitle extends Field {
  constructor(subTitle, idx) {
    super({data: subTitle, label:`Sous titre ${idx}`, type: 'textarea', len: 100});
    this.rows = 2;
  }
}

class Text extends Field {
  constructor(text, idx) {
    super({data: text, label:`Texte ${idx}`, type: 'textarea', len: 400});
    this.rows = 3;
  }
}

class Icon extends Field {
  constructor(icon) {
    super({data: icon, label: 'Icone', len: 50})
  }
}

export {
  Field,
  Name,
  Price,
  Description,
  Title,
  SubTitle,
  Text,
  Icon,
}
