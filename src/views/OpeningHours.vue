<template>
  <section class="section">
    <EditIcon :edit="edit"></EditIcon>
    <div class="container">

      <div class="columns is-mobile is-centered weekday"
           :style="dynamicCenter()"
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
import TimeStore from "../components/Edit/Time/TimeStore";
import EditIcon from "../components/Edit/EditIcon";

export default {
  name: "OpeningHours",
  components: { EditIcon },
  data: () => ({}),
  computed: {
    edit() {
      return TimeStore;
    },
    days() {
      return this.edit.state.days;
    },
    modalSync: {
      get() {
        return this.edit.state.active;
      },
      set(value) {
        this.edit.state.active = value;
      }
    }
  },
  methods: {
    dynamicCenter() {
      let max = 1;
      const width = window.innerWidth;
      this.days.forEach(i => {
        i.count > max ? (max = i.count) : null;
      });
      if (width > 768) {
        if (max === 1) {
          return { marginLeft: 37 + "%" };
        } else if (max === 2) {
          return { marginLeft: 29 + "%" };
        } else if (max === 3) {
          return { marginLeft: 24 + "%" };
        }
      } else if (width <= 768 && width >= 400) {
        return { marginLeft: 15 + "%" };
      } else {
        return { marginLeft: 10 + "%" };
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../scss/global";

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
  @media screen and (max-width: 768px) {
    margin-top: 15px;
    margin-right: auto;
    margin-bottom: 10px;
    max-width: 245px;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(119, 119, 119, 0.21);
  }
  &:hover {
    .name {
      transition: color 0.6s ease;
      color: $link-normal;
    }
    .box {
      transition: background-color 0.6s ease;
      background-color: $highlight;
    }
  }

  .name {
    transition: color 0.6s ease;
    color: #4c4c4c;
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
        text-align: center;
        transition: background-color 0.6s ease;
        padding: 2px;
        width: 125px;
        &.closed {
          text-align: center;
        }
      }
    }
  }
}
</style>
