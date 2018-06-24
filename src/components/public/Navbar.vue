<template>
  <div>
    <nav id="Navbar" class="has-background-white"
         :class="{'sticky': isSticky}">
      <!--<transition name="zoomUp" appear>-->
      <div class="level is-mobile container">
        <div id="Brand" class="level-left">
          <a class="no-tr" href="#" v-scroll-to="'#Home'">
            <h1 class="title">
              my<span>site</span>
            </h1>
          </a>
        </div>
        <div class="level-item links is-hidden-mobile">
          <a v-for="link in links" :href="'#' + link.name">
            <i class="fa fa-fw" :class="link.icon"></i>
            {{link.name}}
          </a>
        </div>

        <div class="level-right is-hidden-tablet">
          <div class="level-item">

            <transition name="bounceLeft">
              <a class="no-tr" @click="toggleModal" v-show="!smallMenu">
                <i class="far fa-bars fa-2x"></i>
              </a>
            </transition>
          </div>

          <b-modal :active.sync="smallMenu" :width="640" scroll="keep"
                   :canCancel="['escape', 'outside', 'button']">

            <div class="burger-wrapper">
              <div id="BurgerIcon"
                   @click="toggleModal">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>

            <ul id="SmallLinkList" class="content">
              <li v-for="link in links">
                <h2>
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

        canCancel: [true, false, true],


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
        this.showSmallLinks();
        this.transformMenuIcon();
      },

      showSmallLinks() {
        setTimeout(() => {
          let links = Array.from(document.getElementById('SmallLinkList').children);
          let time = 0;
          links.forEach(link => {
            setTimeout(() => {
              link.style.opacity = 1;
              link.classList.add('fadeInLeft');
            }, time);
            time += 225;
          });
        }, 10);
      },

      transformMenuIcon() {
        let el;
        setTimeout(() => {
          el = document.getElementById('BurgerIcon').classList;
          el.toggle('fadeInLeft');
          setTimeout(() => {el.toggle('open');}, 500);
        }, 10);
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

      setTimeout(() => {
        this.navbar = document.getElementById("Navbar");
        this.brand = document.getElementById("Brand");
        this.navbarOffset = this.navbar.offsetTop;
      }, 50);

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
    top: 0.01rem; // permet à tr de fonctionner
    width: 100%;
  }

  #Navbar {
    width: 100%;
    padding: 10px 0 10px 0 !important;;
    z-index: 19;

    #Brand {
      opacity: 0;
      z-index: 20;

      a {
        cursor: default;
      }
    }

    .title {
      color: $ribbon;

      & :first-child {
        background-color: $ribbon;
        color: white;
      }
    }

    .links {
      margin-left: -110px;

      a {
        color: $links-nav;
        margin-left: 10px;
        margin-right: 10px;

        &.tr:after {
          background-color: $links-nav;
        }
      }
    }
  }

  #SmallLinkList {
    margin-left: 25%;
    li {
      list-style: none;
      opacity: 0;
    }
    a {
      color: white !important;
      &:hover {
        color: $link-hover !important;
      }
    }
  }

  .burger-wrapper {
    transition: 0.2s transform ease-out;
    transform: scale(0.6);
    position: fixed;
    top: 2%;
    right: 2%;

    &:hover {
      transition: 0.2s transform ease-out;
      transform: scale(0.7);
    }
  }

  #BurgerIcon {
    width: 60px;
    height: 45px;
    position: relative;

    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
    -webkit-transition: .5s ease-in-out;
    -moz-transition: .5s ease-in-out;
    -o-transition: .5s ease-in-out;
    transition: .5s ease-in-out;
    cursor: pointer;

    span {
      display: block;
      position: absolute;
      height: 9px;
      width: 100%;
      background: $link-hover;
      background: white;
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

      &:nth-child(1) {
        top: 0px;
        -webkit-transform-origin: left center;
        -moz-transform-origin: left center;
        -o-transform-origin: left center;
        transform-origin: left center;
      }

      &:nth-child(2) {
        top: 18px;
        -webkit-transform-origin: left center;
        -moz-transform-origin: left center;
        -o-transform-origin: left center;
        transform-origin: left center;
      }

      &:nth-child(3) {
        top: 36px;
        -webkit-transform-origin: left center;
        -moz-transform-origin: left center;
        -o-transform-origin: left center;
        transform-origin: left center;
      }
    }

    &.open {
      span {
        &:nth-child(1) {
          -webkit-transform: rotate(45deg);
          -moz-transform: rotate(45deg);
          -o-transform: rotate(45deg);
          transform: rotate(45deg);
          top: -3px;
          left: 8px;
        }

        &:nth-child(2) {
          width: 0%;
          opacity: 0;
        }

        &:nth-child(3) {
          -webkit-transform: rotate(-45deg);
          -moz-transform: rotate(-45deg);
          -o-transform: rotate(-45deg);
          transform: rotate(-45deg);
          top: 39px;
          left: 8px;
        }
      }
    }
  }


</style>
