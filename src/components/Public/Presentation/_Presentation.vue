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

            <Title :class="{'highlighted': activeTab==1&&edit.component==name}">
              {{ title }}
            </Title>


            <p class="sub-title"
               :class="{'highlighted': activeTab==2&&edit.component==name}">
              {{ subTitle }}
            </p>

            <p class="text1"
               :class="{'highlighted': activeTab==3&&edit.component==name}"
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
                     :class="{'highlighted': activeTab==0&&edit.component==name}"
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
                <p :class="{'highlighted': activeTab==4&&edit.component==name}">
                  {{ presText2 }}
                </p>

              </div>

            </div>
          </div>
        </div>

      </EditIcon>
    </section>

    <EditNav v-if="edit.check(name)" height="225">


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
        <b-tab-item label="Sous titre">
          <b-input type="textarea"
                   maxlength="200"
                   rows="2"
                   :disabled="loading"
                   v-model="subTitle">
          </b-input>
        </b-tab-item>
        <b-tab-item label="Texte 1">
          <b-input type="textarea"
                   maxlength="800"
                   rows="4"
                   :disabled="loading"
                   v-model="text1">
          </b-input>
        </b-tab-item>
        <b-tab-item label="texte 2">
          <b-input type="textarea"
                   maxlength="800"
                   rows="4"
                   :disabled="loading"
                   v-model="text2">
          </b-input>
        </b-tab-item>

      </b-tabs>

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
        activeTab: 0,
        name: this.$options.name,
        downArrow: null,
        edit: this.$Global.EditPannel,
        menu: [
          {display: false, name: 'Image'},
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
    margin-top: -50px !important;
    @media screen and (max-width: 1366px) {
      margin-top: 25px !important;

    }
  }

  .down-arrow-wrapper {
    position: absolute;
    left: 49%;
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
    bottom: 140px;
    position: relative;
    cursor: pointer;

    &:hover {
      transition: color .5s ease;
      color: #d1d1d1;
    }
  }

  .text1 {
    margin-bottom: 40px !important;
  }
</style>
