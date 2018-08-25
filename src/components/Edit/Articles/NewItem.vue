<template>
  <transition name="bounceDown">
    <div class="card" v-if="newItem" :style="setStyle()">


      <header class="card-header category level" v-if="newItem == 'category'">
        <div class="card-header-title">
          <p>Nouvelle Catégorie</p>
        </div>
        <div class="card-header-icon">
          <i class="fal fa-pen"></i>
        </div>
      </header>

      <header class="card-header" v-if="newItem == 'article' && !edit.state.tempImage">
        <div class="article">
          <div class="drop-zone">
            <Upload @file="uploadImage"/>
            <!--<Upload @file="setFile"/>-->
          </div>
          <a class="show-stock no-tr">Afficher le stock</a>
        </div>
      </header>

      <div class="card-image" v-if="edit.state.tempImage">
        <!--<p>Article</p>-->
        <!--<i class="fal fa-pen"></i>-->
        <img :src="edit.state.tempImage.image">
      </div>


      <div class="card-content">
        <div class="content">
          <b-field class="fieldStyle"
                   type="is-info" label="Nom:">
            <b-input v-model="name"
                     :maxlength="30">
            </b-input>
          </b-field>
          <b-field class="fieldStyle" type="is-info"
                   label="Description:">
            <b-input type="textarea" rows="2"
                     v-model="description"
                     :maxlength="200">
            </b-input>
          </b-field>
          <div v-if="newItem == 'article'">
            <b-field label="Catégorie">
              <b-select placeholder="Select a name" v-model="category">
                <option
                  v-for="cat in categories"
                  :value="cat"
                  :key="cat.id">
                  {{ cat.name.data }}
                </option>
              </b-select>
            </b-field>
            <b-field class="fieldStyle" label="Prix:" type="is-info">
              <b-input type="number" :min="0" :step=".01"
                       v-model="price">
              </b-input>
            </b-field>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item no-tr validate"
           :disabled="edit.loading"
           @click="validate()">
          <i class="fas fa-spinner fa-spin" v-if="edit.loading"></i>
          <i class="far fa-check" v-else></i>
        </a>
        <a class="card-footer-item no-tr cancel"
           :disabled="edit.loading"
           @click="end()">
          <i class="far fa-times"></i>
        </a>
      </footer>
    </div>
  </transition>
</template>

<script>
  import CategoriesStore from "./CategoriesStore";
  import Upload from "./Upload";

  export default {
    name: "newItem",
    components: {Upload},
    data: () => ({
      name: '',
      description: '',
      price: 0,
      category: '',
      file: null,
    }),
    computed: {
      edit() {return CategoriesStore;},
      categories() {return this.edit.state.stores;},
      newItem: {
        get() {return this.edit.state.newItem;},
        set(value) {this.edit.state.newItem = value;}
      },
    },
    methods: {
      uploadImage(file) {
        this.edit.uploadImage(file)
      },
      setStyle() {
        if (this.newItem == 'article') return {top: '10%'};
        else return {top: '15%'};
      },
      validate() {
        if (this.newItem == 'article') this.createArticle();
        else this.createCategory();

      },
      end() {
        this.name = '';
        this.description = '';
        this.price = 0;
        this.category = '';
        this.file = null;
        this.edit.clearNewItem();
        if (this.edit.state.tempImage) {
          this.edit.state.tempImage.delete(false);
          this.edit.state.tempImage = null;
        }
      },

      createCategory() {
        this.edit.createCategory({
          slug: this.name,
          name: this.name,
          description: this.description,
        });
      },

      createArticle() {
        let category = this.edit.getStore(this.category.name.data);
        category.postArticle({
          name: this.name,
          description: this.description,
          price: this.price,
          category: this.category.name.data,
          image: this.edit.state.tempImage.id
        });
        this.name = '';
        this.description = '';
        this.price = 0;
        this.category = '';
        this.file = null;
      }
    },
  };
</script>
<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .card {
    position: absolute;
    z-index: 100;
    width: 350px;
    /*left: 37%;*/
    left: 40.7%;

    .fieldStyle {
      margin-bottom: -10px;
    }

    .category {
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
        font-size: 22px;
        color: white;
        cursor: default;
      }
    }

    .article {
      background-color: #ccc;

      .drop-zone {
        padding: 20px;
        padding-bottom: 10px;
      }

      .show-stock {
        color: #167DF0;
        font-size: 16px;
        padding-left: 21px;
        margin-top: -40px;

        &:hover {
          color: $link-hover;
        }
        /*position: absolute;*/
      }
    }

    .card-content {
      padding-top: 35px;
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
  }

</style>
