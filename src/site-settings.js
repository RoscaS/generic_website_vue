const admin = "admin@jrosk.com";
const url = "https://www.api.jrosk.ch/";
const clientID = "3zna8lwrR2rHoWxxwQHEqgRn6dPezrcI";
const redirectUri = "https://www.jrosk.ch/callback";
const audience = "http://jrosk.ch:8000";
const logo = "";
const lat = "47.22576979999999";
const long = "6.957600500000012";
const mapBox = "pk.eyJ1Ijoicm9zY2FzIiwiYSI6ImNqbGlka2p2YjAwNGEzcG5qdGltMDR0aDgifQ.Z0Fl0VypHnN0gLMU50W2BQ";
const title = "Generic Website For All";
const description = "Dev Staging";
const keywords = "";
const canonical = "https://www.jrosk.ch";

const settings = {
  superAdmin: 'jrosk.managment@gmail.com',
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
    genericSection: true,
  }
};

export default settings;
