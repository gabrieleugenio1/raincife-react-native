var map; 
var openInfoWindow = null;
var abrigos = [];

function handleError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("Permissão de localização negada pelo usuário.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Informações de localização não disponíveis.");
            break;
        case error.TIMEOUT:
            alert("Tempo limite expirado ao obter a localização.");
            break;
        case error.UNKNOWN_ERROR:
            alert("Erro desconhecido ao obter a localização.");
            break;
}}

document.addEventListener('DOMContentLoaded', () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(showPosition, handleError);
    } else {
        alert("A geolocalização não é suportada pelo seu navegador.");
    }
});


function initMap() {
    // Configurar o mapa
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -8.03, lng: -34.935 }, 
        zoom: 11, // Nível de zoom inicial
        cluster: false 
    });

    abrigos = [
        [1,"Escola Municipal Diná de Oliveira (ABRIGO)","ABRIGO","MUNICIPAL - LIBERADO","Rua São Mateus, s/n, Iputinga","IPUTINGA",-8.030336,-34.93478],
        [2,"Escola Municipal Casarão do Barbalho (ABRIGO)","ABRIGO","MUNICIPAL - LIBERADO","Estrada do Barbalho, nº 1595, Iputinga","DETRAN",-8.028799,-34.934646],
        [3,"Escola Municipal Maria de Sampaio Lucena (ABRIGO)","ABRIGO","MUNICIPAL - LIBERADO","Av. Pernambuco, s/n, UR 01, Cohab","COHAB/IBURA",-8.12141479466924,-34.9464331973288],
        [4,"Escola Municipal Poeta Paulo Bandeira da Cruz (ABRIGO)","ABRIGO","MUNICIPAL - LIBERADO","Rua das Panelas, nº 28, UR 02, Cohab","COHAB/IBURA",-8.12172498360443,-34.9553219621932],
        [5,"Escola Municipal Adauto Pontes (ABRIGO)","ABRIGO","MUNICIPAL - LIBERADO","R. Sertânia, 35 - Jordão Alto, Recife - PE, 51260-390","JORDÃO",-8.13530104806725,-34.94484631864155],
        [6,"E.M. 27 de Novembro (ABRIGO)","ABRIGO","MUNICIPAL - LIBERADO","Av. Doze de Junho, nº 1120, UR 05, Cohab","COHAB",-8.11154560034305,-34.9537506787609],
        [7,"CENTRO DE APOIO SOCIAL ESPORTIVO E CULTURAL DO IBURA (PONTO DE APOIO)","PONTO DE APOIO","CENTRO SOCIAL - LIBERADO","Rua Rio da Prata, s/n","IBURA",-8.121217,-34.934046],
        [8,"IGREJA POÇO DA PANELA (PONTO DE APOIO)","PONTO DE APOIO","IGREJA - LIBERADO","R. Antônio Vitrúvio, 71","POÇO DA PANELA",-8.04002248516449,-34.91883563935709],
        [9,"IGREJA ORAI (ABRIGO)","ABRIGO","IGREJA - LIBERADO","R. Tucumã, 127 - Ibura","IBURA",-8.11394402985265,-34.93198040329792],
        [10,"ASSOCIAÇÃO ASA BRANCA (PONTO DE APOIO)","PONTO DE APOIO","ASSOCIAÇÃO - LIBERADO","Travessa Benigno Jordão de Vasconcelos, n 41","LAGOA ENCANTADA",-8.127664525588713,-34.94966677446167],
        [11,"CASA DE DONA ÉRICA (PONTO DE APOIO)","PONTO DE APOIO","LIBERADO","Rua Tinto, 153","LINHA DO TIRO",-8.00693942149902,-34.90726200329927],
        [12,"ASSOCIAÇÃO DE MORADORES VILA VINTÉM II (PONTO DE APOIO)","PONTO DE APOIO","ASSOCIAÇÃO - LIBERADO","Avenida Vereador Otacílio de Azevedo, 730","VASCO DA GAMA",-8.003627845570552,-34.9174202456272],
        [13,"IGREJA BATISTA DO CAÇOTE (ABRIGO)","ABRIGO","IGREJA - LIBERADO","R. Dona Ana Aurora, 2042 - Areias","AREIAS",-8.103488607323246,-34.934963303297906],
        [14,"ESCOLA MUNICIPAL CAMPINA DO BARRETO - CAJUEIRO (ABRIGO)","ABRIGO","","Rua Virgílio de Melo Franco, nº 28","CAJUEIRO",-8.009495021697209,-34.886512303299156],
        [15,"PARÓQUIA NOSSA SRA. DOS REMÉDIOS (CARANGUEJO-TABAIARES) (PONTO DE APOIO)","PONTO DE APOIO","","Estrada dos Remédios, 1603","AFOGADOS",-8.065737426075472,-34.908335474462476],
        [16,"ESCOLA MUNICIPAL RICARDO GAMA (ABRIGO)","ABRIGO","","R. Guaíra, 148","LINHA DO TIRO",-8.007459145767697,-34.904254903299154],
        [17,"IGREJA BATISTA CÓRREGO DO TIRO (ABRIGO)","ABRIGO","","Rua Prof. José Amarino dos Reis, 392","ÁGUA FRIA",-8.018066594217876,-34.90642103213498]
    ];

       for (var i = 0; i < abrigos.length; i++) {
        var abrigo = abrigos[i];
        var marker = new google.maps.Marker({
            position: { lat: abrigo[6], lng: abrigo[7] },
            map: map,
            title: abrigo[1],
            icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        });

        var contentString = `
            <div>
                <h3>${abrigo[1]}</h3>
                <p>Tipo: ${abrigo[2]}</p>
                <p>Municipal/Estadual: ${abrigo[3]}</p>
                <p>Endereço: ${abrigo[4]}</p>
                <p>Bairro: ${abrigo[5]}</p>
                <p>
                    <a style="font-weight: bold;" href="https://www.google.com/maps/dir/?api=1&destination=${abrigo[6]},${abrigo[7]}" target="_blank">
                        Iniciar Rota no Google Maps
                    </a>
                </p>
            </div>`;


        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

    (function (marker, infowindow) {
        marker.addListener('click', function () {
            if (openInfoWindow) {
                openInfoWindow.close();
            }
            infowindow.open(map, marker);
            openInfoWindow = infowindow;
        });
    })(marker, infowindow);
    }

}


