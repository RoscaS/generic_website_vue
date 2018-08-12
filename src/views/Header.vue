<template>
  <section id="Home" class="section">
    <div class="container _wrapper">
      <div class="columns">

        <div class="column is-3 is-hidden-mobile">
            <div class="_sides _left"
                 v-scroll-reveal="{
                 origin: 'left',
                 distance: '400px',
                 duration: 1000,
                 delay: 1500
                 }">
              <a class="no-tr" href="#" v-scroll-to="'#'">
                <i class="fal fa-calendar fa-fw"
                   :title="getTitle('horaire')"></i>
              </a>
              <span class="first-line">HORAIRE NON SPÉCIFIÉ</span>
              <span class="second-line">CLIQUEZ SUR LE LIEN</span>
            </div>
        </div>

        <div class="column is-6">
          <div class="_center">
            <div class="_title"
                 v-scroll-reveal="{
                 origin: 'top',
                 duration: 1000,
                 delay: 500
                 }">
              {{ siteSettings.name }}
            </div>
            <div class="_ribbon"
                 v-scroll-reveal="{
                 origin: 'bottom',
                 duration: 2000,
                 delay: 500
                 }">
              <div class="text">
                {{ siteSettings.nameAdd.toUpperCase() }}
              </div>
            </div>
            <transition name="subtitle-fade-in" appear>
              <div class="_subtitle">
                {{ siteSettings.city.toUpperCase() }} / DEPUIS {{ siteSettings.oppening}}
              </div>
            </transition>
          </div>
        </div>


        <div class="column is-3 is-hidden-mobile">
            <div class="_sides _right"
                 v-scroll-reveal="{
                 origin: 'right',
                 distance: '400px',
                 duration: 1000,
                 delay: 1500
                 }">
              <span class="first-line">{{ siteSettings.adress.toUpperCase() }}</span>
              <span class="second-line">
                {{ siteSettings.postCode }} {{ siteSettings.city.toUpperCase() }}, tel.:
                <a class="phone" :href="phoneHref">{{siteSettings.phone}}</a>
            </span>
            </div>
        </div>

        <!--MOBILE-->
        <div class="column is-12 is-hidden-tablet _mobile">
          <transition name="bounceLeft" appear>
            <div class="_top">
              <a class="no-tr" href="#" v-scroll-to="'#'">
                <i class="fal fa-calendar fa-fw"
                   :title="getTitle('horaire')"></i>
              </a>
              <span class="first-line">HORAIRE NON SPÉCIFIÉ</span>
            </div>
          </transition>

          <transition name="bounceRight" appear>
            <div class="_bottom">
              <span class="first-line">{{ siteSettings.adress.toUpperCase() }}</span>
              <span class="second-line">
                {{ siteSettings.postCode }} {{ siteSettings.city.toUpperCase() }}, tel.:
              <a class="no-tr" :href="phoneHref">{{siteSettings.phone}}</a>
            </span>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  const titles = [
    {class: 'horaire', title: "Voir l'horaire complet."},
  ];


  export default {
    name: 'Header',
    data() {
      return {
        siteSettings: this.$Global.SiteSettings,
        titles: titles,
      };
    },

    computed: {
      phoneHref() { return `tel:${this.siteSettings.phone}` }
    },

    methods: {
      getTitle(title) {
        return this.titles.find(i => i.class == title).title;
      }
    }
  };
</script>

<style scoped lang="scss">
  @import '../../static/sass/global';

  a {
    font-size: 13px;
  }

  ._mobile {
    font-size: 13px;
    text-align: center;
    color: $top-text;

    ._top {
      border-top: 1px solid black;
    }

    ._bottom {
      border-bottom: 1px solid black;
    }
  }


  .subtitle-fade-in-enter-active, .subtitle-fade-in-leave-active {
    transition: opacity 3s ease;
    transition-delay: 1s;
  }

  .subtitle-fade-in-enter, .subtitle-fade-in-leave-active {
    opacity: 0;
  }

  ._wrapper {
    margin-top: 30px;
    margin-bottom: 20px;
  }

  ._sides {
    color: $top-text;
    font-size: 13px;
    padding: 10px 0 10px 0;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    position: relative;
    top: 150px;
    max-height: 60px;


    &._left {
      text-align: right;
      left: 60px;
    }
    &._right {
      right: 60px;
      a {
        padding-left: 6px;
        position: absolute;
      }

    }
  }

  .second-line {
    display: block;
    .phone {
      white-space: nowrap;
    }
  }

  ._center {

    ._title {
      font-family: 'Dancing Script', cursive, bold;
      font-size: 130px;
      text-align: center;
      color: $top-title;
      display: block;
    }

    ._ribbon {
      z-index: -1;
      display: block;
      letter-spacing: 0.1em;
      padding: .26em 0 .26em 2em;
      margin: -40px auto 0 auto;
      position: relative;
      max-width: fit-content;
      color: $ribbon-text;
      background: $ribbon;

      &:before, &:after {
        content: "";
        width: .2em;
        bottom: 0;
        position: absolute;
        display: block;
        border: 1.5em solid $ribbon;
        z-index: -1;
      }

      &:before {
        top: 0;
        left: -1.95em;
        border-right-width: .75em;
        border-left-color: transparent;
      }

      &:after {
        top: 0;
        right: -1.95em;
        border-left-width: .75em;
        border-right-color: transparent;
      }

      // Text
      & :first-child {
        text-align: center;
        margin-left: -11px;
        font-size: 28px;
        letter-spacing: 20px;
        font-weight: bold;
        font-family: Arial, Helvetica, sans-serif;

        &:before, &:after {
          content: "";
          bottom: -.5em;
          position: absolute;
          display: block;
          border-style: solid;
          border-color: $ribbon transparent transparent transparent;
          z-index: -1;
        }

        &:before {
          top: 0;
          left: 0;
          border-width: .5em 0 0 .5em;
        }

        &:after {
          top: 0;
          right: 0;
          border-width: .5em .5em 0 0;
        }
      }
    }

    ._subtitle {
      text-align: center;
      margin-top: 5px;
      font-size: 20px;
      /*font-weight: bold;*/
      font-family: Arial, Helvetica, sans-serif;
      color: $top-title;
    }
  }

</style>
