<template>
  <div>
    <div class="container">
      <EditIcon :store="store" :edit="edit"/>
      <div class="columns is-centered">
        <div class="column is-4">
          <SectionImage top="20px"
                        right="145px"
                        :image="image"
                        :edit="galleriesEdit"
                        :store="store.gallery">
          </SectionImage>
        </div>
        <div class="column right is-5">
          <div>
            <h2 class="title" :class="{'highlighted': highlighted(0)}">
              {{ state.title.data}}
            </h2>
            <p :class="{'highlighted': highlighted(1)}">
              {{ state.text.data}}
            </p>
          </div>
        </div>
      </div>
    </div>
    <transition enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
      <TextsEditMenu v-if="checkComponent()" height="225">
        <FieldsLayout :store="store"/>
      </TextsEditMenu>
    </transition>
  </div>
</template>

<script>
	import ViewsMixin from "../../mixins/ViewsMixin";
	import TextsEditMenu from "../../components/Edit/Texts/TextsEditMenu";
	import EditIcon from "../../components/Edit/EditIcon";
	import FieldsLayout from "../Layouts/FieldsLayout";
	import SectionImage from "../../components/SectionImage";

	export default {
		name: "Promo",
		mixins: [ViewsMixin],
		components: {SectionImage, TextsEditMenu, EditIcon, FieldsLayout},
		data: () => ({
			component: "Promo",
			type: "text"
		}),
		computed: {
			image() {
				try {
					let gallery = this.galleriesEdit.getStore("Promo");
					return this.getImage(0, gallery).image;
				} catch (e) {
					setTimeout(() => {
						return this.computed;
					}, 100);
				}
			}
		}
	};
</script>

<style scoped lang="scss">
  @import '../../scss/global';

  .edit-area {
    .label {
      color: white;
    }
  }

  .image {
    /*padding: 10px;*/
  }

  .container {
    margin-top: 60px;

    @media screen and (max-width: 960) {
      height: 440px;
      margin-top: 0;
    }

    .column {

      h2 {
        font-size: 28px !important;
        line-height: 40px !important;
        margin-bottom: 5px;
      }
      p {
        font-size: 18px;
        line-height: 22px;
      }
    }

    .right {
      padding-left: 40px;
      @media screen and (max-width: 960) {
        padding: 0 50px 0 30px;
      }
    }
  }
</style>
