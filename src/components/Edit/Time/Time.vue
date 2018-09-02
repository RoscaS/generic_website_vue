<template>

  <div>
    <div class="container">
      <div class="content">
        <div class="box" style="height:250px; padding: 30px;">
          <button @click="modalSync = !modalSync" class="button is-info">Modal
          </button>
        </div>
      </div>
    </div>

    <b-modal :active.sync="modalSync" scroll="clip" has-modal-card>
      <section>
        <div class="container">
          <div class="content flex">
            <div class="main-box">
              <div class="weekdays" v-for="day in days">
                <div class="weekday">
                  <div class="field check-box">
                    <b-checkbox v-model="day.checked"
                                @input="select(day)"></b-checkbox>
                  </div>
                  <h3>{{day.upper()}}:</h3>
                </div>
                <div class="time-slots">
                  <div class="time-slot" v-for="slot in day.slots">
                    <TimeSlot :interval="slot"></TimeSlot>
                  </div>
                </div>
              </div>
              <transition name="fade">
                <div class="control-pannel" v-if="selected.length">
                  <h2>Ajouter une plage horaire</h2>
                  <TimeInput :selected="selected"></TimeInput>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </section>
    </b-modal>
  </div>
</template>

<script>
	import OpeningHours from './OpeningHours';
	import TimeSlot from "./TimeSlot";
	import Title from "../../Title";
	import TimeInput from "./TimeInput";


	export default {
		name: "Time",
		components: {TimeInput, Title, TimeSlot},
		data: () => ({
			modalSync: false,
			days: OpeningHours,
			selected: [],
		}),
		methods: {
			select(day) {
				if (day.checked) {
					this.selected.push(day);
				} else {
					let idx = this.selected.indexOf(this.selected.find(i => i === day));
					this.selected.splice(idx, 1);
				}
			}
		},
		watch: {
			modalSync(value) {
				if (value) {
					setTimeout(() => {
            this.$snackbar.open({
              message: 'Todo: small tuto',
              type: 'is-warning',
              position: 'is-top',
              actionText: 'Ok',
              indefinite: true,
            });
          }, 500);
				}
			}
		}
	};
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .main-box {
    border: 1px solid black;
    border-radius: 10px;
    padding: 20px;
    height: 600px;
    background-color: rgba(48, 93, 120, 0.66);

    .weekdays {
      margin: 3px 0 3px 0;

      .weekday {
        display: inline-block;
        width: 160px;

        .check-box {
          margin-right: 10px;
          display: inline-block;
        }
        h3 {
          display: inline-block;

          color: white;
          font-weight: bold;
          margin: 0;
          padding: 7px 0 2px 0;
        }

      }
      .time-slots {
        display: inline-block;
        width: auto;

        .time-slot {
          padding-top: 2px;
          padding-bottom: 2px;
          margin-right: 20px;
          display: inline-block;

        }
      }
    }
    .control-pannel {
      margin-top: 30px;
      /*width: 350px;*/

      h2 {
        color: white;
      }

    }

  }


</style>
