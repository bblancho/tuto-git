function init(){
 
  /********************* Google Map ***********************/
  // On initialise la latitude et la longitude de Paris (centre de la carte)
      var lat = -21.115141;
      var lon = 55.536384;
      var map = null;
      // Fonction d'initialisation de la carte

      var villes = {
          "Paris":{"lat": 48.852969,"lon": 2.349903},
          "Brest":{"lat": 48.383,"lon": -4.500},
          "Quimper":{"lat": 48.000,"lon": -4.100},
          "Bayonne":{"lat": 43.500,"lon": -1.467}
      };
          
    function initMap() {
        // Créer l'objet "map" et l'insèrer dans l'élément HTML qui a l'ID "map"
        map = new google.maps.Map(document.getElementById("map"), {
            // Nous plaçons le centre de la carte avec les coordonnées ci-dessus
            center: new google.maps.LatLng(lat, lon), 
            // Nous définissons le zoom par défaut
            zoom: 11, 
            // Nous définissons le type de carte (ici carte routière)
            mapTypeId: google.maps.MapTypeId.ROADMAP, 
            // Nous activons les options de contrôle de la carte (plan, satellite...)
            mapTypeControl: true,
            // Nous désactivons la roulette de souris
            scrollwheel: false, 
            mapTypeControlOptions: {
                // Cette option sert à définir comment les options se placent
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR 
            },
            // Activation des options de navigation dans la carte (zoom...)
            navigationControl: true, 
            navigationControlOptions: {
                // Comment ces options doivent-elles s'afficher
                style: google.maps.NavigationControlStyle.ZOOM_PAN 
            }
        });

        // Nous ajoutons un marqueur
            // var marker = new google.maps.Marker({
            //     // Nous définissons sa position (syntaxe json)
            //     position: {lat: lat, lng: lon},
            //     // Nous définissons à quelle carte il est ajouté
            //     map: map
            // });

        // Nous parcourons la liste des villes
        for(ville in villes){
            var marker = new google.maps.Marker({
                // A chaque boucle, la latitude et la longitude sont lues dans le tableau
                position: {lat: villes[ville].lat, lng: villes[ville].lon},
                // On en profite pour ajouter une info-bulle contenant le nom de la ville
                title: ville,
                map: map
            }); 
        }


        fetch('meteo.json') // Lien du fichier qui contient les données
        .then( response => {
            if (response.ok) {
            response.json()  // On convertit les données reçue au format Json

            .then( data => { // On traite les données
                //console.log(data);

                let tab_ville = data.meteo.bulletin.ville ;

                //console.log(tab_ville) ;

                for (let  i = 0 ; i < tab_ville.length ; i++) {
                   
                    console.log(tab_ville[i]['-id']) ;
                    console.log(tab_ville[i]['-temperature_mini']) ;
                    console.log(tab_ville[i]['-temperature_maxi']) ;
                }

                // console.log(tab_ville) ;

            }).catch(error => {
                console.log("impossible de lire les données : " + error.status );
            });

            } else {
            console.log('Problème sur le serveur : ' + response.status);
            }
        }).catch(error =>  {
            console.log(error.status) ;
        });// fin fetch


    }// Fin initMap

    // On lance l'affichage de la carte
    initMap(); 


}//fin de init


//Ecoute l'evenement de fin de chargement du DOM
document.addEventListener( "DOMContentLoaded", init() );    