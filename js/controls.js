
function InitControls()
{
    function MouseScroll (event)
    {
        if ('wheelDelta' in event)  {
            if (level == 1)         {
                if (event.wheelDelta > 0)   elem.scrollLeft -= 80;
                else                        elem.scrollLeft += 80;
            }
        /*    else                    {
                if (event.wheelDelta > 0)   zoneHome.scrollTop -= 80;
                else                        zoneHome.scrollTop += 80;                 } */}
        else                        {
            if (level == 1)         {
                if ((-40 * event.detail) > 0)   elem.scrollLeft -= 80;
                else                            elem.scrollLeft += 80;
            }
        /*    else                   {
                if ((-40 * event.detail) > 0)   zoneHome.scrollTop -= 80;
                else                            zoneHome.scrollTop += 80;     }   */}
    }

    zoneHome.addEventListener("mousedown", function() {
        console.log("Votre bouton de souris est enfoncé.");
        }
    );
    zoneHome.addEventListener("mouseup", function() {
        console.log("Votre bouton de souris est relaché.");
        }
    );

    var elem = document.getElementById("wrapper");
    if (elem.addEventListener)
    {
        elem.addEventListener ("mousewheel", MouseScroll, false);         // all browsers except IE before version 9 - Internet Explorer, Opera, Google Chrome and Safari
        elem.addEventListener ("DOMMouseScroll", MouseScroll, false);     // Firefox
    }
    else    if (elem.attachEvent)   elem.attachEvent ("onmousewheel", MouseScroll);   // IE before version 9
}
