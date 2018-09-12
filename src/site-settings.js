const admin = "admin@jura-coiffure.com";
const url = "https://www.jura-coiffure-api.jrosk.ch/";
const clientID = "jDtlSDX4Sr4CxX9C4jD4uHxe5wrNpNnZ";
const redirectUri = "https://www.jura-coiffure.jrosk.ch/callback";
const audience = "https://jura-coiffure-api.jrosk.ch";
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
