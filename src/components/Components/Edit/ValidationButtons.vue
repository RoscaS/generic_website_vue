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
      root() { console.log('ici'); return this.$parent.$parent; },
      dirty: {
        get() { return this.edit.dirty; },
        set(value) { this.edit.dirty = value; }
      },
      loading: {
        get() { return this.edit.loading; },
        set(value) { this.edit.loading = value; }
      }
    },

    methods: {
      validateBtn() {
        if (this.dirty) {
          this.disable = false;
          this.root.pushData();
        }
        // this.loading = !this.loading;
        this.loading = true;
        this.checkLoading();
      },

      cancelBtn() {
        if (this.dirty) {
          this.disable = true;
          setTimeout(() => {this.disable = false;}, this.timeout);
          this.storeIsDirty();
          return;
        }
        this.edit.endEdit();
      },

      checkLoading() {
        this.loading ? setTimeout(() => { this.checkLoading(); }, 100)
                     : this.edit.endEdit();
      },

      storeIsDirty() {
        this.$snackbar.open({
          message: 'Les modifications seront perdues.',
          type: 'is-warning',
          position: 'is-top',
          actionText: 'Continuer?',
          duration: this.timeout,
          indefinite: false,
          onAction: () => {
            this.root.recoverData();
            this.disable = false;
            this.edit.endEdit();
          }
        });
      },
    },
    destroyed() {
      // this.root.menu.forEach(i => i.display = false);
      // this.root.activeTab = 0;
    }
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
