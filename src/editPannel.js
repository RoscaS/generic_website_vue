import Vue from 'vue';


const EditPannel = new Vue({
  data: {
    component: null,
    edit: false,
  },

  methods: {
    startEdit(component) {
      this.component = component;
      this.edit = true;
    },

    endEdit() {
      this.edit = false;
      setTimeout(() => {
        this.component = null;
      }, 1000);
    },

    check(component) {
      if (this.edit) {
        // console.log(`
        // Check called from: ${component}
        // Current component: ${this.component}
        // => ${component == this.component}
        // `);
      }
      return component == this.component;
    }
  }

});

export default EditPannel;
