//Vista previa de la imagen
const setImage = (e, idAvatar, idImage) => {
	let file = e.target.files[0];
    //El objeto FileReader permite que las aplicaciones web lean ficheros (o información en buffer) 
    //Un buffer es una memoria en la que se almacenan datos de manera temporal para ser procesados. 
    //Fichero: conjunto de bits que son almacenados en un dispositivo.
    if(file != undefined){
        let reader = new FileReader();
        reader.onload = (event) => {
            _url = event.target.result;
            $("#"+idAvatar).attr('src', _url);
            $("#"+idImage).val(_url);
        }
        reader.readAsDataURL(file); 
    }
};
//Vacia los campos relacionados a la carga del avatar
const abortRead = (idAvatar, idImage, idFile) => {
    $("#"+idAvatar).attr('src', '../Image/default.jpg');
    $("#"+idFile).val('');
    $("#"+idImage).val('');
};

//valida que las contraseñas sean iguales
const validatePassword = (idPassword, idConfirm) => {

    let password = $("#"+idPassword).val(),
        confirm_password = $("#"+idConfirm).val();

    if (password != confirm_password) {
        $('#validate_div').show();
        $('#validate_p').text("Contraseñas no coinciden");
    } else {
        $('#validate_div').hide();
        $('#validate_p').text('');
    }
}
//Modifica el alto de un div. 
//Se usa para tener igualdad en el tamaño de los div-formularios 
//con los div de los mapas.
const ModificarHeight = (div_original, div_cambiar) => {
    let height_div =  $(`#${div_original}`).height();
    $(`#${div_cambiar}`).height(height_div);
};

const ValidarForm = _ => {
	try{
        let _nombre = $('#'+nameContent+'nombre').val().trim();
        let _apellido = $('#'+nameContent+'apellido').val().trim();
        let _direccion = $('#'+nameContent+'autocomplete').val().trim();
        let _telefono = $('#'+nameContent+'telefono').val().trim();
        let profesion = $('#'+nameContent+'DropDownListProfesion').val();
        let genero = $('#'+nameContent+'DropDownListGenero').val();
        let lat = $('#'+nameContent+'lat').val();
        let lng = $('#'+nameContent+'lng').val();

        let mensaje = '';
        let expreg = new RegExp('^[A-Z a-z\sáéíóúñ,. ]{1,100}$');
        let expregNumber = new RegExp('^[0-9]{7,10}$');
        let res = true;
        if (_nombre == '' || _apellido == '' || _direccion == '' || _telefono == '' || profesion == "0" || genero == "0")
        {
            mensaje = "Todos los campos son obligatorios.";
            res = false;
        }else if(!expreg.test(_nombre)){
            mensaje = "El campo nombre debe contener solo letras.";
            res = false;
        }else if(!expreg.test(_apellido)){
            mensaje = "El campo apellido debe contener solo letras.";
            res = false;
        }else if(lat == '' || lng == ''){
            mensaje = "No hay ningún marker en el mapa.";
            res = false;
        }else if(!expregNumber.test(_telefono)){
            mensaje = "El campo teléfono debe tener mínimo 7 números y máximo 10.";
            res = false;
        }else if(lat > 90 || lng < -90){
            mensaje = "Posición del mapa no válida.";
            res = false;
        }
        if(mensaje != ''){
            $('#validate_div').show();
            $('#validate_p').text(mensaje);
        }else{
            $('#validate_div').hide();
            $('#validate_p').text('');
        }
        return res;
	}catch(err){
		return false;
	};
};

const showLoader = _ => {
	$('#loader').removeAttr('hidden');
};

const verModal = (event, id) => {
	event.preventDefault();
    var content = $('.modal-body');
    content.empty();
    var title = $(this).attr("title");
    $('.modal-title').html(title);
    let src = $("#" + id).attr('src');
    let img = "<img src='"+src+"' class='img-circle' width='250'/>"
    content.html(img);
    $(".modal-profile").modal({ show: true });
};

/**
* Cambia el radio del circulo en caso de ser mayor a 1000
*/

