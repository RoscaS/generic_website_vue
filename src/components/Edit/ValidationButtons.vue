<template>
  <div class="field is-grouped">
    <p class="control" :style="style">
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
    props: {
      edit: {type: Object},
      right: {type: String, default: '30px'},
      top: {type: String, default: '20px'},
    },
    data() {
      return {
        disable: false,
      };
    },
    computed: {
      loading: {
        get() { return this.edit.loading; },
        set(value) { this.edit.setLoading(value); }
      },
      style() {
        return {
          right: this.right,
          top: this.top,
        };
      },
    },
    methods: {
      validateBtn() {
        if (this.edit.$options.name == 'TextEditStore') {
          this.edit.sendPushSignal();
          this.checkLoading();
        } else {
          this.edit.sendUpdateSignal();
        }
      },
      cancelBtn() {
        this.edit.sendCancelSignal();
        this.disable = true;
        setTimeout(() => { this.disable = false; }, this.edit.timeout);
      },
      checkLoading() {
        if (this.loading) {
          setTimeout(() => { this.checkLoading(); }, 100);
        } else {
          this.edit.end();
        }
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  .control {
    z-index: 100;
    position: absolute;
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
