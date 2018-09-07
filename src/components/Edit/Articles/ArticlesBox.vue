<template>
  <div class="box" :style="setStyle"
       :title="article.description"
       @mouseover="edit.state.draggingType = 'article'">
    <div class="article-wrapper">
      <div class="id">
        <span>#</span>
        <span>{{article.id}}</span>
      </div>
      <span class="name">{{article.name}}</span>
      <span class="price">{{article.price}}</span>
      <ControlButtons class="control-buttons" @modify="modify"
                      @remove="remove"/>
    </div>
  </div>
</template>

<script>
	import CategoriesStore from "./CategoriesStore";
	import ControlButtons from "../ControlButtons";

	export default {
		name: "ArticlesBox",
		components: {ControlButtons},
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
				return CategoriesStore;
			},
			setStyle() {
				return {backgroundColor: this.color};
			}
		},
		methods: {
			modify() {
				this.article.setBackup();
				this.edit.state.editItem = this.article;
			},
			remove() {this.article.delete();},
		}
	};
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .box {
    padding: 3px 5px 3px 5px;
    margin-bottom: .3rem;
    cursor: grab;

    .article-wrapper {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;

      @media screen and (max-width: 550px) {
        /*flex-direction: column;*/
      }

      .id {
        font-weight: bold;
        width: 1.5rem;
        margin-right: .5rem;

        span {
          &:first-child {
            font-style: italic;
            color: rgba(0, 0, 0, 0.45);
            opacity: .7;
          }
          @media screen and (max-width: 550px) {
          }
        }
      }

      .name {
        font-weight: bold;
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: white;
        max-width: 9rem;

        @media screen and (max-width: 1100px) {
          max-width: 4rem;
        }
        @media screen and (max-width: 550px) {
        }
      }

      .price {
        max-width: 3rem;
        margin-left: auto;
        color: white;
        font-size: 16px;
        font-weight: bold;
      }

      .control-buttons {
        margin-left: .7rem;
        z-index: 10;
        justify-content: flex-end;

      }
    }
  }
</style>
