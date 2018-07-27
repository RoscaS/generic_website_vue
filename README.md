# spa1

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Google place api

### Fetch place's data:
* https://maps.googleapis.com/maps/api/place/details/json?placeid=--PLACEID--&key=--API-KEY--

```json
...
"reviews" : [
   {
      "author_name" : "John-Yvan Claude",
      "author_url" : "https://www.google.com/maps/contrib/105315634085640240322/reviews",
      "language" : "fr",
      "profile_photo_url" : "https://lh5.googleusercontent.com/-M3D3OlbrhHE/AAAAAAAAAAI/AAAAAAAAAc0/D0xmijI0lCw/s128-c0x00000000-cc-rp-mo-ba5/photo.jpg",
      "rating" : 5,
      "relative_time_description" : "il y a un mois",
      "text" : "Excellents produits à de bons prix.. Les joghurts faits maison sont un délice. Et les fromages sont de très bonne qualité..",
      "time" : 1527340691
   },
   {
      "author_name" : "Walter Flückiger",
      "author_url" : "https://www.google.com/maps/contrib/104214873393919790937/reviews",
      "language" : "fr",
      "profile_photo_url" : "https://lh3.googleusercontent.com/-Tr0JmUzyrbs/AAAAAAAAAAI/AAAAAAAADkQ/PozxmyshQ-4/s128-c0x00000000-cc-rp-mo-ba5/photo.jpg",
      "rating" : 4,
      "relative_time_description" : "il y a 4 mois",
      "text" : "Excellente fromagerie, proposant des produits laitiers et fromagers régionaux. Le choix des produits est vraiment grand. Les prix sont relativement élevés. Mais en contrepartie, on obtient de la qualité. Attention, les samedis ou dimanches soir, il peut y avoir beaucoup d'attente à la coupe des fromages.",
      "time" : 1519586684
   },
   {
      "author_name" : "Pascal Nussbaumer",
      "author_url" : "https://www.google.com/maps/contrib/100247365708182543755/reviews",
      "language" : "fr",
      "profile_photo_url" : "https://lh4.googleusercontent.com/-Pzycxlvl_XM/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq183qirPyOmeYIo3ELaOg_Bv638HQ/s128-c0x00000000-cc-rp-mo-ba3/photo.jpg",
      "rating" : 4,
      "relative_time_description" : "il y a 3 mois",
      "text" : "Bon produit service avec compétences et souriant. Un vrai plaisir",
      "time" : 1522131595
   },
...
```


* [Link shortner](https://goo.gl/) ex: https://goo.gl/scVfzx (fromagerie reussilles)

* [Get place id](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)

## TODO
* Titre affichés dans les parallax animés:
  * IN: à l'arrivée du viewport
  * OUT: à l'entrée dans le viewport du titre de la section
