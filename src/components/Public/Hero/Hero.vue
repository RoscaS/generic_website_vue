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
                <i :class="L_icon"></i>
                <h2 class="subtitle">{{ L_title }}</h2>
                <p>{{ L_text }}</p>
              </div>
            </div>
            <div class="column is-one-third"
                 v-scroll-reveal="{
                   duration: 1500,
                   easing: 'ease'
                   }">
              <div :class="{'highlighted': highlighted(1)}">
                <i :class="C_icon"></i>
                <h2 class="subtitle">{{ C_title }}</h2>
                <p>{{ C_text }}</p>
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
                <i :class="R_icon"></i>
                <h2 class="subtitle">{{ R_title }}</h2>
                <p>{{ R_text }}</p>
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
                       v-model="L_title">
              </b-input>
              <label>Texte:</label>
              <b-input type="textarea"
                       rows="3"
                       maxlength="200"
                       :disabled="loading"
                       v-model="L_text">
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
                       v-model="C_title">
              </b-input>
              <label>Texte:</label>
              <b-input type="textarea"
                       rows="3"
                       maxlength="200"
                       :disabled="loading"
                       v-model="C_text">
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
                       v-model="R_title">
              </b-input>
              <label>Texte:</label>
              <b-input type="textarea"
                       rows="3"
                       maxlength="200"
                       :disabled="loading"
                       v-model="R_text">
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
        store: HeroStore,
        state: HeroStore.state,
        iconPicker: false,
      };
    },
    computed: {
      L_title: {
        get() { return this.state.L_title; },
        set(value) { this.state.L_title = value; }
      },
      C_title: {
        get() { return this.state.C_title; },
        set(value) { this.state.C_title = value; }
      },
      R_title: {
        get() { return this.state.R_title; },
        set(value) { this.state.R_title = value; }
      },
      L_icon: {
        get() { return this.state.L_icon; },
        set(value) { this.state.L_icon = value; }
      },
      C_icon: {
        get() { return this.state.C_icon; },
        set(value) { this.state.C_icon = value; }
      },
      R_icon: {
        get() { return this.state.R_icon; },
        set(value) { this.state.R_icon = value; }
      },
      L_text: {
        get() { return this.state.L_text; },
        set(value) { this.state.L_text = value; }
      },
      C_text: {
        get() { return this.state.C_text; },
        set(value) { this.state.C_text = value; }
      },
      R_text: {
        get() { return this.state.R_text; },
        set(value) { this.state.R_text = value; }
      }
    },
    methods: {
      returnIcon(icon) {
        switch (icon.position) {
          case 'L':
            this.L_icon = `${icon.weight} fa-${icon.className}`;
            break;
          case 'M':
            this.C_icon = `${icon.weight} fa-${icon.className}`;
            break;
          case 'R':
            this.R_icon = `${icon.weight} fa-${icon.className}`;
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
