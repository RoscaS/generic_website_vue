<template>
  <div>
    <section class="section hero">
      <EditIcon Right="400px"
                Top="0px"
                :Component="$options.name"
                @backup-original-data="backupData">
        <div class="container">

          <div class="columns is-variable is-8">
            <div class="column"
                 v-scroll-reveal="{
                   origin: 'left',
                   distance: '400px',
                   duration: 1500,
                   easing: 'ease'
                   }">
              <i :class="L_icon"></i>
              <h2 class="subtitle">{{ L_title }}</h2>
              <p>{{ L_text }}</p>
            </div>
            <div class="column"
                 v-scroll-reveal="{
                   duration: 1500,
                   easing: 'ease'
                   }">
              <i :class="M_icon"></i>
              <h2 class="subtitle">{{ M_title }}</h2>
              <p>{{ M_text }}</p>
            </div>
            <div class="column"
                 v-scroll-reveal="{
                   origin: 'right',
                   distance: '400px',
                   duration: 1500,
                   easing: 'ease'
                   }">
              <i :class="R_icon"></i>
              <h2 class="subtitle">{{ R_title }}</h2>
              <p>{{ R_text }}</p>
            </div>
          </div>

        </div>
      </EditIcon>
    </section>
    <EditNav v-if="$Global.EditPannel.check($options.name)">

      <div class="column is-2 is-offset-2 edit-area">
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

      <div class="column is-3 edit-area"
           v-show="findElement('Gauche').display">
        <label>Titre:</label>
        <b-input name="L_title"
                 maxlength="35"
                 :disabled="loading"
                 v-model="L_title">
        </b-input>
        <label>Texte:</label>
        <b-input name="L_text"
                 type="textarea"
                 rows="3"
                 maxlength="200"
                 :disabled="loading"
                 v-model="L_text">
        </b-input>
      </div>
      <div class="column is-2 edit-area"
           v-show="findElement('Gauche').display">
        <label>Icone:</label>
        <b-input name="L_icon"
                 maxlength="100"
                 :disabled="loading"
                 v-model="L_icon">
        </b-input>
      </div>


      <div class="column is-3 edit-area"
           v-show="findElement('Centre').display">
        <label>Titre:</label>
        <b-input name="M_title"
                 maxlength="35"
                 :disabled="loading"
                 v-model="M_title">
        </b-input>
        <label>Texte:</label>
        <b-input name="M_text"
                 type="textarea"
                 rows="3"
                 maxlength="200"
                 :disabled="loading"
                 v-model="M_text">
        </b-input>
      </div>
      <div class="column is-2 edit-area"
           v-show="findElement('Centre').display">
        <label>Icone:</label>
        <b-input name="M_icon"
                 maxlength="100"
                 :disabled="loading"
                 v-model="M_icon">
        </b-input>
      </div>


      <div class="column is-3 edit-area"
           v-show="findElement('Droite').display">
        <label>Titre:</label>
        <b-input name="R_title"
                 maxlength="35"
                 :disabled="loading"
                 v-model="R_title">
        </b-input>
        <label>Texte:</label>
        <b-input name="R_text"
                 type="textarea"
                 rows="3"
                 maxlength="200"
                 :disabled="loading"
                 v-model="R_text">
        </b-input>
      </div>


      <div class="column is-3 edit-area"
           v-show="findElement('Droite').display">
        <label>Icone:</label>
          <IconPicker v-on:selectIcon="returnIcon"></IconPicker>
      </div>


    </EditNav>
  </div>
</template>

<script>
  import IconPicker from '../../Components/IconPicker/IconPicker';

  import store from './HeroStore';
  import {mapGetters, mapActions} from 'vuex';
  import EditIcon from '../../Components/Edit/EditIcon';
  import EditNav from '../../Components/Edit/EditNav';
  import FileUpload from '../../Components/Edit/FileUpload';

  export default {
    name: "Hero",
    components: {EditIcon, EditNav, FileUpload, IconPicker},
    store: store,
    props: {
      url: {type: String}
    },
    data() {
      return {
        iconPicker: false,
        menu: [
          {display: true, name: 'Gauche'},
          {display: false, name: 'Centre'},
          {display: false, name: 'Droite'},
        ]
      };
    },
    computed: {
      ...mapGetters([
        'heroLeft',
        'heroMiddle',
        'heroRight',
        'DirtyFlag',
        'LoadingFlag',
      ]),

      L_title: {
        get() { return this.heroLeft.title; },
        set(value) {
          this.setLeftTitle(value);
          this.toggleDirty();
        }
      },
      M_title: {
        get() { return this.heroMiddle.title; },
        set(value) {
          this.setMiddleTitle(value);
          this.toggleDirty();
        }
      },
      R_title: {
        get() { return this.heroRight.title; },
        set(value) {
          this.setRightTitle(value);
          this.toggleDirty();
        }
      },
      L_icon: {
        get() { return this.heroLeft.icon; },
        set(value) {
          this.setLeftIcon(value);
          this.toggleDirty();
        }
      },
      M_icon: {
        get() { return this.heroMiddle.icon; },
        set(value) {
          this.setMiddleIcon(value);
          this.toggleDirty();
        }
      },
      R_icon: {
        get() { return this.heroRight.icon; },
        set(value) {
          this.setRightIcon(value);
          this.toggleDirty();
        }
      },
      L_text: {
        get() { return this.heroLeft.text; },
        set(value) {
          this.setLeftText(value);
          this.toggleDirty();
        }
      },
      M_text: {
        get() { return this.heroMiddle.text; },
        set(value) {
          this.setMiddleText(value);
          this.toggleDirty();
        }
      },
      R_text: {
        get() { return this.heroRight.text; },
        set(value) {
          this.setRightText(value);
          this.toggleDirty();
        }
      },
      loading: {
        get() { return this.LoadingFlag; },
      }
    },
    watch: {
      L_title(value) { this.setLeftTitle(value); },
      M_title(value) { this.setMiddleTitle(value); },
      R_title(value) { this.setRightTitle(value); },
      L_icon(value) { this.setLeftIcon(value); },
      M_icon(value) { this.setMiddleIcon(value); },
      R_icon(value) { this.setRightIcon(value); },
      L_text(value) { this.setLeftText(value); },
      M_text(value) { this.setMiddleText(value); },
      R_text(value) { this.setRightText(value); },
    },
    methods: {
      ...mapActions([
        'fetchData',
        'pushData',
        'backupData',
        'recoverData',
        'setLeftTitle',
        'setMiddleTitle',
        'setRightTitle',
        'setLeftIcon',
        'setMiddleIcon',
        'setRightIcon',
        'setLeftText',
        'setMiddleText',
        'setRightText',
        'toggleDirty',
      ]),

      returnIcon(selectedIcon) {
        console.log('selected', selectedIcon)
      },

      editMenu(menu) {
        this.menu.forEach(i => {i.display = false;});
        menu.display = true;
      },

      findElement(element) {
        return this.menu.find(i => i.name == element);
      },

    },
    mounted() {
      this.fetchData();
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .hero {
    text-align: center;
    background-color: $separator;

    h1, h2, p {
      color: white;
    }

    h2 {
      font-weight: bold;
    }

    p {
      font-size: 15px;
      font-weight: 400;
    }

    i {
      font-size: 60px;
      color: white;
      margin-bottom: 30px;
    }

  }

  label {
    font-weight: bolder;
    color: white !important;
  }


</style>
