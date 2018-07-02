<template>
  <div>
    <transition>
      <i class="down-arrow fal fa-chevron-double-down"
         v-scroll-to="{
                     el: '#Presentation',
                     duration: 2000,
                     offset: -80
                     }"></i>
    </transition>
    <section id="Presentation">
      <SectionContainer :title="title" :sub-title="subTitle">
        <div slot="content">
          <p class="text1"
             v-scroll-reveal="{
             origin: 'left',
             distance: '400px',
             duration: 1500,
             delay: 250,
             easing: 'ease'
             }">
            {{ text1 }}
          </p>
          <div class="columns is-variable is-8">
            <div class="column">
              <img :src="image"
                   v-scroll-reveal="{
                   duration: 2500,
                   delay: 500,
                   easing: 'ease'
                   }">
            </div>
            <div class="column"
                 v-scroll-reveal="{
                 origin: 'right',
                 distance: '400px',
                 duration: 1500,
                 easing: 'ease'
                 }">
              <p>{{ text2 }}</p>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  </div>
</template>

<script>
  import SectionContainer from '../Components/SectionContainer';
  import axios from 'axios';

  export default {
    name: "Presentation",
    components: { SectionContainer },
    props: {
      url: {type: String}
    },
    data() {
      return {
        base: {},
        downArrow: null,
        title: '',
        subTitle: '',
        text1: '',
        text2: '',
        image: '',
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
      axios.get(this.url).then(response => {
        let data = response.data[0];
        this.title = data.title;
        this.subTitle = data.sub_title;
        this.text1 = data.text1;
        this.text2 = data.text2;
        this.image = data.image.image;
      }).catch(error => {
        console.log(this.url);
        console.log(error);
      });

      window.addEventListener('scroll', this.scrollWatch);
      this.setDownArrow();
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  #Presentation {
    margin-top: -20px;
  }

  .down-arrow {
    opacity: 0;
    transition: color .5s ease;
    font-size: 50px;
    color: white;
    left: 49%;
    bottom: 90px;
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
