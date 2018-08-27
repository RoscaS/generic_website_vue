<template>
  <transition name="bounceDown">
    <div class="card" v-if="editItem">

      <header class="card-header">
        <div class="card-image">
          <img :src="editItem.image">
        </div>
      </header>

      <div class="card-content">
        <div class="content">
          <p>{{ editItem.description }}</p>
          <b-field type="is-info" label="Description:">
            <b-input type="textarea" rows="2"
                     v-model="editItem.description"
                     :maxlength="100">
            </b-input>
          </b-field>
        </div>
      </div>

      <footer class="card-footer">
        <a class="card-footer-item no-tr validate"
           :disabled="edit.loading"
           @click="validate">
          <i class="fas fa-spinner fa-spin"
             v-if="edit.loading"></i>
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
  export default {
    name: "DescriptionPopup",
    props: {
      edit: {type: Object},
    },
    computed: {
      editItem() { return this.edit.editItem; }
    },
    methods: {
      validate() {
        this.edit.editItem.patch();
        this.edit.clearEditItem();
      },
      cancel() {
        this.edit.clearEditItem();
      },
    },
    destroyed() {
      this.edit.clearEditItem();
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .card {
    border-radius: 9px;
    position: absolute;
    z-index: 100;
    width: $article-width;
    /*width: 350px;*/
    top: 25%;
    left: 40.5%;

    -webkit-box-shadow: 15px 7px 41px 10px rgba(0, 0, 0, 0.65);
    -moz-box-shadow: 15px 7px 41px 10px rgba(0, 0, 0, 0.65);
    box-shadow: 15px 7px 41px 10px rgba(0, 0, 0, 0.65);

    .card-image {
      img {
        object-fit: cover;
        width: $article-width;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        /*width: 100%;*/
      }
    }
  }

  footer {
    .validate {
      color: $is-success;
      transition: background-color .2s, color .2s;
      border-bottom-left-radius: 8px;
      &:hover {
        transition: background-color .2s, color .2s;
        background-color: $is-success;
        color: white;
        border-bottom-left-radius: 8px;
      }
    }
    .cancel {
      transition: background-color .2s, color .2s;
      border-bottom-right-radius: 8px;
      &:hover {
        transition: background-color .2s, color .2s;
        background-color: $is-danger;
        color: white;
        border-bottom-right-radius: 8px;
      }
    }
  }

  i {
    font-size: 22px;
  }


</style>
