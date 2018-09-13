<template>
  <b-modal :active.sync="modalSync"
           scroll="clip"
           has-modal-card>
    <TimeEditMenu/>
  </b-modal>
</template>

<script>
import TimeStore from "./TimeStore";
import TimeEditMenu from "./TimeEditMenu";

export default {
  name: "TimeModal",
  components: { TimeEditMenu },
  computed: {
    edit() {
      return TimeStore;
    },
    selected: {
      get() {
        return this.edit.state.selected;
      },
      set(value) {
        this.edit.state.selected = value;
      }
    },
    modalSync: {
      get() {
        return this.edit.state.active;
      },
      set(value) {
        this.edit.state.active = value;
      }
    }
  },
  watch: {
    modalSync(value) {
      if (value) {
        setTimeout(() => {
          this.$snackbar.open({
            message:
              "Sélectionnez un ou plusieurs jours pour en éditer l'horaire.",
            type: "is-success",
            position: "is-top",
            queue: false,
            actionText: "Ok",
            duration: 10000
          });
        }, 500);
      } else {
        this.selected = [];
        this.edit.end();
      }
    }
  }
};
</script>

<style scoped>
</style>
