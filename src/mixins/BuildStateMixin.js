export default {
  // name: "Presentation",
  methods: {
    Title() {
      this.data = '';
      this.len = '35';
      this.label = 'Titre';
    },

    SubTitle(label = 'Sous titre') {
      this.data = '';
      this.type = 'textarea';
      this.len = '200';
      this.rows = '2';
      this.label = label;
    },

    Text(label = 'Texte', rows = 4) {
      this.data = '';
      this.type = 'textarea';
      this.len = '400';
      this.rows = rows;
      this.label = label;
    },

    Image() {
      this.data = '';
      this.label = 'Image';
    },

    Icon() {
      this.data = '';
      this.label = 'Icone'
    }
  },
};

