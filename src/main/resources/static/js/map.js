/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var module =(function(){

    var map;
    var markers;
    var bounds;
    var data = null;
    var xhr = new XMLHttpRequest();

    document.addEventListener('DOMContentLoaded', function () {
        if (document.querySelectorAll('#map').length > 0){
            if (document.querySelector('html').lang)
            lang = document.querySelector('html').lang;
        else
          lang = 'en';

        var js_file = document.createElement('script');
        js_file.type = 'text/javascript';
        js_file.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap&signed_in=true&language=' + lang;
        document.getElementsByTagName('head')[0].appendChild(js_file);
        }
    });

    return{

        initMap:function(){
            map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
            });
            fetch('https://raw.githubusercontent.com/jayshields/google-maps-api-template/master/markers.json')
              .then(function(response){return response.json()})
              .then(plotMarkers);
          },
        plotMarkers: function(m){
            markers = [];
            bounds = new google.maps.LatLngBounds();

            m.forEach(function (marker) {
                var position = new google.maps.LatLng(marker.lat, marker.lng);
                markers.push(
                    new google.maps.Marker({
                        position: position,
                        map: map,
                        animation: google.maps.Animation.DROP
                    })
                );
            bounds.extend(position);
            });
            map.fitBounds(bounds);
        },

        getAirportsFinder: function(){
            xhr.withCredentials = true;
            xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === this.DONE) {
                            console.log(this.responseText);
                    }
            });

            xhr.open("GET", "https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-text?text=Berlin");
            xhr.setRequestHeader("x-rapidapi-host", "cometari-airportsfinder-v1.p.rapidapi.com");
            xhr.setRequestHeader("x-rapidapi-key", "a2148fe741msh2df2e8eec8bad05p1a8be7jsn2134b88fc7ae");
            xhr.send(data);
        }
    };
})();