const setRadiusCircle = (radio, circulo) => {
    if(radio>1000){
        circulo.setRadius(1000);

        $(idLat).val(circulo.getCenter().lat());
        $(idLng).val(circulo.getCenter().lng());
        $(idRadio).val(1000);
        alert('Radio del circulo no puede ser mayor a 1000 m ');
    }
};
//--------------------------Metodos relevantes a google maps API--------------------------------------------------------

/**
* async -> Define una función asíncrona 
* await -> Provoca que la ejecución de una función async
* sea pausada hasta que una Promise sea terminada o rechazada.
*/
//Obtiene la dirección con la API de google places
const getDirections = async (_URL) => {
    const res = await fetch(_URL);
    return await res.json();
};

const initAutocomplete = (valor) => {
	try{
		autocomplete = new google.maps.places.Autocomplete(document.getElementById('MainContent1_autocomplete'),{types:['address']});
		switch(valor){
			case 'marcador':
        		autocomplete.addListener('place_changed', search);
        		break;
        	case 'circulo':
        		autocomplete.addListener('place_changed', searchCircle);
        		break; 
		};
    }catch(err){
        alert(err);
    }
};

//Variables inicialización API
var map;
var map_busqueda;
var markers = [];
var marker;
var marker_busqueda;
var circle_busqueda;
var dibujo;
var circle;

//Verifica que solo una ventana infowindows este abierta
//circle
var prev_infowindow_c = false;
//marker
var prev_infowindow_m = false;

var autocomplete;
/**
* Inicializacion API google maps
*/
let idAutocomplete = '#MainContent1_autocomplete';
let idLat = '#MainContent1_lat';
let idLng = '#MainContent1_lng';
let idRadio = '#MainContent1_radio';
//Nombre ContentPlaceHolderID
let nameContent = 'MainContent1_';

