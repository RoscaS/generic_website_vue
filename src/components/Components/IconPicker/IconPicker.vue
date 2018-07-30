<template>

  <div id="iconPicker" class="">
    <b-input maxlength="200"
             placeholder="Recherche"
             :has-counter='false'
             v-model="search">
    </b-input>
    <scrolly class="body"
             :parentScroll="false"
             :style="{ width: '', height: '500px' }">
      <scrolly-viewport>
        <a href="#"
           class="icon-selection no-tr"
           @click.stop.prevent="getIcon(icon.value, icon.name)"
           :class="`item ${selected === icon.name ? 'selected' : ''}`"
           v-for="icon in icons"
           :key="icon.value">
          <i :class="`${weight} fa-${icon.name}`"></i>
        </a>
      </scrolly-viewport>
      <scrolly-bar axis="y"></scrolly-bar>
    </scrolly>
    <div class="block">
      <div class="level is-mobile">
        <div class="level-item">
          <b-radio :size="smallRadio" v-model="weight" native-value="fal">Fin</b-radio>
        </div>
        <div class="level-item">
          <b-radio :size="smallRadio" v-model="weight" native-value="far">Normal</b-radio>
        </div>
        <div class="level-item">
          <b-radio :size="smallRadio" v-model="weight" native-value="fas">Épais</b-radio>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import icons from './icons';
  import brands from './brands';
  import {Scrolly, ScrollyViewport, ScrollyBar} from 'vue-scrolly';

  export default {
    name: 'fontAwesomePicker',
    components: {Scrolly, ScrollyViewport, ScrollyBar},
    props: {
      position: { type: String },
    },
    data() {
      return {
        selected: '',
        search: '',
        weight: 'fal',
        icons,
      };
    },
    computed: {
      smallRadio() {
        return window.innerWidth < 600? 'is-small': '';
      }
    },
    watch: {
      search(value) { this.filterIcons(value.trim()); }
    },
    methods: {
      getIcon(icon, key) {
        this.selected = key;
        const result = {
          weight: this.weight,
          className: this.selected,
          position: this.position,
        };
        this.$emit('selectIcon', result);
      },

      filterIcons(search) {
        let filter = [];
        if (search.length > 1) {
          filter = icons.filter((item) => {
            const regex = new RegExp(search, 'gi');
            return item.name.match(regex);
          });
        }
        else if (search.length === 0) {
          this.icons = icons;
        }

        if (filter.length > 0) {
          this.icons = filter;
        }
      },


    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  #iconPicker {
    border-radius: 2px;
  }

  input {
    border-radius: 2%;
  }

  .body {
    position: relative;
    max-height: 120px;
    /*padding: 0 0 20px 5px;*/
    overflow: auto;
    margin-top: 20px;

    a {
      display: table;
      font-size: 30px;
      float: left;
      padding: 4px;
      margin: 0 12px 12px 0;
      text-align: center;
      color: inherit;

      &:hover {
        color: $link-hover;
      }
    }
  }

  .block {
    margin-top: 15px;

    @media screen and (max-width: 600px) {
      margin-top: 10px;
      margin-left: -15px;
    }
  }

</style>
