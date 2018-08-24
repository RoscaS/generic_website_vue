<template>
  <draggable v-model="edit.state.stores"
             :options="dragOptions"
             :move="onMove"
             @start="isDragging=true"
             @end="isDragging=false">
    <transition-group type="transition"
                      :class=""
                      :name="reOrder? 'flip-store': ''">
      <slot></slot>
    </transition-group>
  </draggable>
</template>

<script>
  import draggable from 'vuedraggable';
  import CategoriesStore from './CategoriesStore'

  export default {
    name: "DragSortArticleBis",
    components: {draggable},
    props: {
      store: {type: Object},
    },
    data: () => ({
      edit: CategoriesStore,
      isDragging: false,
      delayedDragging: false,
      reOrder: false,
    }),
    computed: {
      disabled() {
        return this.edit.state.draggingType != 'category'
      },
      dragOptions() {
        return {
          animation: 250,
          group: 'description',
          disabled: this.disabled,
          ghostClass: 'none'
        };
      },
    },
    watch: {
      isDragging(newValue) {
        if (newValue) {
          this.delayedDragging = true;
          return;
        }
        this.$nextTick(() => {
          this.edit.updatePosition();
        });
      }
    },
    methods: {
      onMove({relatedContext, draggedContext}) {},
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';
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

  .placeHolder {
    cursor: default;
  }
</style>
