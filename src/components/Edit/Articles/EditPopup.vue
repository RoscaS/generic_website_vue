<template>
  <transition name="bounceDown">
    <div class="card popup" v-if="editPopup" :style="setStyle()">
      <header class="card-header level" v-if="!isArticle">
        <div class="card-header-title">
          <p>Catégorie</p>
        </div>
        <div class="card-header-icon">
          <i class="fal fa-pen"></i>
        </div>
      </header>
      <div class="card-image" v-else>
        <p>Article</p>
        <i class="fal fa-pen"></i>
        <img :src="editPopup.image.image">
      </div>
      <div class="card-content">
        <div class="content">
          <b-field type="is-info" label="Nom:">
            <b-input v-model="editPopup.name.data"
                     size="is-large"
                     :maxlength="editPopup.name.len"></b-input>
          </b-field>
          <b-field type="is-info" label="Description:">
            <b-input type="textarea" rows="1"
                     v-model="editPopup.description.data"
                     :maxlength="editPopup.description.len">
            </b-input>
          </b-field>
          <b-field type="is-info" label="Prix:" v-if="isArticle">
            <b-input type="number" :min="0" :step=".01"
                     v-model="editPopup.price.data">
            </b-input>
          </b-field>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item no-tr validate"
           :disabled="edit.state.loading"
           @click="validate">
          <i class="fas fa-spinner fa-spin" v-if="edit.state.loading"></i>
          <i class="far fa-check" v-else></i>
        </a>
        <a class="card-footer-item no-tr cancel"
           :disabled="edit.state.loading"
           @click="cancel">
          <i class="far fa-times"></i>
        </a>
      </footer>
    </div>
  </transition>
</template>

<script>
	export default {
		name: "EditPopup",
    props: {
      edit: {type: Object},
    },
    computed: {
		  isArticle() {return this.edit.state.editPopup.type == 'article'},
      editPopup() {return this.edit.state.editPopup},
    },
    methods: {
		  setStyle() {
		    if (this.editPopup.type == 'article') return {top: '10%'};
        else return {top: '25%'};
      },
      validate() {
		    if (this.editPopup.type == 'article') this.edit.state.editPopup.patch();
		    else this.edit.state.editPopup.put();
        this.edit.clearEditPopup();
      },
      cancel() {
        this.edit.clearEditPopup();
      },
    },
    destroyed() {
      this.edit.clearEditPopup();
    }
	};
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .card-header {
    opacity: 1;
    background-color: #167DF0;

    .card-header-title {
      p {
        font-weight: normal;
        font-size: 26px;
        color: white;

      }
    }
    .card-header-icon {
      color: white;
      cursor: default;
    }
  }

  .card-image {
    p {
      color: white;
      position: absolute;
      font-size: 30px;
      top: 10px;
      left: 10px;
    }
    i {
      color: white;
      position: absolute;
      font-size: 30px;
      top: 10px;
      right: 10px;
    }
  }

  .card-content {
    padding-top: 0;
  }

  .validation-btns {
    position: relative;
  }

  .popup {
    position: absolute;
    z-index: 100;
    width: 350px;
    left: 37%;
    /*left: 40.5%;*/

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
