$(function () {
    $("#external_header_ipad").load("../assets/ipad/html/header.html", function () {       
            $("#external_footer_ipad").load("../assets/ipad/html/footer.html", function () {
                $("[data-role='header'], [data-role='footer']").toolbar();
                $("[data-role='panel']").enhanceWithin().panel();
            }); 

			var sessionFirstName = sessionStorage.getItem('firstName');
			var sessionLastName = sessionStorage.getItem('lastName');
			var sessionEmail = sessionStorage.getItem('email');
			var sessionTokens = sessionStorage.getItem('tokens');
			if (sessionFirstName && sessionLastName && sessionEmail && sessionTokens){
				$("#userStatus").replaceWith("<div class='ui-grid-a' id='userStatus'><div class='ui-block-a'><a href='#menu' data-role='button' data-rel='popup'>Hi Thushini<span class='ui-nodisc-icon ui-icon-carat-d ui-btn-icon-right'></span></a></div></div>");
			} else {
				$("#userStatus").replaceWith("<div class='ui-grid-a' id='userStatus'><div class='ui-block-a'><a href='signin.html' data-ajax='false' class='ui-btn ui-corner-all'>Sign In</a></div><div class='ui-block-b'><a href='signup.html' data-ajax='false' class='ui-btn ui-corner-all'>Sign Up</a></div></div>");
			}
    });	
	
	
});

function logout() {
	sessionStorage.clear();
	$( "#menu" ).popup( "close" )
    
	$("#userStatus").replaceWith("<div class='ui-grid-a' id='userStatus'><div class='ui-block-a'><a href='signin.html' data-ajax='false' class='ui-btn ui-corner-all'>Sign In</a></div><div class='ui-block-b'><a href='signup.html' class='ui-btn ui-corner-all'>Sign Up</a></div></div>");
}
