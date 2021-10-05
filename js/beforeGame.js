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
$('.option').click(function (){  // addActiveClass
    $('.option').removeClass('active')
    $(this).addClass('active')
})
$('.Low').click(function (){   //choose level
    defBirdCount = 15;
    bulletNumber = 25;
});
$('.Middle').click(function (){   //choose level
    defBirdCount = 25;
    bulletNumber = 45;
});
$('.High').click(function (){   //choose level
    defBirdCount = 40;
    bulletNumber = 55;
});


function startGameFunc(){ // start game function
    $('.game_content').show();
    $('.before_game').hide();
    startGame();
    addBullet();
    $('body').css("cursor", `url('${cel}'),auto`);
    startBirdCount()
}

$('.StartGame').click(function (){ // start game button
    startGameFunc()
});


$('.loginButton').click( function (){ // open login form
    openLoginForm()
})

$('.registerButton').click( function (){ // open register form
    openRegisterForm()
})

function openLoginForm(){  // open Login Form
    $('.box1, .box2, .box3').hide()
    $('.LoginRegisterButton').hide();
    $('.before_game').css({ filter: 'blur(6px)' });
    $('.login-form').show()
}
function openRegisterForm(){ // open Register Form
    $('.box1, .box2, .box3').hide()
    $('.LoginRegisterButton').hide();
    $('.before_game').css({ filter: 'blur(6px)' });
    $('.register-section').show();
}

function closeLoginForm(){ //close Login Form
    $('.box1, .box2, .box3').show()
    $('.before_game').css({ filter: 'blur(0px)' });
    $('.login-form').hide()
}

function closeRegisterForm(){ // close Register Form
    $('.box1, .box2, .box3').show()
    $('.before_game').css({
        filter: 'blur(0px)',
    });
    $('.register-section').hide();
}

$('.register-section').hide();
$('.login-form').hide();

$('body').click(function (e) {
    if($(e.target).is('.before_game')){
        closeLoginForm()
        closeRegisterForm()
        $('.LoginRegisterButton').show();
    }
});
