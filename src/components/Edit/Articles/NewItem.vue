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

      <header class="card-header"
              v-if="newItem == 'article' && !edit.state.tempImage">
        <div class="article">
          <div class="drop-zone">
            <Upload @file="uploadImage" padding="45px"/>
          </div>
          <a class="show-stock no-tr">Afficher le stock</a>
        </div>
      </header>

      <header class="card-header" v-if="edit.state.tempImage">
        <div class="card-image">
          <img :src="edit.state.tempImage.image">
        </div>
      </header>


      <div class="card-content">
        <div class="content">

          <b-field grouped v-if="newItem == 'article'">
            <b-field type="is-info">
              <b-select placeholder="Catégorie"
                        @input="selectCat">
                <option v-for="cat in categories"
                        :value="cat"
                        :key="cat.id">
                  {{ cat.name }}
                </option>
              </b-select>
            </b-field>

            <b-field type="is-info" style="width:180px">
              <b-input placeholder="Prix"
                       type="number"
                       :min="0"
                       :step=".01"
                       v-model="price">
              </b-input>
            </b-field>
          </b-field>

          <b-field type="is-info">
            <b-input v-model="name"
                     placeholder="Nom"
                     :maxlength="30">
            </b-input>
          </b-field>

          <b-field type="is-info">
            <b-input type="textarea" rows="2"
                     placeholder="Description"
                     v-model="description"
                     :maxlength="200">
            </b-input>
          </b-field>
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
  import Upload from "../Upload";

  export default {
    name: "newItem",
    components: {Upload},
    data: () => ({
      name: '',
      description: '',
      price: '',
      category: '',
      file: '',
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
      selectCat(value) {
        this.category = value;
      },
      uploadImage(file) {
        let formData = new FormData();
        formData.append('name', 'tempArticleImage');
        formData.append('image', file);
        formData.append('gallery', 'Articles');
        this.edit.uploadImage(formData);
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
        this.price = '';
        this.category = '';
        this.file = '';
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
        let category = this.edit.getStore(this.category.name);
        category.postArticle({
          name: this.name,
          description: this.description,
          price: this.price,
          category: this.category.name,
          image: this.edit.state.tempImage.id
        });
        this.name = '';
        this.description = '';
        this.price = 0;
        this.category = '';
        this.file = '';
      }
    },
  };
</script>
<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .card {
    position: absolute;
    z-index: 100;
    width: $article-width;
    left: 40.7%;
    border-radius: 9px;

    header {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;

      .card-header-icon {
        font-size: 24px;
        cursor: default;
        color: white;
      }

      &.category {
        opacity: 1;
        background-color: #167DF0;

        .card-header-title {
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;

          p {
            font-weight: normal;
            font-size: 26px;
            color: white;
          }
        }

      }
      .article {
        width: $article-width;
        height: $article-height;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
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
        }
      }
      .card-image {
        img {
          object-fit: cover;
          width: $article-width;
          height: $article-height;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
      }
    }
    .card-content {
      padding-top: 35px;
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
  }
</style>
