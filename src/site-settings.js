const admin = "admin@jrosk.com";
const url = "http://localhost:8000/";
const clientID = "3zna8lwrR2rHoWxxwQHEqgRn6dPezrcI";
const redirectUri = "http://localhost:8080/callback";
const audience = "http://jrosk.ch:8000";
const logo = "";
const lat = "47.22576979999999";
const long = "6.957600500000012";
const mapBox = "pk.eyJ1Ijoicm9zY2FzIiwiYSI6ImNqbGlka2p2YjAwNGEzcG5qdGltMDR0aDgifQ.Z0Fl0VypHnN0gLMU50W2BQ";
const title = "Generic Website For All";
const description = "Dev local";
const keywords = "";
const canonical = "http://localhost:8080/";

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
    genericSection: true,
  }
};

export default settings;
