<template></template>

<script>
export default {
  name: "Login",
  data: () => ({}),
  methods: {},
  mounted() {
    if (this.$auth.isAuthenticated()) {
      this.$router.push({ name: "home" });
    } else {
      this.$auth.login();
    }
  }
};
</script>
