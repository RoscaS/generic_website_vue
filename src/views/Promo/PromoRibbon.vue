<template>
  <transition name="promo-fade-in" appear>
    <div class="collapse">
      <div class="collapse-trigger"
           @mouseenter="showPromo"
           @mouseleave="hidePromo"
           @click="lockPromo">

        <div class="ribbon-wrapper">
          <div class="corner-ribbon top-right"
               :title="hoverTitle"
               slot="trigger">
            Action spéciale !
          </div>
        </div>
      </div>

      <VueSlideUpDown :active="isOpen" :duration="1000">
        <Promo></Promo>
      </VueSlideUpDown>
    </div>
  </transition>
</template>

<script>
	import VueSlideUpDown from "vue-slide-up-down";
	import Promo from "./Promo";

	export default {
		name: "PromoRibbon",
		components: {Promo, VueSlideUpDown},
		data() {
			return {
				isOpen: false,
				animateContent: false,
				timeout: null,
				isLocked: false,
				hoverTitle: "Cliquez pour vérouiller."
			};
		},
		computed: {
			isTouch() {
				return window.innerWidth <= 1024;
			}
		},
		methods: {
			checkScroll() {
				if (window.pageYOffset > 0) {
					this.lockPromo();
				}
			},
			showPromo() {
				if (!this.isLocked) {
					this.timeout = setTimeout(() => {
						this.isOpen = true;
					}, 200);
				}
			},
			hidePromo() {
				clearTimeout(this.timeout);
				if (!this.isLocked) {
					this.isOpen = false;
				} else {
					setTimeout(() => {
						this.hidePromo();
					}, 10);
				}
			},
			lockPromo() {
				if (this.isLocked) {
					this.hoverTitle = "Cliquez pour vérouiller.";
					this.isLocked = false;
					setTimeout(() => {
						this.isOpen = false;
					}, 50);
					window.removeEventListener("scroll", this.checkScroll);
					if (!this.isTouch) {
						this.$toast.open(
							"Action spéciale dévérouillée &nbsp;" +
							'<i class="fal fa-lock-open-alt"></i>'
						);
					}
				} else {
					this.hoverTitle = "Cliquez pour dévérouiller.";
					this.isLocked = true;
					setTimeout(() => {
					}, 100);
					this.timeout = setTimeout(() => {
						this.isOpen = true;
					}, 100);
					window.addEventListener("scroll", this.checkScroll);
					if (!this.isTouch) {
						this.$toast.open(
							"Action spéciale vérouillée &nbsp;" +
							'<i class="fal fa-lock-alt"></i>'
						);
					}
				}
			}
		}
	};
</script>

<style scoped lang="scss">
  @import "../../../static/sass/global";

  .promo-fade-in-enter-active,
  .promo-fade-in-leave-active {
    transition: opacity 3s ease;
    transition-delay: 0.5s;
  }

  .promo-fade-in-enter,
  .promo-fade-in-leave-active {
    opacity: 0;
  }

  .corner-ribbon {
    font-family: "Open Sans", sans-serif;
    cursor: pointer;
    font-weight: bold;
    font-size: 20px;
    width: 300px;
    background: $ribbon-action;
    position: absolute;
    text-align: center;
    line-height: 50px;
    letter-spacing: 1px;
    color: $ribbon-action-text;
    z-index: 3;
    top: 55px;
    right: -70px;
    left: auto;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    @media screen and (max-width: 768px) {
      top: 40px;
      right: -84px;
    }
  }

  .ribbon-wrapper {
    position: relative;
  }

</style>
