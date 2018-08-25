<template>
  <div class="level-item" :style="dark ? 'color: #7e7e7e' : null">
    <i @click="startEdit" class="edit far fa-pen"></i>
    <i @click="remove" class="remove far fa-times"></i>
  </div>
</template>

<script>
  import CategoriesStore from "./CategoriesStore";

	export default {
		name: "ControleButtons",
    props: {
      element: {type: Object},
      dark: {type: Boolean, default: false},
    },
    computed: {
		  edit() {return CategoriesStore},
    },
    methods: {
      startEdit() {
        this.edit.state.editPopup = this.element;
      },
      remove() {
        this.element.delete();
      }
    },
    created() {

    }
	};
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

.level-item {
  margin-right: 10px;
  color: white;

  i {
    transition: color .3s ease;
    cursor: pointer;
  }
  .edit {
    margin-top: -2px;
    margin-right: .5rem;
    &:hover {
      transition: color .3s ease;
      color: $is-warning;
    }
  }
  .remove {
    font-size: 17px;
    &:hover {
      transition: color .3s ease;
      color: $is-danger
    }
  }
}
</style>
