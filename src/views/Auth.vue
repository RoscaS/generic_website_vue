<template>
  <section class="section">
    <div class="container">
      <p>
        <button class="button is-primary"
                @click="printData">printData
        </button>
      </p>
      <p>
        <button class="button is-primary"
                @click="isAuthenticated">isAuthenticated
        </button>
      </p>
      <p>
        <button class="button is-primary"
                v-if="!$auth.isAuthenticated()"
                @click="login">Log In
        </button>
      </p>

      <p>
        <button class="button is-primary"
                v-if="$auth.isAuthenticated()"
                @click="getTest">getTest
        </button>
      </p>
      <p>
        <button class="button is-primary"
                v-if="$auth.isAuthenticated()"
                @click="postTest">postTest
        </button>
      </p>

      <p>
        <button class="button is-primary"
                v-if="$auth.isAuthenticated()"
                @click="logout">Log Out
        </button>
      </p>
    </div>
    <div class="columns">
      <div class="content">
        <p> {{message}} </p>
      </div>
    </div>
  </section>
</template>

<script>
	import axios from 'axios';

	export default {
		name: 'app',
		data: () => ({
			url: 'http://localhost:8000/api/authtest/',
			authenticated: false,
			message: 'Empty'
		}),
		mounted() {
			if (this.$auth.accessToken) {
				axios.defaults.headers.common[
					'Authorization'
					] = 'Bearer ' + this.$auth.accessToken;
			}
		},
		methods: {
			login() {
				this.$auth.login();

			},
			isAuthenticated() {
				console.log(this.$auth.isAuthenticated());
			},
			logout() {
				this.$auth.logout();
			},
			printData() {
				console.log(this.$auth.isAuthenticated());
				console.log(this.$auth.scope);
				console.log(this.$auth.user);
			},


			getHeaders() {
				return {headers: {Authorization: `Bearer ${this.$auth.accessToken}`}};
			},
			getTest() {
				axios.get(this.url, this.getHeaders()).then(response => {
					this.message = response.data || 'Empty';
				}).catch(error => {
					console.log(error);
				});
			},
			postTest() {
				let formData = new FormData();
				formData.append('title', 'from frontend');
				formData.append('text', "jaimelaviandebienrouge");
				axios.post(this.url, formData, this.getHeaders()
				).then(response => {
					console.log(response.data);
					this.message = response.data || 'Empty';
				}).catch(error => {
					console.log(error);
				});
			}
		}
	};
</script>

<style lang="scss">

</style>


<!--<template>-->
<!--<section class="section">-->
<!--<div class="container">-->
<!--<p>-->
<!--<button class="button is-primary"-->
<!--@click="printData">printData-->
<!--</button>-->
<!--</p>-->
<!--<p>-->
<!--<button class="button is-primary"-->
<!--v-if="!authenticated"-->
<!--@click="login()">Log In-->
<!--</button>-->
<!--</p>-->

<!--<p>-->
<!--<button class="button is-primary"-->
<!--@click="getTest()">getTest-->
<!--</button>-->
<!--</p>-->
<!--<p>-->
<!--<button class="button is-primary"-->
<!--@click="postTest()">postTest-->
<!--</button>-->
<!--</p>-->

<!--<p>-->
<!--<button class="button is-primary"-->
<!--v-if="authenticated"-->
<!--@click="logout()">Log Out-->
<!--</button>-->
<!--</p>-->
<!--</div>-->
<!--<div class="columns">-->
<!--<div class="content">-->
<!--<p> {{message}} </p>-->
<!--</div>-->
<!--</div>-->
<!--</section>-->
<!--</template>-->

<!--<script>-->
<!--import Auth from '../auth';-->
<!--import axios from 'axios';-->

<!--// const API_URL =-->

<!--const auth = new Auth();-->
<!--// const auth = Auth;-->

<!--export default {-->
<!--name: 'app',-->
<!--data: () => ({-->
<!--url: 'http://localhost:8000/api/authtest/',-->
<!--authenticated: false,-->
<!--message: 'Empty'-->
<!--}),-->
<!--mounted() {-->
<!--this.authenticated = auth.isAuthenticated();-->
<!--this.handleAuthentication();-->
<!--auth.authNotifier.on('authChange', authState => {-->
<!--this.authenticated = authState.authenticated || false;-->
<!--});-->
<!--},-->
<!--methods: {-->
<!--login() {-->
<!--auth.login();-->
<!--},-->
<!--handleAuthentication() {-->
<!--auth.handleAuthentication();-->
<!--},-->
<!--logout() {-->
<!--auth.logout();-->
<!--},-->
<!--printData() {-->
<!--console.log(auth.isAuthenticated());-->
<!--console.log(this.authenticated);-->
<!--console.log(Auth.getAuthToken())-->
<!--},-->


<!--getHeaders() {-->
<!--return { headers: {Authorization: `Bearer ${Auth.getAuthToken()}`} }-->
<!--},-->
<!--getTest() {-->
<!--axios.get(this.url, this.getHeaders()).then(response => {-->
<!--this.message = response.data || 'Empty';-->
<!--}).catch(error => {-->
<!--console.log(error);-->
<!--});-->
<!--},-->
<!--postTest() {-->
<!--let formData = new FormData();-->
<!--formData.append('title', 'from frontend');-->
<!--formData.append('text', "jaimelaviandebienrouge");-->
<!--axios.post(this.url, formData, this.getHeaders()-->
<!--).then(response => {-->
<!--console.log(response.data);-->
<!--this.message = response.data || 'Empty';-->
<!--}).catch(error => {-->
<!--console.log(error);-->
<!--});-->
<!--}-->
<!--}-->
<!--};-->
<!--</script>-->

<!--<style lang="scss">-->

<!--</style>-->
