<template>
  <draggable v-model="store.articles"
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
  import CategoriesStore from './CategoriesStore';

  export default {
    name: "DragSortArticles",
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
      dragOptions() {
        let disable =  this.edit.state.draggingType !== 'article';
        return {
          animation: 250,
          group: 'description',
          disabled: disable,
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
          this.edit.state.primaryStore.updateData();
          try {this.edit.state.secondaryStore.updateData();}
          catch (e) {return e}
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

</style>
