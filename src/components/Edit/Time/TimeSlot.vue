<template>
  <transition name="fadeLeft">
    <div>
      <b-taglist attached div class="control">
        <div class="arrow-icon">
          <i class="fas fa-long-arrow-right"></i>
        </div>
        <b-tag size="is-medium" type="is-dark">
          {{interval.start}}
        </b-tag>
        <b-tag size="is-medium" type="is-light" closable @close="remove">
          {{interval.end}}
        </b-tag>
      </b-taglist>
    </div>
  </transition>
</template>

<script>
	export default {
		name: "TimeSlot",
		props: {interval: {type: Object}},
		methods: {
			remove() {
				this.interval.remove();
			}
		}
	};
</script>

<style scoped lang="scss">

  .arrow-icon {
    color: black;
    position: absolute;
    top: 9%;
    left: 44%;
    transform: scale(0.8);
  }

</style>
