<template>
  <div>
    <section class="section hero">
      <EditIcon :store="store" :edit="edit" top="-35px"/>
      <div class="container">
        <div class="columns is-variable is-8">
          <div class="column is-one-third"
               v-scroll-reveal="sReveal('left', 150, 400, 1500)">
            <div :class="{'highlighted': highlighted(0)}">
              <i :class="state.icon1.data"></i>
              <h2 class="subtitle">{{ state.title1.data }}</h2>
              <p>{{ state.text1.data }}</p>
            </div>
          </div>
          <div class="column is-one-third"
               v-scroll-reveal="sReveal('top', 150, 0, 1500)">
            <div :class="{'highlighted': highlighted(1)}">
              <i :class="state.icon2.data"></i>
              <h2 class="subtitle">{{ state.title2.data }}</h2>
              <p>{{ state.text2.data }}</p>
            </div>
          </div>
          <div class="column is-one-third"
               v-scroll-reveal="sReveal('right', 150, 400, 1500)">
            <div :class="{'highlighted': highlighted(2)}">
              <i :class="state.icon3.data"></i>
              <h2 class="subtitle">{{ state.title3.data }}</h2>
              <p>{{ state.text3.data }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <TextsEditMenu v-if="checkComponent()" height="300">
      <b-tabs v-model="edit.activeTab" position="is-centered">

        <b-tab-item v-for="(i, idx) in store.subs" :key="idx" :label="i.label">
          <div class="columns is-mobile is-variable is-8-desktop">
            <div class="column is-6">
              <label>{{ i.data[0].label }}:</label>
              <b-input :len="i.data[0].len"
                       :disabled="edit.loading"
                       v-model="i.data[0].data">
              </b-input>
              <label>{{ i.data[1].label }}:</label>
              <b-input :type="i.data[1].type"
                       :rows="i.data[1].rows"
                       maxlength="200"
                       :disabled="edit.loading"
                       v-model="i.data[1].data">
              </b-input>
            </div>
            <div class="column is-6">
              <label>{{ i.data[2].label }}:</label>
              <IconPicker @selectIcon="returnIcon" :position="i.label"/>
            </div>
          </div>
        </b-tab-item>

      </b-tabs>
    </TextsEditMenu>
  </div>
</template>

<script>
  import IconPicker from '../../components/IconPicker/IconPicker';
  import TextsEditMenu from '../../components/Edit/Texts/TextsEditMenu';
  import EditIcon from '../../components/Edit/EditIcon';
  import FieldsLayout from '../FieldsLayout';
  import ViewsMixin from '../../mixins/ViewsMixin';

  export default {
    name: "Hero",
    mixins: [ViewsMixin],
    components: {TextsEditMenu, EditIcon, FieldsLayout, IconPicker},

    data() {
      return {
        component: "Hero",
        type: 'text',
      };
    },
    methods: {
      returnIcon(icon) {
        switch (icon.position) {
          case 'Gauche':
            this.state.icon1.data = `${icon.weight} fa-${icon.className}`;
            break;
          case 'Centre':
            this.state.icon2.data = `${icon.weight} fa-${icon.className}`;
            break;
          case 'Droite':
            this.state.icon3.data = `${icon.weight} fa-${icon.className}`;
            break;
        }
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../static/sass/global';

  .hero {
    text-align: center;
    background-color: $separator;

    h1, h2, p {
      color: white;
    }

    h2 {
      font-weight: bold;
    }

    p {
      font-size: 15px;
      font-weight: 400;
    }

    i {
      font-size: 60px;
      color: white;
      margin-bottom: 30px;
    }
  }

  label {
    font-weight: bolder;
    color: white !important;
  }

</style>
