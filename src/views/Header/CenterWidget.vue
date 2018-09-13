<template>
  <section>
    <div :class="{'highlighted': highlighted(1)}"
         v-scroll-reveal="{
             origin: 'bottom',
             distance:'1px',
             duration: 2000,
             delay: 500
           }">
      <div class="header-ribbon">
        <div class="ribbon-text">
          <span class="">{{ upper(state.name_add.data) }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CenterWidget",
  props: {
    state: { type: Object }
  },
  methods: {
    highlighted(value) {
      return this.$parent.highlighted(value);
    },
    upper(data) {
      return data.toUpperCase();
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../scss/global";

.header-ribbon {
  color: white;
  font-size: 28px;
  letter-spacing: 20px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  @media screen and (max-width: $logo-breakpoint) {
    font-size: 6vw;
  }

  .ribbon-text {
    background: $ribbon;
    display: flex;
    align-items: center;
    span {
      margin-top: 4px;
      margin-right: -20px; // contre balance letter-sp de la dernière lettre.
    }
  }
  &:before,
  &:after {
    content: "";
    width: 0.2em;
    border: 0.87em solid $ribbon;
  }
  &:before {
    border-left-color: transparent;
  }
  &:after {
    border-right-color: transparent;
  }
}
</style>
