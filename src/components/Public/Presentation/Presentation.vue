<template>
  <div>
    <i class="down-arrow fal fa-chevron-double-down"
       v-scroll-to="{
         el: '#Presentation',
         duration: 2000,
         offset: -80
       }"></i>
    <section id="Presentation">
      <EditIcon Right="400px" Top="" @backup-original-data="backupData">
        <SectionContainer :title="presTitle" :sub-title="presSubTitle">
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
      <!--<EditNav>-->
        <!--<div slot="content">-->
          <!--<div class="column is-3 edit-area">-->
            <!--<b-field label="Titre" custom-class="has-text-white">-->
              <!--<b-input name="title"-->
                       <!--maxlength="200"-->
                       <!--:disabled="loading"-->
                       <!--v-model="title">-->
              <!--</b-input>-->
            <!--</b-field>-->
            <!--<b-field label="Text" custom-class="has-text-white">-->
              <!--<b-input name="text"-->
                       <!--type="textarea"-->
                       <!--maxlength="2000"-->
                       <!--:disabled="loading"-->
                       <!--v-model="text">-->
              <!--</b-input>-->
            <!--</b-field>-->
          <!--</div>-->
        <!--</div>-->
      <!--</EditNav>-->
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
        base: {},
        downArrow: null,
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
    },

    watch: {
      title(value) { this.settitle(value); },
      subTitle(value) { this.setsubTitle(value); },
      text1(value) { this.settext1(value); },
      text2(value) { this.settext2(value); },
      image(value) { this.setimage(value); },
    },

    methods: {
      ...mapActions([
        'fetchData',
        'pushData',
        'backupData',
        'recoverData',
        'settitle',
        'setsubTitle',
        'settext1',
        'settext2',
        'setimage',
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

  #Presentation {
    margin-top: -20px;
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
