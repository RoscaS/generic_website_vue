<template>
  <div class="box"
       :title="category.name"
       @mouseover="edit.state.draggingType = 'category'">
    <div class="category-wrapper">
      <b-checkbox class="checkbox"
                  size="is-small"
                  v-model="checked"
                  :type="color">
      </b-checkbox>
      <span class="name">{{category.name}}</span>
      <ControlButtons class="control-buttons"
                      :dark="true"
                      @modify="modify"
                      @remove="remove">
      </ControlButtons>
    </div>
  </div>
</template>

<script>
	import CategoriesStore from "./CategoriesStore";
	import ControlButtons from "../ControlButtons";

	export default {
		name: "CategorieBox",
		components: {ControlButtons},
		props: {
			category: {type: Object},
		},
		data: () => ({
			color: 'is-info',
			init: false,
		}),
		computed: {
			edit() {
				return CategoriesStore;
			},
			primary: {
				get() {return this.edit.state.primaryStore;},
				set(value) {this.edit.state.primaryStore = value;}
			},
			secondary: {
				get() {return this.edit.state.secondaryStore;},
				set(value) {this.edit.state.secondaryStore = value;}
			},
			checked: {
				get() {
					if (this.primary === this.category) {
						this.color = 'is-info';
						return true;
					}
					else if (this.secondary === this.category) {
						this.color = 'is-primary';
						return true;
					} else if (this.secondary === null && this.primary === null){
						return false;
					} else {
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
							this.primary = null;
							setTimeout(() => {this.primary = this.category;}, 10);
						}
					}
					else {
						if (this.primary === this.category) {
							this.color = 'is-dark';
							this.primary = null;
						}
						else if (this.secondary === this.category) {
							this.color = 'is-dark';
							this.secondary = null;
						}
					}
				}
			}
		},
		methods: {
			modify() {
				this.category.setBackup();
				this.edit.editItem = this.category;
			},
			remove() {this.category.delete();},
		}

	};
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .box {
    padding: .5rem;
    margin-bottom: .7rem;
    cursor: grab;

    .category-wrapper {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;

      @media screen and (max-width: 1100px) {
        flex-direction: column;
      }
      @media screen and (max-width: 769px) {
        flex-direction: row;
      }

      .checkbox {

      }
      .name {
        font-weight: bold;
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 6rem;

        @media screen and (max-width: 769px) {
          text-overflow: unset;
          max-width: 100%;
        }
      }

      .control-buttons {
        margin-left: auto;
        z-index: 10;
        @media screen and (max-width: 1100px) {
          margin-left: 0;
        }
        @media screen and (max-width: 769px) {
          margin-left: auto;
        }
      }
    }

  }
</style>
