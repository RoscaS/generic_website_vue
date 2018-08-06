<template>
  <div>
    <section class="section hero">
      <EditIcon :component="$options.name">
        <div class="container">
          <div class="columns is-variable is-8">
            <div class="column is-one-third"
                 v-scroll-reveal="sReveal('left', 150, 400, 1500)">
              <div :class="{'highlighted': highlighted(0)}">
                <i :class="state.L_icon.data"></i>
                <h2 class="subtitle">{{ state.L_title.data }}</h2>
                <p>{{ state.L_text.data }}</p>
              </div>
            </div>
            <div class="column is-one-third"
                 v-scroll-reveal="sReveal('top', 150, 0, 1500)">
              <div :class="{'highlighted': highlighted(1)}">
                <i :class="state.C_icon.data"></i>
                <h2 class="subtitle">{{ state.C_title.data }}</h2>
                <p>{{ state.C_text.data }}</p>
              </div>
            </div>
            <div class="column is-one-third"
                 v-scroll-reveal="sReveal('right', 150, 400, 1500)">
              <div :class="{'highlighted': highlighted(2)}">
                <i :class="state.R_icon.data"></i>
                <h2 class="subtitle">{{ state.R_title.data }}</h2>
                <p>{{ state.R_text.data }}</p>
              </div>
            </div>
          </div>
        </div>
      </EditIcon>
    </section>

    <EditNav v-if="checkComponent()" height="300">
      <b-tabs v-model="activeTab" position="is-centered">

        <b-tab-item v-for="(i, idx) in labels" :key="idx" :label="i.label">
          <div class="columns is-mobile is-variable is-8-desktop">
            <div class="column is-6">
              <label>{{ i.subs[0].label }}:</label>
              <b-input :len="i.subs[0].len"
                       :disabled="loading"
                       v-model="i.subs[0].data">
              </b-input>
              <label>{{ i.subs[1].label }}:</label>
              <b-input :type="i.subs[1].type"
                       :rows="i.subs[1].rows"
                       :maxlength="i.subs[1].len"
                       :disabled="loading"
                       v-model="i.subs[1].data">
              </b-input>
            </div>
            <div class="column is-6">
              <label>{{ i.subs[2].label }}:</label>
              <IconPicker @selectIcon="returnIcon" :position="i.label"/>
            </div>
          </div>
        </b-tab-item>

      </b-tabs>
    </EditNav>
  </div>
</template>

<script>
  import HeroStore from './HeroStore';
  import mixin from '../../mixins/Public/PublicMixin';
  import IconPicker from '../../components/IconPicker/IconPicker';

  export default {
    name: "Hero",
    mixins: [mixin],
    components: {IconPicker},
    data() {
      return {
        state: {
          L_title: new this.Title(),
          L_text:  new this.Text(),
          L_icon:  new this.Icon(),
          C_title: new this.Title(),
          C_text:  new this.Text(),
          C_icon:  new this.Icon(),
          R_title: new this.Title(),
          R_text:  new this.Text(),
          R_icon:  new this.Icon(),
        },
        store: HeroStore,
        iconPicker: false,
      };
    },
    computed: {
      labels() {
        return [
          {
            label: 'Gauche',
            subs: [this.state.L_title, this.state.L_text, this.state.L_icon]
          },
          {
            label: 'Centre',
            subs: [this.state.C_title, this.state.C_text, this.state.C_icon]
          },
          {
            label: 'Droite',
            subs: [this.state.R_title, this.state.R_text, this.state.R_icon]
          },
        ];
      }
    },
    methods: {
      returnIcon(icon) {
        switch (icon.position) {
          case 'Gauche':
            this.state.L_icon.data = `${icon.weight} fa-${icon.className}`;
            break;
          case 'Centre':
            this.state.C_icon.data = `${icon.weight} fa-${icon.className}`;
            break;
          case 'Droite':
            this.state.R_icon.data = `${icon.weight} fa-${icon.className}`;
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
