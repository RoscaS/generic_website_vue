<template>
  <div class="field is-grouped">
    <div class="control">
      <div class="button is-success"
           :disabled="loading"
           @click="validateBtn">
        <i class="fas fa-spinner fa-spin" v-if="loading"></i>
        <i class="far fa-check" v-else></i>
      </div>
      <div class="button is-danger"
           :disabled="loading"
           @click="cancelBtn">
        <i class="far fa-times"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ValidationButtons",
    props: {
      loading: {type: Boolean},
    },
    data() {
      return {
        disable: false,
      };
    },
    methods: {
      validateBtn() {
        this.$emit('validate');
      },
      cancelBtn() {
        this.$emit('cancel');
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  .control {
    z-index: 100;
    .button {
      padding: 0 21px 0 21px;
      width: 30px;
      height: 30px;
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

  }

</style>
