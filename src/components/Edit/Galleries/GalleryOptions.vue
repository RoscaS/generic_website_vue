<template>
  <div class="auto-scroll" v-if="store.name === 'Carousel'">
    <div class="auto-scroll-switch" @click="message(!carouselAutoScroll)">
      <b-switch v-model="carouselAutoScroll"
                type="is-info"
                size="is-small">
      </b-switch>
    </div>
    <small class="auto-scroll-text">Défilement automatique</small>
    <transition name="fade">
      <div class="auto-scroll-speed-wrapper" v-if="carouselAutoScroll">
        <small class="auto-scroll-column">:</small>
        <span class="decrement" @click="decrement">
          <i class="fa fa-minus"></i></span>
        <span class="speed-text">{{ carouselAutoScrollSpeed/1000 }}</span>
        <span class="increment" @click="increment">
          <i class="fa fa-plus"></i></span>
        <small class="auto-scroll-seconds">secondes</small>
      </div>
    </transition>
  </div>

</template>

<script>
	import Tools from "../../../utils/tools";

	export default {
		name: "GalleryOptions",
		props: {store: {type: Object}},
		data: () => ({}),
		computed: {
			carouselAutoScroll: {
				get() { return this.$siteOptions.state.carousel_auto_scroll.data; },
				set(value) {
					this.$siteOptions.state.carousel_auto_scroll.data = value;
					this.$siteOptions.update(false);
				}
			},
			carouselAutoScrollSpeed: {
				get() { return this.$siteOptions.state.carousel_auto_scroll_speed.data; },
				set(value) {
					this.$siteOptions.state.carousel_auto_scroll_speed.data = value;
					this.$siteOptions.update();
				}
			}
		},
		methods: {
			message(value) {
				Tools.message(value ? 'autoScrollOn' : 'autoScrollOff');
			},
			increment() {
				this.carouselAutoScrollSpeed += 1000;
			},
			decrement() {
				if (this.carouselAutoScrollSpeed > 2000) {
					this.carouselAutoScrollSpeed -= 1000;
				}
				else {
					Tools.message('autoScrollMin');
				}
			}
		}
	};
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .auto-scroll {
    z-index: 6;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;

    .auto-scroll-switch {
      width: 50px;
    }
    .auto-scroll-text {

    }
    .auto-scroll-speed-wrapper {
      .auto-scroll-column {

      }
      .decrement {
        color: $is-info;
        margin-left: 10px;
        margin-right: 10px;
        cursor: pointer;
      }
      .speed-text {

      }
      .increment {
        color: $is-info;
        margin-left: 10px;
        margin-right: 10px;
        cursor: pointer;
      }
      .auto-scroll-seconds {

      }
    }

  }

</style>
