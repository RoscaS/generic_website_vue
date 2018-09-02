<template>
  <transition name="fadeLeft">
    <div>
      <b-taglist attached div class="control">
        <div class="arrow-icon">
          <i class="fal fa-long-arrow-right fa-2x"></i>
        </div>
        <b-tag size="is-large" type="is-dark">
          {{interval.start}}
        </b-tag>
        <b-tag size="is-large" type="is-light" closable @close="remove">
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
				console.log(this.interval.pretty);
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
    left: 38.5%;
    transform: scale(0.8);
  }

</style>
