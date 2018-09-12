<template>
  <transition name="bounceLeft">
    <div id="Brand" v-if="stiky && !logo">
      <a class="no-tr" v-scroll-to="'#Home'">
        <h1 class="title" v-if="siteName.includes('MySite')">
          my<span>site</span>
        </h1>
        <h1 class="title" v-else>
          {{splitTitle()[0]}}<span>{{splitTitle()[1]}}</span>
        </h1>
      </a>
    </div>
    <div id="Logo" v-if="stiky && logo">
      <img class="logo" :src="logo">
    </div>
  </transition>
</template>

<script>
  import GalleriesStore from '../Edit/Galleries/GalleriesStore';
  import TextsStore from "../../components/Edit/Texts/TextsStore";

	export default {
		props: {stiky: {type: Boolean}},
		name: "Brand",
    computed: {
      logo() { return GalleriesStore.logo; },
      siteInfo() { return TextsStore.getStore("SiteInfo").state; },
      siteName() { return this.siteInfo.name.data; },
    },
    methods: {
			splitTitle() {
				let split = this.siteName.split(' ');
        return split.length > 1 ? split : false
      }
    },
	};
</script>

<style scoped lang="scss">
  @import "../../../static/sass/global";

  #Logo {
    position: absolute;
    z-index: 3;
    width: 160px;
    left: 5%;


    @media screen and (max-width: 1181px) {
      left: 50px;
      padding-top: 27px;
    }
  }


  #Brand {
    /*position: absolute;*/
    /*z-index: 3;*/
    /*left: 5%;*/
    /*@media screen and (max-width: 1088px) {*/
      /*padding-top: 27px;*/
    /*}*/

    .title {
      color: $ribbon;

      & :first-child {
        background-color: $ribbon;
        color: white;
      }
    }

    h1 {
      cursor: pointer;
      font-size: 27px;
    }
  }
</style>
