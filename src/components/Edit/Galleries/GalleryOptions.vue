<template>
  <div class="wrapper">
    <div v-if="store.name==='Carousel'">
      <div class="level">
        <div class="level-item">
          <div class="block"
               @click="message(!carouselAutoScroll)">
            <b-switch v-model="carouselAutoScroll"
                      type="is-info"
                      size="is-small">
            </b-switch>
          </div>
        </div>
        <div class="level-item">
          <small class="text">Défilement automatique</small>
        </div>
        <small>:</small>
        <div class="level-item auto-scroll-speed" v-if="carouselAutoScroll">
          <div class="decrement" @click="decrement">
            <i class="fa fa-minus"></i>
          </div>
          <span class="speed">{{ carouselAutoScrollSpeed/1000 }}</span>
          <div class="increment" @click="increment">
            <i class="fa fa-plus"></i>
          </div>
          <small class="secondes">secondes</small>
        </div>
      </div>
    </div>
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
        	Tools.message('autoScrollMin')
        }
      }
		}
	};
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .wrapper {
    margin-left: 20px;
  }

  .block {
    margin-bottom: -5px;
  }

  .auto-scroll-speed {
    margin: 0 5px 0 5px;
    width: 120px;

    .decrement {
      margin-left: 10px;
      padding-left: 10px;
      padding-right: 10px;
      color: $is-info;
      cursor: pointer;
    }
    .increment {
      padding-left: 10px;
      color: $is-info;
      cursor: pointer;
    }
    .secondes {
      margin-left: 10px;
    }
  }

</style>
