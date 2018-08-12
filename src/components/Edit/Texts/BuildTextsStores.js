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

function Text(label = 'Texte', rows = 4) {
  this.data = '';
  this.type = 'textarea';
  this.len = '400';
  this.rows = rows;
  this.label = label;
}

function Image() {
  this.data = '';
  this.label = 'Image';
}

function Icon() {
  this.data = '';
  this.label = 'Icone';
}


function Promo() {
  this.related = 'Promo';
  this.url = 'promo/1/';
  this.isDirty = false;
  this.backup = {};
  this.state = {
    title: new Title(),
    text: new Text(),
    image: new Image()
  };
}

function Presentation() {
  this.related = 'Presentation';
  this.url = 'presentation/1/';
  this.isDirty = false;
  this.backup = {};
  this.state = {
    title: new Title(),
    sub_title: new SubTitle(),
    text1: new Text('Texte 1'),
    text2: new Text('Texte 2'),
    image: new Image()
  };
}

function Events() {
  this.related = 'Events';
  this.url = 'gallery/1/';
  this.isDirty = false;
  this.backup = {};
  this.state = {
    title: new Title(),
    sub_title: new SubTitle(),
  };
}

function Hero() {
  this.related = 'Hero';
  this.url = 'hero/1/';
  this.isDirty = false;
  this.backup = {};
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
    {label: 'Gauche', data: [this.state.title1, this.state.text1,  this.state.icon1]},
    {label: 'Centre', data: [this.state.title2, this.state.text2,  this.state.icon2]},
    {label: 'Droite', data: [this.state.title3, this.state.text3,  this.state.icon3]},
  ];
}

function Review() {
  this.related = 'Review';
  this.url = 'review/1/';
  this.isDirty = false;
  this.backup = {};
  this.state = {
    title: new Title(),
    sub_title: new SubTitle(),
    g_api: {data: ''},
    g_place_id: {data: ''},
    g_review_all_url: {data: ''},
    g_review_new_url: {data: ''},
  };
}

function BuildTextsStores() {
  return [
    new Promo(),
    new Presentation(),
    new Events(),
    new Hero(),
    new Review(),
  ];
}

export default BuildTextsStores;
