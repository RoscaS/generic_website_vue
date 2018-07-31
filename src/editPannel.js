import Vue from 'vue';


const EditPannel = new Vue({
  data: {
    component: null,
    loading: false,
    edit: false,
    dirty: false,

    pushSignal: false,
    recoverSignal: false,

    image: '',

    reOrder: false
  },

  watch: {
    pushSignal() { setTimeout(() => { this.pushSignal = false; }, 10); },
    recoverSignal() { setTimeout(() => { this.recoverSignal = false; }, 10); },
  },


  methods: {
    startEdit(component) {
      this.component = component;
      this.edit = true;
    },

    endEdit() {
      this.edit = false;
      this.loading = false;
      setTimeout(() => {
        this.component = null;
      }, 1000);
    },
  }
});

export default EditPannel;

