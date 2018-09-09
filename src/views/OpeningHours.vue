<template>
  <section class="section">
    <EditIcon :edit="edit"></EditIcon>
    <div class="container">

      <div class="columns is-mobile is-centered weekday"
           :style="setSize()"
           v-for="(day, i) in days" :key="i"
           v-scroll-reveal="{
             origin: 'right',
             distance: '100px',
             duration: 1500,
             delay: 150,
             easing: 'ease',
             }">
        <div class="column name">
          <span>{{day.name}}:</span>
        </div>
        <div class="column">
          <div class="columns slots" v-if="day.count > 0">
            <div class="column is-4 interval" v-for="interval in day.slots">
              <div class="box">
                <span>{{interval.start}} - {{interval.end}}</span>
              </div>
            </div>
          </div>
          <div class="columns slots" v-else>
            <div class="column is-2 interval">
              <div class="box closed">
                <span>fermé</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
			}
		},
		methods: {
			setSize() {
				let max = 1;
				this.days.forEach(i => {i.count > max ? max = i.count : null;});
				if (window.innerWidth > 768) {
					if (max === 1) {
						return `marginLeft: ${37}%`;
					} else if (max === 2) {
						return `marginLeft: ${29}%`;
					} else if (max === 3) {
						return `marginLeft: ${29}%`;
					}
				}
			}
		}
	};
</script>

<style scoped lang="scss">
  @import '../../static/sass/global';

  section {
    margin-top: -100px !important;
    @media screen and (max-width: 960px) {
    }
  }

  .weekday {
    user-select: none;
    max-width: 545px;
    margin-top: 0;
    margin-right: auto;
    margin-bottom: 0;
    margin-left: 29%;
    @media screen and (max-width: 768px) {
      max-width: 245px;
      margin-top: 15px;
      margin-right: auto;
      margin-bottom: 10px;
      margin-left: 33%;
      padding-bottom: 5px;
      border-bottom: 1px solid rgba(119, 119, 119, 0.21);
    }
    &:hover {
      .name {
        transition: color .6s ease;
        color: rgba(22, 125, 240, 0.54);
      }
      .box {
        transition: background-color .6s ease;
        background-color: rgba(22, 125, 240, 0.08);
      }
    }

    .name {
      transition: color .6s ease;
      color: #4C4C4C;
      font-size: 20px;
      font-weight: bold;
      padding: 0 auto 0 auto;
      max-width: 130px;
    }

    .slots {
      max-width: 400px;
      margin-top: -8px;
      @media screen and (max-width: 768px) {
        max-width: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 2px;
      }

      .interval {
        @media screen and (max-width: 768px) {
          padding-top: 2px;
          padding-bottom: 2px;
        }
        .box {
          transition: background-color .6s ease;
          padding: 0 5px 0 5px;
          width: 110px;
          &.closed {
            text-align: center;
          }
        }
      }
    }
  }
</style>
