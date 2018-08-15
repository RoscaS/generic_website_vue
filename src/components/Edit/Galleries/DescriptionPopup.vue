<template>
  <transition name="bounceDown">
    <div class="card popup" v-if="edit.selectedImage">
      <div class="card-image">
        <img :src="edit.selectedImage.url">
      </div>
      <div class="card-content">
        <div class="content">
          <p>{{ edit.selectedImage.description }}</p>
          <b-field type="is-info" label="Description:">
            <b-input type="text"
                     v-model="edit.selectedImage.description"
                     :maxlength="100">
            </b-input>
          </b-field>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item no-tr validate"
           :disabled="edit.loading"
           @click="validate">
          <i class="fas fa-spinner fa-spin" v-if="edit.loading"></i>
          <i class="far fa-check" v-else></i>
        </a>
        <a class="card-footer-item no-tr cancel"
           :disabled="edit.loading"
           @click="cancel">
          <i class="far fa-times"></i>
        </a>
      </footer>
    </div>
  </transition>
</template>

<script>
  import ValidationBtns from '../ValidationButtons';

  export default {
    name: "DescriptionPopup",
    components: {ValidationBtns},
    props: {
      edit: {type: Object},
    },
    methods: {
      validate() {
        this.edit.updateImage();
      },
      cancel() {
        this.edit.clearSelectedImage();
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .validation-btns {
    position: relative;
  }

  .popup {
    position: absolute;
    z-index: 100;
    width: 350px;
    top: 25%;
    left: 40.5%;

    -webkit-box-shadow: 15px 7px 41px 10px rgba(0, 0, 0, 0.65);
    -moz-box-shadow: 15px 7px 41px 10px rgba(0, 0, 0, 0.65);
    box-shadow: 15px 7px 41px 10px rgba(0, 0, 0, 0.65);
    .card-image {
      img {
        width: 100%;
      }
    }
  }

  .validate {
    color: $is-success;
    transition: background-color .2s, color .2s;
    &:hover {
      transition: background-color .2s, color .2s;
      background-color: $is-success;
      color: white;
    }
  }

  .cancel {
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


</style>
