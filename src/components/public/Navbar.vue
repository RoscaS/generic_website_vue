<template>
  <nav id="Navbar" class="container debug">
    <div class="level">
      <div id="Brand" class="level-left _brand">
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
        navbar: null,
        navbarOffset: null,
      };
    },

    methods: {

      checkSticky() {
        if (window.pageYOffset >= this.navbarOffset) {
          this.navbar.classList.add("sticky");
        }
        else {
          this.navbar.classList.remove("sticky");
        }
      }
    },

    mounted() {
      document.addEventListener("DOMContentLoaded", () => {
        this.navbar = document.getElementById("Navbar");
        this.navbarOffset = this.navbar.offsetTop;
      });
    },

    created() {
      window.addEventListener('scroll', this.checkSticky);
    },

    destroyed() {
      window.removeEventListener('scroll', this.checkSticky);
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
