//add pre-made buttons to the DOM
function addPremadeButtons(){
    var btns = ['surprised', 'disgruntled', 'happy'];
    btns.forEach(addButton);
}

//onSubmit of the form
function submitFunc(){
    event.preventDefault();
    var searchTerm = $('#searchBar').val().trim()
    
    addButton(searchTerm);
}
//add button to the DOM
function addButton(term){
    if(term){
        var newBtn = $('<button>')
        .text(term)
        .addClass('btn')
        .attr('data-name', term)
        $('#buttons').append(newBtn);
    }
}

//when a button is clicked, fetch gifs
function buttonClick(){

    var searchTerm = $(this).attr('data-name');
    var limit = 10;
    var url = "https://api.giphy.com/v1/gifs/search?q="+ searchTerm + "&api_key=SUKDMODfO0RfDFQmemfkqV6EeKBCtnjK&rating=pg-13&limit=" + limit
    $.get(url).done(function(response){
        console.log(response);
        updateDom(response);
    })
}

//update DOM with gifs
function updateDom(response){
    $('#gifs').empty();
    var objArray = response.data
    objArray.forEach(function(gif){

        var imgSrc = gif.images.fixed_height_still.url;
        var newDiv = $('<div>')
        var overlay = $('<div class="overlay">')
        
        overlay.append('<div class=play-pause> &#9658 </div>')
        .append('<div class=rating>' + gif.rating.toUpperCase() + '</div>');
    
        newDiv.addClass('gif')
        .attr('data-playing', '')
        .attr('data-still', imgSrc)
        .attr('data-play', gif.images.fixed_height.url)
        .append('<img src="' + imgSrc + '"/>')
        .append(overlay); //change to fixed_height onClick
        
        $('#gifs').append(newDiv);
    }
        
    );
}

//play or pause gifs when clicked
function gifClick(){
    var gif = $(this).children('img');
    var isPlaying = $(this).attr('data-playing');
    var play = $(this).attr('data-play');
    var stop = $(this).attr('data-still')
    if(isPlaying){
        //stop gif
        $(this).attr('data-playing', '');
        gif.attr('src', stop)
    }else{
        //play gif
        $(this).attr('data-playing', 'playing');
        gif.attr('src', play);
    }
    
}

function showOverlay(){ //this will refer to the gif clicked
    var gif = $(this);
    gif.children('.overlay').css('visibility', 'visible');
    gif.children('img').css('opacity', 0.3);
    showPlayPause(gif);
}

function hideOverlay(){
    $(this).children('.overlay').css('visibility', 'hidden');
    $(this).children('img').css('opacity', 1);
}

//determines whether overlay will have a play or stop icon
function showPlayPause(gif){
    var play = '\u25B6';
    var stop = '\u25A0';
    if(gif.attr('data-playing')){
        gif.children('.overlay').children('.play-pause').text(stop)
    }else{
        gif.children('.overlay').children('.play-pause').text(play)
    }
}

addPremadeButtons();

$('#buttons').on('click', '.btn', buttonClick);
$('#gifs').on('click', '.gif', gifClick);

//overlay events
$('#gifs').on('click', '.gif', hideOverlay);
$('#gifs').on('mouseenter', '.gif', showOverlay);
$('#gifs').on('mouseleave', '.gif', hideOverlay);