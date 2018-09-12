const admin = "admin@jrosk.com";
const url = "http://localhost:8000/";
const clientID = "3zna8lwrR2rHoWxxwQHEqgRn6dPezrcI";
const redirectUri = "http://localhost:8080/callback";
const audience = "http://jrosk.ch:8000";
// const logo = 'jura_coiffure.png';
const logo = '';


const settings = {
	admin: admin,
	url: url,
	clientID: clientID,
	redirectUri: redirectUri,
	audience: audience,
	logo: logo ? logo : null,
};

export default settings
