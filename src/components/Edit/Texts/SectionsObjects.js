import GalleriesStore from "../Galleries/GalleriesStore";
import { Title, SubTitle, Text, Icon } from "../FieldsModels";
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

  update() {
    let data = {};
    for (let i in this.state) {
      if (i != "image") data[i] = this.state[i].data;
      else data[i] = this.state[i].data.image;
    }
    axios.put(this.url, data).then(() => {
      setTimeout(() => {
        tools.message("updated");
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
      title: new Title(),
      text: new Text()
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
      text1: new Text(),
      text2: new Text(),
      text3: new Text()
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

class Review extends Base {
  constructor() {
    super();
    this.name = "Review";
    this.url = urls.review;
    this.state = {
      title: new Title(),
      sub_title: new SubTitle(),
      g_api: { data: "" },
      g_place_id: { data: "" },
      g_review_all_url: { data: "" },
      g_review_new_url: { data: "" },
      reviews: { data: "" }
    };
  }
}

export { Promo, Presentation, Events, Article, Hero, Contact, Review };
