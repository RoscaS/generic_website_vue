<template>
  <transition name="animation" appear>
    <div id="Links" class="links"
         :class="{'hiddenLinks': initialDelay}">

      <a v-for="(link, i) in links" :key="i"
         v-scroll-to="{ el: '#' + link.id, duration: 2000, offset: -50 }">
        <i class="fa fa-fw" :class="link.icon"></i>
        {{link.name}}
      </a>
    </div>
  </transition>
</template>

<script>
	export default {
		name: "Links",
		data: () => ({
			initialDelay: true,
		}),
		props: {
			links: {type: Array}
		},
		mounted() {
			setTimeout(() => {this.initialDelay = false;}, 1200);
		}
	};
</script>

<style scoped lang="scss">
  @import "../../../static/sass/global";

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
