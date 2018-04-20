//Vista previa de la imagen 
function setImage(e,idAvatar,idImage) { 
    let file = e.target.files[0];
    //El objeto FileReader permite que las aplicaciones web lean ficheros (o información en buffer) 
    //Un buffer es una memoria en la que se almacenan datos de manera temporal para ser procesados. 
    //Fichero: conjunto de bits que son almacenados en un dispositivo.
    if(file != undefined){
        let reader = new FileReader();
        reader.onload = function (event) {
            _url = event.target.result;
            $("#"+idAvatar).attr('src', _url);
            $("#"+idImage).val(_url);
        }
        reader.readAsDataURL(file); 
    }
}
//Vacia los campos relacionados a la carga del avatar
function abortRead(idAvatar, idImage, idFile) {
    $("#"+idAvatar).attr('src', '../Image/default.jpg');
    $("#"+idFile).val('');
    $("#"+idImage).val('');
}
//valida que las contraseñas sean iguales
function validatePassword(idPassword,idConfirm) {
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
function changePass(id){
    if ($('#'+id).is(':checked')) {
        $('#div_pass').show();
    }else{
        $('#div_pass').hide();
        $('#validate_div').hide();
        $('#MainContent1_password').val('');
        $('#MainContent1_confirm').val('');
    }
}
//Variables inicialización API
var map;
var marker;
var marker_busqueda;
var circle_busqueda;
var dibujo;
var circle;
var option = ['marker', 'circle'];
//Variables inicialización API modificar mapa
var map_e;
var marker_e;
var dibujo_e;
var circle_e;

//Verifica el cambio de centro de un circulo.
var cambio = false;
//Verifica que solo una ventana infowindows este abierta
//circle
var prev_infowindow_c = false;
//marker
var prev_infowindow_m = false;
//
var autocomplete;
//Marker icon
var marker_icon;
/**
* Inicializacion API google maps
*/
let idAutocomplete = '#MainContent1_autocomplete';
let idLat = '#MainContent1_lat';
let idLng = '#MainContent1_lng';
function initMap() {

    let currentUrl = location.href.split('/')[4].split('?')[0];
    if( currentUrl =="EditarContacto.aspx" || currentUrl == "NuevoContacto.aspx" || currentUrl == "BuscarContacto.aspx"){

        if(currentUrl == "EditarContacto.aspx"){
            let lat = parseFloat($(idLat).val().replace(',','.'));
            let lng = parseFloat($(idLng).val().replace(',', '.'));
            let myLatLng = { lat: lat, lng: lng };
            
            //Creación mapa
            map = new google.maps.Map(document.getElementById('MainContent1_map'), {
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
        }else if(currentUrl == "BuscarContacto.aspx"){
            //Creación mapa
            map = new google.maps.Map(document.getElementById('MainContent1_map'), {
                center: { lat: 4.710988599999999, lng: -74.072092 },
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
        }else{
            //Creación mapa
            map = new google.maps.Map(document.getElementById('MainContent1_map'), {
                center: { lat: 4.710988599999999, lng: -74.072092 },
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
            google.maps.event.addListener(dibujo, 'overlaycomplete', function (event) {

                //Deshabilita modo de dibujo
                dibujo.setDrawingMode(null);

                if (event.type == 'marker') {
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

                    getDirections(geocoding).then(function (data) {
                        try{
                            $(idAutocomplete).val(data.results[0].formatted_address);
                        }catch(e){
                            $(idLat).val('');
                            $(idLng).val('');
                            $(idAutocomplete).val('');
                        }
                
                    });
                }//fin else 
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
        }
       
        //evento de arrastre
        google.maps.event.addListener(marker, 'dragend', function (event) {
            $(idLat).val(event.latLng.lat());
            $(idLng).val(event.latLng.lng());

            let geocoding = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + event.latLng.lat() + ',' + event.latLng.lng();

            getDirections(geocoding).then(function (data) {
                try{
                    $(idAutocomplete).val(data.results[0].formatted_address);
                }catch(e){
                    $(idLat).val('');
                    $(idLng).val('');
                    $(idAutocomplete).val('');
                }
            }).catch(function (error) { });
        });

        marker.setMap(map);
        if(currentUrl != "BuscarContacto.aspx"){
            initAutocomplete();
        }
        
    }
}
function initMapSearch(){
    //Creación mapa
    map = new google.maps.Map(document.getElementById('MainContent1_mapSearch'), {
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

        if (event.type == 'circle') {
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
        
            let geocoding ='https://maps.googleapis.com/maps/api/geocode/json?latlng=' + circle.getCenter().lat() + ',' + circle.getCenter().lng();
            
            getDirections(geocoding).then(function(data){
                try{
                    $(idAutocomplete).val(data.results[0].formatted_address);
                }catch(e){
                    $(idLat).val('');
                    $(idLng).val('');
                    $(idAutocomplete).val('');
                }
            }).catch (function(error){});
        }
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
            $(idAutocomplete).val('');
        }
    });
    google.maps.event.addListener(circle, 'radius_changed', function(){
        let radius = parseInt(circle.getRadius());
        setRadiusCircle(radius,circle);
    });
    google.maps.event.addListener(circle,'dragend',function(){
        ////Retorna un JSON con las direcciones cercanas a las coordenadas dadas.
        $(idLat).val(circle.getCenter().lat());
        $(idLng).val(circle.getCenter().lng());

        let geocoding ='https://maps.googleapis.com/maps/api/geocode/json?latlng=' + circle.getCenter().lat() + ',' + circle.getCenter().lng();
            
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
    dibujo.setMap(map);
    initAutocompleteCircle();
}
/**
* Cambia el radio del circulo en caso de ser mayor a 1000
*/
function setRadiusCircle(radio,circulo){
   
    if(radio>2000){
        circulo.setRadius(1000);

        $(idLat).val(circle.getCenter().lat());
        $(idLng).val(circle.getCenter().lng());

        alert('Radio del circulo no puede ser mayor a 2000 m ');
    }
}
function searchCircle(){
    try{
        let place = autocomplete.getPlace();
        let lat = place.geometry.location.lat;
        let lng = place.geometry.location.lng;
        $(idLat).val(lat);
        $(idLng).val(lng);
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
                $(idAutocomplete).val('');
            }
        });
        google.maps.event.addListener(circle_busqueda,'dragend',function(){
            ////Retorna un JSON con las direcciones cercanas a las coordenadas dadas.
            $(idLat).val(circle_busqueda.getCenter().lat());
            $(idLng).val(circle_busqueda.getCenter().lng());

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
function search(){
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

function ModificarHeight(div_original,div_cambiar){
    let height_div =  $(`#${div_original}`).height();
    $(`#${div_cambiar}`).height(height_div);
}
/**
* async -> Define una función asíncrona 
* await -> Provoca que la ejecución de una función async sea pausada hasta que una Promise sea terminada o rechazada.
*/
async function getDirections(_URL){

    const res = await fetch(_URL);

    return await res.json();
}
function initAutocomplete(){
    try{
        autocomplete = new google.maps.places.Autocomplete(document.getElementById('MainContent1_autocomplete'),{types:['address']});
        autocomplete.addListener('place_changed', search);
    }catch(err){
        alert(err);
    }
}

function initAutocompleteCircle(){
    try{
        autocomplete = new google.maps.places.Autocomplete(document.getElementById('MainContent1_autocomplete'));
        autocomplete.addListener('place_changed', searchCircle);
    }catch(err){
        alert(err);
    }
}

function ValidarForm(){
    try{
        let nameContent = 'MainContent1_';
        let _nombre = $('#'+nameContent+'nombre').val().trim();
        let _apellido = $('#'+nameContent+'apellido').val().trim();
        let _direccion = $('#'+nameContent+'autocomplete').val().trim();
        let _telefono = $('#'+nameContent+'telefono').val().trim();
        let profesion = $('#'+nameContent+'DropDownListProfesion').val();
        let genero = $('#'+nameContent+'DropDownListGenero').val();
        let lat = $('#'+nameContent+'lat').val();

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
        }else if(lat == ''){
            mensaje = "No hay ningún marker en el mapa.";
            res = false;
        }else if(!expregNumber.test(_telefono)){
            mensaje = "El campo teléfono debe tener mínimo 7 números y máximo 10.";
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
        
    }catch(e){
        console.log(e);
        return false;
    }
}

function showLoader(){
    $('#loader').removeAttr('hidden');
}

function verModal(event, id) {
    event.preventDefault();
    var content = $('.modal-body');
    content.empty();
    var title = $(this).attr("title");
    $('.modal-title').html(title);
    let src = $("#" + id).attr('src');
    let img = "<img src='"+src+"' class='img-circle' width='250'/>"
    content.html(img);
    $(".modal-profile").modal({ show: true });
}

//Delete this function
function DeleteRowGrid(_this, id){
    $(_this).parents('tr').addClass('selected');
    var valvalue = id.replace("btnDelete", "hdnEmpId");   
    let res = confirm('¿Está seguro de eliminar este contacto?');
    if(res){
        $.ajax({    
            type: "POST",    
            contentType: "application/json; charset=utf-8",    
            url: "ListarContacto.aspx/BorrarInfo", // this for calling the web method function in cs code.    
            data: '{id: "' + $("#" + valvalue).val() + '" }',// empid value                        
            dataType: "json",    
            success: OnSuccess,    
            failure: function (data) {    
                alert(data);  
                return false;  
            }             
        });
        
    }else{
        $(_this).parents('tr').removeClass('selected');
    }
    return res;
}

function OnSuccess(response) {    
    if (response.d == 'true')    
    {    
        $('#MainContent1_ctl00_GridView_Contacto').DataTable().row('.selected').remove().draw( false );

        alert("Empleado eliminado");  
                  
        return false;  
    }    
    return false;  
}   