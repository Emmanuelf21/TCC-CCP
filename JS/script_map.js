let map;
let lati = -23.5489;
let long = -46.6388;
let mapaId = '133e5225b27e749';
let zoomAt = 11;
let marker = null;
const card = document.getElementById("pac-card");
const input = document.getElementById("pac-input");
 const options = {
  fields: ["formatted_address", "geometry", "name"],
  strictBounds: false,
};
const autocomplete = new google.maps.places.Autocomplete(input, options);

async function initMap() {
    // ... (rest of your code)
  
  const position = { lat: lati, lng: long };
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    zoom: zoomAt,
    center: position,
    mapId: mapaId,
    
  });
  
  SearchBar();
  
}

function SearchBar(){
  
  
  // Check if elements with IDs exist before using them

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

  autocomplete.bindTo("bounds", map);


  autocomplete.addListener("place_changed", () => {
    
    document.getElementById("places").innerHTML = "";

    const place = autocomplete.getPlace();
    if (!place.geometry || !place.geometry.location) {
      window.alert("Sem detalhes disponíveis para: '" + place.name + "'");
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    let service;
    service = new google.maps.places.PlacesService(map);
      service.nearbySearch(
        {
          location: place.geometry.location,
          radius: "700",
          type: [document.getElementById("tipo").value],
        },
        callback
      );
      
      var select = document.getElementById("tipo");
      select.addEventListener("change", searchNearbyPlaces);

      document.querySelector(".clearBtn").addEventListener("click", function limparCampo() {
        document.getElementById("pac-input").value = '';
      });
      // Make Place Details Request
   
  });

}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    console.log("Numero de Locais: " + results.length);
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  } else {
    alert("Nenhum resultado encontrado!");
  }
}

function createMarker(place) {
  
  marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
  });
  
  var conteudo = `<div class='infowindow'>
                    <span>${place.name}</span><br>
                    ${place.vicinity}<br><br>
                    <a href="https://www.google.com.br/maps/place/${place.vicinity}" target="_blank">Ver no Google Maps</a>
                  </div>`;

  var infowindow = new google.maps.InfoWindow({
    content: conteudo,
    maxWidth: 180,
  });

  google.maps.event.addListener(marker, "click", function () {
    infowindow.open(map, this);
  });
  console.log(place);
  var table = document.getElementById("places");
  var row = table.insertRow();
  var cell1 = row.insertCell(0);
  cell1.innerHTML = `<strong>${place.name}</strong> <br> ${place.vicinity}`;
  cell1.classList.add("infos_places");
  if (place.photos) {
    let photoUrl = place.photos[0].getUrl();
    let cell2 = row.insertCell(1);
    cell2.classList.add("img_places");
    cell2.innerHTML = `<img width='100' height='100' src='${photoUrl}'>`;
  } else {
    let photoUrl = "image/Img Placeholder.png";
    let cell2 = row.insertCell(1);
    cell2.classList.add("img_places");
    cell2.innerHTML = `<img width='100' height='100' src='${photoUrl}'>`;
  }
}
function success(pos) {
  lati = pos.coords.latitude;
  long = pos.coords.longitude;
  zoomAt = 16;
  initMap();
}



navigator.geolocation.getCurrentPosition(success);


//-------------------------------------------------------------------------------------------------
//Change map style

