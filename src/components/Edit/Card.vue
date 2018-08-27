<template>
  <transition name="bounceDown">
    <div class="card" v-if="isEdit || isCreate">

      <header>
        <!--EDIT-->
        <div v-if="isCategory && isEdit" class="card-header">
          <p class="card-header-title">{{ title }}</p>
          <i class="card-header-icon far" :class="icon"></i>
        </div>

        <div v-if="isArticle && isEdit" class="card-image">
          <p class="card-header-title">{{ title }}</p>
          <i class="card-header-icon far" :class="icon"></i>
          <img :src="editItem.image.image">
        </div>

        <!--CREATE-->
        <div v-if="isCategory && isCreate" class="card-header">
          <p class="card-header-title">{{ title }}</p>
          <i class="card-header-icon far" :class="icon"></i>
        </div>

        <div v-if="isArticle && isCreate && !tempImage" class="card-upload">
          <div class="drop-zone">
            <Upload @file="uploadImage" :padding="'45px'"/>
          </div>
          <a class="show-stock no-tr">Afficher le stock</a>
        </div>

        <div v-if="isArticle && isCreate && tempImage" class="card-image">
          <p class="card-header-title">{{ title }}</p>
          <i class="card-header-icon far" :class="icon"></i>
          <img :src="tempImage.image">
        </div>


      </header>



      <div class="card-content">
        <v-text-field required v-model="editItem.name" color="blue"
                      :counter="30" label="Nom" :disabled="edit.loading"
                      :loading="edit.loading">
        </v-text-field>

        <v-textarea auto-grow v-model="editItem.description" color="blue"
                    :counter="200" rows="0" label="Description"
                    :disabled="edit.loading" :loading="edit.loading">
        </v-textarea>


        <div v-if="editItem.type == 'article'">
          <v-text-field required v-model="editItem.price" color="blue"
                        type="number" label="Prix" :min="0" :step=".01"
                        :disabled="edit.loading" :loading="edit.loading">
          </v-text-field>
        </div>
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
	import CategoriesStore from "./Articles/CategoriesStore";
  import Upload from "./Upload";

  export default {
		name: "Card",
    components: {Upload},
    data: () => ({
      isEdit: false,
      isCreate: false,
      isArticle: false,
      isCategory: false,

      title: '',
      icon: '',
    }),
    computed: {
      edit() {return CategoriesStore;},
      newItem() {return this.edit.newItem;},
      editItem() {return this.edit.editItem;},
      tempImage() {return this.edit.tempImage;},
    },
    watch: {
      newItem(value) {
        if (value) {
          this.isCreate = true;
          this.setType(value);
          this.icon = 'fa-pen';
        } else this.clear();
      },
      editItem(value) {
        if (value) {
          this.isEdit = true;
          this.icon = 'fa-plus';
          this.setType(value.type)
        } else this.clear();
      },
    },
    methods: {
		  setType(type) {
        if (type == 'article') {
          this.isArticle = true;
          this.title = 'Article';
        }
        else if (type == 'category') {
          this.isCategory = true;
          this.title = 'Catégorie';
        }
      },
      clear() {
		    this.isEdit = false;
        this.isCreate = false;
        // this.isArticle = false;
        // this.isCategory = false;
      }
    }
	};
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

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
      background-color: #167DF0;

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

      }
    }
    .card-content {
      .content {

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
