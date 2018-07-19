<template>
  <div>
    <i class="down-arrow fal fa-chevron-double-down"
       v-scroll-to="{
         el: '#Presentation',
         duration: 2000,
         offset: -80
       }"></i>
    <section id="Presentation">
      <EditIcon Right="400px"
                Top=""
                :Component="$options.name"
                @backup-original-data="backupData">
        <SectionContainer :title="title" :sub-title="presSubTitle">
          <div slot="content">
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
            <div class="columns is-variable is-8">
              <div class="column">
                <img :src="presImage"
                     v-scroll-reveal="{
                       duration: 2500,
                       delay: 100,
                       easing: 'ease'
                     }">
              </div>
              <div class="column"
                   v-scroll-reveal="{
                     origin: 'right',
                     distance: '400px',
                     delay: 100,
                     duration: 1500,
                     easing: 'ease'
                   }">
                <p>{{ presText2 }}</p>
              </div>
            </div>
          </div>
        </SectionContainer>
      </EditIcon>
      <EditNav v-if="$Global.EditPannel.check($options.name)">


        <div class="column is-2 is-offset-3 edit-area">
          <ul class="editLink">
            <li v-for="i in menu">
              <a class="no-tr" @click="editMenu(i)">{{ i.name }}</a>
            </li>
          </ul>
        </div>

        <div class="column is-3 edit-area">



            <FileUpload v-show="menu.find(i => i.name == 'Image').display"
                        class="TEST">
            </FileUpload>



            <b-input name="title"
                     class="TEST"
                     v-show="menu.find(i => i.name == 'Titre').display"
                     maxlength="35"
                     :disabled="loading"
                     v-model="title">
            </b-input>


            <b-input name="subTitle"
                     class="TEST"
                     v-show="menu.find(i => i.name == 'Sous titre').display"
                     type="textarea"
                     maxlength="200"
                     rows="2"
                     :disabled="loading"
                     v-model="subTitle">
            </b-input>


            <b-input name="text1"
                     class="TEST"
                     v-show="menu.find(i => i.name == 'Texte 1').display"
                     type="textarea"
                     maxlength="800"
                     rows="7"
                     :disabled="loading"
                     v-model="text1">
            </b-input>


            <b-input name="text2"
                     class="TEST"
                     v-show="menu.find(i => i.name == 'Texte 2').display"
                     type="textarea"
                     maxlength="800"
                     rows="7"
                     :disabled="loading"
                     v-model="text2">
            </b-input>


        </div>

      </EditNav>
    </section>
  </div>
</template>

<script>
  import store from './PresentationStore';
  import SectionContainer from '../../Components/SectionContainer';
  import {mapGetters, mapActions} from 'vuex';
  import EditIcon from '../../Components/Edit/EditIcon';
  import EditNav from '../../Components/Edit/EditNav';
  import FileUpload from '../../Components/Edit/FileUpload';

  export default {
    name: "Presentation",
    components: {SectionContainer, EditIcon, EditNav, FileUpload},
    store: store,
    props: {
      url: {type: String}
    },
    data() {
      return {
        downArrow: null,
        menu: [
          {display: false, name: 'Image',},
          {display: false, name: 'Titre',},
          {display: false, name: 'Sous titre',},
          {display: false, name: 'Texte 1',},
          {display: false, name: 'Texte 2',},
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
        'presDirtyFlag',
        'presLoadingFlag',
      ]),

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
      },

      loading: {
        get() { return this.presLoadingFlag; },
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

      editMenu(menu) {
        this.menu.forEach(i => {i.display = false;});
        menu.display = true;
      },

      // getMenu(menu) {
      //   return menu.find(i => i.name == menu).display
      //
      // },

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

  #Presentation {
    margin-top: -20px;
  }

  .TEST {
    position: absolute;
    width: 30%;
  }

  .down-arrow {
    opacity: 0;
    transition: color .5s ease;
    font-size: 50px;
    color: white;
    left: 49%;
    bottom: 120px;
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
