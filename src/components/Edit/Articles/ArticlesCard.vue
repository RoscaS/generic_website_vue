<template>
<div class="columns is-centered">
  <transition name="bounceDown">
    <div class="card" v-if="is.edit || is.create" :style="setPosition()">

      <header :style="setBackground()">
        <div v-if="is.article && is.create && !tempImage" class="card-upload">
          <div class="drop-zone">
            <Upload @file="uploadImage" :padding="'40px'"/>
          </div>
          <!--<a class="show-stock no-tr">Afficher le stock</a>-->
        </div>

        <div v-else
             :class="{'card-image': is.article, 'card-header': is.category}">
          <p class="card-header-title">{{ title }}</p>
          <i class="card-header-icon far" :class="icon"></i>
          <img v-if="is.article"
               :src="is.edit ? editItem.image.image : tempImage.image">
          <button v-if="is.create && is.article"
                  @click="changeImage()"
                  class="button is-info is-outlined card-header-reupp">
            <i class="far fa-recycle"></i>
            <span>Remplacer l'image</span>
          </button>
        </div>
      </header>


      <div class="card-content">

        <b-field :type="error.name">
          <b-input v-model="data.name"
                   placeholder="Nom"
                   :maxlength="30"
                   :loading="edit.loading"
                   :disabled="edit.loading">
          </b-input>
        </b-field>

        <b-field :type="error.description">
          <b-input v-model="data.description"
                   type="textarea"
                   placeholder="Description"
                   :rows="1"
                   :maxlength="200"
                   :loading="edit.loading"
                   :disabled="edit.loading">
          </b-input>
        </b-field>

        <b-field grouped v-if="is.article">
          <b-field :type="error.category">
            <b-select v-if="is.create"
                      placeholder="Catégorie"
                      @input="selectCat" :disabled="edit.loading">
              <option v-for="cat in categories" :value="cat" :key="cat.id">
                {{ cat.name }}
              </option>
            </b-select>
          </b-field>

          <b-field :type="error.price">
            <b-input v-if="is.article"
                     style="width: 175px"
                     class="price-style"
                     type="number"
                     v-model="data.price"
                     placeholder="Prix"
                     :step=".01"
                     :maxlength="30"
                     :loading="edit.loading"
                     :disabled="edit.loading">
            </b-input>
          </b-field>
        </b-field>
      </div>

      <footer class="card-footer">
        <div class="card-footer-item"
             @click="validate">
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
</div>
</template>

<script>
	import CategoriesStore from "./CategoriesStore";
	import Upload from "../Upload";
	import tools from "../../../utils/tools";

	export default {
		name: "ArticlesCard",
		components: {Upload},
		data: () => ({
			title: '',
			icon: '',
			is: {edit: false, create: false, article: false, category: false},
			data: {name: '', description: '', price: '', category: ''},
			error: {name: '', description: '', price: '', category: ''},
			messages: [],
		}),
		computed: {
			edit() {return CategoriesStore;},
			newItem() {return this.edit.newItem;},
			editItem() {return this.edit.editItem;},
			tempImage() {return this.edit.state.tempImage;},
			categories() {return this.edit.state.stores;},
			isDirty() {
				if (this.is.edit) {
					for (let i in this.data) {
						if (this.data[i] !== '') {
							if (this.data[i] !== this.editItem[i]) {
								return true;
							}
						}
					}
					return false;
				}
			},
		},
		watch: {
			newItem(value) {
				if (value) {
					this.is.create = true;
					this.icon = 'fa-plus';
					this.setType(value);
					this.icon = 'fa-pen';
				} else {
					this.end();
				}
			},
			editItem(value) {
				if (value) {
					this.is.edit = true;
					this.icon = 'fa-pen';
					this.setType(value.type);
					for (let i in this.data) {
						this.editItem[i] ? this.data[i] = this.editItem[i] : null;
					}
				} else {
					this.end();
				}
			},
		},
		methods: {
			isValid() {
				if (this.is.category) {
					console.log('CATEGORY');
					if (this.data.name === '') {
						this.error.name = 'is-danger';
						this.messages.push('validNoName');
						return false;
					}
				}
				else if (this.is.article) {
					console.log('ARTICLE');
					if (this.data.name === '') {
						this.error.name = 'is-danger';
						this.messages.push('validNoName');
						return false;
					}
					else if (this.data.description === '') {
						this.error.description = 'is-danger';
						this.messages.push('validNoDescription');
						return false;
					}
					else if (this.data.price === '') {
						this.error.price = 'is-danger';
						this.messages.push('validNoPrice');
						return false;
					}
					else if (Number(this.data.price) < 0) {
						this.error.price = 'is-danger';
						this.messages.push('validNegPrice');
						return false;
					}
					else if (this.data.category === '') {
						this.error.category = 'is-danger';
						this.messages.push('validNoCategory');
						return false;
					}
				}
				for (let i of this.categories) {
					if (this.is.category) {
						if (i.name === this.data.name) {
							this.error.name = 'is-danger';
							this.messages.push('validUniqCatName');
							return false;
						}
					}
					else if (this.is.article) {
						for (let j of i.articles) {
							if (j.name === this.data.name) {
								this.error.name = 'is-danger';
								this.messages.push('validUniqArtName');
								return false;
							}
						}
					}
				}
				return true;
			},
			selectCat(value) {this.data.category = value;},
			setType(type) {
				if (type === 'article') {
					this.is.article = true;
					this.title = 'Article';
				}
				else if (type === 'category') {
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
			changeImage() {
				this.edit.state.tempImage.delete(false);
				this.edit.tempImage = null;
			},
			validate() {
				console.log('validate');
        for (let i in this.error) {
        	this.error[i] = '';
        }
				if (this.isValid()) {
					console.log('this.isValid: ok')
					if (this.is.edit) {
            console.log('this.is.edit')

						this.updateStore();

						if (this.is.article) {
              console.log('this.is.article')
							this.editItem.patch();
						}
						else if (this.is.category) {
              console.log('this.is.category')
							this.edit.state.editItem.put();
						}
					}
					else if (this.is.create) {
            console.log('this.is.create')

						if (this.is.article) {
              console.log('this.is.createArticle()')

							this.createArticle();
						}
						else if (this.is.category) {
              console.log('this.is.createCategory()')

							this.createCategory();
						}
					}
					setTimeout(() => {this.end();}, 2000);
				} else {
					console.log('this.isValid: fail')
					let time = 0;
					console.log(this.messages);
					for (let i of this.messages) {
						setTimeout(() => {tools.message(i);}, time);
						time += 200;
					}
					this.messages = [];
				}
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
				tools.message('cancel');
				this.end();
			},
			end() {
				for (let i in this.is) this.is[i] = false;
				for (let i in this.data) this.data[i] = '';
				for (let i in this.error) this.error[i] = '';
				this.message = [];
				this.edit.clearNewItem();
				this.edit.clearEditItem();
			},
		},
	};
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .card {
    border-radius: 9px;
    position: absolute;
    z-index: 100;
    width: $article-width;
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
        .card-header-reupp {
          display: flex;
          top: 83%;
          left: 10px;
          position: absolute;

          &:hover {
          }

          span {
            margin-left: 10px;
            font-size: 18px;
            font-weight: bold;
          }
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
