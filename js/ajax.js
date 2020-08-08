
var getHome = (function()                                   // Génération du home en pure AJAX, résultat différents selon si toutes les images ont été chargées.
{
    var FirstTime = false;

    return function(fromHouse)
    {
        level = 0;
        document.getElementById("contactContener").style.display = "none";
        document.getElementById("galeryContener").style.display = "none";
        document.getElementById("videoContener").style.display = "none";
        document.getElementById("homeIcon").style.visibility = "hidden";

        document.getElementById("wrapper").style.overflowX = "hidden";
        document.getElementById("wrapper").style.overflowY = "scroll";

        document.body.style.background = "#000";
        document.body.className='home page page-id-1762 page-template page-template-gallery_archive-php';

        if (FirstTime == false)
        {
            FirstTime = true;

            var displayImg = document.getElementsByClassName("portfolio_img");
            for (i=0 ; i < displayImg.length ; i++)
            {
                displayImg[i].src = "photos/" + directoryName[i].name + ".jpg";
            }
            document.getElementById("homeContener").style.display = "block";
            displayHomePictures(0);
        }
        else
        {
            document.getElementById("page_header_bg").style.opacity =  1;
            document.getElementById("homeContener").style.display = "block";
        }

        if (fromHouse)      document.getElementById("wrapper").scrollTop = ScrollLevel;
        else                document.getElementById("wrapper").scrollTop = 0;
    };
})();

function getGallery(number)
{
    if (level == 0) ScrollLevel = document.getElementById("wrapper").scrollTop;

    document.getElementById("contactContener").style.display = "none";
    document.getElementById("homeContener").style.display = "none";
    document.getElementById("videoContener").style.display = "none";
    document.getElementById("homeIcon").style.visibility = "visible";

    document.getElementById("wrapper").style.overflowX = "scroll";
    document.getElementById("wrapper").style.overflowY = "hidden";

    if (directoryName[number].state != true)
    {
        blockDownloadAgent = true;
        statusTXT.innerHTML = "Loading Gallery...";
        var nbrPicture = (number == (directoryName.length-1))?Images.length-directoryName[number].where:directoryName[number+1].where - directoryName[number].where;
        var box = new Array;
        var j = 0;

        for (i=0; i<nbrPicture; i++)
        {
            box[i] = new Image();
            box[i].onload = function(){ j++; };
            box[i].src = Images[directoryName[number].where + i];
        }
        function success()
        {
            if (j == nbrPicture)
            {
                clearInterval(galleyTestLoaded);
                blockDownloadAgent = false;
                setTimeout(function(){if (statusTXT.innerHTML == "loading Gallery...") statusTXT.innerHTML="";},1000);
            }
        }
        var galleyTestLoaded = setInterval(function(){success()},50);
    }

    if (level != 1)
    {
        level=1;
        document.body.className='galleryBodyStyle';              //   galleryBodyStyle single single-galleries postid-1735
        if (blockDownloadAgent == true)                  document.body.style.background = "#000";
    }

    var galeryCache = "<td class='gallery_image_wrapper'><img src='photos/"+directoryName[number].name+".jpg' alt='' class='img_size'/></td>";

    if (number != (directoryName.length -1))
    {
        for (var i=(directoryName[number].where); i<directoryName[number+1].where; i++)                                                         {
            galeryCache += "<td class='gallery_image_wrapper' style='display:none'><img src='"+Images[i]+"' alt='' class='img_size'/></td>";    }
    }
    else
    {
        for (var i=(directoryName[number].where); i<Images.length; i++)                                                                         {
            galeryCache += "<td class='gallery_image_wrapper' style='display:none'><img src='"+Images[i]+"' alt='' class='img_size'/></td>";    }
    }

    zoneGalery.innerHTML = "<style>.img_size{ height:"+window.innerHeight+"px;}</style>" + galeryCache;

    document.getElementById("page_header_bg").style.opacity =  0;
    document.getElementById("galeryContener").style.display = "block";

    document.getElementById("wrapper").scrollTop = 0;

    function renderVisibilityPicture()
    {
        if (blockDownloadAgent == true) return;
        var setVisibility = document.getElementsByClassName("gallery_image_wrapper");
        for (i=0; i<setVisibility.length; i++)     setVisibility[i].style.display = "";
        document.body.style.background = "#fff";
        clearInterval(renderInterval);
    }
    if (blockDownloadAgent == false)    renderVisibilityPicture();
    else var renderInterval = setInterval(function(){renderVisibilityPicture();},100);
}

var FIST = false;
function play_video()
{
    document.getElementById("galeryContener").style.display = "none";
    document.getElementById("homeContener").style.display = "none";
    document.getElementById("contactContener").style.display = "none";
    document.getElementById("page_header_bg").style.opacity =  0;
    document.getElementById("homeIcon").style.visibility = "visible";

    document.getElementById("wrapper").style.overflowX = "hidden";
    document.getElementById("wrapper").style.overflowY = "hidden";

    document.body.style.background = "#000";
    if (level != 2) {
        document.body.className='';
        level=2;    }

    if (FIST == false) {
        document.getElementById("video").src = "medias/rabbit.webm";
    FIST = true;       }
    document.getElementById("videoContener").style.display = "block";
    document.getElementById("wrapper").scrollTop = 0;
}

function contact()                                 // Ouveture de l'écran me contacter.
{
    document.getElementById("galeryContener").style.display = "none";
    document.getElementById("homeContener").style.display = "none";
    document.getElementById("videoContener").style.display = "none";
    document.getElementById("page_header_bg").style.opacity =  0;
    document.getElementById("homeIcon").style.visibility = "visible";

    document.getElementById("wrapper").style.overflowX = "hidden";
    document.getElementById("wrapper").style.overflowY = "scroll";

    document.body.style.background = "#000";
    if (level != 3)
    {
        document.body.className='';
        level=3;
    }
    play_music("medias/Tristan_und_Isolde.mp3",1);

    document.getElementById("contactContener").style.display = "block";
    document.getElementById("wrapper").scrollTop = 0;
}
