<template>
  <div class="container">
    <div class="content">
      <div class="weekdays" v-for="day in days">
        <b-checkbox class="check-box"
                    v-model="day.checked"
                    @input="select(day)">
        </b-checkbox>
        <h4 class="name">{{ day.upper() }}:</h4>
        <div class="time-slots" v-for="slot in day.slots">
          <TimeSlot :interval="slot"/>
        </div>
      </div>
      <transition name="fade">
        <div class="new-slot" v-if="selected.length">
          <div class="deselect" @click="edit.unselectAll()">
            <i class="fa fa-ban"></i>
          </div>
          <h2 class="new-text">Ajouter une plage horaire</h2>
          <TimeInput :selected="selected"/>
        </div>
      </transition>
    </div>
  </div>
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
  @import '../../../scss/global';

  .content {
    border: 1px solid black;
    border-radius: 10px;
    padding: 40px;
    padding-bottom: 50px;
    min-height: 568px;
    background-color: rgba(48, 93, 120, 0.66);

    .weekdays {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: baseline;
      width: 100%;

      .check-box {

      }
      .name {
        color: white;
        width: 150px;
      }
      .time-slots {
        padding-top: 2px;
        padding-bottom: 2px;
        width: 170px;

      }
    }
    .new-slot {
      .deselect {
        border-radius: 4px;
        background-color: $is-warning;
        cursor: pointer;
        width: 25px;
        padding: 0 5px 0 4.5px;
        margin-top: -5px;
        margin-left: -1.5px;
      }
      .new-text {
        color: white;
        margin-top: 25px;
      }
    }
  }


</style>
