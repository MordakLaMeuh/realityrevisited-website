function loadAllStuff()
{                                                                                    console.log("loadAllStuff() I   : Premier contact.")
    var alternateStatusTXT = (function()
    {
        var elmt;
        var interval;
        var state = false;
        return function(idName)
        {
            console.log("call Me !");
            if (elmt) if (elmt.id == idName)  { clearInterval(interval); elmt = null; return; }
            elmt = document.getElementById(idName);
            interval = setInterval(function(){
                if (state) { state=false; elmt.style.opacity = 0; }
                else       { state=true;  elmt.style.opacity = 1; }
                },500);
        };
    })();
    statusTXT.innerHTML = "initialisation en cours...";
    alternateStatusTXT("statusTXT");

    var images = new Array();

    var logoLoaded = false;
    var backgroundLoaded = false;

    images[0] = new Image();
    images[0].onload = function(){ logoLoaded = true; };
    images[0].src = logoIMG;
    images[1] = new Image();
    images[1].onload = function(){ backgroundLoaded = true; };
    images[1].src = mainPicture;
    var colomn = 2;

    function displayHome()
    {                                                                                    console.log("displayHome() I   - Wait bases pictures loaded for begining...")
        if (logoLoaded == false || backgroundLoaded == false) return;                    console.log("displayHome() II  - Background picture and logo loaded.");

        var backgroundDIV = document.getElementById("background_picture");
        backgroundDIV.innerHTML = "<div id='page_header_bg' style='background-image:url("+mainPicture+");'></div>";

        clearInterval(vignettesInterval);

        function massiveHomeDisplay(comment,directoryPath)
        {
            var picturesLoaded = 0;
            var nbrPicture = directoryPath.length;

            for (i = 0; i < nbrPicture; i++, colomn++)
            {
                images[colomn] = new Image();
                images[colomn].onload = function(){ picturesLoaded++; };
                images[colomn].src = "photos/"+directoryPath[i].name+".jpg";
            }

            function checkCompletePreload()
            {
                if (picturesLoaded == (nbrPicture))
                {
                    clearInterval(controlHome);
                    getHome(0);
                    startup_tools();
                    setTimeout(function(){stepByStep("Chargement des images supplémentaires",Images);},1000);
                }
                else    statusTXT.innerHTML = comment + " " + Math.round((picturesLoaded*100)/nbrPicture) +"%";
            }
            var controlHome = setInterval(function(){checkCompletePreload();}, 100);
        }
        massiveHomeDisplay("Chargement des modules principaux",directoryName);
    }

    function stepByStep(comment,metaPicture)
    {
        var currentPictureArray = colomn;
        var stream = new Array();
        var imagesDOM = new Array();

        imagesDOM[0] = document.getElementById(directoryName[0].name);
        stream[0] = "";

        var i = 0;
        var commentaire = comment;

        nbrPicture = (metaPicture.length);
        var totalPicture = (nbrPicture + directoryName.length + 1);

        function galleryComplete()
        {
            console.log("Appel de la fonction galleryComplete() pour directoryNumber ="+directoryNumber);
                                                                                    console.log("Gallery Complete :"+stream[directoryNumber]);
            imagesDOM[directoryNumber].innerHTML = stream[directoryNumber];         console.log("activation:"+directoryNumber+":"+directoryName[directoryNumber].name);

            directoryName[directoryNumber].state = true;
            directoryNumber++;
            if (!allLoaded)                         imagesDOM[directoryNumber] = document.getElementById(directoryName[directoryNumber].name);
        }

        function successDownloaded()
        {
            console.log(images[currentPictureArray].src + ":" + directoryNumber + ":" + directoryName[directoryNumber].name);

            if (currentPictureArray == totalPicture)
            {
                allLoaded = true;
                stream[directoryNumber] += "<li><img src='"+images[currentPictureArray].src+"' alt='' class='static'/></li>\n";
                galleryComplete();
                console.log("Success of downloading all Images");
                statusTXT.innerHTML =  "";
                alternateStatusTXT("statusTXT");
            }
            else if (images[currentPictureArray].src.indexOf(directoryName[directoryNumber].name) > 0)  stream[directoryNumber] += "<li><img src='"+images[currentPictureArray].src+"' alt='' class='static'/></li>\n";
            else
            {
                stream[directoryNumber+1] = "<li><img src='"+images[currentPictureArray].src+"' alt='' class='static'/></li>\n";
                galleryComplete();
            }
            currentPictureArray++;
        }

        function preloadPicture(command)
        {
            var priority = command;
            var j = true;
            function IRQ()
            {
                if (j == false || blockDownloadAgent == true) return;
                j=false;
                if (i == nbrPicture)
                {
                    clearInterval(controlPicture);
                    console.log("destruction de sous-routine de téléchargement:");
                }
                else
                {
                    images[colomn] = new Image();
                    images[colomn].onload = function(){ j=true; successDownloaded();};
                    images[colomn].src = metaPicture[i];
                    console.log("start downloaded:"+images[colomn].src);
                    colomn++;   i++;
                    if (priority == 1) statusTXT.innerHTML = commentaire + " " + Math.round((i*100)/nbrPicture) +"%";
                }
            }
            var controlPicture = setInterval(function(){IRQ();}, 100);
        }

        preloadPicture(1);
        preloadPicture(0);
        preloadPicture(0);
        preloadPicture(0);
        preloadPicture(0);
        preloadPicture(0);
    }
    var vignettesInterval = setInterval(function(){displayHome();}, 50);
}
