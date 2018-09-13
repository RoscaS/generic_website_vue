<template>
  <div>
    <section class="section section-container">
      <EditIcon :store="store" :edit="edit"/>
      <div class="container">
        <div class="content">
          <div v-scroll-reveal="$parent.sReveal('top', 150, 30)">
            <Title :class="{'highlighted': $parent.highlighted(0)}">
              {{ store.state.title.data }}
            </Title>
          </div>
          <div>

          </div>
          <div v-scroll-reveal="$parent.sReveal('bottom', 200, 10, 3000)">
            <p class="sub-title"
               :class="{'highlighted': $parent.highlighted(1)}">
              {{ store.state.sub_title.data }}
            </p>
          </div>
        </div>
      </div>

      <slot v-if="store.name =='Events'"></slot>

      <div class="container" v-else>
        <div class="content">
          <slot></slot>
          <slot name="outsite"></slot>
        </div>
      </div>

    </section>

    <transition enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
      <TextsEditMenu v-if="$parent.checkComponent()">
        <FieldsLayout :store="store">
          <slot name="moreFields"></slot>
        </FieldsLayout>
      </TextsEditMenu>
    </transition>
  </div>
</template>

<script>
	import Title from "../../components/Title";
	import EditIcon from "../../components/Edit/EditIcon";
	import TextsStore from "../../components/Edit/Texts/TextsStore";
	import FieldsLayout from "./FieldsLayout.vue";
	import TextsEditMenu from "../../components/Edit/Texts/TextsEditMenu";

	export default {
		name: "BaseLayout",
		props: {
			store: {type: Object}
		},
		components: {Title, EditIcon, TextsEditMenu, FieldsLayout},
		computed: {
			edit() {
				return TextsStore;
			}
		},
	};
</script>

<style scoped lang="scss">
  @import '../../scss/global';

  .section-container {
    margin: 0 auto 50px auto;

    @media screen and (max-width: 960px) {
      margin-bottom: 0;
    }
  }

  .sub-title {
      font-family: 'Open Sans', sans-serif;
      font-size: 18px;
      line-height: 25px;
      word-spacing: 0;
      margin: 15px auto 80px auto !important;
      text-align: center;
      font-style: italic;
      color: $sub-titles;

      @media screen and (max-width: 960px) {
          margin-bottom: 40px !important;
      }
  }
</style>
