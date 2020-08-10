
var play_music = (function()
{
    var activeAudio = false;
    var music = document.createElement("Audio");

    return function(src,volume)
    {
        if (activeAudio) return;
        music.src = src;
        music.volume = volume;
        music.play();
        activeAudio = true;
    };
})();
