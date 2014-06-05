var URL = 'http://localhost:8080/videoshare-api/videoshare';
var lastFilename;

$('form').submit(function(e) {
	e.preventDefault();
	$('progress').toggle();

	var formData = new FormData($('form')[0]);

$.ajax({
	url : URL,
	type : 'POST',
	xhr : function() {
		var myXhr = $.ajaxSettings.xhr();
		if (myXhr.upload) {
			myXhr.upload.addEventListener('progress',
					progressHandlingFunction, false); 									// upload
			}
			return myXhr;
		},
		crossDomain : true,
		data : formData,
		cache : false,
		contentType : false,
		processData : false
		
	}).done(function(data, status, jqxhr) {
			var response = $.parseJSON(jqxhr.responseText);
			lastFilename = response.filename;
			$('#uploadedImage').attr('src', response.imageURL);
			$('progress').toggle();
			$('form')[0].reset();
			
	}).fail(function(jqXHR, textStatus) {
				alert("KO");
				console.log(textStatus);
	});
});

function progressHandlingFunction(e) {
	if (e.lengthComputable) {
		$('progress').attr({
			value : e.loaded,
			max : e.total
		});
	}
}

$('#myCarousel').carousel({
	interval : false
// remove interval for manual sliding
});
$("#button_getvideo").click(function(e) {
	e.preventDefault();
	$("#videos_result").text('HOLA');
	getVideos();
});
$('#uploadedVideo').click(function(e) {
e.preventDefault();
$.ajax({
			url : URL,
			type : 'GET',
			crossDomain : true
		}).done(function(data, status, jqxhr) {
			var response = $.parseJSON(jqxhr.responseText);
			$.each(response.images,function(k, v) {
					$('.carousel-inner').append('<div class="item active"><video id="demo" src="' + response.images[k].imageURL + '\type="video/webm\" controls>'
								Tu navegador no implementa el elemento <code>video</code>.'' + response.images[k] + '</h2></div></div>');
				else
					$('.carousel-inner').append('<div class="item"><img class="imgcenter" src="'
																	+ response.images[k].imageURL
																	+ '" class="img-responsive"><div class="carousel-caption"><h2 align="center">'
																	+ response.images[k].title
																	+ '</h2></div></div>');
									});

					$('#carousel-modal').modal('toggle');
				}).fail(function(jqXHR, textStatus) 
						{
							alert("KO");
							console.log(textStatus);
		});
});