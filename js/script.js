function playAudio(url) {
    new Audio(url).play();
}

function makeid(length) {
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}



let birdCount = 15;
let birdStyle = (id) => {
    const RandomTextAnimationName = makeid(10);
    return `
            <style>
                @keyframes ${RandomTextAnimationName} {
                    0%{
                        top: ${parseInt(Math.random() * 2)}00px ;
                    }
                    
                    40%{
                        top: ${parseInt(Math.random() * 4)}00px ;
                    }
                    
                    70%{
                        top: ${parseInt(Math.random() * 6)}00px ;
                    }
                   
                    100%{
                        left: 100% ;
                       top: ${parseInt(Math.random() * 7)}00px ;
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
    const RandomText = makeid(10);
    $('.game_content').append(`<img src="./img/${parseInt(Math.random() * 3)}.gif" id="${RandomText}" class="birds">`).append(birdStyle(RandomText));
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


    $('body').mousedown(function (e) {
        playAudio('./sound/jungal.mp3');
        let className = e.target.className;

        if(className === 'birds'){

            $('.birds').mousedown(function (){
                $(this).attr("src", "./img/kill.gif");
                $(this).css("animation-play-state", "paused");
                setTimeout(() => {
                    $(this).css('display', 'none');
                },2000)
                playAudio('./sound/hit_bird.mp3');
            })
        }
        playAudio('./sound/shot.mp3');

    });
}




function addBullet(){   // add Bullets
    for (let i = 0; i < 10; i++){
        $('.bullet_num').append('<img src="./img/bullet.png" class="bullets">')
    }
    clickNum = 0;

    $('body').mousedown(function (e) {
        $('.bullet_num img:last').remove();
        clickNum += 1;

        if(clickNum === 10){
            clickNum = 0;
            playAudio('./sound/gun-cocking.mp3');
            $('body').off('mousedown');
            $('img').off('mousedown');

            setTimeout(function (){
                addBullet();
                startGame()
            },1200)
        }
    });
}

$('.game_content').mousemove(function (e){
    let pageX = (e.pageX * -1 / 10);
    let pageY = (e.pageY * -1 / 10);
    $(this).css('background-position', pageX + 'px ' + pageY + 'px');
})