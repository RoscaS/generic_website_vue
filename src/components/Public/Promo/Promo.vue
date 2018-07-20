<template>
  <div>
    <div class="container collapse-content">
      <EditIcon Right="200px"
                Top="36px"
                :Component="$options.name"
                @backup-original-data="backupData">

        <div class="columns content">

          <div class="column left is-offset-2 is-4">
            <div :class="{'highlighted': highlight('Image')}">
              <img :src="promoImage">
            </div>
          </div>

          <div class="column right is-5">
            <div>
              <div :class="{'highlighted': highlight('Titre')}">
                <h3>{{ promoTitle }}</h3>
              </div>
              <div :class="{'highlighted': highlight('Texte')}">
                <p>{{ promoText }}</p>
              </div>
            </div>
          </div>

        </div>

      </EditIcon>
    </div>
    <EditNav v-if="$Global.EditPannel.check($options.name)">

      <div class="column is-2 is-offset-3 edit-area">
        <ul class="editLink">
          <li v-for="i in menu">
            <a class="no-tr"
               :class="{'selected': findElement(i.name).display}"
               @click="editMenu(i)">
              {{ i.name }}
            </a>
          </li>
        </ul>
      </div>


      <div class="column is-3 edit-area">
        <FileUpload v-show="findElement('Image').display"></FileUpload>
        <b-input name="title"
                 v-show="findElement('Titre').display"
                 maxlength="35"
                 :disabled="loading"
                 v-model="title">
        </b-input>
        <b-input name="text"
                 v-show="findElement('Texte').display"
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
        get() { return this.LoadingFlag; },
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

      editMenu(menu) {
        this.menu.forEach(i => {i.display = false;});
        menu.display = true;
      },

      findElement(element) {
        return this.menu.find(i => i.name == element);
      },

      highlight(element) {
        return (this.findElement(element).display && this.$Global.EditPannel.edit);
      },
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
