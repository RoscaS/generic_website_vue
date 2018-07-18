<template>
  <section class="section hero">

    <div v-scroll-reveal="{
          origin: 'top',
          distance: '20px',
          duration: 1500,
          delay: 0,
          easing: 'ease',
         }">
      <button class="button _btn no-tr"
              v-scroll-to="{
              el: '#Home',
              duration: 2000,
              offset: -50
            }">
        <i class="fas fa-arrow-up"></i>
        &nbsp; Haut de la page
      </button>
    </div>

    <div class="level is-mobile">
      <div class="level-item"
           v-for="icon in icons"
           v-scroll-reveal="{
                   origin: 'bottom',
                   distance: '20px',
                   duration: 1500,
                   delay: 0,
                   easing: 'ease',
                  }">
        <a class="no-tr" target="_blank" :href="icon.url">
          <i class="grow fab" :class="icon.icon"></i>
        </a>
      </div>
    </div>

    <p v-scroll-reveal="{
        origin: 'left',
        distance: '200px',
        duration: 1500,
        delay: 0,
        easing: 'ease',
       }">
      Copyright &copy; {{ getCopyright }}
    </p>
    <p v-scroll-reveal="{
        origin: 'right',
        distance: '200px',
        duration: 1500,
        delay: 0,
        easing: 'ease',
       }">
      Design & code:
      <a class="jrosk" href="mailto:jrosk.ad@gmail.com" title="With  by JrosK">JrosK</a>
    </p>

  </section>
</template>

<script>
  import moment from 'moment';


  export default {
    name: "Footer",
    data() {
      return {
        options: this.$Global.Options,
      };
    },
    computed: {
      icons() {
        return [
          {icon: 'fa-facebook', url: this.options.facebook,},
          {icon: 'fa-tripadvisor', url: this.options.tripadvisor,},
          {icon: 'fa-google', url: this.options.google,},
          {icon: 'fa-twitter', url: this.options.twitter,},
          {icon: 'fa-instagram', url: this.options.instagram,},
          {icon: 'fa-linkedin', url: this.options.linkedin,},
          {icon: 'fa-snapchat', url: this.options.snapchat,},
        ];
      }
    },
    methods: {
      getCopyright() {
        return moment().format('Y') + ' ' + this.options.projectName;
      },
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  .hero {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: $separator;
    /*height: 250px;*/

    ._btn {
      border-color: white;
      color: white;

      &:hover {
        color: black;
        background-color: white;
      }
    }
  }

  .level {
    margin-top: 30px;
    width: 400px;
    .level-item {
      a {
        color: white;

        i {
          transition: transform .2s ease;
          font-size: 30px;
          transform: scale(1);

          &:hover {
            transition: transform .2s ease;
            transform: scale(1.2);
          }
        }
      }
    }
  }

  p {
    color: white;
  }

  .jrosk {
    color: #FFFFFF;
    font-weight: bold;
    font-size: 20px;
    margin-left: 5px;

    &:hover {
      color: #FFFFFF;
    }

    &:after {
      background: #FFFFFF;
    }
  }

</style>
