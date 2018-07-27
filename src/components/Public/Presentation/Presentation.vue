<template>
  <div>
    <div class="down-arrow-wrapper">
      <i class="down-arrow fal fa-chevron-double-down"
         v-scroll-to="{
             el: '#Presentation',
             duration: 2000,
             offset: -80
           }"></i>
    </div>
    <section id="Presentation" class="section section-container">
      <EditIcon Top="20px"
                :Component="$options.name"
                @backup-original-data="backupData">

        <div class="container">
          <div class="content">

            <Highlighted sub="Titre" :menu="menu" :name="name">
              <Title>{{ title }}</Title>
            </Highlighted>


            <Highlighted sub="Sous titre" :menu="menu" :name="name">
              <p class="sub-title">{{ subTitle }}</p>
            </Highlighted>

            <Highlighted sub="Texte 1" :menu="menu" :name="name">
              <p class="text1"
                 v-scroll-reveal="{
                     origin: 'left',
                     distance: '400px',
                     duration: 1500,
                     delay: 50,
                     easing: 'ease',
                   }">
                {{ presText1 }}
              </p>
            </Highlighted>

            <div class="columns is-variable is-8">
              <div class="column">

                <Highlighted sub="Image" :menu="menu" :name="name">
                  <img :src="presImage"
                       v-scroll-reveal="{
                               duration: 2500,
                               delay: 100,
                               easing: 'ease'
                             }">
                </Highlighted>

              </div>

              <div class="column"
                   v-scroll-reveal="{
                           origin: 'right',
                           distance: '400px',
                           delay: 100,
                           duration: 1500,
                           easing: 'ease'
                         }">
                <Highlighted sub="Texte 2" :menu="menu" :name="name">
                  <p>{{ presText2 }}</p>
                </Highlighted>

              </div>

            </div>
          </div>
        </div>

      </EditIcon>
    </section>

    <EditNav v-if="editPannel.check(name)">

      <div class="column is-2 is-offset-3 edit-area">
        <ul class="editLink">
          <li v-for="i in menu">
            <a class="no-tr"
               :class="{'selected': editPannel.getSelected(i.name, menu).display}"
               @click="editPannel.editMenu(i, menu)">
              {{ i.name }}
            </a>
          </li>
        </ul>
      </div>

      <div class="column is-3 edit-area">
        <FileUpload
          v-show="editPannel.getSelected('Image', menu).display"></FileUpload>


        <b-input maxlength="35"
                 :disabled="loading"
                 v-show="editPannel.getSelected('Titre', menu).display"
                 v-model="title">
        </b-input>
        <b-input type="textarea"
                 maxlength="200"
                 rows="2"
                 :disabled="loading"
                 v-show="editPannel.getSelected('Sous titre', menu).display"
                 v-model="subTitle">
        </b-input>
        <b-input type="textarea"
                 maxlength="800"
                 rows="7"
                 :disabled="loading"
                 v-show="editPannel.getSelected('Texte 1', menu).display"
                 v-model="text1">
        </b-input>
        <b-input type="textarea"
                 maxlength="800"
                 rows="7"
                 :disabled="loading"
                 v-show="editPannel.getSelected('Texte 2', menu).display"
                 v-model="text2">
        </b-input>
      </div>
    </EditNav>
  </div>
</template>

<script>
  import store from './PresentationStore';
  import {mapGetters, mapActions} from 'vuex';
  import EditIcon from '../../Components/Edit/EditIcon';
  import EditNav from '../../Components/Edit/EditNav';
  import FileUpload from '../../Components/Edit/FileUpload';


  export default {
    name: "Presentation",
    components: {EditIcon, EditNav, FileUpload},
    store: store,
    data() {
      return {
        name: this.$options.name,
        downArrow: null,
        editPannel: this.$Global.EditPannel,
        menu: [
          {display: true, name: 'Image'},
          {display: false, name: 'Titre'},
          {display: false, name: 'Sous titre'},
          {display: false, name: 'Texte 1'},
          {display: false, name: 'Texte 2'},
        ]
      };
    },
    computed: {
      ...mapGetters([
        'presTitle',
        'presSubTitle',
        'presText1',
        'presText2',
        'presImage',
        'DirtyFlag',
        'LoadingFlag',
      ]),

      loading: {
        get() { return this.LoadingFlag; },
      },

      title: {
        get() { return this.presTitle; },
        set(value) {
          this.setTitle(value);
          this.toggleDirty();
        }
      },

      subTitle: {
        get() { return this.presSubTitle; },
        set(value) {
          this.setSubTitle(value);
          this.toggleDirty();
        }
      },

      text1: {
        get() { return this.presText1; },
        set(value) {
          this.setText1(value);
          this.toggleDirty();
        }
      },

      text2: {
        get() { return this.presText2; },
        set(value) {
          this.setText2(value);
          this.toggleDirty();
        }
      },

      image: {
        get() { return this.presImage; },
        set(value) {
          this.setImage(value);
          this.toggleDirty();
        }
      }
    },

    watch: {
      title(value) { this.setTitle(value); },
      subTitle(value) { this.setSubTitle(value); },
      text1(value) { this.setText1(value); },
      text2(value) { this.setText2(value); },
      image(value) { this.setImage(value); },
    },

    methods: {
      ...mapActions([
        'fetchData',
        'pushData',
        'backupData',
        'recoverData',
        'setTitle',
        'setSubTitle',
        'setText1',
        'setText2',
        'setImage',
        'toggleDirty',
      ]),

      scrollWatch() {
        if (window.pageYOffset >= 165) {
          this.downArrow.classList.remove('fadeInDown');
          this.downArrow.classList.add('fadeOutDown');
          window.removeEventListener('scroll', this.scrollWatch);
        }
      },

      setDownArrow() {
        setTimeout(() => {
          this.downArrow = document.getElementsByClassName('down-arrow')[0];
          this.downArrow.classList.add('fadeInDown');
          setTimeout(() => {
            Velocity(this.downArrow, {opacity: '1'});
          }, 1000);
        }, 1800);
      }
    },

    mounted() {
      this.fetchData();

      window.addEventListener('scroll', this.scrollWatch);
      this.setDownArrow();
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .section {
    margin-top: -70px !important;
  }

  .down-arrow-wrapper {
    animation: down-arrow .6s ease infinite;

    @keyframes down-arrow {
      0% {
        transform: translateY(0px);
      }
      60% {
        transform: translateY(-5px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }

  .down-arrow {
    opacity: 0;
    transition: color .5s ease;
    font-size: 50px;
    font-weight: normal;
    color: white;
    left: 49%;
    bottom: 140px;
    position: relative;
    cursor: pointer;

    @media screen and (max-width: 1366px) {
      display: none;
    }

    &:hover {
      transition: color .5s ease;
      color: #d1d1d1;
    }
  }

  .text1 {
    margin-bottom: 40px !important;
  }
</style>
