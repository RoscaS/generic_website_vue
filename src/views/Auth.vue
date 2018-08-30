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
                @click="login()">Log In
                <!--v-if="!authenticated"-->
        </button>
      </p>

      <p>
        <button class="button is-primary"
                @click="getTest()">getTest
        </button>
      </p>
      <p>
        <button class="button is-primary"
                @click="postTest()">postTest
        </button>
      </p>

      <p>
        <button class="button is-primary"
                @click="logout()">Log Out
                <!--v-if="authenticated"-->
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

		},
		methods: {
			login() {
        this.$auth.login();

			},
			handleAuthentication() {
				// auth.handleAuthentication();
			},
			logout() {
				this.$auth.logout();
			},
			printData() {
				console.log(this.$auth.isAuthenticated());
        console.log(this.$auth.scope);
        console.log(this.$auth.user);
        // for (let i in this.$auth.user) {
        // 	console.log(`${i}: ${this.$auth.user[i]}`)
        // }
        // console.log(this.$auth);
        // console.log(this.$auth.accessToken);
        // console.log(this.$auth.token);
        // console.log(this.$auth.token);

				// console.log(auth.isAuthenticated());
				// console.log(this.authenticated);
				// console.log(Auth.getAuthToken())
			},


      getHeaders() {
        return { headers: {Authorization: `Bearer ${Auth.getAuthToken()}`} }
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
