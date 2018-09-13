<template>
  <div class="columns is-centered">
    <transition name="bounceDown">
      <div class="card" v-if="editItem">

        <header class="card-header">
          <img :src="editItem.image">
        </header>

        <div class="card-content">
          <div class="content">
            <p>{{ editItem.description }}</p>
            <b-field type="is-link" label="Description:">
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
  </div>
</template>

<script>
import tools from "../../../utils/tools";

export default {
  name: "ImagesCard",
  props: {
    edit: { type: Object }
  },
  computed: {
    editItem() {
      return this.edit.editItem;
    }
  },
  methods: {
    validate() {
      this.edit.setLoading();
      setTimeout(() => {
        this.edit.unsetLoading();
        tools.message("updated");
        this.edit.clearEditItem();
      }, 500);
      this.edit.editItem.patch();
    },
    cancel() {
      this.edit.clearEditItem();
      tools.message("cancel");
    }
  },
  destroyed() {
    this.edit.clearEditItem();
  }
};
</script>

<style scoped lang="scss">
@import "../../../scss/global";

.card {
  border-radius: 9px;
  position: absolute;
  z-index: 3;
  top: 10%;
  width: $article-width;

  box-shadow: 15px 7px 41px 10px rgba(0, 0, 0, 0.65);

  header {
    img {
      object-fit: cover;
      height: $article-height;
      width: $article-width;

      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
  }

  footer {
    .validate {
      color: $is-success;
      transition: background-color 0.2s, color 0.2s;
      border-bottom-left-radius: 8px;
      &:hover {
        transition: background-color 0.2s, color 0.2s;
        background-color: $is-success;
        color: white;
        border-bottom-left-radius: 8px;
      }
    }
    .cancel {
      transition: background-color 0.2s, color 0.2s;
      border-bottom-right-radius: 8px;
      &:hover {
        transition: background-color 0.2s, color 0.2s;
        background-color: $is-danger;
        color: white;
        border-bottom-right-radius: 8px;
      }
    }
  }
}

i {
  font-size: 22px;
}
</style>
