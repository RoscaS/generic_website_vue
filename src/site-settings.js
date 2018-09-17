const admin = "jura.coiffure@gmail.com";
const url = "http://api.jura-coiffure.ch/";
const clientID = "6zWK4ZtfpGhXjUqaFENbVv0US2r5BZYq";
const redirectUri = "https://jura-coiffure.ch/callback";
const audience = "https://jura-coiffure.ch";
const logo = "jura_coiffure.png";
const lat = "47.22439319999999";
const long = "6.960135600000058";
const title = "Jura coiffure";
const description = "Salon de coiffure situé au Noirmont dans le Jura Suisse. Coupe homme et femme avec et sans randez-vous.";
const keywords = "coiffure, barbier, homme, femme, sans rendez-vous";
const canonical = "http://jura-coiffure.ch";
const mapBox = "pk.eyJ1IjoianJvc2siLCJhIjoiY2ptNTZldHZyMGticzN2bzQ1M2M1Z3I4MyJ9.9ExtxPYSahrO4IrvBwxrAA";

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

  title: title,
  description: description,
  keywords: keywords,
  canonical: canonical,

  siteAddons: {
    genericSection: false,
  }
};

export default settings;
