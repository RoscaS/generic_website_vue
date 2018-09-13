<template>
  <section :style="fixedHeight">
    <EditIcon class="edit-icon" :edit="edit" :store="store" top="20px"/>

    <SiteTitle class="site-title" :state="state"/>

    <div class="widgets">
      <LeftWidget class="left wings is-hidden-touch"
                  :class="{'sides-logo': logo}"/>
      <CenterWidget class="center" :state="state"/>
      <RightWidget class="right wings is-hidden-touch"
                   :class="{'sides-logo': logo}"
                   :state="state">
      </RightWidget>
    </div>

    <SubHeader class="sub-header" :state="state"/>

    <div class="widgets-mobile is-hidden-desktop">
      <LeftWidget class="left wings" :class="{'sides-logo': logo}"/>
      <RightWidget class="right wings"
                   :class="{'sides-logo': logo}"
                   :state="state">
      </RightWidget>
    </div>


    <transition enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
      <TextsEditMenu v-if="checkComponent()">
        <FieldsLayout :store="store"/>
      </TextsEditMenu>
    </transition>
  </section>

</template>

<script>
import GalleriesStore from "../../components/Edit/Galleries/GalleriesStore";
import TextsEditMenu from "../../components/Edit/Texts/TextsEditMenu";
import EditIcon from "../../components/Edit/EditIcon";
import FieldsLayout from "../Layouts/FieldsLayout";
import ViewsMixin from "../../mixins/ViewsMixin";
import CenterWidget from "./CenterWidget";
import RightWidget from "./RightWidget";
import LeftWidget from "./LeftWidget";
import SiteTitle from "./SiteTitle";
import SubHeader from "./SubHeader";

export default {
  name: "Header",
  mixins: [ViewsMixin],
  components: {
    SubHeader,
    SiteTitle,
    RightWidget,
    CenterWidget,
    LeftWidget,
    EditIcon,
    TextsEditMenu,
    FieldsLayout
  },
  data: () => ({
    type: "text",
    component: "SiteInfo"
  }),
  computed: {
    logo() {
      return GalleriesStore.logo;
    },
    state() {
      return this.store.state;
    },
    fixedHeight() {
      const height = window.innerHeight;
      const width = window.innerWidth;
      if (width <= 414) {
        return {
          height: (4 / 7) * height + "px",
          paddingTop: (height / 100) * 8.27 + "px"
        };
      } else {
        return {
          height: height / 2 + "px",
          paddingTop: (height / 100) * 8.27 + "px"
        };
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../scss/global";

.edit-icon {
  display: block;
  z-index: 6;
}

.site-title {
  margin-bottom: -45px;
  position: relative;
  z-index: 3;
}

.widgets {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 3;
  height: 60px;

  .wings {
    width: 230px;
    &.left {
      margin-right: 50px;
    }
    &.right {
      margin-left: 50px;
    }
  }
}

.widgets-mobile {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 3;
  @media screen and (max-width: 560px) {
    flex-direction: column;
  }

  .wings {
    width: 230px;
    &.left {
      margin-right: 10px;
    }
    &.right {
      margin-left: 10px;
      @media screen and (max-width: 560px) {
        display: none;
      }
    }
  }
}
</style>
