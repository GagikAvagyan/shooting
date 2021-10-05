let audio = true;
let defBirdCount = 15;
let bulletNumber = 25;

function playAudio(url) {
    if ( audio === true ){
        new Audio(url).play();
    }
}


function makeid(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}



function startBirdCount(){

    let birdCount = defBirdCount;

    let birdStyle = (id) => {
        const RandomTextAnimationName = makeid(15);
        return `
            <style>
                @keyframes ${RandomTextAnimationName} {
                    0%{
                        top: ${parseInt(Math.random() * 7)}00px ;
                    }
  
                    100%{
                        left: 100% ;
                       top:  ${parseInt(Math.random() * 7)}00px  ;
                    }
                }
                
                #${id}{
                     animation: ${RandomTextAnimationName} ${Math.ceil(Math.random() * 8)}s infinite;
                     animation-delay: ${parseInt(Math.random() * 5)}s;
                }
            </style>
        `
    }

    for (let i = 0; i < birdCount; i++){
        const RandomText = makeid(15);
        $('.game_content').append(`<img src="./img/${parseInt(Math.random() * 3)}.gif" id="${RandomText}" class="birds">`).append(birdStyle(RandomText));
    }
}



function startGame(){

    $('body').on('mousemove', function (e){ // for move gun
        let y = e.clientY;
        let x = e.clientX - 65;

         if (e.clientY > 0 && e.clientY < 300){
             y = 5;
         }else if (e.clientY > 300 && e.clientY < 500){
             y = 4
         }else if (e.clientY > 500 && e.clientY < 600){
             y = 2
         }else{
             y = 0
         }

         if ( x < 200 ){
             x = 200;
         } else if (x > 1200){
             x = 1200
         }

        $('.player_hand').css({
            transform: `scaleY(1.${y})`,
            left: `${x}px`
        })

    })

    $('body').mousedown(function (e) { // for kill birds
        playAudio('./sound/jungal.mp3');
        let className = e.target.className;

        if(className === 'birds'){

            $('.birds').mousedown(function (){
                $(this).attr("src", "./img/kill.gif");
                $(this).css("animation-play-state", "paused");
                $(this).remove();
                setTimeout(() => {
                    $(this).css('display', 'none');
                },2000)
                playAudio('./sound/hit_bird.mp3');
            })
        }
        playAudio('./sound/shot.mp3');

    });
}

let maxClick = 0;

function addBullet(){   // add Bullets

    for (let i = 0; i < 10; i++){ // add Bullets images
        $('.bullet_num').append('<img src="./img/bullet.png" class="bullets">')
    }

    let clickNum = 0;
    $('body').mousedown(function (e) {
        $('.bullet_num img:last').remove();
        clickNum += 1;
        maxClick += 1;
        $('.bullet_numbers').text(maxClick)

        changeBulletColor()

        if ( maxClick < bulletNumber  && clickNum === 10 ){

            clickNum = 0;
            playAudio('./sound/gun-cocking.mp3');
            $('body').off('mousedown');
            $('img').off('mousedown');

            setTimeout(function (){
                addBullet();
                startGame()
            },1200)

        }else if (maxClick >= bulletNumber) {
            $('body').off('mousedown');
            $('img').off('mousedown');
            gameFinished()
        }
    });
}

function changeBulletColor(){ // for change bullet color
    maxClick > bulletNumber -10 ?  $('.bullet_numbers').css('color','red') : $('.bullet_numbers').css('color','black') ;
}

$('.game_content').mousemove(function (e){ // move page background
    let pageX = (e.pageX * -1 / 10);
    let pageY = (e.pageY * -1 / 10);
    $(this).css('background-position', pageX + 'px ' + pageY + 'px');
})

$('.bullet_num').mousedown(function (e){ // start move bullets block
    $('body').mousemove(function (e){
       $('.bullet_num').css({
           left: e.clientX + 'px',
           top: e.clientY + 'px'
       });
   });
})

$('.bullet_num').mouseup(function (){ // stop move bullets block
    $('body').off('mousemove')
});

$('.audio-icon').click(function (){ // for audio icon and sound
    $('#audio-icon-add').toggleClass('fas fa-volume-up  fas fa-volume-mute');
    if (audio === true){
        audio = false;
        $('#audio-icon-add').css('color','red')
    }else {
        audio = true;
        $('#audio-icon-add').css('color','#000')
    }
})


$('.afterGame').hide();
$('.afterGameCover').hide()

function gameFinished(){ // for finish game-
    maxClick = 0;
    changeBulletColor();
    $('.bullet_numbers').text(0);
    $('.bullet_num img').remove();
    $('.afterGameCover').show();
    $('.afterGame').show();
    $('body').css("cursor", 'default');
    $('.game_content').css({ filter: 'blur(4px)' });
}

$('.playAgain').click(function (){
    $('.birds').remove()
    $('.game_content style').remove()
    startGameFunc()
    $('.afterGame').hide();
    $('.afterGameCover').hide()
    $('.game_content').css({ filter: 'blur(0px)' });
})