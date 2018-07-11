<template>
  <div>
    <div class="container collapse-content">

      <EditIcon marginTop="10px" @backup-original-data="backupData">
        <div class="columns">

          <div class="column left is-4 is-offset-2-tablet">
            <img :src="promoImage">
          </div>

          <div class="column right is-5 content">
            <h3>{{ promoTitle }}</h3>
            <p>
              {{ promoText }}
              <textarea v-if="editText" v-model="text"></textarea>
            </p>
          </div>

        </div>
      </EditIcon>
    </div>
    <EditNav>
      <div class="column is-3 is-offset-one-quarter edit-area">
        <b-field label="Titre" custom-class="has-text-white">
          <b-input name="title"
                   maxlength="200"
                   v-model="title">
          </b-input>
        </b-field>
        <b-field label="Text" custom-class="has-text-white">
          <b-input name="text"
                   type="textarea"
                   maxlength="2000"
                   v-model="text">
          </b-input>
        </b-field>
      </div>
      <div class="column is-3 edit-area">
        <b-field label="Image" custom-class="has-text-white">
          <b-input maxlength="200"></b-input>
        </b-field>
      </div>
    </EditNav>
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
        set(value) {
          this.setTitle(value);
          this.setDirty();
        }
      },
      text: {
        get() { return this.promoText; },
        set(value) {
          this.setText(value);
          this.setDirty();
        }
      },
      image: {
        get() { return this.promoImage; },
        set(value) {
          this.setImage(value);
          this.setDirty();
        }
      },

    },

    methods: {
      ...mapActions([
        'fetchData',
        'pushData',
        'backupData',
        'setTitle',
        'setText',
        'setImage',
        'setDirty',
      ]),
    },

    watch: {
      title(value) {this.setTitle(value);},
      text(value) {this.setText(value);},
      image(value) {this.setImage(value);}
    },

    mounted() {
      this.fetchData();
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .edit-area {
    .label {
      color: white;
    }
  }

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
