<template>
  <div class="new-slot-section">
    <b-timepicker placeholder="Début"
                  class="start"
                  v-model="start"
                  :increment-minutes="15"
                  :min-time="startMinTime">
    </b-timepicker>
    <div class="arrow-icon">
      <i class="far fa-long-arrow-right fa-2x"></i>
    </div>
    <b-timepicker placeholder="Fin"
                  class="end"
                  :disabled="!start"
                  v-model="end"
                  :increment-minutes="15"
                  :min-time="endMinTime">
    </b-timepicker>
    <button class="button is-success" @click="addSlot"
            :disabled="!start || !end">
      <i class="fa fa-check"></i>
    </button>
  </div>
</template>

<script>
import { getTime } from "./utils";

export default {
  name: "TimeInput",
  props: {
    selected: { type: Array }
  },
  data: () => ({
    endMinTime: null,
    start: null,
    end: null
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
    }
  },
  watch: {
    start(value) {
      let minTime = getTime(value.getHours(), value.getMinutes());
      this.endMinTime = new Date(minTime.toISO());
    }
  },
  methods: {
    addSlot() {
      let start = [this.start.getHours(), this.start.getMinutes()];
      let end = [this.end.getHours(), this.end.getMinutes()];
      this.selected.forEach(i => {
        i.setSlot(start, end);
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../scss/global";

.new-slot-section {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  .start {
  }
  .arrow-icon {
    color: white;
    margin: auto 20px auto 20px;
  }
  .end {
  }
  .button {
    margin-left: 20px;
    @media screen and (max-width: 381px) {
      margin-top: 10px;
      margin-left: 0;
    }
  }
}
</style>
