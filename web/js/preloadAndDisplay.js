
var displayHomePictures = (function()
{
    // Enoncé des variables statiques.............
    var i;
    var slide = (function()
    {
        // Enoncé des variables statiques.............
        var pictureMap;
        var interval = setInterval(function()
        {                                                                                    console.log(pictureMap);
            if (!pictureMap || pictureMap.length == 0 || level != 0)     return;

            if (i == 0 || i >= pictureMap.length)
            {
                i=0;                                                                         console.log("EXCEPTION value of i ="+i);
                pictureMap[pictureMap.length-1].style.opacity = 0;
            }
            else    pictureMap[(i-1)].style.opacity = 0;

            pictureMap[i].style.position = "absolute";
            pictureMap[i].style.opacity = 1;
            i++;
        },2000);

        return function()
        {
            jQuery('.wall_thumbnail').hover(function()
            {                                                                                console.log("slideAll hover detecté");
                jQuery(this).find('.gallery_img_slides').addClass('active');

                pictureMap = (this).getElementsByTagName("li");
                for (z=0; z<pictureMap.length; z++)         /* Fixation d'un bug firefox, le slide définit illico en "absolute" ralentit tout... */
                {
                    pictureMap[z].style.opacity = 0;
                    i=0;
                }
                                                                                            console.log("slide all - picture-map:"+ pictureMap+" of "+pictureMap.length);
            }, function()
            {
                jQuery(this).find('.gallery_img_slides').removeClass('active');              console.log("Déselection de la galerie courante");
                selectedGalery = "";

                for (z=0; z<pictureMap.length; z++) pictureMap[z].style.position="relative";
                pictureMap = "";
            });
        };
    })();

    return function()
    {                                                                                       console.log("DisplayHome State I: ENTER");
        jQuery(document).ready(function() {
            "use strict";

            var windowWidth = jQuery(window).width();
            var $window = jQuery(window);
            var jQueryblogcontainer = jQuery('#blog_grid_wrapper');
            var blogGridColumn = 2;

            function reBlogLayout() {
                var currentContainerWidth = jQueryblogcontainer.width();
                if (jQueryblogcontainer.hasClass('vertical')) {
                    var blogGridColumn = 1;
                } else {
                    var blogGridColumn = 2;
                    if (jQuery(window).width() < 480) {
                        blogGridColumn = 1;
                    } else if (jQuery(window).width() >= 480 && jQuery(window).width() < 1400) {
                        blogGridColumn = 2;
                    } else if (jQuery(window).width() >= 1400 && jQuery(window).width() < 1900) {
                        blogGridColumn = 3;
                    } else if (jQuery(window).width() >= 1900 && jQuery(window).width() < 2000) {
                        blogGridColumn = 4;
                    } else {
                        blogGridColumn = 5;
                    }
                }
                var masonryOpts = {
                    columnWidth: parseInt(currentContainerWidth / blogGridColumn)
                };
                jQueryblogcontainer.isotope({
                    resizable: false,
                    itemSelector: '.post.type-post',
                    masonry: masonryOpts
                }).isotope();
            }                                                                               console.log("DisplayHome State II: Pré-rebloging");
            reBlogLayout();                                                                 console.log("DisplayHome State III: rebloging done, configure visibility...");

            jQuery('#blog_grid_wrapper').children('.post.type-post').each(function(index, value) {
                jQuery(this).addClass('animated' + (index + 1));
                jQuery(this).addClass('visible');
            });                                                                             console.log("DisplayHome State IV: Visibility OK, configure smart-resize");

            $window.smartresize(reBlogLayout);                                              console.log("DisplayHome State V: smart-resize SUCCESS");

            level = 0;                                                                      console.log("DisplayHome State VI: Appel de slide()");
            slide();                                                                        console.log("DisplayHome State VII: Slide() success exit.");
        });
    };
 })();


