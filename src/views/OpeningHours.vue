<template>
  <section class="section">
    <EditIcon :edit="edit"></EditIcon>
    <div class="container">
      <div class="content">

        <div class="columns is-multiline" :style="setSize"
             v-for="(day, i) in days" :key="i">
          <div class="column is-5">
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
  }

  .columns {
    border-bottom: 1px solid lightgray;
    margin: 0 auto 0 auto;

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
    }

    .interval {
      font-size: 16px;
    }
  }
</style>
