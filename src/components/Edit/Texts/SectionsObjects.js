import GalleriesStore from "../Galleries/GalleriesStore";
import { Title, SubTitle, Text, Icon, Field } from "../FieldsModels";
import tools from "../../../utils/tools";
import urls from "../../../urls";
import axios from "../../../http";

class Base {
  constructor() {
    this.backup = {};
  }

  setBackup() {
    for (let i in this.state) {
      this.backup[i] = this.state[i].data;
    }
  }

  isDirty() {
    for (let i in this.state) {
      if (this.state[i].data !== this.backup[i]) {
        return true;
      }
    }
    return false;
  }

  update(message = true) {
    let data = {};
    for (let i in this.state) {
      data[i] = this.state[i].data;
    }
    axios.put(this.url, data).then(() => {
      setTimeout(() => {
        message ? tools.message("updated") : null;
      }, 1500);
    });
  }

  recoverData() {
    for (let i in this.state) {
      this.state[i].data = this.backup[i];
    }
    tools.message("cancel");
  }
}

class WithImage extends Base {
  constructor() {
    super();
    this.gallery = null;
    this.hasGallery = true;
    this.hasLoaded = false;
  }

  setGallery() {
    this.gallery = GalleriesStore.getStore(this.name);
    this.hasLoaded = true;
  }
}

class Promo extends WithImage {
  constructor() {
    super();
    this.name = "Promo";
    this.url = urls.promo;
    this.state = {
      title: new Title(22),
      text: new Text(200),
      label: new Field('Label', 18)
    };
  }
}

class Presentation extends WithImage {
  constructor() {
    super();
    this.name = "Presentation";
    this.url = urls.presentation;
    this.state = {
      title: new Title(),
      sub_title: new SubTitle(),
      text1: new Text("Texte 1"),
      text2: new Text("Texte 2")
    };
  }
}

class GenericSection extends WithImage {
  constructor(name) {
    super();
    this.isGeneric = true;
    this.name = name;
    this.url = `${urls.sections}${name}/`;
    this.state = {
      title: new Title(),
      sub_title: new SubTitle(),
      text1: new Text("Texte 1"),
      text2: new Text("Texte 2")
    };
  }
}

class Events extends Base {
  constructor() {
    super();
    this.name = "Events";
    this.url = urls.events;
    this.state = {
      title: new Title(),
      sub_title: new SubTitle()
    };
  }
}

class Article extends Base {
  constructor() {
    super();
    this.name = "Article";
    this.url = urls.article;
    this.state = {
      title: new Title(),
      sub_title: new SubTitle()
    };
  }
}

class Hero extends Base {
  constructor() {
    super();
    this.name = "Hero";
    this.url = urls.hero;
    this.state = {
      icon1: new Icon(),
      icon2: new Icon(),
      icon3: new Icon(),
      title1: new Title(),
      title2: new Title(),
      title3: new Title(),
      text1: new Text(200),
      text2: new Text(200),
      text3: new Text(200)
    };
    this.subs = [
      {
        label: "Gauche",
        data: [this.state.title1, this.state.text1, this.state.icon1]
      },
      {
        label: "Centre",
        data: [this.state.title2, this.state.text2, this.state.icon2]
      },
      {
        label: "Droite",
        data: [this.state.title3, this.state.text3, this.state.icon3]
      }
    ];
  }
}

class Contact extends Base {
  constructor() {
    super();
    this.name = "Contact";
    this.url = urls.contact;
    this.state = {
      title: new Title(),
      sub_title: new SubTitle("Sous titre 1"),
      sub_title2: new SubTitle("Sous titre 2"),
      sub_title3: new SubTitle("Sous titre 3")
    };
  }
}

class SiteInfo extends Base {
  constructor() {
    super();
    this.name = "SiteInfo";
    this.url = urls.siteInfo;
    this.state = {
      name: new Field("Nom", 25),
      name_add: new Field("Supplément", 15),
      oppening: new Field("Date d'ouverture", 4),
      adress: new Field("Adresse", 30),
      city: new Field("Ville", 30),
      post_code: new Field("CodePostal", 8),
      phone: new Field("Téléphone", 30),
      mail: new Field("Mail", 30)
    };
  }
}

class SiteContact extends Base {
  constructor() {
    super();
    this.name = "SiteContact";
    this.url = urls.siteContact;
    this.state = {
      facebook: new Field("Facebook", 1000),
      tripadvisor: new Field("Tripadvisor", 1000),
      google: new Field("Google", 1000),
      twitter: new Field("Twitter", 1000),
      instagram: new Field("Instagram", 1000),
      linkedin: new Field("Linkedin", 1000),
      snapchat: new Field("Snapchat", 1000)
    };
  }
}

class SiteOptions extends Base {
  constructor() {
    super();
    this.name = "SiteOptions";
    this.url = urls.siteOptions;
    this.state = {
      carousel_auto_scroll: { data: false },
      carousel_auto_scroll_speed: { data: 5000 },
      show_articles_price: {data: '' },
    };
    this.localOptions = {
      help_popups: true
    }
  }
}

export {
  Promo,
  Presentation,
  Events,
  Article,
  Hero,
  Contact,
  SiteInfo,
  SiteContact,
  SiteOptions,
  GenericSection
};
