let cel = "./img/cel1.png", user;

$('.chooseImg').click(function (){ // for background images
    let bg = $(this).attr('src',);
    $('.before_game').css("background-image", `url('${bg}')`);
    $('.game_content').css("background-image", `url('${bg}')`);
});

$('.ChooseVis').click(function (){ // for cel image
    cel = $(this).attr('src',);
});

$('.option').hide(); // for level
$('#Level').click(function (){
    $('.option').toggle( "normal");
});

$('.StartGame').click(function (){ // start game button
    $('.game_content').show();
    $('.before_game').hide();
    startGame();
    addBullet();
    $('body').css("cursor", `url('${cel}'),auto`);
});






$('.loginButton').click( function (){
    openLoginForm()
})

$('.registerButton').click( function (){
    openRegisterForm()
})

function openLoginForm(){
    $('.box1, .box2').hide()
    $('.LoginRegisterButton').hide();
    $('.before_game').css({ filter: 'blur(6px)' });
    $('.login-form').show()
}
function openRegisterForm(){
    $('.box1, .box2').hide()
    $('.LoginRegisterButton').hide();
    $('.before_game').css({ filter: 'blur(6px)' });
    $('.register-section').show();
}

function closeLoginForm(){
    $('.box1, .box2').show()
    $('.before_game').css({ filter: 'blur(0px)' });
    $('.login-form').hide()
}

function closeRegisterForm(){
    $('.box1, .box2').show()
    $('.before_game').css({
        filter: 'blur(0px)',
    });
    $('.register-section').hide();
}

$('.register-section').hide();
$('.login-form').hide();

$('body').click(function (e) {
    if($(e.target).is('.box3')){
        closeLoginForm()
        closeRegisterForm()
        $('.LoginRegisterButton').show();
    }
});