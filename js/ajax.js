let sangTitle =[];

$.ajax({
    url: `https://torgomyan.site/lovsound/api/recusts/get-all-tracks.php`,
    method: 'get',
    dataType: 'json',
    success: function (resp){

        for(let i = 0; i < resp.length; i++){
            sangTitle.push(resp[i].title);
        }

        let sound = resp[0].folder_name;
        let name = resp[0].name
        $('.sounde').append(`<source src="https://lovsound.com/uploads/tracks/${sound}/${name}"/>`);

        loop2:
        for (let i = 0; i < sangTitle.length; i++){
            $('#myUL').append(`<li><a href="#" class="choosedSang">${sangTitle[i]}</a></li>`);
            if(i > 5){
                break loop2
            }
        }

        addClick()
    },
    error: function (resp){
        alert('bad')
    }
})

let choosedSangtitle;

function addClick(){
    $('.choosedSang').click(function (e){
        e.preventDefault()
        choosedSangtitle = $(this).text()
        $('#myInput').val(choosedSangtitle)

        $.ajax({
            url: `https://torgomyan.site/lovsound/api/recusts/get-all-tracks.php`,
            method: 'get',
            dataType: 'json',
            success: function (resp){
                for(let i = 0; i <resp.length; i++){
                    if (resp[i].title == choosedSangtitle){
                        alert('ok')
                        let sound = resp[i].folder_name;
                        let name = resp[i].name;
                        $('.audioBlock').empty();
                        $('.audioBlock').append(`<audio controls className="sounde">
                                                    <source src="https://lovsound.com/uploads/tracks/${sound}/${name}"/>
                                                </audio>`)
                    }
                }
            },
            error: function (resp){
                alert('error')
            }
        })
    })
}


function myFunction() {

    let input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}
