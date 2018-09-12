const admin = "admin@jrosk.com";
const url = "http://localhost:8000/";
const clientID = "3zna8lwrR2rHoWxxwQHEqgRn6dPezrcI";
const redirectUri = "http://localhost:8080/callback";
const audience = "http://jrosk.ch:8000";
const logo = "jura_coiffure.png";
const lat = "47.22439319999999";
const long = "6.960135600000058";
const mapBox = "pk.eyJ1Ijoicm9zY2FzIiwiYSI6ImNqbGlka2p2YjAwNGEzcG5qdGltMDR0aDgifQ.Z0Fl0VypHnN0gLMU50W2BQ";

const settings = {
	admin: admin,
	url: url,
	clientID: clientID,
	redirectUri: redirectUri,
	audience: audience,
	logo: logo ? logo : null,
	lat: parseFloat(lat),
	long: parseFloat(long),
	mapBox: mapBox,
};

export default settings
