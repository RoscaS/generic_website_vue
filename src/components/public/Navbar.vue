<template>
  <nav id="Navbar" class="container has-background-white">
    <div class="level">
      <div id="Brand" class="level-left">
        <a class="navbar-item" href="#">
          <h1 class="title">
            my<span class="_site">site</span>
          </h1>
        </a>
      </div>
      <div class="level-item _links">
        <a href="#"><i class="fa-fw fa fa-info"></i>Info</a>
        <a href="#"><i class="fa-fw fa fa-shopping-bag"></i>Articles</a>
        <a href="#"><i class="fa-fw fa fa-th"></i>Galerie</a>
        <a href="#"><i class="fa-fw fa fa-envelope"></i>Contact</a>
      </div>
      <div class="level-right">
      </div>
    </div>
  </nav>
</template>

<script>

  export default {
    name: "Navbar",

    data() {
      return {
        isSticky: false,
        navbar: null,
        navbarOffset: null,
        brand: null,
      };
    },

    methods: {

      debug() {
        console.log(this.brand);
      },


      scrollWatch() {
        let buffer = this.isSticky;
        this.isSticky = window.pageYOffset >= this.navbarOffset;
        if (this.isSticky !== buffer) {
          this.setActions();
        }
      },

      setActions() {
        if (this.isSticky) {
          console.log('oui');
          this.navbar.classList.add("sticky");
          Velocity(this.brand, {opacity: '1'});
          Velocity(this.navbar, {
            boxShadowBlur: '20px',
            boxShadowY: '0px',
            boxShadowSpread: '1px'
          }, 400);
        }
        else {
          console.log('non');
          this.navbar.classList.remove("sticky");
          Velocity(this.brand, {opacity: '0'});
          Velocity(this.navbar, {
            boxShadowBlur: '0px',
            boxShadowY: '0px',
            boxShadowSpread: '0px'
          }, 100);
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


</style>
