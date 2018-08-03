<template>
  <div>
    <section class="section hero">
      <EditIcon :component="name">
        <div class="container">
          <div class="columns is-variable is-8">
            <div class="column is-one-third"
                 v-scroll-reveal="{
                   origin: 'left',
                   distance: '400px',
                   duration: 1500,
                   easing: 'ease'
                   }">
              <div :class="{'highlighted': highlighted(0)}">
                <i :class="state.L_icon"></i>
                <h2 class="subtitle">{{ state.L_title }}</h2>
                <p>{{ state.L_text }}</p>
              </div>
            </div>
            <div class="column is-one-third"
                 v-scroll-reveal="{
                   duration: 1500,
                   easing: 'ease'
                   }">
              <div :class="{'highlighted': highlighted(1)}">
                <i :class="state.C_icon"></i>
                <h2 class="subtitle">{{ state.C_title }}</h2>
                <p>{{ state.C_text }}</p>
              </div>
            </div>
            <div class="column is-one-third"
                 v-scroll-reveal="{
                   origin: 'right',
                   distance: '400px',
                   duration: 1500,
                   easing: 'ease'
                   }">
              <div :class="{'highlighted': highlighted(2)}">
                <i :class="state.R_icon"></i>
                <h2 class="subtitle">{{ state.R_title }}</h2>
                <p>{{ state.R_text }}</p>
              </div>
            </div>
          </div>
        </div>
      </EditIcon>
    </section>

    <EditNav v-if="checkName()" height="300">
      <b-tabs v-model="activeTab" position="is-centered">

        <b-tab-item label="Gauche">
          <div class="columns is-mobile is-variable is-8-desktop">
            <div class="column is-6">
              <label>Titre:</label>
              <b-input maxlength="20"
                       :disabled="loading"
                       v-model="state.L_title">
              </b-input>
              <label>Texte:</label>
              <b-input type="textarea"
                       rows="3"
                       maxlength="200"
                       :disabled="loading"
                       v-model="state.L_text">
              </b-input>
            </div>
            <div class="column is-6">
              <label>Icone:</label>
              <IconPicker @selectIcon="returnIcon" position="L"/>
            </div>
          </div>
        </b-tab-item>

        <b-tab-item label="Centre">
          <div class="columns is-mobile is-variable is-8-desktop">
            <div class="column is-6">
              <label>Titre:</label>
              <b-input maxlength="20"
                       :disabled="loading"
                       v-model="state.C_title">
              </b-input>
              <label>Texte:</label>
              <b-input type="textarea"
                       rows="3"
                       maxlength="200"
                       :disabled="loading"
                       v-model="state.C_text">
              </b-input>
            </div>
            <div class="column is-6">
              <label>Icone:</label>
              <IconPicker @selectIcon="returnIcon" position="M"/>
            </div>
          </div>
        </b-tab-item>

        <b-tab-item label="Droite">
          <div class="columns is-mobile is-variable is-8-desktop">
            <div class="column is-6">
              <label>Titre:</label>
              <b-input maxlength="20"
                       :disabled="loading"
                       v-model="state.R_title">
              </b-input>
              <label>Texte:</label>
              <b-input type="textarea"
                       rows="3"
                       maxlength="200"
                       :disabled="loading"
                       v-model="state.R_text">
              </b-input>
            </div>
            <div class="column is-6">
              <label>Icone:</label>
              <IconPicker @selectIcon="returnIcon" position="R"/>
            </div>
          </div>
        </b-tab-item>
      </b-tabs>

    </EditNav>
  </div>
</template>

<script>
  import HeroStore from './HeroStore';
  import mixin from '../../../mixins/PublicMixin'
  import IconPicker from '../../Components/IconPicker/IconPicker';

  export default {
    name: "Hero",
    mixins: [mixin],
    components: { IconPicker },
    data() {
      return {
        state: {
          L_title: '', L_icon: '', L_text: '',
          C_title: '', C_icon: '', C_text: '',
          R_title: '', R_icon: '', R_text: '',
        },
        store: HeroStore,
        iconPicker: false,
      };
    },
    methods: {
      returnIcon(icon) {
        switch (icon.position) {
          case 'L':
            this.state.L_icon = `${icon.weight} fa-${icon.className}`;
            break;
          case 'M':
            this.state.C_icon = `${icon.weight} fa-${icon.className}`;
            break;
          case 'R':
            this.state.R_icon = `${icon.weight} fa-${icon.className}`;
            break;
        }
      },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

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
