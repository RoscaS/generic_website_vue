import GalleriesStore from "../Galleries/GalleriesStore";
import tools from '../../../utiles/tools';
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8000/';


function Title() {
  this.data = '';
  this.len = '35';
  this.label = 'Titre';
}

function SubTitle(label = 'Sous titre') {
  this.data = '';
  this.type = 'textarea';
  this.len = '200';
  this.rows = '2';
  this.label = label;
}

function Text(label = 'Texte', rows = 3) {
  this.data = '';
  this.type = 'textarea';
  this.len = '400';
  this.rows = rows;
  this.label = label;
}

function Icon() {
  this.data = '';
  this.label = 'Icone';
}

class Base {
  constructor() {
    this.backup = {};
  }

  setBackup() {
    for (let i in this.state) {
      this.backup[i] = this.state[i].data
    }
  }
  isDirty() {
    for (let i in this.state) {
      if (this.state[i].data !== this.backup[i]) {
        return true
      }
    }
    return false
  }
  update() {
    let data = {};
    for (let i in this.state) {
      if (i != 'image') data[i] = this.state[i].data;
      else data[i] = this.state[i].data.image;
    }
    axios.put(this.url, data)
    .then(() => {setTimeout(() => {tools.message('updated')}, 1500);})
  }
  recoverData() {
    for (let i in this.state) {
      this.state[i].data = this.backup[i];
    }
    tools.message('cancel')
  }
}

class WithImage extends Base {
  constructor() {
    super();
    this.gallery = null;
    this.hasLoaded = false;
  }
  setImage() {
    try {
      let gallery = GalleriesStore.getStore(this.name);
      if (gallery) {
        this.gallery = gallery;
        this.state.image = {data: this.gallery.images[0], label: 'Image'};
        this.hasLoaded = true;
      }
    } catch (e) {
      setTimeout(() => { this.setImage(); }, 100);}
  }
}

class Promo extends WithImage {
  constructor() {
    super();
    this.name = 'Promo';
    this.url = 'promo/1/';
    this.state = {
      title: new Title(),
      text: new Text(),
      image: {data: ''},
    };
  }
}

class Presentation extends WithImage {
  constructor() {
    super();
    this.name = 'Presentation';
    this.url = 'presentation/1/';
    this.state = {
      title: new Title(),
      sub_title: new SubTitle(),
      text1: new Text('Texte 1'),
      text2: new Text('Texte 2'),
      image: {data: ''},
    };
  };
}

class Events extends Base {
  constructor() {
    super();
    this.name = 'Events';
    this.url = 'events/1/';
    this.state = {
      title: new Title(),
      sub_title: new SubTitle(),
    };
  }
}

class Hero extends Base {
  constructor() {
    super();
    this.name = 'Hero';
    this.url = 'hero/1/';
    this.state = {
      icon1: new Icon(),
      icon2: new Icon(),
      icon3: new Icon(),
      title1: new Title(),
      title2: new Title(),
      title3: new Title(),
      text1: new Text(),
      text2: new Text(),
      text3: new Text(),
    };
    this.subs = [
      {
        label: 'Gauche',
        data: [this.state.title1, this.state.text1, this.state.icon1]
      },
      {
        label: 'Centre',
        data: [this.state.title2, this.state.text2, this.state.icon2]
      },
      {
        label: 'Droite',
        data: [this.state.title3, this.state.text3, this.state.icon3]
      },
    ];
  }
}

class Contact extends Base {
  constructor() {
    super();
    this.name = 'Contact';
    this.url = 'contact/1/';
    this.state = {
      title: new Title(),
      sub_title: new SubTitle('Sous titre 1'),
      sub_title2: new SubTitle('Sous titre 2'),
      sub_title3: new SubTitle('Sous titre 3'),
    };
  }
}

class Review extends Base {
  constructor() {
    super();
    this.name = 'Review';
    this.url = 'review/1/';
    this.state = {
      title: new Title(),
      sub_title: new SubTitle(),
      g_api: {data: ''},
      g_place_id: {data: ''},
      g_review_all_url: {data: ''},
      g_review_new_url: {data: ''},
      reviews: {data: ''},
    };
  }
}

function BuildTextsStores() {
  return [
    new Promo(),
    new Presentation(),
    new Events(),
    new Hero(),
    new Contact(),
    new Review(),
  ];
}

export default BuildTextsStores;
