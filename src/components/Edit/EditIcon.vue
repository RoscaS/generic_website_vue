<template>
  <transition name="fade" appear>
    <div v-show="authenticated">
      <button class="button is-danger"
              :class="{smallIcon: small}"
              :style="style"
              :disabled="isActive"
              @click="startEdit">
        <i class="fal fa-pencil-alt"></i>
      </button>
    </div>
  </transition>
</template>

<script>
	export default {
		name: "EditIcon",
		props: {
			right: {type: String},
			top: {type: String},
			edit: {type: Object},
			store: {type: Object},
			small: {type: Boolean, default: false},
		},
		data: () => ({

		}),
		computed: {
			isActive() {
				return this.edit.state.active;
			},

			authenticated() {
				return this.$auth.isAuthenticated();
			},
			style() {
				return {marginTop: this.top, left: this.right};
			},
		},
		methods: {
			startEdit() {
				this.edit.start(this.store);
			},
		},
	};
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  $animationDuration: 3s;
  @import "~vue2-animate/src/sass/vue2-animate";

  .fade-enter-active {
    animation-delay: 1s;
  }

  .smallIcon {
    font-size: 14px !important;
  }

  .button {
    transition: .5s background-color ease;
    font-size: 20px;
    left: 50px;
    position: absolute;
    z-index: 1;

    &:hover {
      transition: .5s background-color ease;
      background-color: #d03656;
    }
  }
</style>

