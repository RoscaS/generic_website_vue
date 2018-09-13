// TEXTS

class Title {
  constructor(len = 35) {
    this.data = "";
    this.len = len;
    this.label = "Titre";
  }
}

class SubTitle {
  constructor(label = "Sous titre") {
    this.data = "";
    this.type = "textarea";
    this.len = 200;
    this.rows = "2";
    this.label = label;
  }
}

class Text {
  constructor(label = "Texte", rows = 4) {
    this.data = "";
    this.type = "textarea";
    this.len = 400;
    this.rows = rows;
    this.label = label;
  }
}

class Icon {
  constructor() {
    this.data = "";
    this.label = "Icone";
  }
}

// OPTIONS

class Field {
  constructor(label, len) {
    this.data = "";
    this.label = label;
    this.len = len;
  }
}

// ARTICLES

class Name {
  constructor(data) {
    this.data = data;
    this.len = 30;
    this.label = "Nom";
  }
}

class Price {
  constructor(data) {
    this.data = data;
    this.type = "number";
    this.label = "Prix";
  }
}

class Description {
  constructor(data, len = 200, rows = 2) {
    this.data = data;
    this.type = "textarea";
    this.len = len;
    this.rows = rows;
    this.label = "Description";
  }
}

export { Title, SubTitle, Text, Icon, Field, Name, Price, Description };
