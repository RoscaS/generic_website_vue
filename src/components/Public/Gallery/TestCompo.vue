<template>
  <section class="section section-container">
    <div class="container">
      <div class="content">
        <h1 class="header title">Test draggable</h1> <br>

        <div class="level">
          <div class="level-left">
            <button class="button is-info level-item"
                    @click="orderList">Reset
            </button>
            <button class="button is-info level-item"
                    @click="orderList">Debug
            </button>
            <b-checkbox class="level-item" type="is-info"
                        v-model="editable">Activer drag and drop
            </b-checkbox>
          </div>
        </div>  <br>

        <div>
          <draggable v-model="list"
                     :options="dragOptions"
                     :move="onMove"
                     @start="isDragging=true"
                     @end="isDragging=false">
            <transition-group type="transition"
                              class="columns is-multiline box top-section"
                              tag="div"
                              :name="reOrder? 'flip-list': ''">
              <div class="column is-one-quarter"
                   v-for="element in list"
                   :key="element.position">
                <div class="">
                  <img :src="element.url" alt="">
                </div>

              </div>
            </transition-group>
          </draggable>
        </div>

        <br><br>

        <div>
          <draggable v-model="list2"
                     :options="dragOptions"
                     :move="onMove">
            <transition-group type="transition"
                              class="columns is-multiline box bottom-section"
                              tag="div">
              <!--:name="'flip-list'">-->
              <div class="column is-one-quarter"
                   v-for="element in list2"
                   :key="element.position">

                <img :src="element.url" alt="">
              </div>
            </transition-group>
          </draggable>
        </div>
      </div>


    </div>

    <div class="debug-sortable">

      <ul class="box">
        <li>
          <div class="level">
            <div class="level-left">reOrder:</div>
            <div class="level-right"><code :style="codeColor(reOrder)">
              {{ reOrder }}
            </code></div>
          </div>
        </li>
        <li>
          <div class="level">
            <div class="level-left">isDragging:</div>
            <div class="level-right"><code :style="codeColor(isDragging)">
              {{ isDragging }}
            </code></div>
          </div>
        </li>
        <li>
          <div class="level">
            <div class="level-left">delayedDragging:</div>
            <div class="level-right"><code :style="codeColor(delayedDragging)">
              {{ delayedDragging }}
            </code></div>
          </div>
        </li>
        <li>
          <div class="level">
            <div class="level-left">editable:</div>
            <div class="level-right"><code :style="codeColor(editable)">
              {{ editable }}
            </code></div>
          </div>
        </li>
      </ul>

      <ol class="box">
        <li v-for="i in listString">
          <div class="level tables">
            <div class="level-item">{{ i.name }}</div>
            <div class="level-item">{{ i.position }}</div>
            <div class="level-item">{{ i.selected }}</div>
          </div>
        </li>
      </ol>

      <ol class="box">
        <li v-for="i in list2String">
          <div class="level tables">
            <div class="level-item">{{ i.name }}</div>
            <div class="level-item">{{ i.position }}</div>
            <div class="level-item">{{ i.selected }}</div>
          </div>
        </li>
      </ol>

    </div>


  </section>
</template>

<script>
  import axios from 'axios';
  import draggable from 'vuedraggable';

  export default {
    name: 'hello',
    components: {
      draggable,
    },
    data() {
      return {
        reOrder: false,
        url: 'galleries/events/',
        list: [],
        list2: [],
        editable: true,
        isDragging: false,
        delayedDragging: false
      };
    },
    methods: {
      orderList() {
        this.reOrder = true;
        this.list = this.list.sort((one, two) => {return one.position - two.position; });
        setTimeout(() => { this.reOrder = false; }, 500);

      },
      onMove({relatedContext, draggedContext}) {
        const relatedElement = relatedContext.element;
        const draggedElement = draggedContext.element;
        return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed;
      },
      codeColor(prop) {return prop? 'color: #45a875': '';}
    },
    computed: {
      dragOptions() {
        return {
          animation: 250,
          group: 'description',
          disabled: !this.editable,
          ghostClass: 'none'
          // ghostClass: 'ghost'
        };
      },
      listString() {
        return this.list;
      },
      list2String() {
        return this.list2;
      }
    },
    watch: {
      isDragging(newValue) {
        if (newValue) {
          this.delayedDragging = true;
          return;
        }
        this.$nextTick(() => {
          this.delayedDragging = false;
        });
      }
    },
    mounted() {
      axios.get(this.url).then(response => {
        response.data.images.forEach(image => {
          this.list.push({
            url: image.image,
            name: image.name,
            description: image.description,
            position: image.position,
            fixed: false,
            selected: false,
          });
        });
        this.images.sort((a, b) => a.position - b.position);
      }).catch(error => {
        console.log(this.url);
        console.log(error);
      });
    }
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  i {
    margin-right: 20px;
    padding: 20px;
  }

  .box {
    text-align: center;
  }

  .top-section {
    min-height: 380px;
  }

  .bottom-section {
    min-height: 190px;
  }

  .debug-sortable {
    left: 2%;
    top: 25%;
    position: absolute;
    width: 250px;

    li {

    }

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

  .flip-list-move {
    transition: transform 0.5s;
  }

  .no-move {
    transition: transform 0s;
  }

  .ghost {
    opacity: .5;
    background: #C8EBFB;
  }

  .list-group {
    min-height: 20px;
  }

  .list-group-item {
    cursor: move;
  }

  .list-group-item i {
    cursor: pointer;
  }
</style>
