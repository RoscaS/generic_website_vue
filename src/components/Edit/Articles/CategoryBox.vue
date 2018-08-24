<template>
  <div class="box"
       @mouseover="edit.state.draggingType = 'category'">
    <div class="level">
      <div class="level-left">
        <h5 class="level-item">{{category.name.data}}</h5>
      </div>
      <div class="level-right">
        <i @click="startEdit" class="level-item fa-fw far fa-edit"></i>
        <b-checkbox class="level-item checkbox"
                    size="is-small"
                    v-model="checked"
                    :type="color">
        </b-checkbox>
      </div>
    </div>
  </div>
</template>

<script>
  import CategoriesStore from "./CategoriesStore";

  export default {
    name: "CategorieBox",
    props: {
      category: {type: Object},
    },
    data: () => ({
      color: 'is-info',
      init: false,
    }),
    computed: {
      edit() {
        return CategoriesStore
      },
      primary: {
        get() {return this.edit.state.primaryStore},
        set(value) {this.edit.state.primaryStore = value}
      },
      secondary: {
        get() {return this.edit.state.secondaryStore},
        set(value) {this.edit.state.secondaryStore = value}
      },
      checked: {
        get() {
          if (this.primary == this.category) {
            this.color = 'is-info';
            return true;
          }
          else if (this.secondary == this.category) {
            this.color = 'is-primary';
            return true
          } else {
            this.color = 'is-dark';
            return false;
          }
        },
        set(value) {
          if (value) {
            if (!this.primary) {
              this.color = 'is-info';
              this.primary = this.category;
            }
            else if (!this.secondary) {
              this.color = 'is-primary';
              this.secondary = this.category;
            }
            else if (this.primary && this.secondary) {
              this.color = 'is-info';
              this.primary = this.category;
            }
          }
          else {
            if (this.primary == this.category) {
              this.color = 'is-dark';
              this.primary = null;
            }
            else if (this.secondary == this.category) {
              this.color = 'is-dark';
              this.secondary = null;
            }
          }
        }
      }
    },
    methods: {
      startEdit() {
        this.edit.state.editPopup = this.category;
      },
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .checkbox {
    margin-bottom: -2.5px;
  }

  .box {
    padding: 10px;
    margin-bottom: 1rem;
    cursor: grab;

    h5 {
      margin-bottom: 0;
    }

    i {
      transition: color .3s ease;
      cursor: pointer;

      &:hover {
        transition: color .3s ease;
        color: $link-hover;
      }
    }
  }
</style>
