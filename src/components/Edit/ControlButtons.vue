<template>
  <div :style="dark ? 'color: #7e7e7e' : null">
    <i @click="$emit('modify')" class="edit fal fa-pen"></i>
    <i @click="$emit('remove')" class="remove fal fa-times"></i>
  </div>
</template>

<script>
	export default {
		name: "ControleButtons",
    props: {
      dark: {type: Boolean, default: false},
    },
	};
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

.level-item {
  opacity: 1 !important;
  margin-right: 10px;
  color: white;
  i {
    font-size: 17px;
    transition: color .3s ease;
    cursor: pointer;
  }
  .edit {
    margin-top: -2px;
    margin-right: .5rem;
    &:hover {
      transition: color .3s ease;
      color: $is-warning;
    }
  }
  .remove {
    &:hover {
      transition: color .3s ease;
      color: $is-danger
    }
  }
}
</style>
