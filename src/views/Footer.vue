<template>
  <div>
    <EditIcon :edit="edit" :store="contact" class="edit-icon" top="35px"/>
    <section class="section hero">

      <div v-scroll-reveal="{
          origin: 'top',
          distance: '20px',
          duration: 1500,
          delay: 0,
          easing: 'ease',
         }">
        <a class="button _btn no-tr"
           v-scroll-to="'#Home'">
          <i class="fas fa-arrow-up"></i>
          &nbsp; Haut de la page
        </a>
      </div>

      <div class="level is-mobile">
        <div class="level-item"
             v-for="icon in getIcons"
             v-scroll-reveal="{
                   origin: 'bottom',
                   distance: '20px',
                   duration: 1500,
                   delay: 0,
                   easing: 'ease',
                  }">
          <a class="no-tr"
             target="_blank"
             :href="icon.url">
            <i class="grow fab" :class="icon.icon"></i>
          </a>
        </div>
      </div>

      <p v-scroll-reveal="{
        origin: 'left',
        distance: '200px',
        duration: 1500,
        delay: 0,
        easing: 'ease',
       }">
        Copyright &copy; {{ getCopyright() }}
      </p>
      <p v-scroll-reveal="{
        origin: 'right',
        distance: '200px',
        duration: 1500,
        delay: 0,
        easing: 'ease',
       }">
        Design & code:
        <a class="jrosk" href="mailto:jrosk.ad@gmail.com"
           title="With  by JrosK">JrosK</a>
      </p>
    </section>

    <transition enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
      <TextsEditMenu v-if="checkComponent()">
        <FieldsLayout :store="contact">
        </FieldsLayout>
      </TextsEditMenu>
    </transition>


  </div>
</template>

<script>
import moment from "moment";
import TextsStore from "../components/Edit/Texts/TextsStore";
import EditIcon from "../components/Edit/EditIcon";
import TextsEditMenu from "../components/Edit/Texts/TextsEditMenu";
import FieldsLayout from "./Layouts/FieldsLayout";

const snackBarmsg = `
	Inserez le lien complet (https:// compris) d'un réseau social pour
	afficher son icon active.
	`;

export default {
  name: "Footer",

  components: { FieldsLayout, TextsEditMenu, EditIcon },
  data: () => ({
    type: "text",
    component: "SiteContact",
    helpText: true
  }),
  computed: {
    edit() {
      return TextsStore;
    },
    contact() {
      return this.edit.getStore("SiteContact");
    },

    icons() {
      return [
        { icon: "fa-facebook", url: this.contact.state.facebook.data },
        { icon: "fa-tripadvisor", url: this.contact.state.tripadvisor.data },
        { icon: "fa-google", url: this.contact.state.google.data },
        { icon: "fa-twitter", url: this.contact.state.twitter.data },
        { icon: "fa-instagram", url: this.contact.state.instagram.data },
        { icon: "fa-linkedin", url: this.contact.state.linkedin.data },
        { icon: "fa-snapchat", url: this.contact.state.snapchat.data }
      ];
    },

    getIcons() {
      let lst = [];
      for (let i = 0; i < this.icons.length; i++) {
        if (this.icons[i].url !== "") {
          lst.push(this.icons[i]);
        }
      }
      return lst;
    }
  },

  methods: {
    getCopyright() {
      return moment().format("Y") + " " + "PersonnalWebsiteForall";
    },
    checkComponent() {
      if (this.edit.state.active) {
        let a = this.edit.state.currentStore.name === this.component;
        if (a && this.helpText) {
          this.helpText = false;
          setTimeout(() => {
            this.$snackbar.open({
              message: snackBarmsg,
              type: "is-warning",
              position: "is-top",
              actionText: "Ok",
              queu: "false",
              duration: 15000
            });
          }, 500);
        }

        return a;
      }
      return false;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../scss/global";

.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: $bg-hero;

  ._btn {
    border-color: white;
    color: white;

    &:hover {
      color: black;
      background-color: white;
    }
  }
}

.level {
  margin-top: 30px;
  .level-item {
    a {
      color: white;

      i {
        transition: transform 0.2s ease;
        font-size: 30px;
        transform: scale(1);
        margin-left: 10px;
        margin-right: 10px;

        @media screen and (max-width: 430px) {
          margin-left: 2px;
          margin-right: 2px;
        }

        &:hover {
          transition: transform 0.2s ease;
          transform: scale(1.2);
        }
      }
    }
  }
}

p {
  color: white;
  font-size: 16px;
}

.jrosk {
  color: white;
  font-weight: bold;
  font-size: 20px;
  margin-left: 5px;

  &:hover {
    color: white;
  }

  &:after {
    background: white;
  }
}
</style>
