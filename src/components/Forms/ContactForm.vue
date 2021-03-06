<template>

  <form @submit.prevent="preValidate" class="form">
    <section>

      <b-field class="name" type="is-light"
               :type="errors.first('name')? 'is-danger': 'input'"
               :message="errors.first('name')"
               v-scroll-reveal="{
                 origin: 'right',
                 distance: '100px',
                 duration: 1500,
                 delay: 150,
                 easing: 'ease',
                 }">
        <b-input name="name"
                 v-validate="'required|min:3'"
                 icon="user"
                 v-model="name"
                 placeholder="Nom"
                 maxlength="30">

        </b-input>
      </b-field>

      <b-field class="email" type="is-light"
               :message="errors.first('email')"
               :type="errors.first('email')? 'is-danger': 'input'"
               v-scroll-reveal="{
                 origin: 'right',
                 distance: '100px',
                 duration: 1500,
                 delay: 200,
                 easing: 'ease',
                 }">
        <b-input name="email"
                 v-validate="'required|email'"
                 icon="envelope"
                 v-model="email"
                 placeholder="Email"
                 maxlength="30">
        </b-input>
      </b-field>

      <b-field :message="errors.first('textarea')" type="is-light"
               :type="errors.first('textarea')? 'is-danger': 'input'"
               v-scroll-reveal="{
                 origin: 'right',
                 distance: '100px',
                 duration: 1500,
                 delay: 250,
                 easing: 'ease',
                 }">
        <b-input type="textarea"
                 name="textarea"
                 v-validate="'required|min:5'"
                 v-model="message"
                 placeholder="Dites nous tout..."
                 maxlength="3000">

        </b-input>
      </b-field>

      <div class="validate-captcha-wrapper"
         v-scroll-reveal="{
           origin: 'bottom',
           distance: '100px',
           duration: 1500,
           delay: 300,
           easing: 'ease',
           }">
        <transition name="fade">
          <button v-if="grecaptchaToken"
                  class="button _btn"
                  type="submit">
            <i class="fas fa-fw fa-paper-plane"></i>
            &nbsp; Envoyer
          </button>
          <vue-recaptcha v-else
                         class="g-recaptcha"
                         ref="recaptcha"
                         @verify="onVerify"
                         @expired="onExpired"
                         :sitekey="publicKey">
          </vue-recaptcha>
        </transition>
      </div>
    </section>
    <b-loading :is-full-page="false" :active.sync="isLoading"
               :can-cancel="false"></b-loading>
  </form>

</template>


<script>
  import axios from '../../http'
  import VueRecaptcha from 'vue-recaptcha'

  const messages = {
    success: {
      message: 'Message envoyé, merci!',
      type: 'is-success',
    },
    errorFront: {
      message: 'Veuillez compléter correctement tous les champs svp.',
      type: 'is-danger',
    },
    errorBack: {
      message: 'Erreur coté serveur, merci de tenter à un autre moment.',
      type: 'is-danger',
    },
  }
  export default {
    name: 'ContactForm',
    components: {VueRecaptcha},
    props: {
      url: {type: String},
    },
    data () {
      return {
        show: false,
        isLoading: false,

        name: null,
        email: null,
        message: null,

        publicKey: '6LfZkXAUAAAAAL3hQJqeW0dIKStLk_z7XcvX_62H',
        grecaptchaToken: null,
      }
    },
    methods: {
      onVerify (response) {
        const token = response;
        axios.post('grecaptcha', {
          token: response,
        }).then(response => {
          this.grecaptchaToken = token
        }).catch(() => {
          this.grecaptchaToken = null;
        })
      },

      onExpired () {
        this.grecaptchaToken = null;
      },

      preValidate () {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.isLoading = true
            this.commit()
          } else {
            this.toast(messages.errorFront.message, messages.errorFront.type)
          }
        })
      },
      commit () {
        axios.post(this.url, {
          name: this.name,
          email: this.email,
          message: this.message,
          token: this.grecaptchaToken,
        }).then(response => {
          this.isLoading = false
          this.toast(messages.success.message, messages.success.type)
          this.clearForm()
          this.grecaptchaToken = null;
        }).catch(error => {
          this.isLoading = false
          this.toast(messages.errorBack.message, messages.errorBack.type)
          console.log(this.url)
          console.log(error)
        })
      },
      toast (errors, type) {
        this.$toast.open({
          duration: 5000,
          message: errors,
          position: 'is-bottom',
          type: type,
        })
      },
      clearForm () {
        this.name = null
        this.email = null
        this.message = null
        this.$validator.reset()
      },
    },
  }
</script>

<style scoped lang="scss">
  @import "../../scss/global";

  .fade-enter-active {
    animation-delay: 1s;
  }

  .validate-captcha-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 78px;
  }

  .form {
    .name {
      width: 65%;
    }
    .email {
      width: 65%;
    }
  }
</style>
