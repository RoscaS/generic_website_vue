<template>
  <div>
    <div class="container collapse-content">
      <EditIcon Right="200px"
                Top="0"
                :Component="$options.name"
                @backup-original-data="backupData">

        <div class="columns content">

          <div class="column left is-offset-2 is-4">
              <img :class="{'highlighted': activeTab==0&&edit.component==name}"
                   :src="promoImage">
          </div>

          <div class="column right is-5">
            <div>

                <h3 :class="{'highlighted': activeTab==1&&edit.component==name}">
                  {{ promoTitle }}
                </h3>

                <p :class="{'highlighted': activeTab==2&&edit.component==name}">
                  {{ promoText }}
                </p>
            </div>
          </div>

        </div>

      </EditIcon>
    </div>
    <EditNav v-if="edit.check(name)">

      <b-tabs v-model="activeTab" position="is-centered">

        <b-tab-item label="Image">
          <FileUpload></FileUpload>
        </b-tab-item>

        <b-tab-item label="Titre">

          <b-input maxlength="35"
                   :disabled="loading"
                   v-model="title">
          </b-input>
        </b-tab-item>

        <b-tab-item label="Texte">

          <b-input type="textarea"
                   maxlength="500"
                   rows="4"
                   :disabled="loading"
                   v-model="text">
          </b-input>
        </b-tab-item>
      </b-tabs>
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
      return {
        activeTab: null,
        name: this.$options.name,
        edit: this.$Global.EditPannel,
        menu: [
          {display: false, name: 'Image',},
          {display: false, name: 'Titre',},
          {display: false, name: 'Texte',},
        ]
      };
    },
    computed: {
      ...mapGetters([
        'promoTitle',
        'promoText',
        'promoImage',
        'DirtyFlag', // used in Validation Btns
        'LoadingFlag',
      ]),

      loading: {
        get() { return this.LoadingFlag; },
      },

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
