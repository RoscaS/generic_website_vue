<template>
  <div class="field is-grouped">
    <p class="control">
      <button class="button is-success"
              :class="{'is-loading': loading}"
              :disabled="loading"
              @click="validateBtn">
        <i class="far fa-check"></i>
      </button>
      <button class="button is-danger"
              :disabled="disable || loading"
              @click="cancelBtn">
        <i class="far fa-times"></i>
      </button>
    </p>
  </div>
</template>

<script>

  export default {
    name: "ValidationButtons",
    data() {
      return {
        edit: this.$Global.EditPannel,

        disable: false,
        timeout: 5000,
      };
    },
    computed: {
      loading: {
        get() { return this.edit.loading; },
        set(value) { this.edit.loading = value; }
      }
    },
    methods: {
      validateBtn() {
        if (this.edit.dirty) {
          this.disable = false;
          this.edit.pushSignal = true;
          this.loading = true;
          this.checkLoading();
        } else {
          this.edit.end();
        }
      },
      cancelBtn() {
        if (this.edit.dirty) {
          this.disable = true;
          setTimeout(() => {this.disable = false;}, this.timeout);
          this.snackBar();
        } else {
          this.edit.end();
        }
      },
      checkLoading() {
        this.loading ? setTimeout(() => { this.checkLoading(); }, 100)
                     : this.edit.end();
      },
      snackBar() {
        this.$snackbar.open({
          message: 'Les modifications seront perdues.',
          type: 'is-warning',
          position: 'is-top',
          actionText: 'Continuer?',
          duration: this.timeout,
          indefinite: false,
          onAction: () => {
            this.edit.recoverSignal = true;
            this.disable = false;
            this.edit.end();
          }
        });
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .control {
    position: absolute;
    right: 30px;
    top: 20px;
    button {
      &:first-child {
        transition: background-color .2s, color .2s;
        margin-right: 10px;
        &:hover {
          transition: background-color .2s, color .2s;
          background-color: $is-success;
          color: white;
        }
      }
      &:last-child {
        transition: background-color .2s, color .2s;
        margin-right: 10px;
        &:hover {
          transition: background-color .2s, color .2s;
          background-color: $is-danger;
          color: white;
        }
      }
      i {
        font-size: 22px;
      }
    }

    @media screen and (max-width: 1089px) {
      top: auto;
      bottom: 20px;
    }
  }

</style>
