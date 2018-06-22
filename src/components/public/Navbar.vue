<template>
  <div>
    <nav id="Navbar" class="container has-background-white"
         :class="{'sticky': isSticky}">
      <div class="level is-mobile">
        <div id="Brand" class="level-left">
          <a class="" href="#">
            <h1 class="title">
              my<span class="_site">site</span>
            </h1>
          </a>
        </div>
        <div class="level-item _links is-hidden-mobile">
          <a v-for="link in links" :href="'#' + link.name">
            <i class="fa fa-fw" :class="link.icon"></i>
            {{link.name}}
          </a>
        </div>

        <div class="level-right is-hidden-tablet">
          <div class="level-item" @click="toggleModal">
            <div id="BurgerIcon" :class="{'open': smallMenu}">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <b-modal :active.sync="smallMenu" :width="640" scroll="keep">

          <ul class="content">
            <li v-for="link in links">
              <h2 class="_small-links">
                <a :href="'#' + link.name">
                  <i class="far fa-fw" :class="link.icon"></i>
                  {{link.name}}
                </a>
              </h2>
            </li>
          </ul>

          </b-modal>
        </div>

      </div>
    </nav>




  </div>
</template>

<script>

  export default {
    name: "Navbar",

    data() {
      return {
        smallMenu: false,


        isSticky: false,
        isShadow: false,

        navbar: null,
        navbarOffset: null,
        brand: null,


        links: [
          {name: 'Info', icon: 'fa-info'},
          {name: 'Articles', icon: 'fa-shopping-bag'},
          {name: 'Galerie', icon: 'fa-th'},
          {name: 'Contact', icon: 'fa-envelope'},
        ]
      };
    },

    methods: {

      toggleModal() {
        this.smallMenu = !this.smallMenu;
      },


      addShadow() {
        Velocity(this.navbar, {
          boxShadowBlur: '20px',
          boxShadowY: '0px',
          boxShadowSpread: '1px'
        }, 200);
      },

      removeShadow() {
        Velocity(this.navbar, {
          boxShadowBlur: '0px',
          boxShadowY: '0px',
          boxShadowSpread: '0px'
        }, 200);
      },

      toggleSticky() {
        if (this.isSticky) {
          Velocity(this.brand, {opacity: '1'});
          this.addShadow();
        }
        else {
          Velocity(this.brand, {opacity: '0'});
          this.removeShadow();

        }
      },

      scrollWatch() {
        let buffer = this.isSticky;
        this.isSticky = window.pageYOffset >= this.navbarOffset;
        if (this.isSticky !== buffer) {
          this.toggleSticky();
          return;
        }
        buffer = this.isShadow;
        this.isShadow = window.pageYOffset >= this.navbarOffset + 100;
        if (this.isShadow !== buffer) {
          this.removeShadow();
        }
      },

    },

    mounted() {
      window.addEventListener('scroll', this.scrollWatch);
      document.addEventListener("DOMContentLoaded", () => {
        this.navbar = document.getElementById("Navbar");
        this.brand = document.getElementById("Brand");
        this.navbarOffset = this.navbar.offsetTop;
      });
    },

    destroyed() {
      window.removeEventListener('scroll', this.scrollWatch);
    }
  };
</script>

<style scoped lang="scss">
  @import 'sass/global';

  .sticky {
    position: fixed;
    top: 0;
    width: 100%;
  }

  #Navbar {
    width: 100%;
    padding: 10px 0 10px 0 !important;;

    #Brand {
      opacity: 0;
    }

    .title {
      color: $ribbon;

      ._site {
        background-color: $ribbon;
        color: white;
      }
    }

    ._links {
      margin-left: -140px;

      a {
        margin-left: 10px;
        margin-right: 10px;
        color: black !important;
      }
    }
  }

  ._small-links {
    a {
      color: white !important;
    }
  }


  #BurgerIcon {
    width: 60px;
    height: 45px;
    position: relative;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg) scale(0.5);
    -webkit-transition: .5s ease-in-out;
    -moz-transition: .5s ease-in-out;
    -o-transition: .5s ease-in-out;
    transition: .5s ease-in-out;
    cursor: pointer;
  }

  #BurgerIcon span {
    display: block;
    position: absolute;
    height: 6px;
    width: 100%;
    background: $top-text;
    border-radius: 9px;
    opacity: 1;
    left: 0;
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: .25s ease-in-out;
    -moz-transition: .25s ease-in-out;
    -o-transition: .25s ease-in-out;
    transition: .25s ease-in-out;
  }

  #BurgerIcon span:nth-child(1) {
    top: 0;
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;
  }

  #BurgerIcon span:nth-child(2) {
    top: 18px;
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;
  }

  #BurgerIcon span:nth-child(3) {
    top: 36px;
    -webkit-transform-origin: left center;
    -moz-transform-origin: left center;
    -o-transform-origin: left center;
    transform-origin: left center;
  }

  #BurgerIcon.open span:nth-child(1) {
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
    top: -3px;
    left: 8px;
  }

  #BurgerIcon.open span:nth-child(2) {
    width: 0;
    opacity: 0;
  }

  #BurgerIcon.open span:nth-child(3) {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
    top: 39px;
    left: 8px;
  }

</style>
