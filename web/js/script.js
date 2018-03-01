var playLoader = true;

function loopAnim(anim){
    if(playLoader){
        anim.reset();
        setTimeout(function(){
            anim.play(loopAnim(anim));
        }, 700);
    } else {

        $('#wrapper').show().css('display', 'flex').hide();
        $('#loader').fadeOut(200, function(){
            $('#wrapper').fadeIn(300, 'easeInExpo')
        });
    }

}

var logo_loader = new Vivus('logo-animate',
    {
        type:     'oneByOne',
        duration: 40,
        start:    'autostart',
        selfDestroy: false,
        animTimingFunction: Vivus.EASE
    }
);

logo_loader.play(loopAnim(logo_loader));

$(window).on('load', function(){
    playLoader = false;
});

function checkEmpty(elt){

    if($(elt).val() === '') return false;

    return true;
}

function checkAllEmpty(...elts){
    for (var elt of elts){
        if(!checkEmpty(elt)) return false;
    }

    return true;
}

function emptyFields(...elts){
    for(var elt of elts){
        emptyField(elt);
    }
}

function emptyField(elt){
    $(elt).val('');
}

function toggleHamburger(){
    if($('.hamburger').hasClass('is-active')){
        $('.hamburger').removeClass('is-active');
    } else {
        $('.hamburger').addClass('is-active');
    }
}

$(document).ready(function() {

    $('.hamburger').on('click', function(){
        $('#menu-responsive li').css({opacity: 0.0, visibility: "visible"});     
        
        $('#menu-responsive').fadeToggle(200, function(){
            if($('#menu-responsive').is(':visible')){
                $('body').addClass('no-scroll')
                $('#menu-responsive li').each(function(i){
                    $(this).delay(i * 200).animate({opacity: 1.0}, {duration: 400, easing: 'easeInExpo'});             
                })
            } else {
                $('body').removeClass('no-scroll');
            }
        });

        toggleHamburger();
    });

    $('.link-mobile').on('click', function(){
        $('#menu-responsive').fadeToggle(200);
        $('body').removeClass('no-scroll');      
        toggleHamburger();
        
    })

    $('.js-scrollTo').on('click', function(){
    	var page = $(this).attr('href');
    	var speed = 800;
        if(page === '#home'){
            $('html, body').animate( { scrollTop: $(page).offset().top + (-65) }, speed );
        } else{
            $('html, body').animate( { scrollTop: $(page).offset().top + (-65) }, speed );
        }
    	return false;
    });

    $(window).resize(function(){
        if ($(window).innerWidth() > 1000){
            $('.hamburger').removeClass('is-active');
            $('#menu-responsive').hide();
        }
    });

    

    $(window).scroll(function(){
        var scrollTop = $(document).scrollTop();
        var anchors = $('body').find('.anchor');

        for (var i = 0; i < anchors.length; i++){
            if (scrollTop > $(anchors[i]).offset().top - 95 && scrollTop < $(anchors[i]).offset().top + $(anchors[i]).height() - 95) {
                $('nav .active').removeClass('active');
                $('nav a[href="#' + anchors[i].id + '"]').addClass('active');
            }
        }
    });

    $('#contact-form').submit(function(e){
        e.preventDefault();
        let prenom = $('#prenom');
        let nom = $('#nom');
        let email = $('#email');
        let message = $('#message');
        let url = Routing.generate('sendmail');
        $.ajax({
            method: "POST",
            url: url,
            data: {
                'nom': nom.val(),
                'prenom': prenom.val(),
                'email': email.val(),
                'message': message.val()
            },
            success: function(code, statut){
                $('#message_sent').html('Message envoyé').css('color', '#5cb85c');
                emptyFields(prenom, nom, email, message);
                setTimeout(function(){
                    $('#message_sent').html('');
                }, 10000);
            },
            error: function(resultat, statut, erreur){
                $('#message_sent').html('Erreur lors de l\'envoie du message').css('Color', '#FF9494');
                setTimeout(function(){
                    $('#message_sent').html('');
                }, 10000);
            }
        })
    });   
});
