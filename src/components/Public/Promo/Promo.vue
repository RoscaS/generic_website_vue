<template>
  <div class="container collapse-content">

    <EditIcon marginLeft="120px" marginTop="0px">
      <div class="columns">

        <div class="column left is-4 is-offset-2-tablet">
          <img :src="promoImage">
        </div>

        <div class="column right is-5 content">
          <h3>{{ promoTitle }}</h3>
          <p>
            {{ promoText }}
            <!--Textarea utile pour retrouver comment double bind + maj-->
            <textarea v-if="editText" v-model="text"></textarea>
          </p>
        </div>

        <EditNav>
          <!-- A FAIRE -->
        </EditNav>

      </div>
    </EditIcon>

  </div>
</template>

<script>
  import store from './PromoStore';
  import {mapGetters, mapActions} from 'vuex';
  import EditIcon from '../../Components/Edit/EditIcon';
  import EditNav from '../../Components/Edit/EditNav';

  export default {
    name: 'Promo',
    components: {EditIcon, EditNav},
    store: store,
    data() {
      return {
        isEdit: false,
        editText: false,
      };
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
      },

    },

    methods: {
      ...mapActions([
        'fetchData',
        'pushData',
        'setTitle',
        'setText',
        'setImage',
      ]),
    },

    watch: {
      title(value) { this.setTitle(value); },
      text(value) { this.setText(value); }
    },

    mounted() {
      this.fetchData();
    }
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
