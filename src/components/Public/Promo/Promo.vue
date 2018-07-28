<template>
  <div>
    <div class="container collapse-content">
      <EditIcon Right="200px"
                Top="0"
                :Component="$options.name"
                @backup-original-data="backupData">

        <div class="columns content">

          <div class="column left is-offset-2 is-4">
            <Highlighted sub="Image" :menu="menu" :name="name">
              <img :src="promoImage">
            </Highlighted>
          </div>

          <div class="column right is-5">
            <div>

              <Highlighted sub="Titre" :menu="menu" :name="name">
                <h3>{{ promoTitle }}</h3>
              </Highlighted>

              <Highlighted sub="Texte" :menu="menu" :name="name">
                <p>{{ promoText }}</p>
              </Highlighted>
            </div>
          </div>

        </div>

      </EditIcon>
    </div>
    <EditNav v-if="editPannel.check($options.name)">
      <div class="column is-3 edit-area">
        <FileUpload
          v-show="editPannel.getSelected('Image', menu).display"></FileUpload>
        <b-input v-show="menu.find(i=>i.name=='Titre').display"
                 maxlength="35"
                 :disabled="loading"
                 v-model="title">
        </b-input>
        <b-input v-show="menu.find(i=>i.name=='Texte').display"
                 type="textarea"
                 maxlength="500"
                 rows="7"
                 :disabled="loading"
                 v-model="text">
        </b-input>
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
      return {
        name: this.$options.name,
        editPannel: this.$Global.EditPannel,
        menu: [
          {display: true, name: 'Image',},
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
