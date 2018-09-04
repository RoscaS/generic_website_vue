<template>
  <div class="level">
    <div class="level-left">
      <b-timepicker placeholder="Début"
                    class="start level-item"
                    v-model="start"
                    :increment-minutes="15"
                    :min-time="startMinTime">
                    <!--:max-time="startMaxTime">-->
      </b-timepicker>
      <div class="arrow-icon level-item">
        <i class="far fa-long-arrow-right fa-2x"></i>
      </div>
      <b-timepicker placeholder="Fin"
                    class="end level-item"
                    :disabled="!start"
                    v-model="end"
                    :increment-minutes="15"
                    :min-time="endMinTime">
                    <!--:max-time="endMaxTime">-->
      </b-timepicker>
      <button class="button is-success" @click="addSlot"
              :disabled="!start || !end">
        <i class="fa fa-check"></i>
      </button>
    </div>
  </div>
</template>

<script>
	import {getTime} from './utils';

	export default {
		name: "TimeInput",
		props: {
			selected: {type: Array}
		},
		data: () => ({
      endMinTime: null,
      // endMaxTime: null,
			start: null,
			end: null,
		}),
		computed: {
			startMinTime: {
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
			// startMaxTime: {
			// 	get() {
			// 		let max = this.selected[0].max;
			// 		this.selected.forEach(i => {
			// 			if (i.max > max) {
			// 				max = i.max;
			// 			}
			// 		});
			// 		return new Date(max.toISO());
			// 	}
			// }
		},
    watch: {
			start(value) {
				let minTime = getTime(value.getHours(), value.getMinutes());
        this.endMinTime = new Date(minTime.toISO())
      }
    },
		methods: {
			addSlot() {
				let start = [this.start.getHours(), this.start.getMinutes()];
				let end = [this.end.getHours(), this.end.getMinutes()];
				this.selected.forEach(i => {
					i.setSlot(start, end);
				});
			},
			poule() {
				console.log('ici');
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
