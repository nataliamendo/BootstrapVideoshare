var API_BASE_URL = "http://localhost:8080/videoshare-api/videoshare";

$("#button_getvideos").click(function(e) {
	e.preventDefault();
	$("#videos_result").text('HOLA');
	getVideos();
});

$("#button_login").click(function(e) {
	e.preventDefault();
                         
    var newLogin = new Object();
    newLogin.name = $("#username").val()
    newLogin.password = $("#password").val()
                         
	Login(newLogin);
});

$("#button_cienciaficcion").click(function(e) {
	e.preventDefault();
    var categoria = "ciencia_ficcion";     
	
	buscarPorCategoria(categoria);
});
$("#button_comedia").click(function(e) {
	e.preventDefault();
    var categoria = "comedia";     
	
	buscarPorCategoria(categoria);
});
$("#button_animales").click(function(e) {
	e.preventDefault();
    var categoria = "animales";     
	
	buscarPorCategoria(categoria);
});
$("#button_infantil").click(function(e) {
	e.preventDefault();
    var categoria = "infantil";     
	
	buscarPorCategoria(categoria);
});
$("#button_informativo").click(function(e) {
	e.preventDefault();
    var categoria = "informativo";     
	
	buscarPorCategoria(categoria);
});
$("#button_sexo").click(function(e) {
	e.preventDefault();
    var categoria = "porn";     
	
	buscarPorCategoria(categoria);
});
$("#button_terror").click(function(e) {
	e.preventDefault();
    var categoria = "terror";     
	
	buscarPorCategoria(categoria);
});
$("#button_registrarse").click(function(e) {
    e.preventDefault();
                         
    var newSignin = new Object();
    newSignin.username = $("#username").val()
    newSignin.password = $("#password").val()
    newSignin.password2 = $("#password2").val()
    newSignin.mail = $("#mail").val()
    newSignin.mail2 = $("#mail2").val()
    
    comprobarPassword(newSignin.password, newSignin.password2);
    comprobarMail(newSignin.mail, newSignin.mail2);
                               
    Signin(newSignin);
});

function getVideos()
{
    var url = "http://localhost:8080/videoshare-api/videoshare";
	$("#videos_result").text('HOLA');
	
	$.ajax({
           url : url,
           type : 'GET',
           dataType : 'json',
           crossDomain : true,
           
    }).done(function(data, status, jqxhr) {
        var videos = data;
        
            $.each(videos.video, function(i, v){
                   var video = v;
                   $('<h4><b> Título del Vídeo: ' + video.nombre_video+ '</b></h4>').appendTo($('#videos_result'));
                   $('<h5> Username: ' + video.username + '</h5>').appendTo($('#videos_result'));
                   $('<h5> Fecha: ' + video.fecha+ '</h5>').appendTo($('#videos_result'));
                   
                   var categoria = video.categorias[0];

                   $('<strong> Categoria: </strong> ' + categoria.categoria + '<br>').appendTo($('#videos_result'));
                   $('<button type="button" class="btn success" id="button_video" style="color:white;background-color:black;width:90px; height:4" onClick="location.href=\'reprovideo.html\'">Video ' + video.videoid + '</button>').appendTo($('#videos_result'));
            });
            
            
            
    }).fail(function() {
		$("#videos_result").text("No caargaaaaaaaa");
		$('<div class="alert alert-danger"> <strong>Oh!</strong> No se ha podido cargar la lista de Videos. </div>').appendTo($("#videos_result"));
    });
}

function buscarPorCategoria(categoria)
{
    var url = "http://localhost:8080/videoshare-api/videoshare/searchc?categoria="+categoria;
	$("#videos_result").text('HOLA');
	
	$.ajax({
           url : url,
           type : 'GET',
           crossDomain : true,
           
    }).done(function(data, status, jqxhr) {
        var videos = data;
            $.each(videos, function(i, v){
                   var video = v[0];
				   console.log(video[0]);
                   $('<h4><b> Título del Vídeo: ' + video.nombre_video+ '</b></h4>').appendTo($('#videos_result'));
                   $('<h5> Username: ' + video.username + '</h5>').appendTo($('#videos_result'));
                   $('<h5> Fecha: ' + video.fecha+ '</h5>').appendTo($('#videos_result'));
                   
                   var categoria = video.categorias[0];
                   $('<strong> Categoria: </strong> ' + categoria.categoria + '<br>').appendTo($('#videos_result'));
                   
                   var puntuacion = video.puntuacion[0];
                   $('<strong> Puntuacion: </strong> ' + puntuacion.puntuacion + '<br>').appendTo($('#videos_result'));
                   
            });
            
            
            
    }).fail(function() {
		$("#videos_result").text("No caargaaaaaaaa");
		$('<div class="alert alert-danger"> <strong>Oh!</strong> No se ha podido cargar la lista de Videos. </div>').appendTo($("#videos_result"));
    });
}

function Login(newLogin) {
    var username = newLogin.username;
    var password = newLogin.password;
	var url = API_BASE_URL +"/login?username=" + username + "&password=" + password;
	$("#login_result").text('');
	
	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
				var repos = data;
                $('<div class="alert alert-success"> <strong>Wellcome to Videoshare!</strong> You were logged in.</div>').appendTo($("#login_result"));
  
				

	}).fail(function() {
		$("#login_result").text("Can not login you. Try it again.");
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Something goes wrong. Try it again. </div>').appendTo($("#login_result"));
	});

}

function comprobarPassword(pass1, pass2)
{
    if (pass1 == pass2)
    {
        $('<div class="alert alert-success"> <strong>Ok!</strong> Las constraseñas son iguales </div>').appendTo($("#login_result"));;;
    }
    else
    {
        $('<div class="alert alert-danger"> <strong>Oh!</strong>Las contraseñas no son iguales</div>').appendTo($("#signin_result"));
    }

}

function comprobarMail(mail1, mail2)
{
    if (mail1 == mail2)
    {
        $('<div class="alert alert-success"> <strong>OK!</strong>Las direcciones de correo son iguales. </div>').appendTo($("#signin_result"));;;
    }
    else
    {
        $('<div class="alert alert-danger"> <strong>Oh!</strong>Las direcciones de correo no son iguales. </div>').appendTo($("#signin_result"));
    }
}

function Signin(newSignin) {
	var url = API_BASE_URL ;
	$("#signin_result").text('HOLA');
    var data = JSON.stringify(newSignin);
	
	$.ajax({
           url : url,
           type : 'POST',
           crossDomain : true,
           dataType : 'json',
           data: data,
           
           }).done(function(data, status, jqxhr) {
                   $('<div class="alert alert-success"> <strong>Wellcome to Videoshare! </strong> You were signed in.</div>').appendTo($("#signin_result"));
            }).fail(function() {
                    $('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#signin_result"));
            });
    

}

