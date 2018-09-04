<template>
  <section id="Home" class="">
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
		}
	};
</script>

<style scoped lang="scss">
  @import "../../../static/sass/global";

  .logo {
    margin-top: 10px;
    width: 480px
  }

  /*.responsive-logo {*/
  /*width: 100%;*/
  /*height: auto;*/
  /*}*/

  .sides-logo {
    margin-top: 120px !important;
  }

  #Home {
    height: 260px;
    margin-top: 50px;
    margin-bottom: 100px;

    @media screen and (max-width: 915px) {
      /*margin-top: 0;*/
    }
  }

  .mobile {
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
