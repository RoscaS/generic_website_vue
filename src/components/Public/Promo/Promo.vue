<template>
  <div class="container collapse-content">
    <div class="columns">

      <div class="column left is-4 is-offset-2-tablet">
        <img :src="promoImage">
      </div>

      <div class="column right is-5 content">
        <h3>
          <input v-if="editTitle" v-model="title">
          <br>
          <strong>
            {{ promoTitle }}
          </strong>
        </h3>
        <p>
          {{ promoText }}
          <br>
          <textarea v-if="editText" v-model="text"></textarea>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
  import store from './PromoStore';
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: 'Promo',
    store: store,
    data() {
      return {
        editTitle: false,
        editText: false,
      }
    },
    computed: {
      ...mapGetters([
        'promoTitle',
        'promoText',
        'promoImage',
      ]),

      title: {
        get() { return this.promoTitle; },
        set(value) { this.setTitle(value); }
      },
      text: {
        get() { return this.promoText; },
        set(value) { this.setText(value); }
      },
      image: {
        get() { return this.promoImage; },
        set(value) { this.setImage(value); }
      }
    },

    methods: mapActions([
      'setTitle',
      'setText',
      'setImage',
    ]),

    watch: {
      title(value) { this.setTitle(value); },
      text(value) { this.setText(value); }
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
