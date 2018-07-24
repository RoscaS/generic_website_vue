<template>
  <section class="section section-container">
    <h1 class="header title">Test draggable</h1>
    <div class="container">
      <div class="content">
        <draggable v-model="boxes" class="columns is-multiline">
          <div class="column is-one-quarter" v-for="i in boxes">
            <p class="box title is-unselectable">{{ i.pos }}</p>
          </div>
        </draggable>
      </div>
    </div>
    <!--<div class="container">-->
      <!--<div class="content">-->
        <!--<draggable v-model="boxes" class="columns is-multiline">-->
          <!--<transition-group name="list-complete">-->
            <!--<div class="column is-one-quarter list-complete-item"-->
                 <!--v-for="i in boxes"-->
                 <!--v-bind:key="i.pos">-->
              <!--<p class="box title is-unselectable">{{ i.pos }}</p>-->
            <!--</div>-->
          <!--</transition-group>-->
        <!--</draggable>-->
      <!--</div>-->
    <!--</div>-->
  </section>
</template>

<script>
  import draggable from 'vuedraggable';

  export default {
    name: "TestCompo",
    components: {draggable},
    data() {
      return {
        boxes: []
      };
    },
    mounted() {
      for (let i of [...Array(8).keys()]) {
        this.boxes.push({pos: i + 1});
      }
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  .section-container {
    height: 500px;
  }

  .box {
    /*width: 250px;*/
    text-align: center;
  }

</style>
