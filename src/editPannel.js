import Vue from 'vue';


const EditPannel = new Vue({
  data: {
    component: null,
    loading: false,
    edit: false,
  },

  methods: {
    startEdit(component) {
      this.component = component;
      this.edit = true;
    },

    endEdit() {
      this.edit = false;
      this.loading = false;
      setTimeout(() => { this.component = null; }, 1000);
    },

    check(component) {
      return component == this.component;
    },



    editMenu(selected, menu) {
      menu.forEach(i => {i.display = false;});
      selected.display = true;
    },

    getSelected(selected, menu) {
      return menu.find(i => i.name == selected);
    },

    highlight(sub, menu, name) {
      return (this.getSelected(sub, menu).display &&
        this.component == name) && this.edit;
    },


  }

});

export default EditPannel;

