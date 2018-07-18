<template>
  <div>
    <div class="container collapse-content">
      <EditIcon Right="200px"
                Top="36px"
                :Component="$options.name"
                @backup-original-data="backupData">

        <div class="columns content">

          <div class="column left is-offset-2 is-4">
            <img :src="promoImage">
          </div>

          <div class="column right is-5">
            <div>
              <h3>{{ promoTitle }}</h3>
              <p>{{ promoText }}</p>
            </div>
          </div>

        </div>

      </EditIcon>
    </div>
    <EditNav v-if="$Global.EditPannel.check($options.name)">
        <div class="column is-3 is-offset-one-quarter edit-area">
          <FileUpload></FileUpload>
        </div>
        <div class="column is-3 edit-area">
          <b-field label="Titre" custom-class="has-text-white">
            <b-input name="title"
                     maxlength="35"
                     :disabled="loading"
                     v-model="title">
            </b-input>
          </b-field>
          <b-field label="Text" custom-class="has-text-white">
            <b-input name="text"
                     type="textarea"
                     maxlength="500"
                     :disabled="loading"
                     v-model="text">
            </b-input>
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
  import FileUpload from '../../Components/Edit/FileUpload';

  export default {
    name: 'Promo',
    components: {EditIcon, EditNav, FileUpload},
    store: store,
    data() {
      return {};
    },
    computed: {
      ...mapGetters([
        'promoTitle',
        'promoText',
        'promoImage',
        'promoDirtyFlag', // used in Validation Btns
        'promoLoadingFlag',
      ]),

      title: {
        get() { return this.promoTitle; },
        set(value) {
          this.setTitle(value);
          this.toggleDirty();
        }
      },
      text: {
        get() { return this.promoText; },
        set(value) {
          this.setText(value);
          this.toggleDirty();
        }
      },
      image: {
        get() { return this.promoImage; },
        set(value) {
          this.setImage(value);
          this.toggleDirty();
        }
      },
      loading: {
        get() { return this.promoLoadingFlag; },
      }
    },

    watch: {
      title(value) {this.setTitle(value);},
      text(value) {this.setText(value);},
      image(value) {this.setImage(value);}
    },

    methods: {
      ...mapActions([
        'fetchData',
        'pushData',
        'backupData',
        'recoverData',
        'setTitle',
        'setText',
        'setImage',
        'toggleDirty',
      ]),
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

    @media screen and (max-width: 768px) {
      height: 800px;

      .column {
        display: flex;
        justify-content: center;
        align-items: center;

        h2 {
          display: block;
        }

        p {
          display: block;
        }
      }
    }

    img {
      width: 400px;
      margin-top: 30px;
    }

    .right {
      padding: 40px;
      @media screen and (max-width: 768px) {
        padding: 80px;
      }
    }
  }
</style>
