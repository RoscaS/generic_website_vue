<template>
  <div class="box" :style="setStyle"
       @mouseover="edit.state.draggingType = 'article'">
    <div class="level">
      <div class="level-left">

        <div class="level-item" v-if="id">
          <span class="diez">#</span>
          <span class="id">{{article.id}}</span>
        </div>

        <div class="level-item" v-if="name">
          <span class="name">{{article.name.data}}</span>
        </div>

        <div class="level-item" v-if="description">
          <span class="description">{{article.description.data}}</span>
        </div>
      </div>

      <div class="level-item" v-if="price">
        <span class="price">{{article.price.data}}</span>
      </div>

      <div class="level-right">
        <div class="level-item">
          <i class="edit far fa-fw fa-edit"></i>
          <i class="remove far fa-fw fa-times-square"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CategoriesStore from "./CategoriesStore";

  export default {
    name: "ArticlesBox",
    props: {
      article: {type: Object},
      color: {type: String},
      id: {type: Boolean, default: true},
      name: {type: Boolean, default: true},
      description: {type: Boolean, default: true},
      price: {type: Boolean, default: true},
    },
    computed: {
      edit() {
        return CategoriesStore
      },
      setStyle() {
        return {backgroundColor: this.color};
      }
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .box {
    margin-bottom: 5px;
    padding: 0;
    cursor: grab;

    i {
      cursor: pointer;
    }

    .level {
      height: 1.75rem;

      .level-left {
        margin-left: 5px;
        .diez {
          font-weight: bold;
          font-size: 25px;
          opacity: 0.35;
          z-index: 1;
        }

        .id {
          font-weight: bold;
          margin-top: 2px;
          margin-left: -6px;
          font-size: 16px;
          z-index: 2;
        }

        .name {
          width: 150px;
          font-size: 17px;
          padding-top: 0;
          padding-bottom: 0;
          color: white;
          font-weight: bold;
        }
      }

      .price {
        width: 70px;
        color: white;
        font-size: 16px;
        font-weight: bold;
      }

      .level-right {
        /*width: 10px;*/
        color: white;
        margin-right: .5rem;

        .edit {
          color: white;
          margin-right: .5rem;
          &:hover {
            transition: color .3s ease;
            color: $is-warning;
          }
        }
        .remove {
          color: white;
          font-size: 17px;
          &:hover {
            transition: color .3s ease;
            color: $is-danger
          }
        }
        /*margin-right: 15px;*/

      }
    }
  }
</style>
