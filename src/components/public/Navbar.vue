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

              <transition name="_bounceInLeft">S
                <a class="no-tr" @click="toggleModal" v-show="!smallMenu">
                  <i class="far fa-bars fa-2x"></i>
                </a>
              </transition>
            </div>

            <b-modal :active.sync="smallMenu" :width="640" scroll="keep">
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
      <!--</transition>-->
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

      toggleModal() {
        this.smallMenu = !this.smallMenu;
        this.showSmallLinks();

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
</style>
