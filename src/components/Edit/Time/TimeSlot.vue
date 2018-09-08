<template>
  <transition name="fadeLeft">
    <b-taglist attached div class="control time-tag">
      <div class="arrow-icon">
        <i class="fas fa-long-arrow-right"></i>
      </div>
      <b-tag size="is-medium" type="is-dark">
        <span class="start-text">{{interval.start}}</span>
      </b-tag>
      <b-tag size="is-medium" type="is-light" closable @close="remove">
        <span class="end-text">{{interval.end}}</span>
      </b-tag>
    </b-taglist>
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

  .time-tag {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    width: 100%;
  }

  .arrow-icon {
    color: black;
    position: absolute;
    z-index: 10;
    left: 60px;
    top: 4px;
  }

</style>
