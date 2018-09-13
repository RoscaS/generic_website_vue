<template>
  <div class="widget-wrapper">
    <div class="first-line">
      <span class="led" :style="getColor"></span>
      <span class="first-line-text">{{upper(getMessage[0])}}</span>
    </div>
    <span class="second-line">{{upper(getMessage[1])}}</span>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import TimeStore from "../../components/Edit/Time/TimeStore";

export default {
  name: "TimeWidget",
  data: () => ({
    color: null
  }),
  computed: {
    timeStore() {
      return TimeStore;
    },
    isOpen() {
      if (this.timeStore.state.hasLoaded) {
        return this.timeStore.isOpen;
      } else {
        return setTimeout(() => {
          return this.isOpen;
        }, 500);
      }
    },
    nextTimeOpen() {
      if (this.timeStore.state.hasLoaded) {
        return this.timeStore.nextTimeOpen;
      } else {
        return setTimeout(() => {
          return this.timeStore.nextTimeOpen;
        }, 500);
      }
    },
    getColor() {
      return this.color;
    },

    getMessage() {
      let open = "background-color: #45a875";
      let closed = "background-color: #e0385a";

      if (this.isOpen) {
        this.color = open;
        return [`Ouvert jusque ${this.isOpen}`, `Nous vous attendons!`];
      }
      let slot = this.nextTimeOpen;
      if (slot) {
        let today = this.timeStore.today;
        let now = this.timeStore.now;
        if (slot.day.name === today.next.name) {
          this.color = closed;
          return [`Nous sommes fermés.`, `Ouverture: demain à ${slot.start}`];
        } else if (slot.day.name === today.name && slot.interval.start > now) {
          this.color = closed;
          return [`Nous sommes fermés.`, `Ouverture à ${slot.start}`];
        } else {
          this.color = closed;
          return [
            `Nous sommes fermés.`,
            `Ouverture: ${slot.day.name} à ${slot.start}`
          ];
        }
      } else {
        return [`Horaire non spécifié.`, ""];
      }
    }
  },
  methods: {
    upper(data) {
      return data.toUpperCase();
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../scss/global";

.widget-wrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 230px;

  .first-line {
    text-align: right;
    @media screen and (max-width: 560px) {
      text-align: center;
    }

    .led {
      padding: 0 9px 0 9px;
      margin-right: 10px;
      border-radius: 50%;
      opacity: 0.8;
    }
    .first-line-text {
    }
  }

  .second-line {
    text-align: right;
    @media screen and (max-width: 560px) {
      text-align: center;
    }
  }
}
</style>
