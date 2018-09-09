<template>
  <section class="home" :style="fixedHeight">
    <EditIcon :edit="edit" :store="store" top="20px"/>

    <div class="site-title columns is-centered is-mobile">
      <SiteTitle :state="state" v-if="!logo"/>
    </div>

    <div class="widgets columns is-centered is-mobile">
      <div class="side left column is-4" :class="{'sides-logo': logo}">
        <LeftWidget/>
      </div>

      <div class="center column is-narrow">
        <CenterWidget :state="state" v-if="!logo"/>
        <img class="logo"
             v-if="logo"
             :src="logo"
             v-scroll-reveal="{
                 origin: 'bottom',
                 distance:'20px',
                 duration: 2000,
                 delay: 500
               }">
      </div>

      <div class="side right column is-4" :class="{'sides-logo': logo}">
        <RightWidget :state="state"/>
      </div>
    </div>

    <div class="columns is-mobile mobile-left is-centered">
      <div class="column mobile">
        <LeftWidget/>
      </div>
      <div class="column mobile mobile-right">
        <RightWidget :state="state"/>
      </div>
    </div>

    <transition enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
      <TextsEditMenu v-if="checkComponent()">
        <FieldsLayout :store="store">
        </FieldsLayout>
      </TextsEditMenu>
    </transition>
  </section>

</template>

<script>
	import EditIcon from '../../components/Edit/EditIcon';
	import TextsEditMenu from "../../components/Edit/Texts/TextsEditMenu";
	import FieldsLayout from "../Layouts/FieldsLayout";
	import ViewsMixin from '../../mixins/ViewsMixin';
	import LeftWidget from "./LeftWidget";
	import CenterWidget from "./CenterWidget";
	import RightWidget from "./RightWidget";
	import SiteTitle from "./SiteTitle";
	import GalleriesStore from "../../components/Edit/Galleries/GalleriesStore";


	export default {
		name: "Header",
		mixins: [ViewsMixin],
		components: {
			SiteTitle,
			RightWidget,
			CenterWidget,
			LeftWidget,
			EditIcon,
			TextsEditMenu,
			FieldsLayout,
		},
		data: () => ({
			type: 'text',
			component: "SiteInfo",
		}),
		computed: {
			logo() { return GalleriesStore.logo; },
			state() { return this.store.state; },
      fixedHeight() {
				// return `height: ${window.innerHeight / 2}px;`
        const height = window.innerHeight;
        const width = window.innerWidth;
        if (width <= 414) {
          return {
          	height: (4 / 7) * height + 'px',
            paddingTop: (height / 100) * 8.27 + 'px'
          }
        } else {
          return {
          	height: height / 2 + 'px',
            paddingTop: (height / 100) * 8.27 + 'px'
          }
        }
      }
		},
    mounted() {
			console.log(window.innerHeight)
    }
	};
</script>

<style scoped lang="scss">
  @import "../../../static/sass/global";

  .logo {
    margin-top: 10px;
    width: 480px
  }

  .sides-logo {
    margin-top: 120px !important;
  }

  .mobile {
    z-index: 3;
    display: none;
    max-width: 260px !important;

    @media screen and (max-width: 915px) {
      display: inline-block;
    }
  }

  .widgets {
    .side {
      width: 260px !important;
      margin-top: -49px;

      &.left {
        margin-right: 40px;
        @media screen and (max-width: 915px) {
          display: none;
        }
      }
      &.right {
        margin-left: 40px;
        @media screen and (max-width: 915px) {
          display: none;
        }
      }
    }
  }
</style>
