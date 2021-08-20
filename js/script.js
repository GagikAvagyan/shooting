function playAudio(url) {
    new Audio(url).play();
}

let arr = ['first','second','third'];

for (let i = 0; i < arr.length; i++){
    $('.game_content').append(`<img src='./img/${i}.gif' id='${arr[i]}' class='birds'>`);
    arr[i] + 1
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











