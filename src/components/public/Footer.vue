<template>
  <section class="section hero">

    <button class="button _btn no-tr"
            v-scroll-reveal="{
              origin: 'top',
              distance: '20px',
              duration: 1500,
              delay: 0,
              easing: 'ease',
             }"
            v-scroll-to="{
              el: '#Home',
              duration: 2000,
              offset: -50
            }">
      <i class="fas fa-arrow-up"></i>
      &nbsp; Haut de la page
    </button>

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
  import options from '../../options';
  import moment from 'moment';


  export default {
    name: "Footer",
    data() {
      return {
        icons: [
          {icon: 'fa-facebook', url: options.facebook,},
          {icon: 'fa-tripadvisor', url: options.tripadvisor,},
          {icon: 'fa-google', url: options.google,},
          {icon: 'fa-twitter', url: options.twitter,},
          {icon: 'fa-instagram', url: options.instagram,},
          {icon: 'fa-linkedin', url: options.linkedin,},
          {icon: 'fa-snapchat', url: options.snapchat,},
        ]
      };
    },
    computed: {
      getCopyright() {
        return moment().format('Y') + ' ' + options.projectName;
      },

      withLove() {
        return 'With \uf004 by Jrosk';
      }
    },
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
