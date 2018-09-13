<template>
  <div id="Brand">
    <a class="no-tr" v-scroll-to="'#Home'">
      <transition name="bounceLeft">

        <div v-if="stiky && !logo">
          <h1 class="title" v-if="siteName.includes('MySite')">
            my<span>site</span>
          </h1>
          <h1 class="title" v-else>
            {{splitTitle()[0]}}<span>{{splitTitle()[1]}}</span>
          </h1>
        </div>
        <div id="Logo" v-if="stiky && logo">
          <img class="logo" :src="logo">
        </div>
      </transition>
    </a>

  </div>

</template>

<script>
import GalleriesStore from "../Edit/Galleries/GalleriesStore";
import SectionsStore from "../Edit/Texts/SectionsStore";

export default {
  props: { stiky: { type: Boolean } },
  name: "Brand",
  computed: {
    logo() {
      return GalleriesStore.logo;
    },
    siteInfo() {
      return SectionsStore.getStore("SiteInfo").state;
    },
    siteName() {
      return this.siteInfo.name.data;
    }
  },
  methods: {
    splitTitle() {
      let split = this.siteName.split(" ");
      return split.length > 1 ? split : false;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../scss/global";

#Logo {
  width: $navbar-logo-width;
  padding-top: 5px;
}

#Brand {
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
