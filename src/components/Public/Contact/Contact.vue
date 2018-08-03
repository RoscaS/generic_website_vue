<template>
  <div>
    <section id="Contact" class="section section-container">
      <EditIcon top="20px" :component="name">

        <div class="container">
          <div class="content">
            <Title :class="{'highlighted': highlighted(0)}">
              {{ state.title.data }}
            </Title>
            <p class="sub-title"
               :class="{'highlighted': highlighted(1)}">
              {{ state.subT1.data }}
            </p>
            <div class="columns">
              <div class="column left">
                <div v-scroll-reveal="{
                     origin: 'left',
                     distance: '100px',
                     duration: 2500,
                     delay: 100,
                     easing: 'ease',
                   }">
                  <GoogleMap name="map"></GoogleMap>
                </div>
              </div>
              <div class="column right">
                <div class="info"
                     v-scroll-reveal="{
                     origin: 'right',
                     distance: '400px',
                     duration: 1500,
                     delay: 50,
                     easing: 'ease',
                   }">
                  <div class="line">
                    <i class="fas fa-map-marker-alt fa-fw"></i>
                    <a :href="siteSettings.google">{{ siteSettings.city }}</a>
                  </div>

                  <div class="line">
                    <i class="fas fa-phone fa-fw"></i>
                    <a :href="phoneHref">{{ siteSettings.phone }}</a>
                  </div>

                  <div class="line">
                    <i class="fas fa-envelope fa-fw"></i>
                    <a :href="mailHref">{{ siteSettings.mail }}</a>
                  </div>

                </div>
                <p class="subT1"
                   :class="{'highlighted': highlighted(2)}"
                   v-scroll-reveal="{
                   origin: 'right',
                   distance: '200px',
                   duration: 1500,
                   delay: 100,
                   easing: 'ease',
                 }">
                  {{ state.subT2.data }}</p>
                <ContactForm url="message/"></ContactForm>
              </div>
            </div>
            <div class="has-text-centered subT3">
              <p :class="{'highlighted': highlighted(3)}"
                 v-scroll-reveal="{
                    origin: 'left',
                    distance: '200px',
                    duration: 1500,
                    delay: 600,
                    easing: 'ease',
                  }">
                {{ state.subT3.data }}
              </p>
            </div>
          </div>
        </div>
      </EditIcon>
    </section>
    <EditNav v-if="checkName()" height="150">
      <b-tabs v-model="activeTab" position="is-centered">
        <b-tab-item v-for="(i, idx) in state" :key="idx" :label="i.label">
          <b-field type="is-light">
            <b-input :type="i.type"
                     :maxlength="i.len"
                     :rows="i.rows"
                     :disabled="loading"
                     v-model="i.data">
            </b-input>
          </b-field>
        </b-tab-item>
      </b-tabs>
    </EditNav>
  </div>
</template>

<script>
  import ContactStore from './ContactStore';
  import ContactForm from '../../Components/Forms/ContactForm';
  import GoogleMap from '../../Components/Maps';
  import mixin from '../../../mixins/Public/PublicMixin';

  export default {
    name: "Contact",
    mixins: [mixin],
    components: {ContactForm, GoogleMap},
    data() {
      return {
        siteSettings: this.$Global.SiteSettings,
        store: ContactStore,
        state: {
          title: {data: '', len: '35', label: 'Titre',},
          subT1: {data: '', type: 'textarea', len: '200', rows: '2', label: 'Sous titre 1',},
          subT2: {data: '', type: 'textarea', len: '200', rows: '2', label: 'Sous titre 2',},
          subT3: {data: '', type: 'textarea', len: '200', rows: '2', label: 'Sous titre 3',},
        },
      };
    },
    computed: {
      phoneHref() { return `tel:${this.siteSettings.phone}`; },
      mailHref() { return `mailto:${this.siteSettings.mail}`; },
    },
  };
</script>

<style scoped lang="scss">
  @import '../../../../static/sass/global';

  .line {
    margin-bottom: 10px;
  }

  .subT2 {
    margin-top: 30px;
    margin-bottom: 10px;
  }
  .subT3 {
    margin-top: 30px;
    margin-bottom: 10px;
  }

</style>
