<template>
  <div>
    <div class="down-arrow-wrapper">
      <i class="down-arrow fal fa-chevron-double-down"
         v-scroll-to="{
             el: '#Presentation',
             duration: 2000,
             offset: -80
           }">
      </i>
    </div>
    <section id="Presentation" class="section section-container">
      <EditIcon top="20px" :component="name">
        <div class="container">
          <div class="content">
            <Title :class="{'highlighted': highlighted(1)}">
              {{ title }}
            </Title>
            <p class="sub-title"
               :class="{'highlighted': highlighted(2)}">
              {{ subTi }}
            </p>
            <p class="text1"
               :class="{'highlighted': highlighted(3)}"
               v-scroll-reveal="{
                     origin: 'left',
                     distance: '400px',
                     duration: 1500,
                     delay: 50,
                     easing: 'ease',
                   }">
              {{ text1 }}
            </p>

            <div class="columns is-variable is-8">
              <div class="column">
                <img :src="image"
                     :class="{'highlighted': highlighted(0)}"
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
                <p :class="{'highlighted': highlighted(4)}">
                  {{ text2 }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </EditIcon>
    </section>

    <EditNav v-if="checkName()" height="225">
      <b-tabs v-model="activeTab" position="is-centered">
        <b-tab-item label="Image">
          <FileUpload @image-preview="image=$event"/>
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
                   v-model="subTi">
          </b-input>
        </b-tab-item>
        <b-tab-item label="Texte 1">
          <b-input type="textarea"
                   maxlength="800"
                   rows="5"
                   :disabled="loading"
                   v-model="text1">
          </b-input>
        </b-tab-item>
        <b-tab-item label="texte 2">
          <b-input type="textarea"
                   maxlength="800"
                   rows="5"
                   :disabled="loading"
                   v-model="text2">
          </b-input>
        </b-tab-item>
      </b-tabs>
    </EditNav>
  </div>
</template>

<script>
  import PresentationStore from './PresentationStore';
  import mixin from '../../../mixins/PublicMixin'



  export default {
    name: "Presentation",
    mixins: [mixin],
    data() {
      return {
        store: PresentationStore,
        state: PresentationStore.state,
        downArrow: null,
      };
    },
    computed: {
      title: {
        get() { return this.state.title; },
        set(value) { this.state.title = value; }
      },
      subTi: {
        get() { return this.state.subTi; },
        set(value) { this.state.subTi = value; }
      },
      text1: {
        get() { return this.state.text1; },
        set(value) { this.state.text1 = value; }
      },
      text2: {
        get() { return this.state.text2; },
        set(value) { this.state.text2 = value; }
      },
      image: {
        get() { return this.state.image; },
        set(value) {this.state.image = value; }
      },
    },
    methods: {
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
