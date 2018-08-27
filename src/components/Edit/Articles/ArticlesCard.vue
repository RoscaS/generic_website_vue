<template>
  <transition name="bounceDown">
    <div class="card" v-if="is.edit || is.create" :style="setPosition()">

      <header :style="setBackground()">
        <div v-if="is.article && is.create && !tempImage" class="card-upload">
          <div class="drop-zone">
            <Upload @file="uploadImage" :padding="'40px'"/>
          </div>
          <a class="show-stock no-tr">Afficher le stock</a>
        </div>

        <div v-else
             :class="{'card-image': is.article, 'card-header': is.category}">
          <p class="card-header-title">{{ title }}</p>
          <i class="card-header-icon far" :class="icon"></i>
          <img v-if="is.article"
               :src="is.edit ? editItem.image.image : tempImage.image">
        </div>
      </header>

      <div class="card-content">
        <v-text-field required v-model="data.name" color="blue" label="Nom"
                      :counter="30" :disabled="edit.loading"
                      :loading="edit.loading">
        </v-text-field>

        <v-textarea auto-grow v-model="data.description" color="blue"
                    :counter="200" rows="0" label="Description"
                    :disabled="edit.loading" :loading="edit.loading">
        </v-textarea>

        <div class="is-pulled-right categories">
          <b-field grouped v-if="is.article && is.create" type="is-dark">
            <b-select placeholder="Catégorie"
                      @input="selectCat" :disabled="edit.loading">
              <option v-for="cat in categories" :value="cat" :key="cat.id">
                {{ cat.name }}
              </option>
            </b-select>
          </b-field>
        </div>

        <v-text-field v-if="is.article" required v-model="data.price"
                      color="blue" type="number" label="Prix" :min="0"
                      :step=".01" :disabled="edit.loading"
                      :loading="edit.loading">
        </v-text-field>
      </div>

      <footer class="card-footer">
        <div class="card-footer-item"
             :disabled="edit.loading" @click="validate">
          <i v-if="edit.loading" class="fas fa-spinner fa-spin"></i>
          <i v-else class="fal fa-check"></i>
        </div>
        <div class="card-footer-item"
             :disabled="edit.loading" @click="cancel">
          <i class="fal fa-times"></i>
        </div>
      </footer>

    </div>
  </transition>
</template>

<script>
  import CategoriesStore from "./CategoriesStore";
  import Upload from "../Upload";

  export default {
    name: "ArticlesCard",
    components: {Upload},
    data: () => ({
      title: '',
      icon: '',
      is: {edit: false, create: false, article: false, category: false},
      data: {name: '', description: '', price: '', category: ''},

    }),
    computed: {
      edit() {return CategoriesStore;},
      newItem() {return this.edit.newItem;},
      editItem() {return this.edit.editItem;},
      tempImage() {return this.edit.state.tempImage;},
      categories() {return this.edit.state.stores;},
    },
    watch: {
      newItem(value) {
        if (value) {
          this.is.create = true;
          this.icon = 'fa-plus';
          this.setType(value);
          this.icon = 'fa-pen';
        } else this.end();
      },
      editItem(value) {
        if (value) {
          this.is.edit = true;
          this.icon = 'fa-pen';
          this.setType(value.type);
          for (let i in this.data) {
            this.editItem[i] ? this.data[i] = this.editItem[i] : null;
          }
        } else this.end();
      },
    },
    methods: {
      selectCat(value) {this.data.category = value;},
      setType(type) {
        if (type == 'article') {
          this.is.article = true;
          this.title = 'Article';
        }
        else if (type == 'category') {
          this.is.category = true;
          this.title = 'Catégorie';
        }
      },
      setPosition() {
        if (this.is.article) return {top: '10%'};
        else return {top: '15%'};
      },
      setBackground() {
        if (this.is.article && this.is.create) return {backgroundColor: '#CCC'};
        else return {backgroundColor: '#167DF0'};
      },
      updateStore() {
        for (let i in this.data) {
          if (this.editItem[i]) this.edit.editItem[i] = this.data[i];
        }
      },
      uploadImage(file) {
        let formData = new FormData();
        formData.append('name', 'tempArticleImage');
        formData.append('image', file);
        formData.append('gallery', 'Articles');
        this.edit.uploadImage(formData);
      },
      validate() {
        if (this.is.edit) {
          this.updateStore();
          if (this.is.article) this.editItem.patch();
          else this.edit.state.editItem.put();
        } else {
          if (this.is.article) this.createArticle();
          else this.createCategory();
        }
        setTimeout(() => {this.end();}, 2000);
      },
      createCategory() {
        this.edit.createCategory({
          slug: this.data.name,
          name: this.data.name,
          description: this.data.description,
        });
      },
      createArticle() {
        let category = this.edit.getStore(this.data.category.name);
        category.postArticle({
          name: this.data.name,
          description: this.data.description,
          price: this.data.price,
          category: this.data.category.name,
          image: this.edit.state.tempImage.id
        });
      },
      cancel() {
        if (this.is.edit) this.editItem.restore();
        if (this.tempImage) {
          this.tempImage.delete(false);
          this.edit.tempImage = null;
        }
        this.end();
      },
      end() {
        for (let i in this.is) this.is[i] = false;
        for (let i in this.data) this.data[i] = '';
        this.edit.clearNewItem();
        this.edit.clearEditItem();
      },
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
    left: 40.7%;
    box-shadow: 15px 7px 41px 10px rgba(0, 0, 0, 0.65);

    header {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;

      p, i {
        color: white;
        font-size: 24px;
        cursor: default;
      }
      .card-image {
        width: $article-width;
        height: $article-height;

        .card-header-title {
          position: absolute;
        }
        .card-header-icon {
          position: absolute;
          right: .5rem;
        }
        img {
          object-fit: cover;
          width: $article-width;
          height: $article-height;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
      }
      .card-upload {
        .drop-zone {
          padding-top: 25px;
          padding-bottom: 10px;
        }
        a {
          padding-left: 27px;
        }
      }
    }
    .card-content {
      .categories {
        display: block;
        margin-top: 15px !important;
        margin-left: 40px;
      }
    }
    footer {
      cursor: pointer;
      .card-footer-item {
        transition: background-color .2s, color .2s;
        font-size: 24px;
        &:first-child {
          border-bottom-left-radius: 8px;
          color: $is-success;
          &:hover {
            border-bottom-left-radius: 8px;
            transition: background-color .2s, color .2s;
            background-color: $is-success;
            color: white;
          }
        }
        &:last-child {
          border-bottom-right-radius: 8px;
          color: $is-danger;
          &:hover {
            border-bottom-right-radius: 8px;
            transition: background-color .2s, color .2s;
            background-color: $is-danger;
            color: white;
          }
        }
      }
    }
  }

</style>
