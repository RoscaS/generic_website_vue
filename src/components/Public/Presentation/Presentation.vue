<template>
  <div>
    <div class="down-arrow-wrapper">
      <i class="down-arrow fal fa-chevron-double-down"
         v-scroll-to="{ el: '#Presentation', duration: 2000, offset: -80 }">
      </i>
    </div>

    <BaseLayout :id="name"
                :title="state.title.data"
                :subTi="state.subTi.data"
                :state="state"
                :activeTab="activeTab"
                :loading="loading"
                @changeTab="activeTab=$event">
      <p class="text1"
         :class="{'highlighted': highlighted(2)}"
         v-scroll-reveal="sReveal('left', 250, 400)">
        {{ state.text1.data }}
      </p>
      <div class="columns is-variable is-8">
        <div class="column">
          <img :src="state.image.data"
               :class="{'highlighted': highlighted(4)}"
               v-scroll-reveal="sReveal('bottom', 300, 10)">
        </div>
        <div class="column"
             v-scroll-reveal="sReveal('right', 350, 400)">
          <p :class="{'highlighted': highlighted(3)}">

            {{ state.text2.data }}
          </p>
        </div>
      </div>
    </BaseLayout>
  </div>
</template>

<script>
  import PresentationStore from './PresentationStore';
  import mixin from '../../../mixins/Public/PublicMixin';

  export default {
    name: "Presentation",
    mixins: [mixin],
    data() {
      return {
        store: PresentationStore,
        state: {
          title: {data: '', len: '35', label: 'Titre',},
          subTi: {data: '', type: 'textarea', len: '200', rows: '2', label: 'Sous titre',},
          text1: {data: '', type: 'textarea', len: '400', rows: '5', label: 'Texte 1',},
          text2: {data: '', type: 'textarea', len: '400', rows: '5', label: 'Texte 2',},
          image: {data: '', label: 'Image',},
        },
        downArrow: null,
      };
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
    }
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
