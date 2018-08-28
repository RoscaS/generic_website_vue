<template>
  <transition name="animation" appear>
    <div id="Links" class="links" :class="{'hiddenLinks': initialDelay}">
      <scrollactive active-class="active"
                    :offset="20"
                    :duration="4500"
                    bezier-easing-value="0.455, 0.03, 0.515, 0.955"
                    @itemchanged="onItemChanged">
        <a v-for="(link, i) in links" :key="i"
           :href="link.id"
           :class="{'activeEl no-tr': poule(link.id)}"
           class="scrollactive-item">
          <i class="far fa-fw" :class="link.icon"></i>
          {{link.name}}
        </a>
      </scrollactive>


    </div>
  </transition>
</template>

<script>
	export default {
		name: "Links",
		data: () => ({
			initialDelay: true,
			isActive: '',
		}),
		props: {
			links: {type: Array}
		},
		methods: {
			onItemChanged(event, currentItem, lastActiveItem) {
				if (currentItem) {
					let s = String(currentItem).split('#');
					this.isActive = '#' + s[s.length - 1];
				} else this.isActive = '';
			},
			poule(linkId) {
				if (this.isActive) {
					return this.isActive === linkId;
				} else return false;
			}
		},
		mounted() {
			setTimeout(() => {this.initialDelay = false;}, 1200);
		}
	};
</script>

<style scoped lang="scss">
  @import "../../../static/sass/global";

  .activeEl {
    transition: color .3s ease;
    color: $link-hover !important;
    cursor: default;
  }

  .hiddenLinks {
    opacity: 0;
  }

  .links {

    a {
      color: $links-nav;
      margin-left: 10px;
      margin-right: 10px;

      &.tr:after {
        background-color: $links-nav;
      }
    }
  }

  .animation-enter-active {
    animation: bounceRight 1s;
    animation-delay: 1s;
  }

  .animation-leave-active {
    animation: bounceRight 1s;
  }

  @keyframes bounceRight {
    from, 60%, 75%, 90%, to {
      animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }
    from {
      opacity: 0;
      transform: translate3d(3000px, 0, 0);
    }
    60% {
      opacity: 1;
      transform: translate3d(-25px, 0, 0);
    }
    75% {
      transform: translate3d(10px, 0, 0);
    }
    90% {
      transform: translate3d(-5px, 0, 0);
    }
    to {
      transform: none;
    }
  }
</style>
