<template>
  <div>
    <transition name="bounceLeft">
      <a class="no-tr" @click="toggleModal" v-show="!smallMenu">
        <i class="far fa-bars fa-2x"></i>
      </a>
    </transition>

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
            <a :href="'#' + link.id">
              <i class="far fa-fw" :class="link.icon"></i>
              {{link.name}}
            </a>
          </h2>
        </li>
        <li>
          <Logout></Logout>
        </li>
      </ul>
    </b-modal>
  </div>
</template>

<script>
	import Logout from "./Logout";
	export default {
		components: {Logout},
		props: {links: {type: Array}},
		name: "NavbarMobile",
		data: () => ({
			smallMenu: false,
			canCancel: [true, false, true],

		}),
		methods: {
			toggleModal() {
				this.smallMenu = !this.smallMenu;
				this.showSmallLinks();
				this.transformMenuIcon();
			},

			showSmallLinks() {
				setTimeout(() => {
					let links = Array.from(
						document.getElementById("SmallLinkList").children
					);
					let time = 0;
					links.forEach(link => {
						setTimeout(() => {
							link.style.opacity = 1;
							link.classList.add("fadeInLeft");
						}, time);
						time += 225;
					});
				}, 10);
			},
			transformMenuIcon() {
				let el;
				setTimeout(() => {
					el = document.getElementById("BurgerIcon").classList;
					el.toggle("fadeInLeft");
					setTimeout(() => {
						el.toggle("open");
					}, 500);
				}, 10);
			},
		}
	};
</script>

<style scoped lang="scss">
  @import "../../../static/sass/global";


  #SmallLinkList {
    height: 300px;
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
    -webkit-transition: 0.5s ease-in-out;
    -moz-transition: 0.5s ease-in-out;
    -o-transition: 0.5s ease-in-out;
    transition: 0.5s ease-in-out;
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
      -webkit-transition: 0.25s ease-in-out;
      -moz-transition: 0.25s ease-in-out;
      -o-transition: 0.25s ease-in-out;
      transition: 0.25s ease-in-out;

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
