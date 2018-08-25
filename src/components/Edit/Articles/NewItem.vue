<template>
  <transition name="bounceDown">
    <div class="card" v-if="newItem" :style="setStyle()">
      <header class="card-header level" v-if="newItem == 'category'">
        <div class="card-header-title">
          <p>Nouvelle Catégorie</p>
        </div>
        <div class="card-header-icon">
          <i class="fal fa-pen"></i>
        </div>
      </header>
      <div class="card-image" v-else>
        <p>Nouvel Article</p>
        <i class="fal fa-pen"></i>
        <img src="https://via.placeholder.com/350x250">
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
              <b-select placeholder="Select a name">
                <option
                  v-for="category in categories"
                  :value="category"
                  :key="category.id">
                  {{ category.name.data }}
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
           @click="cancel()">
          <i class="far fa-times"></i>
        </a>
      </footer>
    </div>
  </transition>
</template>

<script>
  import CategoriesStore from "./CategoriesStore";

  export default {
    name: "newItem",
    data: () => ({
      name: '',
      description: '',
      price: 0,
    }),
    computed: {
      edit() {return CategoriesStore;},
      categories() {return this.edit.state.stores;},
      newItem: {
        get() {return this.edit.state.newItem;},
        set(value) {this.edit.state.newItem = value}
      },
    },
    methods: {
      setStyle() {
        if (this.newItem == 'article') return {top: '10%'};
        else return {top: '15%'};
      },
      validate() {
        if (this.newItem == 'article') this.createArticle();
        else this.createCategory();

      },
      cancel() {
        this.edit.clearNewItem();
      },

      createCategory() {
        this.edit.createCategory({
          slug: this.name,
          name: this.name,
          description: this.description,
        });
      },

      createArticle() {

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
