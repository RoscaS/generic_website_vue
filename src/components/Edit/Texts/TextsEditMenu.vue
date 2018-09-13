<template>
  <div class="navbar custom-tabs-wrapper textEdit" v-show="edit.state.active">
    <div class="custom-tabs" :style="{height: height+'px'}">
      <div class="container">
        <slot></slot>
      </div>
      <ValidationBtns class="validation-btns"
                      :loading="edit.loading"
                      @validate="validate"
                      @cancel="cancel">
      </ValidationBtns>
    </div>
    <div class="loading-animation">
      <SpinLine v-show="edit.loading"/>
    </div>
  </div>
</template>

<script>
import ValidationBtns from "../ValidationButtons";
import TextsStore from "./TextsStore";
import SpinLine from "../../LoadingSpinner";

import "vue2-animate/dist/vue2-animate.min.css";

export default {
  name: "TextsEditMenu",
  components: { ValidationBtns, SpinLine },
  props: {
    height: { type: String }
  },
  data() {
    return {
      activeTab: 0,
      edit: TextsStore
    };
  },
  methods: {
    validate() {
      this.edit.update();
    },
    cancel() {
      this.edit.cancel();
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../scss/global";

$animationDuration: 1s;
@import "~vue2-animate/src/sass/vue2-animate";

.validation-btns {
  position: absolute;
  right: 20px;
  top: 14px;

  @media screen and (max-width: 640px) {
    bottom: 0;
    right: 0;
  }
}

.custom-tabs {
  min-height: 240px;
  margin: 0 auto 0 auto;
}

.loading-animation {
  position: absolute;
  top: -66%;
  left: 50%;
  transform: scale(3.5);
}

.custom-tabs-wrapper {
  color: white;
  width: 100%;
  display: block;
  position: fixed;
  bottom: 0;
  background-color: $bg-text-edit;
  -webkit-box-shadow: -1px -3px 24px -2px rgba(0, 0, 0, 0.59);
  -moz-box-shadow: -1px -3px 24px -2px rgba(0, 0, 0, 0.59);
  box-shadow: -1px -3px 24px -2px rgba(0, 0, 0, 0.59);
}
</style>
