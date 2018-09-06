<template>
  <section class="section">
    <EditIcon :edit="edit"></EditIcon>
    <div class="container">
      <div class="content">
        <div class="columns is-multiline is-mobile" :style="setSize"
             v-for="(day, i) in days" :key="i">
          <div class="column is-5-desktop is-3-mobile">
            <span class="name">{{day.name}}:</span>
          </div>
          <div class="column is-narrow" v-for="interval in day.slots">
            <div class="box">
              <span v-if="day.count > 0" class="interval">
                {{interval.start}} - {{interval.end}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br><br>
  </section>
</template>

<script>
	import TimeStore from '../components/Edit/Time/TimeStore';
	import EditIcon from "../components/Edit/EditIcon";

	export default {
		name: "OpeningHours",
		components: {EditIcon},
		data: () => ({}),
		computed: {
			edit() { return TimeStore; },
			days() { return this.edit.state.days;},
			modalSync: {
				get() { return this.edit.state.active; },
				set(value) {this.edit.state.active = value; }
			},
			setSize() {
				let max = 1;
				let base = 230;
				this.days.forEach(i => {i.count > max ? max = i.count : null;});
				return `max-width: ${base + max*200}px`;
			}
		},
	};
</script>

<style scoped lang="scss">
  @import '../../static/sass/global';

  section {
    margin-top: -100px !important;
    @media screen and (max-width: 900px) {
      margin: 0;
      padding-left: 5px;
      padding-right: 0;
    }
  }

  .columns {
    margin: 0 auto 0 auto;
    border-bottom: 1px solid lightgray;

    .column {
      @media screen and (max-width: 900px) {
        border-bottom: 1px solid lightgray;
        padding-bottom: 0;
      }
    }

    .name {
      font-size: 20px;
      font-weight: bold;
      padding-top: 0;
      padding-bottom: 0;
      color: #4C4C4C;
    }

    .box {
      padding-top: 0;
      padding-bottom: 0;
      @media screen and (max-width: 900px) {
        padding-left: 4px;
        padding-right: 4px !important;
        width: 110px;
      }
    }

    .interval {
      font-size: 16px;
    }
  }
</style>
