<template>
  <div class="form">
    <section>
      <b-field message="">
        <b-input type="name"
                 icon="user"
                 v-model="name.value"
                 placeholder="Nom"
                 maxlength="30">

        </b-input>
      </b-field>

      <b-field :type="validateEmail">
        <b-input type="email"
                 icon="envelope"
                 v-model="mail.value"
                 placeholder="Email"
                 maxlength="30">
        </b-input>
      </b-field>

      <b-field message="">
        <b-input type="textarea"
                 v-model="message.value"
                 placeholder="Dites nous tout..."
                 maxlength="3000">

        </b-input>
      </b-field>

      <p class="control">
        <button class="button is-outlined is-primary" @click="submit">
          <i class="fas fa-fw fa-paper-plane"></i>
          &nbsp; Envoyer
        </button>
      </p>
    </section>
  </div>
</template>

<script>
  export default {
    name: "ContactForm",
    data() {
      return {
        name: {message: '', value: ''},
        mail: {message: '', value: ''},
        message: {message: '', value: ''},
      };
    },

    computed: {
      validateEmail() {
        if (this.mail.value.length === 0) {
          return '';
        }
        let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let check = re.test(String(this.mail.value).toLowerCase());
        return check ? 'is-success' : 'is-danger';
      }
    },

    methods: {
      submit() {

      }
    }
  };
</script>

<style scoped>

</style>