const initMap = _ => {
	try{
		let currentUrl = location.href.split('/')[4].split('?')[0];
		let myLatLng = { lat: 4.710988599999999, lng: -74.072092  };
		let type = 'marcador';
		switch(currentUrl){

			case 'EditarContacto.aspx':
				let lat = parseFloat($(idLat).val().replace(',','.'));
	            let lng = parseFloat($(idLng).val().replace(',', '.'));
	            myLatLng = { lat: lat, lng: lng };
	            
	            //Creación mapa
	            map = new google.maps.Map(document.getElementById(`${nameContent}map`), {
	                center: myLatLng,
	                zoom: 12,
	                mapTypeControl: false,
	                streetViewControl: true
	            });

				//Creación marcador
	            marker = new google.maps.Marker({
	                animation: google.maps.Animation.DROP,
	                //Habilita arrastre 
	                draggable: true,
	                //Habilita evento click
	                clickable: true,
	                position:myLatLng
	            });

				break;
			case 'BuscarContacto.aspx':
				//Creación mapa
			    map_busqueda = new google.maps.Map(document.getElementById(`${nameContent}map`), {
	                center: myLatLng,
	                zoom: 12,
	                mapTypeControl: false,
	                streetViewControl: true
			    });
			    //Creación marcador
			    marker = new google.maps.Marker({
			        animation: google.maps.Animation.DROP,
			        //Habilita arrastre 
			        draggable: true,
			        //Habilita evento click
			        clickable: true,
			    });
	            initMapSearch();
				type = 'circulo';
				break;
			case 'NuevoContacto.aspx':
				//Creación mapa
	            map = new google.maps.Map(document.getElementById(`${nameContent}map`), {
	                center: myLatLng,
	                zoom: 12,
	                mapTypeControl: false,
	                streetViewControl: true
	            });
				//Creación marcador
	            marker = new google.maps.Marker({
	                animation: google.maps.Animation.DROP,
	                //Habilita arrastre 
	                draggable: true,
	                //Habilita evento click
	                clickable: true,
	            });
	            // 
	            dibujo = new google.maps.drawing.DrawingManager({

	                drawingModes: [
	                    google.maps.drawing.OverlayType.MARKER,
	                    google.maps.drawing.OverlayType.CIRCLE,
	                ],
	                drawingControl: true,
	                drawingControlOptions: {
	                    //Posición del cuadro de herramientas drawing
	                    position: google.maps.ControlPosition.TOP_CENTER,
	                    //Opciones de dibujo
	                    drawingModes: ['marker']
	                },
	                markerOptions: marker
	            });
	            //
	            google.maps.event.addListener(dibujo, 'overlaycomplete', (event) => {

	                //Deshabilita modo de dibujo
	                dibujo.setDrawingMode(null);
	                //Asigna las propiedades a la variable marker
	                marker = event.overlay;

	                if (marker_busqueda) {
	                    //Elimina la marca creada por el campo de busqueda.
	                    marker_busqueda.setMap(null);
	                    $(idAutocomplete).val('');
	                }

	                let position = (event.overlay.getPosition().toString());
	                let str = position.split(",");
	                let lat = str[0].substring(1, str[0].length);
	                let lng = str[1].substring(0, str[1].length - 1);
	                $(idLat).val(lat);
	                $(idLng).val(lng);

	                //Retorna un JSON con las direcciones cercanas a las coordenadas dadas.
	                let geocoding = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lng;

	                getDirections(geocoding).then( (data) => {
	                    try{
	                        $(idAutocomplete).val(data.results[0].formatted_address);
	                    }catch(e){
	                        $(idLat).val('');
	                        $(idLng).val('');
	                        $(idAutocomplete).val('');
	                    }
	                });
	                dibujo.setOptions({
	                    drawingControlOptions: {
	                        //Posición del cuadro de herramientas drawing
	                        position: google.maps.ControlPosition.TOP_CENTER,
	                        //Opciones de dibujo
	                        drawingModes: []
	                    }
	                });
	            });//Fin overlaycomplete
	            //
	            google.maps.event.addListener(marker, 'click', function (event) {
	                let p = confirm('¿Esta seguro de eliminar esta marca?');
	                if (p) {
	                    marker.setMap(null);
	                    $(idLat).val('');
	                    $(idLng).val('');
	                    $(idAutocomplete).val('');

	                    dibujo.setOptions({
	                        drawingControlOptions:
	                            {//Posición del cuadro de herramientas drawing
	                                position: google.maps.ControlPosition.TOP_CENTER,
	                                //Opciones de dibujo
	                                drawingModes: ['marker']
	                            }
	                    });
	                }
	            });
	            //
	            dibujo.setMap(map);
				break;
		};
		//evento de arrastre
        google.maps.event.addListener(marker, 'dragend', function (event) {
            $(idLat).val(event.latLng.lat());
            $(idLng).val(event.latLng.lng());

            let geocoding = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + event.latLng.lat() + ',' + event.latLng.lng();

            getDirections(geocoding).then(function (data) {
                $(idAutocomplete).val(data.results[0].formatted_address);
            }).catch(function (error) { 
        	 	$(idLat).val('');
                $(idLng).val('');
                $(idAutocomplete).val('');
            });
        });

        marker.setMap(map);
        initAutocomplete(type);

	}catch(err){
		console.log(err);
	}
};
const initMapSearch = _ => {
	//Creación mapa
    map = new google.maps.Map(document.getElementById(`${nameContent}mapSearch`), {
        center: { lat: 4.710988599999999, lng: -74.072092 },
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: true
    });
    //Creación circulo
    circle = new google.maps.Circle({
        //Color del borde
        strokeColor: '#FF0000',
        //Opacidad del borde
        strokeOpacity: 0.8,
        //Ancho borde
        strokeWeight:2,
        //Color de relleno
        fillColor: '#FF0000',
        //Habilita evento click
        clickable: true,
        //
        editable: true,
        //Habilita arrastre 
        draggable: true
    });
    // 
    dibujo = new google.maps.drawing.DrawingManager({

        drawingModes: [
            google.maps.drawing.OverlayType.MARKER,
            google.maps.drawing.OverlayType.CIRCLE,
        ],
        drawingControl: true,
        drawingControlOptions: {
            //Posición del cuadro de herramientas drawing
            position: google.maps.ControlPosition.TOP_CENTER,
            //Opciones de dibujo
            drawingModes: ['circle']
        },
        circleOptions: circle
    });
    //
    google.maps.event.addListener(dibujo, 'overlaycomplete', function(event) {
        
        //Deshabilita modo de dibujo
        dibujo.setDrawingMode(null); 
        //Asigna las propiedades a la variable circle
        circle = event.overlay;
        if (circle_busqueda) {
            //Elimina el circulo creado por el campo de busqueda.
            circle_busqueda.setMap(null);
            //Vacia el campo direccion
            $(idAutocomplete).val('');
        }

        setRadiusCircle(parseInt(circle.getRadius()),circle);
        ////Retorna un JSON con las direcciones cercanas a las coordenadas dadas.
        $(idLat).val(circle.getCenter().lat());
        $(idLng).val(circle.getCenter().lng());
        $(idRadio).val(circle.getRadius());
        let geocoding ='https://maps.googleapis.com/maps/api/geocode/json?latlng=' + circle.getCenter().lat() + ',' + circle.getCenter().lng();
        
        getDirections(geocoding).then( (data) => {
                $(idAutocomplete).val(data.results[0].formatted_address);
            }
        ).catch (function(error){
                $(idLat).val('');
                $(idLng).val('');
                $(idAutocomplete).val('');
                $(idRadio).val('');
        });

        dibujo.setOptions({ drawingControlOptions: {
            //Posición del cuadro de herramientas drawing
            position: google.maps.ControlPosition.TOP_CENTER,
            //Opciones de dibujo
            drawingModes: ['']
        }});
    });//Fin overlaycomplete
    //
    google.maps.event.addListener(circle,'click',function(){
        let p = confirm('¿Esta seguro de eliminar este circulo?');
        if(p){
            circle.setMap(null);
            dibujo.setOptions({ 
                drawingControlOptions: 
                    {//Posición del cuadro de herramientas drawing
                        position: google.maps.ControlPosition.TOP_CENTER,
                        //Opciones de dibujo
                        drawingModes: ['circle']
                    }
            });
            $(idLat).val('');
            $(idLng).val('');
            $(idRadio).val('');
            $(idAutocomplete).val('');
        }
    });
    google.maps.event.addListener(circle, 'radius_changed', function(){
        let radius = parseInt(circle.getRadius());
        $(idRadio).val(circle.getRadius());
        setRadiusCircle(radius,circle);
    });
    google.maps.event.addListener(circle,'dragend',function(){
        ////Retorna un JSON con las direcciones cercanas a las coordenadas dadas.
        $(idLat).val(circle.getCenter().lat());
        $(idLng).val(circle.getCenter().lng());

        let geocoding ='https://maps.googleapis.com/maps/api/geocode/json?latlng=' + circle.getCenter().lat() + ',' + circle.getCenter().lng();
            
        getDirections(geocoding).then(function(data){
            $(idAutocomplete).val(data.results[0].formatted_address);
        }).catch (function(error){
            $(idLat).val('');
            $(idLng).val('');
            $(idAutocomplete).val('');
        });
    });
    dibujo.setMap(map);
};
const searchCircle = _ => {
    try{
        let place = autocomplete.getPlace();
        let lat = place.geometry.location.lat;
        let lng = place.geometry.location.lng;
        $(idLat).val(lat);
        $(idLng).val(lng);
        $(idRadio).val(1000);
        $(idAutocomplete).val(place.formatted_address);
        if(circle){
            circle.setMap(null);
        }
        if(circle_busqueda){
            circle_busqueda.setMap(null);
        }
        circle_busqueda = new google.maps.Circle({
            //Color del borde
            strokeColor: '#FF0000',
            //Opacidad del borde
            strokeOpacity: 0.8,
            //Ancho borde
            strokeWeight:2,
            //Color de relleno
            fillColor: '#FF0000',
            //Habilita evento click
            clickable: true,
            //
            editable: true,
            //Habilita arrastre 
            draggable: true,
            center: place.geometry.location,
            radius: 1000,
            map: map
        });
        //
        google.maps.event.addListener(circle_busqueda,'click',function(){
            let p = confirm('¿Esta seguro de eliminar este circulo?');
            if(p){
                circle_busqueda.setMap(null);
                dibujo.setOptions({ 
                    drawingControlOptions: 
                        {//Posición del cuadro de herramientas drawing
                            position: google.maps.ControlPosition.TOP_CENTER,
                            //Opciones de dibujo
                            drawingModes: ['circle']
                        }
                });
                $(idLat).val('');
                $(idLng).val('');
                $(idRadio).val('');
                $(idAutocomplete).val('');
            }
        });
        google.maps.event.addListener(circle_busqueda,'dragend',function(){
            ////Retorna un JSON con las direcciones cercanas a las coordenadas dadas.
            $(idLat).val(circle_busqueda.getCenter().lat());
            $(idLng).val(circle_busqueda.getCenter().lng());
            $(idRadio).val(circle_busqueda.getRadius());
            let geocoding ='https://maps.googleapis.com/maps/api/geocode/json?latlng=' + circle_busqueda.getCenter().lat() + ',' + circle_busqueda.getCenter().lng();
            
            getDirections(geocoding).then(function(data){
                try{
                    $(idAutocomplete).val(data.results[0].formatted_address);
                }catch(e){
                    $(idLat).val('');
                    $(idLng).val('');
                    $(idAutocomplete).val('');
                }
            }).catch (function(error){});
        });
        google.maps.event.addListener(circle_busqueda, 'radius_changed', function(){
            let radius = parseInt(circle_busqueda.getRadius());
            $(idRadio).val(circle_busqueda.getRadius());
            setRadiusCircle(radius,circle_busqueda);
        });
        map.setCenter(place.geometry.location);
        map.setZoom(12);

        dibujo.setOptions({ drawingControlOptions: {
            //Posición del cuadro de herramientas drawing
            position: google.maps.ControlPosition.TOP_CENTER,
            //Opciones de dibujo
            drawingModes: []
        }});
    }catch(e){
        alert(e);
    }
}
const search = _ => {
    try{
        let place = autocomplete.getPlace();
        let lat = place.geometry.location.lat;
        let lng = place.geometry.location.lng;
        $(idLat).val(lat);
        $(idLng).val(lng);
        $(idAutocomplete).val(place.formatted_address);
        if(marker){
            marker.setMap(null);
        }
        if(marker_busqueda){
            marker_busqueda.setMap(null);
        }
        marker_busqueda = new google.maps.Marker({
            animation: google.maps.Animation.DROP,
            //Habilita arrastre 
            draggable: true,
            //Habilita evento click
            clickable: false,
            //
            position: place.geometry.location,
            map:map
        });
        marker_busqueda.addListener('click',function(event) {
            let p = confirm('¿Esta seguro de eliminar esta marca?');
            if(p){
                marker_busqueda.setMap(null);
                option.push('marker');
                $(idLat).val('');
                $(idLng).val('');
                $(idAutocomplete).val('');

                dibujo.setOptions({ 
                    drawingControlOptions: 
                        {//Posición del cuadro de herramientas drawing
                            position: google.maps.ControlPosition.TOP_CENTER,
                            //Opciones de dibujo
                            drawingModes: ['marker']
                            }
                });
            }
        });
        //
        marker_busqueda.addListener('dragend',function(event) {
            $(idLat).val(event.latLng.lat());
            $(idLng).val(event.latLng.lng());

        
            let geocoding ='https://maps.googleapis.com/maps/api/geocode/json?latlng=' + event.latLng.lat() + ',' + event.latLng.lng();
            
            getDirections(geocoding).then(function(data){
                try{
                    $(idAutocomplete).val(data.results[0].formatted_address);
                }catch(e){
                    $(idLat).val('');
                    $(idLng).val('');
                    $(idAutocomplete).val('');
                }
            }).catch (function(error){});
        });

        map.setCenter(place.geometry.location);
        map.setZoom(12);
        //See Functionality
        /*if(dibujo != undefined){
	        dibujo.setOptions({ drawingControlOptions: {
	            //Posición del cuadro de herramientas drawing
	            position: google.maps.ControlPosition.TOP_CENTER,
	            //Opciones de dibujo
	            drawingModes: []
	        }});
	    }*/
    }catch(e){
        alert(e);
    }
}
//Buscar contacto
//Valida si la dirección esta vacia borra el circulo del mapa
const validateDirection = _ => {
    try{
        if($('#MainContent1_autocomplete').val() == "" || $('#MainContent1_lat').val() == ""){
            $('#MainContent1_lat').val('');
            $('#MainContent1_lng').val('');
            $('#MainContent1_radio').val('');
            $('#MainContent1_autocomplete').val('');
        }
    }catch(err){

    }
}

