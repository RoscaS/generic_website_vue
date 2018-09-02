<template>
  <div class="level">
    <div class="level-left">
      <b-timepicker placeholder="Début"
                    class="start level-item"
                    v-model="start"
                    :increment-minutes="15"
                    :min-time="minTime"
                    :max-time="maxTime">
      </b-timepicker>
      <div class="arrow-icon level-item">
        <i class="far fa-long-arrow-right fa-2x"></i>
      </div>
      <b-timepicker placeholder="Fin"
                    class="end level-item"
                    v-model="end"
                    :increment-minutes="15"
                    :min-time="minTime"
                    :max-time="maxTime">
      </b-timepicker>
      <button class="button is-success" @click="addSlot">
        <i class="fa fa-check"></i>
      </button>
    </div>
  </div>
</template>

<script>
	import OpeningHours from './OpeningHours';

	export default {
		name: "TimeInput",
		props: {
			selected: {type: Array}
		},
    data: () => ({
      start: null,
      end: null,
    }),
		methods: {
			addSlot() {
				let start = [this.start.getHours(), this.start.getMinutes()];
				let end = [this.end.getHours(), this.end.getMinutes()];
				this.selected.forEach(i => {
					i.setSlot(start, end)
				});
			}
		},
		computed: {
			minTime: {
				get() {
					let min = this.selected[0].min;
					this.selected.forEach(i => {
						if (i.min < min) {
							min = i.min;
						}
					});
					return new Date(min.toISO());
				}
			},
			maxTime: {
				get() {
					let max = this.selected[0].max;
					this.selected.forEach(i => {
						if (i.max > max) {
							max = i.max;
						}
					});
					return new Date(max.toISO());
				}
			}
		},
	};
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .start {
    display: inline-block;
    margin-right: 20px;
  }

  .arrow-icon {
    display: inline-block;
    color: white;
  }

  .end {
    display: inline-block;
  }

  button {
    margin-left: 5px;
  }

</style>
