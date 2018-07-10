<template>
  <div class="container collapse-content">
    <div class="columns">

      <div class="column left is-4 is-offset-2-tablet">
        <img :src="image">
      </div>

      <div class="column right is-5 content">
        <h3>
          <strong>{{ title }}</strong>
        </h3>
        <p>{{ text }}</p>
      </div>

    </div>
  </div>
</template>

<script>
  import PromoStore from '../../../Stors/Public/PublicStore';

  export default {
    name: "Promo",
    data() {
      return {
        state: PromoStore.state,
      };
    },

    computed: {
      title() { return this.state.title; },
      text() { return this.state.text; },
      image() { return this.state.image; },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .container {
    height: 400px;
    margin-top: 150px;

    @media screen and (max-width: 400px) {
      height: 600px;
      margin-bottom: -500px;
    }

    img {
      width: 400px;
    }

    .left {
      @media screen and (max-width: 400px) {
        margin-top: -60px;
        margin-bottom: -40px;
      }
    }

    .right {
      padding: 40px;
    }
  }
</style>
