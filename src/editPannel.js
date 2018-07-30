import Vue from 'vue';


const EditPannel = new Vue({
  data: {
    component: null,
    loading: false,
    edit: false,

    dirty: false,

    //
    reOrder: false
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

    // check(component) {
    //   return component == this.component;
    // },
  }
});

export default EditPannel;

