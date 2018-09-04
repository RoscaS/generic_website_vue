<template>
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
              <h4>{{day.upper()}}:</h4>
            </div>
            <div class="time-slots">
              <div class="time-slot" v-for="slot in day.slots">
                <TimeSlot :interval="slot"></TimeSlot>
              </div>
            </div>
          </div>
          <transition name="fade">
            <div class="control-pannel" v-if="selected.length">
              <div class="deselect" @click="edit.unselectAll()">
                <i class="fa fa-ban"></i>
              </div>
              <h2>Ajouter une plage horaire</h2>
              <TimeInput :selected="selected"></TimeInput>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
	import TimeStore from './TimeStore';
	import TimeSlot from "./TimeSlot";
	import Title from "../../Title";
	import TimeInput from "./TimeInput";


	export default {
		name: "TimeEditMenu",
		components: {TimeInput, Title, TimeSlot},
		data: () => ({
			help: true,
		}),
		computed: {
			edit() { return TimeStore; },
			days() { return this.edit.state.days; },
			selected() { return this.edit.state.selected; },
		},
		methods: {
			select(day) {
				if (day.checked) {
					this.helpText();
					this.selected.push(day);
				} else {
					let idx = this.selected.indexOf(this.selected.find(i => i === day));
					this.selected.splice(idx, 1);
				}
			},
			helpText() {
				if (this.help) {
					this.help = false;
          setTimeout(() => {
            this.$snackbar.open({
              message:
                `Introduisez une heure de début pour débloquer le second champ.
                Pour déselectionner toutes les selections, utilisez le bouton jaune.`,
              type: 'is-success',
              position: 'is-bottom',
              queue: false,
              actionText: 'Ok',
              duration: 10000,
            });
          }, 100);
        }
			}
		},

	};
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .main-box {
    border: 1px solid black;
    border-radius: 10px;
    padding: 40px;
    padding-bottom: 50px;
    min-height: 568px;
    background-color: rgba(48, 93, 120, 0.66);

    .weekdays {
      margin: 4px 0 4px 0;

      .weekday {
        display: inline-block;
        width: 160px;
        margin-right: 10px;

        .check-box {
          margin-right: 10px;
          display: inline-block;
        }
        h4 {
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

      .deselect {
        border-radius: 4px;
        background-color: #FFDD57;
        cursor: pointer;
        width: 24px;
        padding: 0 4px 0 4px;
        margin-top: -25px;
        margin-left: -2px;
      }

      h2 {
        color: white;
      }
    }
  }

</style>
