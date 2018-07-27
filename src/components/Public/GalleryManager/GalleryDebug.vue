<template>
  <div class="card debug-sortable">
    <header class="card-header">
      <p class="card-header-title">Debug</p>
    </header>


    <div class="card-content">
      <!--<div class="content">-->


        <div class="level">
          <div class="level-left"><b>reOrder:</b></div>
          <div class="level-right">
            <code :style="codeColor(p.reOrder)">
              {{ p.reOrder }}
            </code>
          </div>
        </div>
        <div class="level">
          <div class="level-left"><b>isDragging:</b></div>
          <div class="level-right">
            <code :style="codeColor(p.isDragging)">
              {{ p.isDragging }}
            </code>
          </div>
        </div>
        <div class="level">
          <div class="level-left"><b>delayedDragging:</b></div>
          <div class="level-right">
            <code :style="codeColor(p.delayedDragging)">
              {{ p.delayedDragging }}
            </code>
          </div>
        </div>
        <div class="level">
          <div class="level-left"><b>editable:</b></div>
          <div class="level-right">
            <code :style="codeColor(p.editable)">
              {{ p.editable }}
            </code>
          </div>
        </div>
      </div>


      <ol class="box">
        <li v-for="i in p.getList">
          <div class="level tables">
            <div class="level-item"><p><b> {{ i.name }} </b></p></div>
            <div class="level-item"><p>vsbl: <b> {{ i.visible }} </b></p>
            </div>
            <!--<div class="level-item">-->
            <!--<code :style="codeColor(i.selected)">-->
            <!--{{ i.selected }}-->
            <!--</code>-->
            <!--</div>-->
          </div>
        </li>
      </ol>

      <ol class="box">
        <li v-for="i in p.getListHidden">
          <div class="level tables">
            <div class="level-item"><p><b> {{ i.name }} </b></p></div>
            <div class="level-item"><p>vsbl: <b> {{ i.visible }} </b></p>
            </div>
            <!--<div class="level-item">-->
            <!--<code :style="codeColor(i.selected)">-->
            <!--{{ i.selected }}-->
            <!--</code>-->
            <!--</div>-->
          </div>
        </li>
      </ol>

    </div>
  <!--</div>-->
</template>

<script>
  export default {
    name: "GalleryDebug",
    data() {
      return {
        p: this.$parent,
      };
    },
    methods: {
      codeColor(prop) {return prop ? 'color: #45a875' : '';}
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .debug-sortable {
    position: absolute;
    width: 250px;
    left: 2%;
    margin-top: -650px;
    z-index: 1;


    .level {
      color: #777;
      padding: 0;
      margin-top: 5px;
      margin-bottom: 5px;
    }

    .tables {
      border: 1px solid black;
    }
  }
</style>