let mapStyles = document.querySelectorAll(".mapStyle");
  
    for(let mapStyle of mapStyles){
      mapStyle.addEventListener('click', function(){
        
        newStyle(mapStyle);
      })
      
    }
    async function newStyle(mapStyle){  
      switch (mapStyle.value) {
        case '0': //light map
          mapaId = 'ed7fe503f7d88d29';
          recreateMap();
        break;
        case '1': // grey map
          mapaId = '133e5225b27e749';
          recreateMap();
        break;
        case '2'://dark map
          mapaId = '27badb966dbccaf0';
          recreateMap();
        break;
    }
  }
  
  async function recreateMap(){
    const position = { lat: lati, lng: long };
    const { Map } = await google.maps.importLibrary("maps");
  
    map = new Map(document.getElementById("map"), {
      zoom: zoomAt,
      center: position,
      mapId: mapaId,
      
    });
        const addHTML = `<div class="pac-card style-change" id="pac-card">
        <input id="pac-input" type="text" class="style-change-pac-input style-change" placeholder="Insira a localização" />
        <div id="type-selector" class="form-group pac-controls style-change" style="font-family: Arial;">
          <label for="tipo" >Selecione o Tipo do Local:</label>
          <select class="form-control style-change" name="" id="tipo">
            <option value="gym">Academia</option>
            <option value="liquor_store">Adega</option>
            <option value="lawyer">Advogado</option>
            <option value="real_estate_agency">Agência Imobiliária</option>
            <option value="insurance_agency">Agência de Seguros</option>
            <option value="travel_agency">Agência de Viagens</option>
            <option value="airport">Aeroporto</option>
            <option value="lodging">Alojamento</option>
            <option value="car_rental">Aluguel de Carros</option>
            <option value="aquarium">Aquario</option>
            <option value="campground">Área de Camping</option>
            <option value="storage">Armazem</option>
            <option value="atm">ATM</option>
            <option value="tourist_attraction">Atração Turisctica</option>
            <option value="night_club">Balada</option>
            <option value="bank">Banco</option>
            <option value="bar">Bar</option>
            <option value="library">Biblioteca</option>
            <option value="bicycle_store">Bicicletaria</option>
            <option value="bowling_alley">Boliche</option>
            <option value="fire_station">Bombeiros</option>
            <option value="hair_care">Cabeleireiro</option>
            <option value="cafe">Café</option>
            <option value="casino">Casino</option>
            <option value="cemetery">Cemitério</option>
            <option value="locksmith">Chaveiro</option>
            <option value="movie_theater">Cinema</option>
            <option value="meal_takeaway">Comida para Viagem</option>
            <option value="car_dealer">Concessionária</option>
            <option value="accounting">Contabilidade</option>
            <option value="post_office">Correios</option>
            <option value="dentist">Dentista</option>
            <option value="drugstore">Drogaria</option>
            <option value="electrician">Eletricista</option>
            <option value="embassy">Embaixada</option>
            <option value="roofing_contractor">Empreitaria</option>
            <option value="plumber">Encanador</option>
            <option value="meal_delivery">Entrega de Comida</option>
            <option value="school">Escola</option>
            <option value="primary_school">Escola Primária</option>
            <option value="secondary_school">Ensino Médio (Ensino Médio)</option>
            <option value="local_government_office">
              Escritório Governamental Local
            </option>
            <option value="bus_station">Estação de Ônibus</option>
            <option value="train_station">Estação de Trem</option>
            <option value="transit_station">Estação de Transito</option>
            <option value="subway_station">Estação do Mêtro</option>
            <option value="parking">Estacionamento</option>
            <option value="rv_park">Estacionamento para Trailers</option>
            <option value="stadium">Estádio</option>
            <option value="university">Faculdade</option>
            <option value="pharmacy">Farmacia</option>
            <option value="physiotherapist">Fisioterapeuta</option>
            <option value="florist">Floricultura</option>
            <option value="funeral_home">Funerária</option>
            <option value="art_gallery">Galeria de Arte</option>
            <option value="hospital">Hospital</option>
            <option value="church">Igreja</option>
            <option value="jewelry_store">Joalheria</option>
            <option value="car_wash">Lava-rápido</option>
            <option value="laundry">Lavanderia</option>
            <option value="book_store">Livraria</option>
            <option value="movie_rental">Locadora</option>
            <option value="home_goods_store">Loja de Artigos Domésticos</option>
            <option value="convenience_store">Loja de Conveniência</option>
            <option value="department_store">Loja de Departamento</option>
            <option value="electronics_store">Loja de Eletrônicos</option>
            <option value="hardware_store">Loja de Ferragens</option>
            <option value="furniture_store">Loja de Móveis</option>
            <option value="clothing_store">Loja de Roupas</option>
            <option value="shoe_store">Loja de Sapatos</option>
            <option value="store">Lojas</option>
            <option value="doctor">Médicos</option>
            <option value="mosque">Mesquita</option>
            <option value="museum">Museu</option>
            <option value="bakery">Padaria</option>
            <option value="park">Parque</option>
            <option value="amusement_park">Parque de Diversões</option>
            <option value="pet_store">Pet Shop</option>
            <option value="painter">Pintor</option>
            <option value="police">Polícia</option>
            <option value="taxi_stand">Ponto de Taxi</option>
            <option value="gas_station">Posto de Gasolina</option>
            <option value="city_hall">Prefeitura</option>
            <option value="car_repair">Reparo de Carros</option>
            <option value="restaurant">Restaurante</option>
            <option value="beauty_salon">Salão de Beleza</option>
            <option value="shopping_mall">Shopping</option>
            <option value="synagogue">Sinagoga</option>
            <option value="spa">Spa</option>
            <option value="supermarket">Supermercado</option>
            <option value="hindu_temple">Templo Hindu</option>
            <option value="courthouse">Tribunal</option>
            <option value="veterinary_care">Veterinário</option>
            <option value="zoo">Zoológico</option>
          </select>
          
        </div>
        <br />
        <button class="clearBtn header style-change">Limpar</button>
      </div>`
        document.querySelector('.autocomplete-section').innerHTML=addHTML;
        SearchBar();
      }

// nearby places
async function  searchNearbyPlaces() {
  
  document.getElementById("places").innerHTML = "";

    const place = autocomplete.getPlace();
    

    if (!place.geometry || !place.geometry.location) {
      window.alert("Sem detalhes disponíveis para: '" + place.name + "'");
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    
    
    let service;
    service = new google.maps.places.PlacesService(map);
      service.nearbySearch(
        {
          location: place.geometry.location,
          radius: "700",
          type: [document.getElementById("tipo").value],
        },
        callback
      );
      
  var select = document.getElementById("tipo");
  select.addEventListener("change", searchNearbyPlaces);
  //document.getElementById("autocomplete").value = "";
}
