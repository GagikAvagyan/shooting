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

$('.sign-up').click( function (){
    openSignInForm()
})

$('.close-form').click(function (){
    closeSignInForm()
});

function openSignInForm(){
    $('.before_game').css({
        filter: 'blur(8px)',
    });
    $('.sign-up-form').show()
}

function closeSignInForm(){
    $('.before_game').css({
        filter: 'blur(0px)',
    });
    $('.sign-up-form').hide()
}

$('.sign-up-button').click(function (){
     user = $('.form-name').val() + ' ' +  $('.form-email').val()
     localStorage.setItem("User", user);
     closeSignInForm()
});

user = localStorage.getItem('User');

if (user === null ){
    setTimeout(function (){
        if($('.before_game').css('display') !== 'none'){
            openSignInForm();
        }
    },2000)
}