const LoadMapSearch = _ => {

    let obj = $('#MainContent1_dataGeographic').val();

    if(obj != ""){
        if (markers.length > 0) {
            deleteMarkers();
        }
        obj = JSON.parse(obj);
        let infowindow = new google.maps.InfoWindow();
        //create empty LatLngBounds object
        let bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < obj.length; i++) {
            let geozona = obj[i].Geozona.substring(7, obj[i].Geozona.length-1).split(" ");
            let myMarker = new google.maps.Marker({
                animation: google.maps.Animation.DROP,
                //Habilita arrastre 
                draggable: false,
                //Habilita evento click
                clickable: true,
                position:  { lat: parseFloat(geozona[1]), lng: parseFloat(geozona[0])  },
               // map: map_busqueda,
                store_id: obj[i].ID
            });
            markers.push(myMarker);
            bounds.extend(myMarker.position);
            //console.log(marker.store_id);//marker.get('store_id');
            google.maps.event.addListener(myMarker, 'click', (function(myMarker, i) {
                return function() {
                    $.ajax({    
                        type: "POST",    
                        contentType: "application/json; charset=utf-8",    
                        url: "BuscarContacto.aspx/GetInfo", // this for calling the web method function in cs code.    
                        data: '{id: "' + myMarker.store_id +'" }',                   
                        dataType: "json",    
                        success: (data) => {
                            let obj = JSON.parse(data.d);
                            let contentMarker = 
                            '<div id="content">'+
                                '<div id="bodyContent">'+
                                    '<p><img class="imgCard" style="margin-left: 50%;" src="'+obj[0].Imagen+'" alt="Imagen"/>' +
                                        '<br /><label>Id:</label>'+ obj[0].ID +
                                        '<br /><label>Nombre:</label> '+obj[0].Nombre+
                                        '<br /><label>Dirección:</label> '+obj[0].Direccion+
                                        '<br /><label>Teléfono:</label> '+obj[0].Telefono+
                                        '<br /><label>Género:</label> '+obj[0].Genero+
                                        '<br /><label>Profesión:</label> '+obj[0].Profesion+
                                    '</p>'+
                                '</div>'+
                            '</div>';
                            infowindow.setContent(contentMarker);
                            infowindow.open(map_busqueda, myMarker);
                        },    
                        failure: function (data) {    
                            infowindow.setContent("Error al cargar los datos.");
                            infowindow.open(map_busqueda, myMarker);
                        }             
                    });
                  
                }
            })(myMarker, i));
        }//fin for
        //now fit the map to the newly inclusive bounds
        map_busqueda.fitBounds(bounds);
        setMapOnAll(map_busqueda);
    }else{
        deleteMarkers();
    }
};
// Sets the map on all markers in the array.
const setMapOnAll = (map) => {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
};
// Removes the markers from the map, but keeps them in the array.
const clearMarkers = _ => {
    setMapOnAll(null);
};

// Deletes all markers in the array by removing references to them.
const deleteMarkers = _ => {
    clearMarkers();
    markers = [];
};