// Função para calcular a distância entre dois pontos (latitude e longitude) usando a fórmula de Haversine
function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em quilômetros
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distância em quilômetros
    return distance;
}

function showPosition(position) {
    var userLat = position.coords.latitude;
    var userLng = position.coords.longitude;
  
    var closestAbrigo = null;
    var closestDistance = Infinity;
    
    var userMarker = new google.maps.Marker({
        position: { lat: userLat, lng: userLng },
        map: map,
        title: 'Sua Localização',
        icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png', 
    });

    for (var i = 0; i < abrigos.length; i++) {
      var abrigo = abrigos[i];
      var abrigoLat = abrigo[6];
      var abrigoLng = abrigo[7];
      var distance = haversine(userLat, userLng, abrigoLat, abrigoLng);
  
      if (distance < closestDistance) {
        closestDistance = distance;
        closestAbrigo = abrigo;
      }
    }
  
    if (closestAbrigo) {
      var marker = new google.maps.Marker({
        position: { lat: closestAbrigo[6], lng: closestAbrigo[7] },
        map: map,
        title: closestAbrigo[1],
        icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png', 
      });
  
      var contentString = '<div><h3>' + closestAbrigo[1] + '</h3>' +
      '<p>Tipo: ' + closestAbrigo[2] + '</p>' +
      '<p>Municipal/Estadual: ' + closestAbrigo[3] + '</p>' +
      '<p>Endereço: ' + closestAbrigo[4] + '</p>' +
      '<p>Bairro: ' + closestAbrigo[5] + '</p>' +
      '<p><a style="font-weight: bold;" href="https://www.google.com/maps/dir/?api=1&origin=' + userLat + ',' + userLng +
      '&destination=' + closestAbrigo[6] + ',' + closestAbrigo[7] + '" target="_blank">Iniciar Rota no Google Maps</a></p></div>';
  
  
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

        (function (marker, infowindow) {
            infowindow.open(map, marker);
            openInfoWindow = infowindow; 
            marker.addListener('click', function () {
             
                if (openInfoWindow) {
                    openInfoWindow.close();
                }
                infowindow.open(map, marker);
                openInfoWindow = infowindow; 
            });
        })(marker, infowindow);
    }
  }

