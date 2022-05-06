/** GENERATED: Mon Apr 18 03:39:14 GMT 2022 **/
/** GENERATED: Mon Sep 12 10:24:30 PDT 2016 **/
var isMobile = false;

(function ($) {
    var isTouch = true;
    if ($("html").hasClass("no-touch")) {
        isTouch = false;
    }

	var mobileApple = /iP(od|ad|hone)/i.test(navigator.userAgent),
        ipod = /iPod/i.test(navigator.userAgent),
        iphone = /iPhone/i.test(navigator.userAgent),
        ipad = /iPad/i.test(navigator.userAgent),
        android = /Android/i.test(navigator.userAgent),
        palm = /webOS/i.test(navigator.userAgent),
        blackberry = /BlackBerry/i.test(navigator.userAgent);

    // set the html5 flags for the video player
    $.each([mobileApple,android,palm,blackberry], function(i,device) {
        if(!!device) {
            isMobile = true;
        }
    });


    var imgOffset = (isMobile) ? '220%' : '120%';

    /***************  IMAGE WAYPOINTS  *******************/
	jQuery('img').waypoint(function (event, direction) {
	    $this = jQuery(this);
	    if (typeof $this.attr("src") == "undefined" && typeof $this.data("src") != "undefined") {
	        var src = $this.data("src");
            if (typeof $this.data("mobilesrc") != "undefined" && isMobile) {
                var src = $this.data("mobilesrc");
            }

            $this.attr("src", src);
	        $this.data("src", "");
	    }
	}, {
	    offset: imgOffset
	});


    /****************************************************************/
    /*******************************************/
    //chapters
    var chapters = $(".chapter-location");
    var chapter_links = $(".nav-chapters li a");
	var chapterOffset = (window.location.href.indexOf('grantland.com') > -1) ? 200 : 0;
    //custom use for map and offset
    $('.chapter-location').waypoint(function (event, direction) {
        var active_section;
        active_section = $(this);
        var active_link;

		//handle headline still displaying when scrolling
		if (direction === "down" &&  $(this).attr("id") =="section-1") {
			$("#main-header hgroup").not(".header2").hide();
		}
		else if (direction === "up" && $(this).attr("id") =="section-2"){
			$("#main-header hgroup").not(".header2").show();
		}
		else if (direction === "up" && $(this).attr("id") =="section-1"){
			$("#main-header hgroup").not(".header2").show();
		}


        if (direction === "up") {
            active_link = $('.nav-chapters li a[href="#' + $(this).attr("id") + '"]');
        } else {
            active_link = $('.nav-chapters li a[href="#' + active_section.attr("id") + '"]');
        }

        chapter_links.parent().removeClass("selected");
        if (active_link)
            active_link.parent().addClass("selected");

    }, {
        offset: chapterOffset
    });


    // if a anchortag exists in url - scroll after the previous image has been lazy loaded
    function checkPrevImgLoadedForScrollTo(anchorTag) {
        $img = $(anchorTag).closest("div.container").prev().find('img');
        if($img.attr("src") != "") {
            $.scrollTo(
                anchorTag, {
                duration: 2000
            });
        }
        $img.load(function() {
            $.scrollTo(
                anchorTag, {
                duration: 2000
            });
        });
        $.waypoints('refresh');
    }
    checkPrevImgLoadedForScrollTo('div.chapter-location[title='+window.location.hash.replace("#", "").replace("!","")+']');


    //only apply scrollTo for desktop
    if (isTouch == false) {
        /*
        chapter_links.live("click", function (event) {
            var navParent = $(this).parent();
            $.scrollTo(
                $(this).attr("href"), {
                duration: 2000,
                offset: {
                    'left': 0,
                    'top': -0.15 * $(window).height()
                }, //updated to add height of toolbar and map 200
                onAfter: function () {
                    $(".nav-chapters li").removeClass("selected");
                    $(navParent).addClass("selected");
                }
            });
        });
        */

        chapter_links.live("click", function (event) {
            setTimeout(function() {
                checkPrevImgLoadedForScrollTo('div.chapter-location[title='+window.location.hash.replace("#", "").replace("!","")+']');
            }, 1000);
        });
    }
    /*******************************************/

    /* map hotspots clicks						*/
    //only apply scrollTo for desktop
    if (isTouch == false) {
        $(".map-hotspots a").click(function (event) {
            $.scrollTo(
                $(this).attr("href"), {
                duration: 2000 //,
                //offset: { 'left':0, 'top':-0.15*$(window).height()-200 }	//updated to add height of toolbar and map 200
            });
        });
    }

    $('span.citation').mouseenter(function (event) {
        $(this).parent().prevAll(".glossary-"+$(this).attr('id').replace('refglossary-', '')).animate({
            opacity: 0.2
        }, 300).delay(100).animate({
            opacity: 1
        }, 500);
        /*
        $(this).parent().prev(".glossary").animate({
            opacity: 0.2
        }, 300).delay(100).animate({
            opacity: 1
        }, 500);
        */
        event.preventDefault();
    });

    window.onload = function () {
        skrollr.init({
            forceHeight: false
        });
    }

    conditionizr({
        scriptSrc: 'https://a.espncdn.com/prod/scripts/plugins/',
        touch: {
            scripts: true,
            styles: false,
            classes: false,
            customScript: false
        }
    });


    jQuery.getScript('https://a.espncdn.com/combiner/c/69?js=jquery.sharetools.longform.js', function () {
        canonical = jQuery('link[rel=canonical]').attr('href');
        jQuery('.mod-page-actions').sharetools(canonical);
    });


    jQuery('.icon-gallery').click(function (e) {
        e.preventDefault();
        var $this = jQuery(this),
            $parent = $this.parents('.image-container'),
            galleryId = parseInt($parent.attr('id').replace('gallery-', ''), 10),
            url = 'https://espn.go.com/espn/photos/gallery?id=' + galleryId + '&overrideCss=pagetype/otl/overlay-gallery.css&nocache3'

      	if (isMobile) {
      		url = url + '&version=mobile';
      		window.open(url,'_blank');
      	} else {
      		var html = '<div id="photo-gallery-overlay">';
    	    html += '<div class="iframe-container">';
    	    html += '<a class="close" href="#">Close</a>';
    	    html += '<iframe src="' + url + '" style="width:100%;"></iframe>';
    	    html += '</div>';
    	    html += '</div>';

    	    jQuery('body').append(html);
    	    jQuery("#photo-gallery-overlay .close").click(function (e) {
    	        e.preventDefault();
    	        jQuery("#photo-gallery-overlay").remove();
    	    });
      	}


    });

    jQuery('.icon-magnify, .elastislide-list li').click(function (e) {
        e.preventDefault();
        var $this = jQuery(this),
            $parent = $this.parents('.image-container');

            if($parent.length == 0) {
                url = $this.attr('href');
            } else {
                photoId = parseInt($parent.attr('id').replace('photo-', ''), 10),
                url = 'https://espn.go.com/espn/photos/gallery?id=' + photoId + '&overrideCss=pagetype/otl/overlay-enlarge.css';
            }

        if (isMobile) {
            url = url + '&version=mobile';
            window.open(url,'_blank');
        } else {
            var html = '<div id="photo-gallery-overlay">';
            html += '<div class="iframe-container">';
            html += '<a class="close" href="#">Close</a>';
            html += '<iframe src="' + url + '" style="width:100%;"></iframe>';
            html += '</div>';
            html += '</div>';

            jQuery('body').append(html);
            jQuery("#photo-gallery-overlay .close").click(function (e) {
                e.preventDefault();
                jQuery("#photo-gallery-overlay").remove();
            });
        }
    });

    var players = {}, loadedPlayers = {};
    var $videos = jQuery('body').find('.embed-video'),
        $podcasts = jQuery('body').find('.embed-podcast'),
        $others = jQuery('body').find('.embed-other');

    // let's find some videos
    if ($videos.length > 0) {
        $videos.each(function () {
            var $thisVideo = jQuery(this),
                videoElementId = $thisVideo.attr('id'),
                videoId = parseInt(videoElementId.replace('video-', ''), 10);
            loadVideoIframe(videoElementId, videoId);
        });
    }
    // let's find some podcasts
    if ($podcasts.length > 0) {
        $podcasts.each(function () {
            var $thisPodcast = jQuery(this),
                podcastElementId = $thisPodcast.attr('id'),
                podcastUrl = $thisPodcast.attr('href');
            loadPodcast(podcastElementId, podcastUrl);
        });
    }

    function loadVideoIframe(videoElementId, videoId) {
        var a = navigator.userAgent,
            $videoTriggers = jQuery('#' + videoElementId + ', #' + videoElementId + ' .video-icon');
            $video = jQuery('#' + videoElementId),
            subscriptions = [];

        if ((a.match(/Mobile/i))) {
            var hostname = (/(dev2?\.|qa\.|sb\.|localhost|\.local)/).test(document.location.host) ? 'www.espnqa.com' : 'www.espn.com';
            var videoUrl = 'https://' + hostname + '/core/video/iframe?id=' + videoId;
            if ( window.ad_site && window.ad_zone ) {
                videoUrl += '&adLevel=' + window.ad_site + '/' + window.ad_zone;
            }

            $video.replaceWith('<div style="background:black;position:relative; padding-bottom: 56.25%; height:0"><iframe style="position:absolute; width:100%; height:100%; top:0; left:0;" src="' + videoUrl + '"></iframe></div>');
	} else {
            // expose the video player element when it's ready
            espn.video.subscribe("espn.video.ready", function () {
                var videoElId = espn.video.player && espn.video.player.embeddedPlayerId || videoElementId;
                players[videoElementId] = document.getElementById(videoElId);
            });

            jQuery(window).resize(function () {
                width = jQuery('#' + videoElementId).parent().width();
                height = width * (9 / 16);
                try {
                    players[videoElementId].style.width = width + "px";
                    players[videoElementId].style.height = height + "px";
                } catch (e) {}
            });

            var playETicketVideo = function (e) {
                var targetEmbedEl = jQuery("#embed" + videoElementId);
                var videoIcon = targetEmbedEl.parent().parent().find('.video-icon');

                espn.video.remove();
                e.preventDefault();
                e.stopPropagation();
                if(jQuery('#' + videoElementId).find('img').length) {
                    $imgTag = jQuery('#' + videoElementId).find('img');
                    videoWidth = $imgTag.height() * (16/9);
                    videoHeight = $imgTag.height();
                } else if(jQuery('#' + videoElementId).parent().hasClass('video-container-wide')) {
                    //videoWidth = jQuery('#' + videoElementId).parent().width();
                    videoHeight = jQuery('#' + videoElementId).parent().height();
                    videoWidth = videoHeight * (16/9);
                } else {
                    videoWidth = jQuery('#' + videoElementId).parent().width();
                    videoHeight = videoWidth * (9 / 16);
                }

				videoWidth = Math.round(videoWidth);

                subscriptions.push(espn.video.subscribe("espn.video.play", function() {
                    jQuery('#' + videoElementId).parent().siblings('hgroup').show();
                    jQuery('#embed'+videoElementId+'_MobileContainer').show(); // mobile html5 video player fix
                    videoIcon.attr('class', 'video-icon');
                    if (isMobile) {
                        jQuery('#' + videoElementId).parent().find('a.embed-video').hide();
                    } else {
                        jQuery('#' + videoElementId).parent().find('a.embed-video').css('visibility', 'hidden');
                    }
                }));

                // the "video bundle" removes the original target, and when you unembed
                // the player, a cloned target is returned
                subscriptions.push(espn.video.subscribe("espn.video.complete", function() {
                    jQuery('#' + videoElementId).parent().siblings('hgroup').show();
                    jQuery('#embed'+videoElementId+'_MobileContainer').hide(); // mobile html5 video player fix
                    videoIcon.attr('class', 'video-icon');
                    if (isMobile) {
                        jQuery('#' + videoElementId).parent().find('a.embed-video').show();
                    } else {
                        jQuery('#' + videoElementId).parent().find('a.embed-video').css('visibility', 'visible');
                    }

                    jQuery('#' + videoElementId).after(targetEmbedEl);
                    jQuery('#' + videoElementId).parent().find('a.embed-video').each(function () {
                        var $thisVideo = jQuery(this),
                            videoElementId = $thisVideo.attr('id'),
                            videoId = parseInt(videoElementId.replace('video-', ''), 10);
                        loadVideoIframe(videoElementId, videoId);
                    });

                    if(subscriptions.length) {
                        for(var s = 0; s < subscriptions.length; s++) {
                            espn.video.unsubscribe(subscriptions[s]);
                        }
                    }
                    subscriptions = [];
                }));

                /*subscriptions.push(espn.video.subscribe("espn.video.pause", function() {
                    jQuery('#' + videoElementId).parent().siblings('hgroup').show();
                    jQuery('#embed'+videoElementId+'_MobileContainer').hide(); // mobile html5 video player fix
                    videoIcon.attr('class', 'video-icon');
                    if (isMobile) {
                        jQuery('#' + videoElementId).parent().find('a.embed-video').show();
                    } else {
                        jQuery('#' + videoElementId).parent().find('a.embed-video').css('visibility', 'visible');
                    }
                }));*/

                // check if player is already loaded on the page - if it isn't embed
                espn.video.embed({
                    "id": videoId,
                    "cms": "espn",
                    "width": videoWidth,
                    "height": videoHeight,
                    "targetReplaceId": "embed"+videoElementId,
                    "player": "responsive12",
                    "autostart": true,
                    "endCard": false
                });

                jQuery('#' + videoElementId).parent().siblings('hgroup').hide();
                if (isMobile) {
                    videoIcon.attr('class', 'video-icon2');
                    jQuery('#' + videoElementId).parent().find('a.embed-video').hide();
                } else {
                    jQuery('#' + videoElementId).parent().find('a.embed-video').css('visibility', 'hidden');
                }

                $videoTriggers.off('click', playETicketVideo);
            };

            $videoTriggers.on('click', playETicketVideo);
        }
    }

    function loadPodcast(podcastElementId, podcastUrl) {
        if (swfobject.hasFlashPlayerVersion("8.0.00")) {
            var flashvars = {
                'soundLink': podcastUrl
            };
            var params = {
                wmode: "transparent",
                scale: "noorder",
                allowscriptaccess: "Always",
                allownetworking: "All",
                align: "left",
                salign: "lt"
            };
            var attributes = {};
            swfobject.embedSWF("https://a.espncdn.com/swf/espnradio/09/audio_player_circular_v2.swf", podcastElementId, "86", "70", "8.0.0", "", flashvars, params, attributes);
        } else {
            var $podcast = jQuery('#' + podcastElementId);
            if (Modernizr.audio) {
                $podcast.show().click(function (e) {
                    e.preventDefault();
                    $podcast.replaceWith('<audio src = "' + podcastUrl + '" controls style="width: 250px;"></audio>');
                });
            } else {
                $podcast.show();
            }
        }
    }

}(jQuery));/*!
 * GSAP 3.3.4
 * https://greensock.com
 *
 * @license Copyright 2020, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t=t||self).window=t.window||{})}(this,function(e){"use strict";function _inheritsLoose(t,e){t.prototype=Object.create(e.prototype),(t.prototype.constructor=t).__proto__=e}function _assertThisInitialized(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function n(t){return"string"==typeof t}function o(t){return"function"==typeof t}function p(t){return"number"==typeof t}function q(t){return void 0===t}function r(t){return"object"==typeof t}function s(t){return!1!==t}function t(){return"undefined"!=typeof window}function u(t){return o(t)||n(t)}function K(t){return(l=pt(t,at))&&ie}function L(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")}function M(t,e){return!e&&console.warn(t)}function N(t,e){return t&&(at[t]=e)&&l&&(l[t]=e)||at}function O(){return 0}function Y(t){var e,i,n=t[0];if(r(n)||o(n)||(t=[t]),!(e=(n._gsap||{}).harness)){for(i=dt.length;i--&&!dt[i].targetTest(n););e=dt[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new Ft(t[i],e)))||t.splice(i,1);return t}function Z(t){return t._gsap||Y(yt(t))[0]._gsap}function $(t,e){var r=t[e];return o(r)?t[e]():q(r)&&t.getAttribute(e)||r}function _(t,e){return(t=t.split(",")).forEach(e)||t}function aa(t){return Math.round(1e5*t)/1e5||0}function ba(t,e){for(var r=e.length,i=0;t.indexOf(e[i])<0&&++i<r;);return i<r}function ca(t,e,r){var i,n=p(t[1]),a=(n?2:1)+(e<2?0:1),o=t[a];if(n&&(o.duration=t[1]),o.parent=r,e){for(i=o;r&&!("immediateRender"in i);)i=r.vars.defaults||{},r=s(r.vars.inherit)&&r.parent;o.immediateRender=s(i.immediateRender),e<2?o.runBackwards=1:o.startAt=t[a-1]}return o}function da(){var t,e,r=ot.length,i=ot.slice(0);for(ut={},t=ot.length=0;t<r;t++)(e=i[t])&&e._lazy&&(e.render(e._lazy[0],e._lazy[1],!0)._lazy=0)}function ea(t,e,r,i){ot.length&&da(),t.render(e,r,i),ot.length&&da()}function fa(t){var e=parseFloat(t);return(e||0===e)&&(t+"").match(nt).length<2?e:t}function ga(t){return t}function ha(t,e){for(var r in e)r in t||(t[r]=e[r]);return t}function ia(t,e){for(var r in e)r in t||"duration"===r||"ease"===r||(t[r]=e[r])}function ka(t,e){for(var i in e)t[i]=r(e[i])?ka(t[i]||(t[i]={}),e[i]):e[i];return t}function la(t,e){var r,i={};for(r in t)r in e||(i[r]=t[r]);return i}function ma(t){var e=t.parent||F,r=t.keyframes?ia:ha;if(s(t.inherit))for(;e;)r(t,e.vars.defaults),e=e.parent||e._dp;return t}function pa(t,e,r,i){void 0===r&&(r="_first"),void 0===i&&(i="_last");var n=e._prev,a=e._next;n?n._next=a:t[r]===e&&(t[r]=a),a?a._prev=n:t[i]===e&&(t[i]=n),e._next=e._prev=e.parent=null}function qa(t,e){!t.parent||e&&!t.parent.autoRemoveChildren||t.parent.remove(t),t._act=0}function ra(t){for(var e=t;e;)e._dirty=1,e=e.parent;return t}function ua(t){return t._repeat?_t(t._tTime,t=t.duration()+t._rDelay)*t:0}function wa(t,e){return(t-e._start)*e._ts+(0<=e._ts?0:e._dirty?e.totalDuration():e._tDur)}function xa(t){return t._end=aa(t._start+(t._tDur/Math.abs(t._ts||t._rts||B)||0))}function ya(t,e){var r;if((e._time||e._initted&&!e._dur)&&(r=wa(t.rawTime(),e),(!e._dur||gt(0,e.totalDuration(),r)-e._tTime>B)&&e.render(r,!0)),ra(t)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(r=t;r._dp;)0<=r.rawTime()&&r.totalTime(r._tTime),r=r._dp;t._zTime=-B}}function za(t,e,r,i){return e.parent&&qa(e),e._start=aa(r+e._delay),e._end=aa(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),function _addLinkedListItem(t,e,r,i,n){void 0===r&&(r="_first"),void 0===i&&(i="_last");var a,s=t[i];if(n)for(a=e[n];s&&s[n]>a;)s=s._prev;s?(e._next=s._next,s._next=e):(e._next=t[r],t[r]=e),e._next?e._next._prev=e:t[i]=e,e._prev=s,e.parent=e._dp=t}(t,e,"_first","_last",t._sort?"_start":0),t._recent=e,i||ya(t,e),t}function Aa(t,e){return(at.ScrollTrigger||L("scrollTrigger",e))&&at.ScrollTrigger.create(e,t)}function Ba(t,e,r,i){return qt(t,e),t._initted?!r&&t._pt&&(t._dur&&!1!==t.vars.lazy||!t._dur&&t.vars.lazy)&&d!==Mt.frame?(ot.push(t),t._lazy=[e,i],1):void 0:1}function Ea(t,e,r){var i=t._repeat,n=aa(e)||0;return t._dur=n,t._tDur=i?i<0?1e10:aa(n*(i+1)+t._rDelay*i):n,t._time>n&&(t._time=n,t._tTime=Math.min(t._tTime,t._tDur)),r||ra(t.parent),t.parent&&xa(t),t}function Fa(t){return t instanceof Bt?ra(t):Ea(t,t._dur)}function Ha(t,e){var r,i,a=t.labels,s=t._recent||mt,o=t.duration()>=E?s.endTime(!1):t._dur;return n(e)&&(isNaN(e)||e in a)?"<"===(r=e.charAt(0))||">"===r?("<"===r?s._start:s.endTime(0<=s._repeat))+(parseFloat(e.substr(1))||0):(r=e.indexOf("="))<0?(e in a||(a[e]=o),a[e]):(i=+(e.charAt(r-1)+e.substr(r+1)),1<r?Ha(t,e.substr(0,r-1))+i:o+i):null==e?o:+e}function Ia(t,e){return t||0===t?e(t):e}function Ka(t){return(t+"").substr((parseFloat(t)+"").length)}function Na(t,e){return t&&r(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&r(t[0]))&&!t.nodeType&&t!==i}function Qa(t){return t.sort(function(){return.5-Math.random()})}function Ra(t){if(o(t))return t;var p=r(t)?t:{each:t},_=zt(p.ease),m=p.from||0,g=parseFloat(p.base)||0,v={},e=0<m&&m<1,y=isNaN(m)||e,T=p.axis,b=m,w=m;return n(m)?b=w={center:.5,edges:.5,end:1}[m]||0:!e&&y&&(b=m[0],w=m[1]),function(t,e,r){var i,n,a,s,o,u,h,l,f,d=(r||p).length,c=v[d];if(!c){if(!(f="auto"===p.grid?0:(p.grid||[1,E])[1])){for(h=-E;h<(h=r[f++].getBoundingClientRect().left)&&f<d;);f--}for(c=v[d]=[],i=y?Math.min(f,d)*b-.5:m%f,n=y?d*w/f-.5:m/f|0,l=E,u=h=0;u<d;u++)a=u%f-i,s=n-(u/f|0),c[u]=o=T?Math.abs("y"===T?s:a):V(a*a+s*s),h<o&&(h=o),o<l&&(l=o);"random"===m&&Qa(c),c.max=h-l,c.min=l,c.v=d=(parseFloat(p.amount)||parseFloat(p.each)*(d<f?d-1:T?"y"===T?d/f:f:Math.max(f,d/f))||0)*("edges"===m?-1:1),c.b=d<0?g-d:g,c.u=Ka(p.amount||p.each)||0,_=_&&d<0?At(_):_}return d=(c[t]-c.min)/c.max||0,aa(c.b+(_?_(d):d)*c.v)+c.u}}function Sa(e){var r=e<1?Math.pow(10,(e+"").length-2):1;return function(t){return Math.floor(Math.round(parseFloat(t)/e)*e*r)/r+(p(t)?0:Ka(t))}}function Ta(u,t){var h,l,e=W(u);return!e&&r(u)&&(h=e=u.radius||E,u.values?(u=yt(u.values),(l=!p(u[0]))&&(h*=h)):u=Sa(u.increment)),Ia(t,e?o(u)?function(t){return l=u(t),Math.abs(l-t)<=h?l:t}:function(t){for(var e,r,i=parseFloat(l?t.x:t),n=parseFloat(l?t.y:0),a=E,s=0,o=u.length;o--;)(e=l?(e=u[o].x-i)*e+(r=u[o].y-n)*r:Math.abs(u[o]-i))<a&&(a=e,s=o);return s=!h||a<=h?u[s]:t,l||s===t||p(t)?s:s+Ka(t)}:Sa(u))}function Ua(t,e,r,i){return Ia(W(t)?!e:!0===r?!!(r=0):!i,function(){return W(t)?t[~~(Math.random()*t.length)]:(r=r||1e-5)&&(i=r<1?Math.pow(10,(r+"").length-2):1)&&Math.floor(Math.round((t+Math.random()*(e-t))/r)*r*i)/i})}function Ya(e,r,t){return Ia(t,function(t){return e[~~r(t)]})}function _a(t){for(var e,r,i,n,a=0,s="";~(e=t.indexOf("random(",a));)i=t.indexOf(")",e),n="["===t.charAt(e+7),r=t.substr(e+7,i-e-7).match(n?nt:G),s+=t.substr(a,e-a)+Ua(n?r:+r[0],+r[1],+r[2]||1e-5),a=i+1;return s+t.substr(a,t.length-a)}function cb(t,e,r){var i,n,a,s=t.labels,o=E;for(i in s)(n=s[i]-e)<0==!!r&&n&&o>(n=Math.abs(n))&&(a=i,o=n);return a}function eb(t){return qa(t),t.progress()<1&&bt(t,"onInterrupt"),t}function jb(t,e,r){return(6*(t=t<0?t+1:1<t?t-1:t)<1?e+(r-e)*t*6:t<.5?r:3*t<2?e+(r-e)*(2/3-t)*6:e)*wt+.5|0}function kb(t,e,r){var i,n,a,s,o,u,h,l,f,d,c=t?p(t)?[t>>16,t>>8&wt,t&wt]:0:xt.black;if(!c){if(","===t.substr(-1)&&(t=t.substr(0,t.length-1)),xt[t])c=xt[t];else if("#"===t.charAt(0))4===t.length&&(t="#"+(i=t.charAt(1))+i+(n=t.charAt(2))+n+(a=t.charAt(3))+a),c=[(t=parseInt(t.substr(1),16))>>16,t>>8&wt,t&wt];else if("hsl"===t.substr(0,3))if(c=d=t.match(G),e){if(~t.indexOf("="))return c=t.match(J),r&&c.length<4&&(c[3]=1),c}else s=+c[0]%360/360,o=c[1]/100,i=2*(u=c[2]/100)-(n=u<=.5?u*(o+1):u+o-u*o),3<c.length&&(c[3]*=1),c[0]=jb(s+1/3,i,n),c[1]=jb(s,i,n),c[2]=jb(s-1/3,i,n);else c=t.match(G)||xt.transparent;c=c.map(Number)}return e&&!d&&(i=c[0]/wt,n=c[1]/wt,a=c[2]/wt,u=((h=Math.max(i,n,a))+(l=Math.min(i,n,a)))/2,h===l?s=o=0:(f=h-l,o=.5<u?f/(2-h-l):f/(h+l),s=h===i?(n-a)/f+(n<a?6:0):h===n?(a-i)/f+2:(i-n)/f+4,s*=60),c[0]=~~(s+.5),c[1]=~~(100*o+.5),c[2]=~~(100*u+.5)),r&&c.length<4&&(c[3]=1),c}function lb(t){var r=[],i=[],n=-1;return t.split(kt).forEach(function(t){var e=t.match(tt)||[];r.push.apply(r,e),i.push(n+=e.length+1)}),r.c=i,r}function mb(t,e,r){var i,n,a,s,o="",u=(t+o).match(kt),h=e?"hsla(":"rgba(",l=0;if(!u)return t;if(u=u.map(function(t){return(t=kb(t,e,1))&&h+(e?t[0]+","+t[1]+"%,"+t[2]+"%,"+t[3]:t.join(","))+")"}),r&&(a=lb(t),(i=r.c).join(o)!==a.c.join(o)))for(s=(n=t.replace(kt,"1").split(tt)).length-1;l<s;l++)o+=n[l]+(~i.indexOf(l)?u.shift()||h+"0,0,0,0)":(a.length?a:u.length?u:r).shift());if(!n)for(s=(n=t.split(kt)).length-1;l<s;l++)o+=n[l]+u[l];return o+n[s]}function pb(t){var e,r=t.join(" ");if(kt.lastIndex=0,kt.test(r))return e=Ot.test(r),t[1]=mb(t[1],e),t[0]=mb(t[0],e,lb(t[1])),!0}function xb(t){var e=(t+"").split("("),r=Ct[e[0]];return r&&1<e.length&&r.config?r.config.apply(null,~t.indexOf("{")?[function _parseObjectInString(t){for(var e,r,i,n={},a=t.substr(1,t.length-3).split(":"),s=a[0],o=1,u=a.length;o<u;o++)r=a[o],e=o!==u-1?r.lastIndexOf(","):r.length,i=r.substr(0,e),n[s]=isNaN(i)?i.replace(Dt,"").trim():+i,s=r.substr(e+1).trim();return n}(e[1])]:rt.exec(t)[1].split(",").map(fa)):Ct._CE&&St.test(t)?Ct._CE("",t):r}function zb(t,e){for(var r,i=t._first;i;)i instanceof Bt?zb(i,e):!i.vars.yoyoEase||i._yoyo&&i._repeat||i._yoyo===e||(i.timeline?zb(i.timeline,e):(r=i._ease,i._ease=i._yEase,i._yEase=r,i._yoyo=e)),i=i._next}function Bb(t,e,r,i){void 0===r&&(r=function easeOut(t){return 1-e(1-t)}),void 0===i&&(i=function easeInOut(t){return t<.5?e(2*t)/2:1-e(2*(1-t))/2});var n,a={easeIn:e,easeOut:r,easeInOut:i};return _(t,function(t){for(var e in Ct[t]=at[t]=a,Ct[n=t.toLowerCase()]=r,a)Ct[n+("easeIn"===e?".in":"easeOut"===e?".out":".inOut")]=Ct[t+"."+e]=a[e]}),a}function Cb(e){return function(t){return t<.5?(1-e(1-2*t))/2:.5+e(2*(t-.5))/2}}function Db(r,t,e){function el(t){return 1===t?1:i*Math.pow(2,-10*t)*Q((t-a)*n)+1}var i=1<=t?t:1,n=(e||(r?.3:.45))/(t<1?t:1),a=n/I*(Math.asin(1/i)||0),s="out"===r?el:"in"===r?function(t){return 1-el(1-t)}:Cb(el);return n=I/n,s.config=function(t,e){return Db(r,t,e)},s}function Eb(e,r){function ml(t){return t?--t*t*((r+1)*t+r)+1:0}void 0===r&&(r=1.70158);var t="out"===e?ml:"in"===e?function(t){return 1-ml(1-t)}:Cb(ml);return t.config=function(t){return Eb(e,t)},t}var F,i,a,h,l,f,d,c,m,g,v,y,T,b,w,x,k,P,C,S,D,A,z,U={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},R={duration:.5,overwrite:!1,delay:0},E=1e8,B=1/E,I=2*Math.PI,H=I/4,X=0,V=Math.sqrt,j=Math.cos,Q=Math.sin,W=Array.isArray,G=/(?:-?\.?\d|\.)+/gi,J=/[-+=.]*\d+[.e\-+]*\d*[e\-\+]*\d*/g,tt=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,et=/[-+=.]*\d+(?:\.|e-|e)*\d*/gi,rt=/\(([^()]+)\)/i,it=/[+-]=-?[\.\d]+/,nt=/[#\-+.]*\b[a-z\d-=+%.]+/gi,at={},st={},ot=[],ut={},ht={},lt={},ft=30,dt=[],ct="",pt=function _merge(t,e){for(var r in e)t[r]=e[r];return t},_t=function _animationCycle(t,e){return(t/=e)&&~~t===t?~~t-1:~~t},mt={_start:0,endTime:O},gt=function _clamp(t,e,r){return r<t?t:e<r?e:r},vt=[].slice,yt=function toArray(t,e){return!n(t)||e||!a&&Pt()?W(t)?function _flatten(t,e,r){return void 0===r&&(r=[]),t.forEach(function(t){return n(t)&&!e||Na(t,1)?r.push.apply(r,yt(t)):r.push(t)})||r}(t,e):Na(t)?vt.call(t,0):t?[t]:[]:vt.call(h.querySelectorAll(t),0)},Tt=function mapRange(e,t,r,i,n){var a=t-e,s=i-r;return Ia(n,function(t){return r+((t-e)/a*s||0)})},bt=function _callback(t,e,r){var i,n,a=t.vars,s=a[e];if(s)return i=a[e+"Params"],n=a.callbackScope||t,r&&ot.length&&da(),i?s.apply(n,i):s.call(n)},wt=255,xt={aqua:[0,wt,wt],lime:[0,wt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,wt],navy:[0,0,128],white:[wt,wt,wt],olive:[128,128,0],yellow:[wt,wt,0],orange:[wt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[wt,0,0],pink:[wt,192,203],cyan:[0,wt,wt],transparent:[wt,wt,wt,0]},kt=function(){var t,e="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";for(t in xt)e+="|"+t+"\\b";return new RegExp(e+")","gi")}(),Ot=/hsl[a]?\(/,Mt=(b=Date.now,w=500,x=33,k=b(),P=k,S=C=1/240,T={time:0,frame:0,tick:function tick(){gk(!0)},wake:function wake(){f&&(!a&&t()&&(i=a=window,h=i.document||{},at.gsap=ie,(i.gsapVersions||(i.gsapVersions=[])).push(ie.version),K(l||i.GreenSockGlobals||!i.gsap&&i||{}),y=i.requestAnimationFrame),g&&T.sleep(),v=y||function(t){return setTimeout(t,1e3*(S-T.time)+1|0)},m=1,gk(2))},sleep:function sleep(){(y?i.cancelAnimationFrame:clearTimeout)(g),m=0,v=O},lagSmoothing:function lagSmoothing(t,e){w=t||1e8,x=Math.min(e,w,0)},fps:function fps(t){C=1/(t||240),S=T.time+C},add:function add(t){D.indexOf(t)<0&&D.push(t),Pt()},remove:function remove(t){var e;~(e=D.indexOf(t))&&D.splice(e,1)},_listeners:D=[]}),Pt=function _wake(){return!m&&Mt.wake()},Ct={},St=/^[\d.\-M][\d.\-,\s]/,Dt=/["']/g,At=function _invertEase(e){return function(t){return 1-e(1-t)}},zt=function _parseEase(t,e){return t&&(o(t)?t:Ct[t]||xb(t))||e};function gk(e){var t,r,i=b()-P,n=!0===e;w<i&&(k+=i-x),P+=i,T.time=(P-k)/1e3,(0<(t=T.time-S)||n)&&(T.frame++,S+=t+(C<=t?.004:C-t),r=1),n||(g=v(gk)),r&&D.forEach(function(t){return t(T.time,i,T.frame,e)})}function Dl(t){return t<z?A*t*t:t<.7272727272727273?A*Math.pow(t-1.5/2.75,2)+.75:t<.9090909090909092?A*(t-=2.25/2.75)*t+.9375:A*Math.pow(t-2.625/2.75,2)+.984375}_("Linear,Quad,Cubic,Quart,Quint,Strong",function(t,e){var r=e<5?e+1:e;Bb(t+",Power"+(r-1),e?function(t){return Math.pow(t,r)}:function(t){return t},function(t){return 1-Math.pow(1-t,r)},function(t){return t<.5?Math.pow(2*t,r)/2:1-Math.pow(2*(1-t),r)/2})}),Ct.Linear.easeNone=Ct.none=Ct.Linear.easeIn,Bb("Elastic",Db("in"),Db("out"),Db()),A=7.5625,z=1/2.75,Bb("Bounce",function(t){return 1-Dl(1-t)},Dl),Bb("Expo",function(t){return t?Math.pow(2,10*(t-1)):0}),Bb("Circ",function(t){return-(V(1-t*t)-1)}),Bb("Sine",function(t){return 1===t?1:1-j(t*H)}),Bb("Back",Eb("in"),Eb("out"),Eb()),Ct.SteppedEase=Ct.steps=at.SteppedEase={config:function config(t,e){void 0===t&&(t=1);var r=1/t,i=t+(e?0:1),n=e?1:0;return function(t){return((i*gt(0,.99999999,t)|0)+n)*r}}},R.ease=Ct["quad.out"],_("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(t){return ct+=t+","+t+"Params,"});var Et,Ft=function GSCache(t,e){this.id=X++,(t._gsap=this).target=t,this.harness=e,this.get=e?e.get:$,this.set=e?e.getSetter:Zt},Rt=((Et=Animation.prototype).delay=function delay(t){return t||0===t?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+t-this._delay),this._delay=t,this):this._delay},Et.duration=function duration(t){return arguments.length?this.totalDuration(0<this._repeat?t+(t+this._rDelay)*this._repeat:t):this.totalDuration()&&this._dur},Et.totalDuration=function totalDuration(t){return arguments.length?(this._dirty=0,Ea(this,this._repeat<0?t:(t-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},Et.totalTime=function totalTime(t,e){if(Pt(),!arguments.length)return this._tTime;var r=this.parent||this._dp;if(r&&r.smoothChildTiming&&this._ts){for(this._start=aa(r._time-(0<this._ts?t/this._ts:((this._dirty?this.totalDuration():this._tDur)-t)/-this._ts)),xa(this),r._dirty||ra(r);r.parent;)r.parent._time!==r._start+(0<=r._ts?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(0<this._ts&&t<this._tDur||this._ts<0&&0<t||!this._tDur&&!t)&&za(this._dp,this,this._start-this._delay)}return(this._tTime!==t||!this._dur&&!e||this._initted&&Math.abs(this._zTime)===B||!t&&!this._initted)&&(this._ts||(this._pTime=t),ea(this,t,e)),this},Et.time=function time(t,e){return arguments.length?this.totalTime(Math.min(this.totalDuration(),t+ua(this))%this._dur||(t?this._dur:0),e):this._time},Et.totalProgress=function totalProgress(t,e){return arguments.length?this.totalTime(this.totalDuration()*t,e):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.ratio},Et.progress=function progress(t,e){return arguments.length?this.totalTime(this.duration()*(!this._yoyo||1&this.iteration()?t:1-t)+ua(this),e):this.duration()?Math.min(1,this._time/this._dur):this.ratio},Et.iteration=function iteration(t,e){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(t-1)*r,e):this._repeat?_t(this._tTime,r)+1:1},Et.timeScale=function timeScale(t){if(!arguments.length)return this._rts===-B?0:this._rts;if(this._rts===t)return this;var e=this.parent&&this._ts?wa(this.parent._time,this):this._tTime;return this._rts=+t||0,this._ts=this._ps||t===-B?0:this._rts,function _recacheAncestors(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t}(this.totalTime(gt(0,this._tDur,e),!0))},Et.paused=function paused(t){return arguments.length?(this._ps!==t&&((this._ps=t)?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Pt(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,1===this.progress()&&(this._tTime-=B)&&Math.abs(this._zTime)!==B))),this):this._ps},Et.startTime=function startTime(t){if(arguments.length){this._start=t;var e=this.parent||this._dp;return!e||!e._sort&&this.parent||za(e,this,t-this._delay),this}return this._start},Et.endTime=function endTime(t){return this._start+(s(t)?this.totalDuration():this.duration())/Math.abs(this._ts)},Et.rawTime=function rawTime(t){var e=this.parent||this._dp;return e?t&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?wa(e.rawTime(t),this):this._tTime:this._tTime},Et.repeat=function repeat(t){return arguments.length?(this._repeat=t,Fa(this)):this._repeat},Et.repeatDelay=function repeatDelay(t){return arguments.length?(this._rDelay=t,Fa(this)):this._rDelay},Et.yoyo=function yoyo(t){return arguments.length?(this._yoyo=t,this):this._yoyo},Et.seek=function seek(t,e){return this.totalTime(Ha(this,t),s(e))},Et.restart=function restart(t,e){return this.play().totalTime(t?-this._delay:0,s(e))},Et.play=function play(t,e){return null!=t&&this.seek(t,e),this.reversed(!1).paused(!1)},Et.reverse=function reverse(t,e){return null!=t&&this.seek(t||this.totalDuration(),e),this.reversed(!0).paused(!1)},Et.pause=function pause(t,e){return null!=t&&this.seek(t,e),this.paused(!0)},Et.resume=function resume(){return this.paused(!1)},Et.reversed=function reversed(t){return arguments.length?(!!t!==this.reversed()&&this.timeScale(-this._rts||(t?-B:0)),this):this._rts<0},Et.invalidate=function invalidate(){return this._initted=0,this._zTime=-B,this},Et.isActive=function isActive(t){var e,r=this.parent||this._dp,i=this._start;return!(r&&!(this._ts&&(this._initted||!t)&&r.isActive(t)&&(e=r.rawTime(!0))>=i&&e<this.endTime(!0)-B))},Et.eventCallback=function eventCallback(t,e,r){var i=this.vars;return 1<arguments.length?(e?(i[t]=e,r&&(i[t+"Params"]=r),"onUpdate"===t&&(this._onUpdate=e)):delete i[t],this):i[t]},Et.then=function then(t){var i=this;return new Promise(function(e){function Sm(){var t=i.then;i.then=null,o(r)&&(r=r(i))&&(r.then||r===i)&&(i.then=t),e(r),i.then=t}var r=o(t)?t:ga;i._initted&&1===i.totalProgress()&&0<=i._ts||!i._tTime&&i._ts<0?Sm():i._prom=Sm})},Et.kill=function kill(){eb(this)},Animation);function Animation(t,e){var r=t.parent||F;this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Ea(this,+t.duration,1),this.data=t.data,m||Mt.wake(),r&&za(r,this,e||0===e?e:r._time,1),t.reversed&&this.reverse(),t.paused&&this.paused(!0)}ha(Rt.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-B,_prom:0,_ps:!1,_rts:1});var Bt=function(i){function Timeline(t,e){var r;return void 0===t&&(t={}),(r=i.call(this,t,e)||this).labels={},r.smoothChildTiming=!!t.smoothChildTiming,r.autoRemoveChildren=!!t.autoRemoveChildren,r._sort=s(t.sortChildren),r.parent&&ya(r.parent,_assertThisInitialized(r)),t.scrollTrigger&&Aa(_assertThisInitialized(r),t.scrollTrigger),r}_inheritsLoose(Timeline,i);var t=Timeline.prototype;return t.to=function to(t,e,r,i){return new Ht(t,ca(arguments,0,this),Ha(this,p(e)?i:r)),this},t.from=function from(t,e,r,i){return new Ht(t,ca(arguments,1,this),Ha(this,p(e)?i:r)),this},t.fromTo=function fromTo(t,e,r,i,n){return new Ht(t,ca(arguments,2,this),Ha(this,p(e)?n:i)),this},t.set=function set(t,e,r){return e.duration=0,e.parent=this,ma(e).repeatDelay||(e.repeat=0),e.immediateRender=!!e.immediateRender,new Ht(t,e,Ha(this,r),1),this},t.call=function call(t,e,r){return za(this,Ht.delayedCall(0,t,e),Ha(this,r))},t.staggerTo=function staggerTo(t,e,r,i,n,a,s){return r.duration=e,r.stagger=r.stagger||i,r.onComplete=a,r.onCompleteParams=s,r.parent=this,new Ht(t,r,Ha(this,n)),this},t.staggerFrom=function staggerFrom(t,e,r,i,n,a,o){return r.runBackwards=1,ma(r).immediateRender=s(r.immediateRender),this.staggerTo(t,e,r,i,n,a,o)},t.staggerFromTo=function staggerFromTo(t,e,r,i,n,a,o,u){return i.startAt=r,ma(i).immediateRender=s(i.immediateRender),this.staggerTo(t,e,i,n,a,o,u)},t.render=function render(t,e,r){var i,n,a,s,o,u,h,l,f,d,c,p,_=this._time,m=this._dirty?this.totalDuration():this._tDur,g=this._dur,v=this!==F&&m-B<t&&0<=t?m:t<B?0:t,y=this._zTime<0!=t<0&&(this._initted||!g);if(v!==this._tTime||r||y){if(_!==this._time&&g&&(v+=this._time-_,t+=this._time-_),i=v,f=this._start,u=!(l=this._ts),y&&(g||(_=this._zTime),!t&&e||(this._zTime=t)),this._repeat&&(c=this._yoyo,o=g+this._rDelay,(g<(i=aa(v%o))||m===v)&&(i=g),(s=~~(v/o))&&s===v/o&&(i=g,s--),d=_t(this._tTime,o),!_&&this._tTime&&d!==s&&(d=s),c&&1&s&&(i=g-i,p=1),s!==d&&!this._lock)){var T=c&&1&d,b=T===(c&&1&s);if(s<d&&(T=!T),_=T?0:g,this._lock=1,this.render(_||(p?0:aa(s*o)),e,!g)._lock=0,!e&&this.parent&&bt(this,"onRepeat"),this.vars.repeatRefresh&&!p&&(this.invalidate()._lock=1),_!==this._time||u!=!this._ts)return this;if(b&&(this._lock=2,_=T?g+1e-4:-1e-4,this.render(_,!0),this.vars.repeatRefresh&&!p&&this.invalidate()),this._lock=0,!this._ts&&!u)return this;zb(this,p)}if(this._hasPause&&!this._forcing&&this._lock<2&&(h=function _findNextPauseTween(t,e,r){var i;if(e<r)for(i=t._first;i&&i._start<=r;){if(!i._dur&&"isPause"===i.data&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=r;){if(!i._dur&&"isPause"===i.data&&i._start<e)return i;i=i._prev}}(this,aa(_),aa(i)))&&(v-=i-(i=h._start)),this._tTime=v,this._time=i,this._act=!l,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=t),_||!i||e||bt(this,"onStart"),_<=i&&0<=t)for(n=this._first;n;){if(a=n._next,(n._act||i>=n._start)&&n._ts&&h!==n){if(n.parent!==this)return this.render(t,e,r);if(n.render(0<n._ts?(i-n._start)*n._ts:(n._dirty?n.totalDuration():n._tDur)+(i-n._start)*n._ts,e,r),i!==this._time||!this._ts&&!u){h=0,a&&(v+=this._zTime=-B);break}}n=a}else{n=this._last;for(var w=t<0?t:i;n;){if(a=n._prev,(n._act||w<=n._end)&&n._ts&&h!==n){if(n.parent!==this)return this.render(t,e,r);if(n.render(0<n._ts?(w-n._start)*n._ts:(n._dirty?n.totalDuration():n._tDur)+(w-n._start)*n._ts,e,r),i!==this._time||!this._ts&&!u){h=0,a&&(v+=this._zTime=w?-B:B);break}}n=a}}if(h&&!e&&(this.pause(),h.render(_<=i?0:-B)._zTime=_<=i?1:-1,this._ts))return this._start=f,xa(this),this.render(t,e,r);this._onUpdate&&!e&&bt(this,"onUpdate",!0),(v===m&&m>=this.totalDuration()||!v&&_)&&(f!==this._start&&Math.abs(l)===Math.abs(this._ts)||this._lock||(!t&&g||!(v===m&&0<this._ts||!v&&this._ts<0)||qa(this,1),e||t<0&&!_||!v&&!_||(bt(this,v===m?"onComplete":"onReverseComplete",!0),!this._prom||v<m&&0<this.timeScale()||this._prom())))}return this},t.add=function add(t,e){var r=this;if(p(e)||(e=Ha(this,e)),!(t instanceof Rt)){if(W(t))return t.forEach(function(t){return r.add(t,e)}),ra(this);if(n(t))return this.addLabel(t,e);if(!o(t))return this;t=Ht.delayedCall(0,t)}return this!==t?za(this,t,e):this},t.getChildren=function getChildren(t,e,r,i){void 0===t&&(t=!0),void 0===e&&(e=!0),void 0===r&&(r=!0),void 0===i&&(i=-E);for(var n=[],a=this._first;a;)a._start>=i&&(a instanceof Ht?e&&n.push(a):(r&&n.push(a),t&&n.push.apply(n,a.getChildren(!0,e,r)))),a=a._next;return n},t.getById=function getById(t){for(var e=this.getChildren(1,1,1),r=e.length;r--;)if(e[r].vars.id===t)return e[r]},t.remove=function remove(t){return n(t)?this.removeLabel(t):o(t)?this.killTweensOf(t):(pa(this,t),t===this._recent&&(this._recent=this._last),ra(this))},t.totalTime=function totalTime(t,e){return arguments.length?(this._forcing=1,this.parent||this._dp||!this._ts||(this._start=aa(Mt.time-(0<this._ts?t/this._ts:(this.totalDuration()-t)/-this._ts))),i.prototype.totalTime.call(this,t,e),this._forcing=0,this):this._tTime},t.addLabel=function addLabel(t,e){return this.labels[t]=Ha(this,e),this},t.removeLabel=function removeLabel(t){return delete this.labels[t],this},t.addPause=function addPause(t,e,r){var i=Ht.delayedCall(0,e||O,r);return i.data="isPause",this._hasPause=1,za(this,i,Ha(this,t))},t.removePause=function removePause(t){var e=this._first;for(t=Ha(this,t);e;)e._start===t&&"isPause"===e.data&&qa(e),e=e._next},t.killTweensOf=function killTweensOf(t,e,r){for(var i=this.getTweensOf(t,r),n=i.length;n--;)It!==i[n]&&i[n].kill(t,e);return this},t.getTweensOf=function getTweensOf(t,e){for(var r,i=[],n=yt(t),a=this._first;a;)a instanceof Ht?!ba(a._targets,n)||e&&!a.isActive("started"===e)||i.push(a):(r=a.getTweensOf(n,e)).length&&i.push.apply(i,r),a=a._next;return i},t.tweenTo=function tweenTo(t,e){e=e||{};var r=this,i=Ha(r,t),n=e.startAt,a=e.onStart,s=e.onStartParams,o=Ht.to(r,ha(e,{ease:"none",lazy:!1,time:i,duration:e.duration||Math.abs((i-(n&&"time"in n?n.time:r._time))/r.timeScale())||B,onStart:function onStart(){r.pause();var t=e.duration||Math.abs((i-r._time)/r.timeScale());o._dur!==t&&Ea(o,t).render(o._time,!0,!0),a&&a.apply(o,s||[])}}));return o},t.tweenFromTo=function tweenFromTo(t,e,r){return this.tweenTo(e,ha({startAt:{time:Ha(this,t)}},r))},t.recent=function recent(){return this._recent},t.nextLabel=function nextLabel(t){return void 0===t&&(t=this._time),cb(this,Ha(this,t))},t.previousLabel=function previousLabel(t){return void 0===t&&(t=this._time),cb(this,Ha(this,t),1)},t.currentLabel=function currentLabel(t){return arguments.length?this.seek(t,!0):this.previousLabel(this._time+B)},t.shiftChildren=function shiftChildren(t,e,r){void 0===r&&(r=0);for(var i,n=this._first,a=this.labels;n;)n._start>=r&&(n._start+=t),n=n._next;if(e)for(i in a)a[i]>=r&&(a[i]+=t);return ra(this)},t.invalidate=function invalidate(){var t=this._first;for(this._lock=0;t;)t.invalidate(),t=t._next;return i.prototype.invalidate.call(this)},t.clear=function clear(t){void 0===t&&(t=!0);for(var e,r=this._first;r;)e=r._next,this.remove(r),r=e;return this._time=this._tTime=this._pTime=0,t&&(this.labels={}),ra(this)},t.totalDuration=function totalDuration(t){var e,r,i,n,a=0,s=this,o=s._last,u=E;if(arguments.length)return s.timeScale((s._repeat<0?s.duration():s.totalDuration())/(s.reversed()?-t:t));if(s._dirty){for(n=s.parent;o;)e=o._prev,o._dirty&&o.totalDuration(),u<(i=o._start)&&s._sort&&o._ts&&!s._lock?(s._lock=1,za(s,o,i-o._delay,1)._lock=0):u=i,i<0&&o._ts&&(a-=i,(!n&&!s._dp||n&&n.smoothChildTiming)&&(s._start+=i/s._ts,s._time-=i,s._tTime-=i),s.shiftChildren(-i,!1,-Infinity),u=0),a<(r=xa(o))&&o._ts&&(a=r),o=e;Ea(s,s===F&&s._time>a?s._time:a,1),s._dirty=0}return s._tDur},Timeline.updateRoot=function updateRoot(t){if(F._ts&&(ea(F,wa(t,F)),d=Mt.frame),Mt.frame>=ft){ft+=U.autoSleep||120;var e=F._first;if((!e||!e._ts)&&U.autoSleep&&Mt._listeners.length<2){for(;e&&!e._ts;)e=e._next;e||Mt.sleep()}}},Timeline}(Rt);ha(Bt.prototype,{_lock:0,_hasPause:0,_forcing:0});function Lb(t,e,i,a,s,u){var h,l,f,d;if(ht[t]&&!1!==(h=new ht[t]).init(s,h.rawVars?e[t]:function _processVars(t,e,i,a,s){if(o(t)&&(t=Yt(t,s,e,i,a)),!r(t)||t.style&&t.nodeType||W(t))return n(t)?Yt(t,s,e,i,a):t;var u,h={};for(u in t)h[u]=Yt(t[u],s,e,i,a);return h}(e[t],a,s,u,i),i,a,u)&&(i._pt=l=new ee(i._pt,s,t,0,1,h.render,h,0,h.priority),i!==c))for(f=i._ptLookup[i._targets.indexOf(s)],d=h._props.length;d--;)f[h._props[d]]=l;return h}var It,Lt=function _addPropTween(t,e,r,i,a,s,u,h,l){o(i)&&(i=i(a||0,t,s));var f,d=t[e],c="get"!==r?r:o(d)?l?t[e.indexOf("set")||!o(t["get"+e.substr(3)])?e:"get"+e.substr(3)](l):t[e]():d,p=o(d)?l?jt:Vt:Xt;if(n(i)&&(~i.indexOf("random(")&&(i=_a(i)),"="===i.charAt(1)&&(i=parseFloat(c)+parseFloat(i.substr(2))*("-"===i.charAt(0)?-1:1)+(Ka(c)||0))),c!==i)return isNaN(c+i)?(d||e in t||L(e,i),function _addComplexStringPropTween(t,e,r,i,n,a,s){var o,u,h,l,f,d,c,p,_=new ee(this._pt,t,e,0,1,Wt,null,n),m=0,g=0;for(_.b=r,_.e=i,r+="",(c=~(i+="").indexOf("random("))&&(i=_a(i)),a&&(a(p=[r,i],t,e),r=p[0],i=p[1]),u=r.match(et)||[];o=et.exec(i);)l=o[0],f=i.substring(m,o.index),h?h=(h+1)%5:"rgba("===f.substr(-5)&&(h=1),l!==u[g++]&&(d=parseFloat(u[g-1])||0,_._pt={_next:_._pt,p:f||1===g?f:",",s:d,c:"="===l.charAt(1)?parseFloat(l.substr(2))*("-"===l.charAt(0)?-1:1):parseFloat(l)-d,m:h&&h<4?Math.round:0},m=et.lastIndex);return _.c=m<i.length?i.substring(m,i.length):"",_.fp=s,(it.test(i)||c)&&(_.e=0),this._pt=_}.call(this,t,e,c,i,p,h||U.stringFilter,l)):(f=new ee(this._pt,t,e,+c||0,i-(c||0),"boolean"==typeof d?Qt:Kt,0,p),l&&(f.fp=l),u&&f.modifier(u,this,t),this._pt=f)},qt=function _initTween(t,e){var r,i,n,a,o,u,h,l,f,d,c,p,_=t.vars,m=_.ease,g=_.startAt,v=_.immediateRender,y=_.lazy,T=_.onUpdate,b=_.onUpdateParams,w=_.callbackScope,x=_.runBackwards,k=_.yoyoEase,O=_.keyframes,M=_.autoRevert,P=t._dur,C=t._startAt,S=t._targets,D=t.parent,A=D&&"nested"===D.data?D.parent._targets:S,z="auto"===t._overwrite,E=t.timeline;if(!E||O&&m||(m="none"),t._ease=zt(m,R.ease),t._yEase=k?At(zt(!0===k?m:k,R.ease)):0,k&&t._yoyo&&!t._repeat&&(k=t._yEase,t._yEase=t._ease,t._ease=k),!E){if(p=(l=S[0]?Z(S[0]).harness:0)&&_[l.prop],r=la(_,st),C&&C.render(-1,!0).kill(),g){if(qa(t._startAt=Ht.set(S,ha({data:"isStart",overwrite:!1,parent:D,immediateRender:!0,lazy:s(y),startAt:null,delay:0,onUpdate:T,onUpdateParams:b,callbackScope:w,stagger:0},g))),v)if(0<e)M||(t._startAt=0);else if(P)return}else if(x&&P)if(C)M||(t._startAt=0);else if(e&&(v=!1),n=ha({overwrite:!1,data:"isFromStart",lazy:v&&s(y),immediateRender:v,stagger:0,parent:D},r),p&&(n[l.prop]=p),qa(t._startAt=Ht.set(S,n)),v){if(!e)return}else _initTween(t._startAt,B);for(t._pt=0,y=P&&s(y)||y&&!P,i=0;i<S.length;i++){if(h=(o=S[i])._gsap||Y(S)[i]._gsap,t._ptLookup[i]=d={},ut[h.id]&&da(),c=A===S?i:A.indexOf(o),l&&!1!==(f=new l).init(o,p||r,t,c,A)&&(t._pt=a=new ee(t._pt,o,f.name,0,1,f.render,f,0,f.priority),f._props.forEach(function(t){d[t]=a}),f.priority&&(u=1)),!l||p)for(n in r)ht[n]&&(f=Lb(n,r,t,c,o,A))?f.priority&&(u=1):d[n]=a=Lt.call(t,o,n,"get",r[n],c,A,0,_.stringFilter);t._op&&t._op[i]&&t.kill(o,t._op[i]),z&&t._pt&&(It=t,F.killTweensOf(o,d,"started"),It=0),t._pt&&y&&(ut[h.id]=1)}u&&te(t),t._onInit&&t._onInit(t)}t._from=!E&&!!_.runBackwards,t._onUpdate=T,t._initted=!!t.parent},Yt=function _parseFuncOrString(t,e,r,i,a){return o(t)?t.call(e,r,i,a):n(t)&&~t.indexOf("random(")?_a(t):t},Nt=ct+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",Ut=(Nt+",id,stagger,delay,duration,paused,scrollTrigger").split(","),Ht=function(A){function Tween(t,e,i,n){var a;"number"==typeof e&&(i.duration=e,e=i,i=null);var o,h,l,f,d,c,_,m,g=(a=A.call(this,n?e:ma(e),i)||this).vars,v=g.duration,y=g.delay,T=g.immediateRender,b=g.stagger,w=g.overwrite,x=g.keyframes,k=g.defaults,P=g.scrollTrigger,C=g.yoyoEase,S=a.parent,D=(W(t)?p(t[0]):"length"in e)?[t]:yt(t);if(a._targets=D.length?Y(D):M("GSAP target "+t+" not found. https://greensock.com",!U.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=w,x||b||u(v)||u(y)){if(e=a.vars,(o=a.timeline=new Bt({data:"nested",defaults:k||{}})).kill(),o.parent=_assertThisInitialized(a),x)ha(o.vars.defaults,{ease:"none"}),x.forEach(function(t){return o.to(D,t,">")});else{if(f=D.length,_=b?Ra(b):O,r(b))for(d in b)~Nt.indexOf(d)&&((m=m||{})[d]=b[d]);for(h=0;h<f;h++){for(d in l={},e)Ut.indexOf(d)<0&&(l[d]=e[d]);l.stagger=0,C&&(l.yoyoEase=C),m&&pt(l,m),c=D[h],l.duration=+Yt(v,_assertThisInitialized(a),h,c,D),l.delay=(+Yt(y,_assertThisInitialized(a),h,c,D)||0)-a._delay,!b&&1===f&&l.delay&&(a._delay=y=l.delay,a._start+=y,l.delay=0),o.to(c,l,_(h,c,D))}o.duration()?v=y=0:a.timeline=0}v||a.duration(v=o.duration())}else a.timeline=0;return!0===w&&(It=_assertThisInitialized(a),F.killTweensOf(D),It=0),S&&ya(S,_assertThisInitialized(a)),(T||!v&&!x&&a._start===aa(S._time)&&s(T)&&function _hasNoPausedAncestors(t){return!t||t._ts&&_hasNoPausedAncestors(t.parent)}(_assertThisInitialized(a))&&"nested"!==S.data)&&(a._tTime=-B,a.render(Math.max(0,-y))),P&&Aa(_assertThisInitialized(a),P),a}_inheritsLoose(Tween,A);var t=Tween.prototype;return t.render=function render(t,e,r){var i,n,a,s,o,u,h,l,f,d=this._time,c=this._tDur,p=this._dur,_=c-B<t&&0<=t?c:t<B?0:t;if(p){if(_!==this._tTime||!t||r||this._startAt&&this._zTime<0!=t<0){if(i=_,l=this.timeline,this._repeat){if(s=p+this._rDelay,(p<(i=aa(_%s))||c===_)&&(i=p),(a=~~(_/s))&&a===_/s&&(i=p,a--),(u=this._yoyo&&1&a)&&(f=this._yEase,i=p-i),o=_t(this._tTime,s),i===d&&!r&&this._initted)return this;a!==o&&(l&&this._yEase&&zb(l,u),!this.vars.repeatRefresh||u||this._lock||(this._lock=r=1,this.render(aa(s*a),!0).invalidate()._lock=0))}if(!this._initted){if(Ba(this,i,r,e))return this._tTime=0,this;if(p!==this._dur)return this.render(t,e,r)}for(this._tTime=_,this._time=i,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=h=(f||this._ease)(i/p),this._from&&(this.ratio=h=1-h),!i||d||e||bt(this,"onStart"),n=this._pt;n;)n.r(h,n.d),n=n._next;l&&l.render(t<0?t:!i&&u?-B:l._dur*h,e,r)||this._startAt&&(this._zTime=t),this._onUpdate&&!e&&(t<0&&this._startAt&&this._startAt.render(t,!0,r),bt(this,"onUpdate")),this._repeat&&a!==o&&this.vars.onRepeat&&!e&&this.parent&&bt(this,"onRepeat"),_!==this._tDur&&_||this._tTime!==_||(t<0&&this._startAt&&!this._onUpdate&&this._startAt.render(t,!0,!0),!t&&p||!(_===this._tDur&&0<this._ts||!_&&this._ts<0)||qa(this,1),e||t<0&&!d||!_&&!d||(bt(this,_===c?"onComplete":"onReverseComplete",!0),!this._prom||_<c&&0<this.timeScale()||this._prom()))}}else!function _renderZeroDurationTween(t,e,r,i){var n,a,s=t.ratio,o=e<0||!e&&s&&!t._start&&t._zTime>B&&!t._dp._lock||t._ts<0||t._dp._ts<0?0:1,u=t._rDelay,h=0;if(u&&t._repeat&&(h=gt(0,t._tDur,e),_t(h,u)!==(a=_t(t._tTime,u))&&(s=1-o,t.vars.repeatRefresh&&t._initted&&t.invalidate())),t._initted||!Ba(t,e,i,r))if(o!==s||i||t._zTime===B||!e&&t._zTime){for(a=t._zTime,t._zTime=e||(r?B:0),r=r||e&&!a,t.ratio=o,t._from&&(o=1-o),t._time=0,t._tTime=h,r||bt(t,"onStart"),n=t._pt;n;)n.r(o,n.d),n=n._next;t._startAt&&e<0&&t._startAt.render(e,!0,!0),t._onUpdate&&!r&&bt(t,"onUpdate"),h&&t._repeat&&!r&&t.parent&&bt(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===o&&(o&&qa(t,1),r||(bt(t,o?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)}(this,t,e,r);return this},t.targets=function targets(){return this._targets},t.invalidate=function invalidate(){return this._pt=this._op=this._startAt=this._onUpdate=this._act=this._lazy=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(),A.prototype.invalidate.call(this)},t.kill=function kill(t,e){if(void 0===e&&(e="all"),!(t||e&&"all"!==e)&&(this._lazy=0,this.parent))return eb(this);if(this.timeline){var r=this.timeline.totalDuration();return this.timeline.killTweensOf(t,e,It&&!0!==It.vars.overwrite)._first||eb(this),this.parent&&r!==this.timeline.totalDuration()&&Ea(this,this._dur*this.timeline._tDur/r),this}var i,a,s,o,u,h,l,f=this._targets,d=t?yt(t):f,c=this._ptLookup,p=this._pt;if((!e||"all"===e)&&function _arraysMatch(t,e){for(var r=t.length,i=r===e.length;i&&r--&&t[r]===e[r];);return r<0}(f,d))return eb(this);for(i=this._op=this._op||[],"all"!==e&&(n(e)&&(u={},_(e,function(t){return u[t]=1}),e=u),e=function _addAliasesToVars(t,e){var r,i,n,a,s=t[0]?Z(t[0]).harness:0,o=s&&s.aliases;if(!o)return e;for(i in r=pt({},e),o)if(i in r)for(n=(a=o[i].split(",")).length;n--;)r[a[n]]=r[i];return r}(f,e)),l=f.length;l--;)if(~d.indexOf(f[l]))for(u in a=c[l],"all"===e?(i[l]=e,o=a,s={}):(s=i[l]=i[l]||{},o=e),o)(h=a&&a[u])&&("kill"in h.d&&!0!==h.d.kill(u)||pa(this,h,"_pt"),delete a[u]),"all"!==s&&(s[u]=1);return this._initted&&!this._pt&&p&&eb(this),this},Tween.to=function to(t,e,r){return new Tween(t,e,r)},Tween.from=function from(t,e){return new Tween(t,ca(arguments,1))},Tween.delayedCall=function delayedCall(t,e,r,i){return new Tween(e,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:t,onComplete:e,onReverseComplete:e,onCompleteParams:r,onReverseCompleteParams:r,callbackScope:i})},Tween.fromTo=function fromTo(t,e,r){return new Tween(t,ca(arguments,2))},Tween.set=function set(t,e){return e.duration=0,e.repeatDelay||(e.repeat=0),new Tween(t,e)},Tween.killTweensOf=function killTweensOf(t,e,r){return F.killTweensOf(t,e,r)},Tween}(Rt);ha(Ht.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0}),_("staggerTo,staggerFrom,staggerFromTo",function(r){Ht[r]=function(){var t=new Bt,e=vt.call(arguments,0);return e.splice("staggerFromTo"===r?5:4,0,0),t[r].apply(t,e)}});function Wb(t,e,r){return t.setAttribute(e,r)}function cc(t,e,r,i){i.mSet(t,e,i.m.call(i.tween,r,i.mt),i)}var Xt=function _setterPlain(t,e,r){return t[e]=r},Vt=function _setterFunc(t,e,r){return t[e](r)},jt=function _setterFuncWithParam(t,e,r,i){return t[e](i.fp,r)},Zt=function _getSetter(t,e){return o(t[e])?Vt:q(t[e])&&t.setAttribute?Wb:Xt},Kt=function _renderPlain(t,e){return e.set(e.t,e.p,Math.round(1e4*(e.s+e.c*t))/1e4,e)},Qt=function _renderBoolean(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},Wt=function _renderComplexString(t,e){var r=e._pt,i="";if(!t&&e.b)i=e.b;else if(1===t&&e.e)i=e.e;else{for(;r;)i=r.p+(r.m?r.m(r.s+r.c*t):Math.round(1e4*(r.s+r.c*t))/1e4)+i,r=r._next;i+=e.c}e.set(e.t,e.p,i,e)},Gt=function _renderPropTweens(t,e){for(var r=e._pt;r;)r.r(t,r.d),r=r._next},$t=function _addPluginModifier(t,e,r,i){for(var n,a=this._pt;a;)n=a._next,a.p===i&&a.modifier(t,e,r),a=n},Jt=function _killPropTweensOf(t){for(var e,r,i=this._pt;i;)r=i._next,i.p===t&&!i.op||i.op===t?pa(this,i,"_pt"):i.dep||(e=1),i=r;return!e},te=function _sortPropTweensByPriority(t){for(var e,r,i,n,a=t._pt;a;){for(e=a._next,r=i;r&&r.pr>a.pr;)r=r._next;(a._prev=r?r._prev:n)?a._prev._next=a:i=a,(a._next=r)?r._prev=a:n=a,a=e}t._pt=i},ee=(PropTween.prototype.modifier=function modifier(t,e,r){this.mSet=this.mSet||this.set,this.set=cc,this.m=t,this.mt=r,this.tween=e},PropTween);function PropTween(t,e,r,i,n,a,s,o,u){this.t=e,this.s=i,this.c=n,this.p=r,this.r=a||Kt,this.d=s||this,this.set=o||Xt,this.pr=u||0,(this._next=t)&&(t._prev=this)}_(ct+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(t){return st[t]=1}),at.TweenMax=at.TweenLite=Ht,at.TimelineLite=at.TimelineMax=Bt,F=new Bt({sortChildren:!1,defaults:R,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0}),U.stringFilter=pb;var re={registerPlugin:function registerPlugin(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];e.forEach(function(t){return function _createPlugin(t){var e=(t=!t.name&&t.default||t).name,r=o(t),i=e&&!r&&t.init?function(){this._props=[]}:t,n={init:O,render:Gt,add:Lt,kill:Jt,modifier:$t,rawVars:0},a={targetTest:0,get:0,getSetter:Zt,aliases:{},register:0};if(Pt(),t!==i){if(ht[e])return;ha(i,ha(la(t,n),a)),pt(i.prototype,pt(n,la(t,a))),ht[i.prop=e]=i,t.targetTest&&(dt.push(i),st[e]=1),e=("css"===e?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}N(e,i),t.register&&t.register(ie,i,ee)}(t)})},timeline:function timeline(t){return new Bt(t)},getTweensOf:function getTweensOf(t,e){return F.getTweensOf(t,e)},getProperty:function getProperty(i,t,e,r){n(i)&&(i=yt(i)[0]);var a=Z(i||{}).get,s=e?ga:fa;return"native"===e&&(e=""),i?t?s((ht[t]&&ht[t].get||a)(i,t,e,r)):function(t,e,r){return s((ht[t]&&ht[t].get||a)(i,t,e,r))}:i},quickSetter:function quickSetter(r,e,i){if(1<(r=yt(r)).length){var n=r.map(function(t){return ie.quickSetter(t,e,i)}),a=n.length;return function(t){for(var e=a;e--;)n[e](t)}}r=r[0]||{};var s=ht[e],o=Z(r),u=o.harness&&(o.harness.aliases||{})[e]||e,h=s?function(t){var e=new s;c._pt=0,e.init(r,i?t+i:t,c,0,[r]),e.render(1,e),c._pt&&Gt(1,c)}:o.set(r,u);return s?h:function(t){return h(r,u,i?t+i:t,o,1)}},isTweening:function isTweening(t){return 0<F.getTweensOf(t,!0).length},defaults:function defaults(t){return t&&t.ease&&(t.ease=zt(t.ease,R.ease)),ka(R,t||{})},config:function config(t){return ka(U,t||{})},registerEffect:function registerEffect(t){var n=t.name,i=t.effect,e=t.plugins,a=t.defaults,s=t.extendTimeline;(e||"").split(",").forEach(function(t){return t&&!ht[t]&&!at[t]&&M(n+" effect requires "+t+" plugin.")}),lt[n]=function(t,e,r){return i(yt(t),ha(e||{},a),r)},s&&(Bt.prototype[n]=function(t,e,i){return this.add(lt[n](t,r(e)?e:(i=e)&&{},this),i)})},registerEase:function registerEase(t,e){Ct[t]=zt(e)},parseEase:function parseEase(t,e){return arguments.length?zt(t,e):Ct},getById:function getById(t){return F.getById(t)},exportRoot:function exportRoot(t,e){void 0===t&&(t={});var r,i,n=new Bt(t);for(n.smoothChildTiming=s(t.smoothChildTiming),F.remove(n),n._dp=0,n._time=n._tTime=F._time,r=F._first;r;)i=r._next,!e&&!r._dur&&r instanceof Ht&&r.vars.onComplete===r._targets[0]||za(n,r,r._start-r._delay),r=i;return za(F,n,0),n},utils:{wrap:function wrap(e,t,r){var i=t-e;return W(e)?Ya(e,wrap(0,e.length),t):Ia(r,function(t){return(i+(t-e)%i)%i+e})},wrapYoyo:function wrapYoyo(e,t,r){var i=t-e,n=2*i;return W(e)?Ya(e,wrapYoyo(0,e.length-1),t):Ia(r,function(t){return e+(i<(t=(n+(t-e)%n)%n||0)?n-t:t)})},distribute:Ra,random:Ua,snap:Ta,normalize:function normalize(t,e,r){return Tt(t,e,0,1,r)},getUnit:Ka,clamp:function clamp(e,r,t){return Ia(t,function(t){return gt(e,r,t)})},splitColor:kb,toArray:yt,mapRange:Tt,pipe:function pipe(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return function(t){return e.reduce(function(t,e){return e(t)},t)}},unitize:function unitize(e,r){return function(t){return e(parseFloat(t))+(r||Ka(t))}},interpolate:function interpolate(e,r,t,i){var a=isNaN(e+r)?0:function(t){return(1-t)*e+t*r};if(!a){var s,o,u,h,l,f=n(e),d={};if(!0===t&&(i=1)&&(t=null),f)e={p:e},r={p:r};else if(W(e)&&!W(r)){for(u=[],h=e.length,l=h-2,o=1;o<h;o++)u.push(interpolate(e[o-1],e[o]));h--,a=function func(t){t*=h;var e=Math.min(l,~~t);return u[e](t-e)},t=r}else i||(e=pt(W(e)?[]:{},e));if(!u){for(s in r)Lt.call(d,e,s,"get",r[s]);a=function func(t){return Gt(t,d)||(f?e.p:e)}}}return Ia(t,a)},shuffle:Qa},install:K,effects:lt,ticker:Mt,updateRoot:Bt.updateRoot,plugins:ht,globalTimeline:F,core:{PropTween:ee,globals:N,Tween:Ht,Timeline:Bt,Animation:Rt,getCache:Z,_removeLinkedListItem:pa}};_("to,from,fromTo,delayedCall,set,killTweensOf",function(t){return re[t]=Ht[t]}),Mt.add(Bt.updateRoot),c=re.to({},{duration:0});function gc(t,e){for(var r=t._pt;r&&r.p!==e&&r.op!==e&&r.fp!==e;)r=r._next;return r}function ic(t,a){return{name:t,rawVars:1,init:function init(t,i,e){e._onInit=function(t){var e,r;if(n(i)&&(e={},_(i,function(t){return e[t]=1}),i=e),a){for(r in e={},i)e[r]=a(i[r]);i=e}!function _addModifiers(t,e){var r,i,n,a=t._targets;for(r in e)for(i=a.length;i--;)(n=(n=t._ptLookup[i][r])&&n.d)&&(n._pt&&(n=gc(n,r)),n&&n.modifier&&n.modifier(e[r],t,a[i],r))}(t,i)}}}}var ie=re.registerPlugin({name:"attr",init:function init(t,e,r,i,n){var a,s;for(a in e)(s=this.add(t,"setAttribute",(t.getAttribute(a)||0)+"",e[a],i,n,0,0,a))&&(s.op=a),this._props.push(a)}},{name:"endArray",init:function init(t,e){for(var r=e.length;r--;)this.add(t,r,t[r]||0,e[r])}},ic("roundProps",Sa),ic("modifiers"),ic("snap",Ta))||re;Ht.version=Bt.version=ie.version="3.3.4",f=1,t()&&Pt();function Tc(t,e){return e.set(e.t,e.p,Math.round(1e4*(e.s+e.c*t))/1e4+e.u,e)}function Uc(t,e){return e.set(e.t,e.p,1===t?e.e:Math.round(1e4*(e.s+e.c*t))/1e4+e.u,e)}function Vc(t,e){return e.set(e.t,e.p,t?Math.round(1e4*(e.s+e.c*t))/1e4+e.u:e.b,e)}function Wc(t,e){var r=e.s+e.c*t;e.set(e.t,e.p,~~(r+(r<0?-.5:.5))+e.u,e)}function Xc(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)}function Yc(t,e){return e.set(e.t,e.p,1!==t?e.b:e.e,e)}function Zc(t,e,r){return t.style[e]=r}function $c(t,e,r){return t.style.setProperty(e,r)}function _c(t,e,r){return t._gsap[e]=r}function ad(t,e,r){return t._gsap.scaleX=t._gsap.scaleY=r}function bd(t,e,r,i,n){var a=t._gsap;a.scaleX=a.scaleY=r,a.renderTransform(n,a)}function cd(t,e,r,i,n){var a=t._gsap;a[e]=r,a.renderTransform(n,a)}function gd(t,e){var r=ae.createElementNS?ae.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):ae.createElement(t);return r.style?r:ae.createElement(t)}function hd(t,e,r){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(Fe,"-$1").toLowerCase())||i.getPropertyValue(e)||!r&&hd(t,Ne(e)||e,1)||""}function kd(){(function _windowExists(){return"undefined"!=typeof window})()&&window.document&&(ne=window,ae=ne.document,se=ae.documentElement,ue=gd("div")||{style:{}},he=gd("div"),Le=Ne(Le),qe=Ne(qe),ue.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",fe=!!Ne("perspective"),oe=1)}function ld(t){var e,r=gd("svg",this.ownerSVGElement&&this.ownerSVGElement.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=this.parentNode,n=this.nextSibling,a=this.style.cssText;if(se.appendChild(r),r.appendChild(this),this.style.display="block",t)try{e=this.getBBox(),this._gsapBBox=this.getBBox,this.getBBox=ld}catch(t){}else this._gsapBBox&&(e=this._gsapBBox());return i&&(n?i.insertBefore(this,n):i.appendChild(this)),se.removeChild(r),this.style.cssText=a,e}function md(t,e){for(var r=e.length;r--;)if(t.hasAttribute(e[r]))return t.getAttribute(e[r])}function nd(e){var r;try{r=e.getBBox()}catch(t){r=ld.call(e,!0)}return r&&(r.width||r.height)||e.getBBox===ld||(r=ld.call(e,!0)),!r||r.width||r.x||r.y?r:{x:+md(e,["x","cx","x1"])||0,y:+md(e,["y","cy","y1"])||0,width:0,height:0}}function od(t){return!(!t.getCTM||t.parentNode&&!t.ownerSVGElement||!nd(t))}function pd(t,e){if(e){var r=t.style;e in De&&(e=Le),r.removeProperty?("ms"!==e.substr(0,2)&&"webkit"!==e.substr(0,6)||(e="-"+e),r.removeProperty(e.replace(Fe,"-$1").toLowerCase())):r.removeAttribute(e)}}function qd(t,e,r,i,n,a){var s=new ee(t._pt,e,r,0,1,a?Yc:Xc);return(t._pt=s).b=i,s.e=n,t._props.push(r),s}function sd(t,e,r,i){var n,a,s,o,u=parseFloat(r)||0,h=(r+"").trim().substr((u+"").length)||"px",l=ue.style,f=Re.test(e),d="svg"===t.tagName.toLowerCase(),c=(d?"client":"offset")+(f?"Width":"Height"),p="px"===i,_="%"===i;return i===h||!u||Ue[i]||Ue[h]?u:("px"===h||p||(u=sd(t,e,r,"px")),o=t.getCTM&&od(t),_&&(De[e]||~e.indexOf("adius"))?aa(u/(o?t.getBBox()[f?"width":"height"]:t[c])*100):(l[f?"width":"height"]=100+(p?h:i),a=~e.indexOf("adius")||"em"===i&&t.appendChild&&!d?t:t.parentNode,o&&(a=(t.ownerSVGElement||{}).parentNode),a&&a!==ae&&a.appendChild||(a=ae.body),(s=a._gsap)&&_&&s.width&&f&&s.time===Mt.time?aa(u/s.width*100):(!_&&"%"!==h||(l.position=hd(t,"position")),a===t&&(l.position="static"),a.appendChild(ue),n=ue[c],a.removeChild(ue),l.position="absolute",f&&_&&((s=Z(a)).time=Mt.time,s.width=a[c]),aa(p?n*u/100:n&&u?100/n*u:0))))}function td(t,e,r,i){var n;return oe||kd(),e in Ie&&"transform"!==e&&~(e=Ie[e]).indexOf(",")&&(e=e.split(",")[0]),De[e]&&"transform"!==e?(n=Ze(t,i),n="transformOrigin"!==e?n[e]:Ke(hd(t,qe))+" "+n.zOrigin+"px"):(n=t.style[e])&&"auto"!==n&&!i&&!~(n+"").indexOf("calc(")||(n=Xe[e]&&Xe[e](t,e,r)||hd(t,e)||$(t,e)||("opacity"===e?1:0)),r&&!~(n+"").indexOf(" ")?sd(t,e,n,r)+r:n}function ud(t,e,r,i){if(!r||"none"===r){var n=Ne(e,t,1),a=n&&hd(t,n,1);a&&a!==r&&(e=n,r=a)}var s,o,u,h,l,f,d,c,p,_,m,g,v=new ee(this._pt,t.style,e,0,1,Wt),y=0,T=0;if(v.b=r,v.e=i,r+="","auto"===(i+="")&&(t.style[e]=i,i=hd(t,e)||i,t.style[e]=r),pb(s=[r,i]),i=s[1],u=(r=s[0]).match(tt)||[],(i.match(tt)||[]).length){for(;o=tt.exec(i);)d=o[0],p=i.substring(y,o.index),l?l=(l+1)%5:"rgba("!==p.substr(-5)&&"hsla("!==p.substr(-5)||(l=1),d!==(f=u[T++]||"")&&(h=parseFloat(f)||0,m=f.substr((h+"").length),(g="="===d.charAt(1)?+(d.charAt(0)+"1"):0)&&(d=d.substr(2)),c=parseFloat(d),_=d.substr((c+"").length),y=tt.lastIndex-_.length,_||(_=_||U.units[e]||m,y===i.length&&(i+=_,v.e+=_)),m!==_&&(h=sd(t,e,f,_)||0),v._pt={_next:v._pt,p:p||1===T?p:",",s:h,c:g?g*c:c-h,m:l&&l<4?Math.round:0});v.c=y<i.length?i.substring(y,i.length):""}else v.r="display"===e&&"none"===i?Yc:Xc;return it.test(i)&&(v.e=0),this._pt=v}function wd(t){var e=t.split(" "),r=e[0],i=e[1]||"50%";return"top"!==r&&"bottom"!==r&&"left"!==i&&"right"!==i||(t=r,r=i,i=t),e[0]=He[r]||r,e[1]=He[i]||i,e.join(" ")}function xd(t,e){if(e.tween&&e.tween._time===e.tween._dur){var r,i,n,a=e.t,s=a.style,o=e.u,u=a._gsap;if("all"===o||!0===o)s.cssText="",i=1;else for(n=(o=o.split(",")).length;-1<--n;)r=o[n],De[r]&&(i=1,r="transformOrigin"===r?qe:Le),pd(a,r);i&&(pd(a,Le),u&&(u.svg&&a.removeAttribute("transform"),Ze(a,1),u.uncache=1))}}function Bd(t){return"matrix(1, 0, 0, 1, 0, 0)"===t||"none"===t||!t}function Cd(t){var e=hd(t,Le);return Bd(e)?Ve:e.substr(7).match(J).map(aa)}function Dd(t,e){var r,i,n,a,s=t._gsap||Z(t),o=t.style,u=Cd(t);return s.svg&&t.getAttribute("transform")?"1,0,0,1,0,0"===(u=[(n=t.transform.baseVal.consolidate().matrix).a,n.b,n.c,n.d,n.e,n.f]).join(",")?Ve:u:(u!==Ve||t.offsetParent||t===se||s.svg||(n=o.display,o.display="block",(r=t.parentNode)&&t.offsetParent||(a=1,i=t.nextSibling,se.appendChild(t)),u=Cd(t),n?o.display=n:pd(t,"display"),a&&(i?r.insertBefore(t,i):r?r.appendChild(t):se.removeChild(t))),e&&6<u.length?[u[0],u[1],u[4],u[5],u[12],u[13]]:u)}function Ed(t,e,r,i,n,a){var s,o,u,h=t._gsap,l=n||Dd(t,!0),f=h.xOrigin||0,d=h.yOrigin||0,c=h.xOffset||0,p=h.yOffset||0,_=l[0],m=l[1],g=l[2],v=l[3],y=l[4],T=l[5],b=e.split(" "),w=parseFloat(b[0])||0,x=parseFloat(b[1])||0;r?l!==Ve&&(o=_*v-m*g)&&(u=w*(-m/o)+x*(_/o)-(_*T-m*y)/o,w=w*(v/o)+x*(-g/o)+(g*T-v*y)/o,x=u):(w=(s=nd(t)).x+(~b[0].indexOf("%")?w/100*s.width:w),x=s.y+(~(b[1]||b[0]).indexOf("%")?x/100*s.height:x)),i||!1!==i&&h.smooth?(y=w-f,T=x-d,h.xOffset=c+(y*_+T*g)-y,h.yOffset=p+(y*m+T*v)-T):h.xOffset=h.yOffset=0,h.xOrigin=w,h.yOrigin=x,h.smooth=!!i,h.origin=e,h.originIsAbsolute=!!r,t.style[qe]="0px 0px",a&&(qd(a,h,"xOrigin",f,w),qd(a,h,"yOrigin",d,x),qd(a,h,"xOffset",c,h.xOffset),qd(a,h,"yOffset",p,h.yOffset)),t.setAttribute("data-svg-origin",w+" "+x)}function Hd(t,e,r){var i=Ka(e);return aa(parseFloat(e)+parseFloat(sd(t,"x",r+"px",i)))+i}function Od(t,e,r,i,a,s){var o,u,h=360,l=n(a),f=parseFloat(a)*(l&&~a.indexOf("rad")?Ae:1),d=s?f*s:f-i,c=i+d+"deg";return l&&("short"===(o=a.split("_")[1])&&(d%=h)!==d%180&&(d+=d<0?h:-h),"cw"===o&&d<0?d=(d+36e9)%h-~~(d/h)*h:"ccw"===o&&0<d&&(d=(d-36e9)%h-~~(d/h)*h)),t._pt=u=new ee(t._pt,e,r,i,d,Uc),u.e=c,u.u="deg",t._props.push(r),u}function Pd(t,e,r){var i,n,a,s,o,u,h,l=he.style,f=r._gsap;for(n in l.cssText=getComputedStyle(r).cssText+";position:absolute;display:block;",l[Le]=e,ae.body.appendChild(he),i=Ze(he,1),De)(a=f[n])!==(s=i[n])&&"perspective,force3D,transformOrigin,svgOrigin".indexOf(n)<0&&(o=Ka(a)!==(h=Ka(s))?sd(r,n,a,h):parseFloat(a),u=parseFloat(s),t._pt=new ee(t._pt,f,n,o,u-o,Tc),t._pt.u=h||0,t._props.push(n));ae.body.removeChild(he)}var ne,ae,se,oe,ue,he,le,fe,de=Ct.Power0,ce=Ct.Power1,pe=Ct.Power2,_e=Ct.Power3,me=Ct.Power4,ge=Ct.Linear,ve=Ct.Quad,ye=Ct.Cubic,Te=Ct.Quart,be=Ct.Quint,we=Ct.Strong,xe=Ct.Elastic,ke=Ct.Back,Oe=Ct.SteppedEase,Me=Ct.Bounce,Pe=Ct.Sine,Ce=Ct.Expo,Se=Ct.Circ,De={},Ae=180/Math.PI,ze=Math.PI/180,Ee=Math.atan2,Fe=/([A-Z])/g,Re=/(?:left|right|width|margin|padding|x)/i,Be=/[\s,\(]\S/,Ie={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Le="transform",qe=Le+"Origin",Ye="O,Moz,ms,Ms,Webkit".split(","),Ne=function _checkPropPrefix(t,e,r){var i=(e||ue).style,n=5;if(t in i&&!r)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);n--&&!(Ye[n]+t in i););return n<0?null:(3===n?"ms":0<=n?Ye[n]:"")+t},Ue={deg:1,rad:1,turn:1},He={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},Xe={clearProps:function clearProps(t,e,r,i,n){if("isFromStart"!==n.data){var a=t._pt=new ee(t._pt,e,r,0,0,xd);return a.u=i,a.pr=-10,a.tween=n,t._props.push(r),1}}},Ve=[1,0,0,1,0,0],je={},Ze=function _parseTransform(t,e){var r=t._gsap||new Ft(t);if("x"in r&&!e&&!r.uncache)return r;var i,n,a,s,o,u,h,l,f,d,c,p,_,m,g,v,y,T,b,w,x,k,O,M,P,C,S,D,A,z,E,F,R=t.style,B=r.scaleX<0,I="deg",L=hd(t,qe)||"0";return i=n=a=u=h=l=f=d=c=0,s=o=1,r.svg=!(!t.getCTM||!od(t)),m=Dd(t,r.svg),r.svg&&(M=!r.uncache&&t.getAttribute("data-svg-origin"),Ed(t,M||L,!!M||r.originIsAbsolute,!1!==r.smooth,m)),p=r.xOrigin||0,_=r.yOrigin||0,m!==Ve&&(T=m[0],b=m[1],w=m[2],x=m[3],i=k=m[4],n=O=m[5],6===m.length?(s=Math.sqrt(T*T+b*b),o=Math.sqrt(x*x+w*w),u=T||b?Ee(b,T)*Ae:0,(f=w||x?Ee(w,x)*Ae+u:0)&&(o*=Math.cos(f*ze)),r.svg&&(i-=p-(p*T+_*w),n-=_-(p*b+_*x))):(F=m[6],z=m[7],S=m[8],D=m[9],A=m[10],E=m[11],i=m[12],n=m[13],a=m[14],h=(g=Ee(F,A))*Ae,g&&(M=k*(v=Math.cos(-g))+S*(y=Math.sin(-g)),P=O*v+D*y,C=F*v+A*y,S=k*-y+S*v,D=O*-y+D*v,A=F*-y+A*v,E=z*-y+E*v,k=M,O=P,F=C),l=(g=Ee(-w,A))*Ae,g&&(v=Math.cos(-g),E=x*(y=Math.sin(-g))+E*v,T=M=T*v-S*y,b=P=b*v-D*y,w=C=w*v-A*y),u=(g=Ee(b,T))*Ae,g&&(M=T*(v=Math.cos(g))+b*(y=Math.sin(g)),P=k*v+O*y,b=b*v-T*y,O=O*v-k*y,T=M,k=P),h&&359.9<Math.abs(h)+Math.abs(u)&&(h=u=0,l=180-l),s=aa(Math.sqrt(T*T+b*b+w*w)),o=aa(Math.sqrt(O*O+F*F)),g=Ee(k,O),f=2e-4<Math.abs(g)?g*Ae:0,c=E?1/(E<0?-E:E):0),r.svg&&(M=t.getAttribute("transform"),r.forceCSS=t.setAttribute("transform","")||!Bd(hd(t,Le)),M&&t.setAttribute("transform",M))),90<Math.abs(f)&&Math.abs(f)<270&&(B?(s*=-1,f+=u<=0?180:-180,u+=u<=0?180:-180):(o*=-1,f+=f<=0?180:-180)),r.x=((r.xPercent=i&&Math.round(t.offsetWidth/2)===Math.round(-i)?-50:0)?0:i)+"px",r.y=((r.yPercent=n&&Math.round(t.offsetHeight/2)===Math.round(-n)?-50:0)?0:n)+"px",r.z=a+"px",r.scaleX=aa(s),r.scaleY=aa(o),r.rotation=aa(u)+I,r.rotationX=aa(h)+I,r.rotationY=aa(l)+I,r.skewX=f+I,r.skewY=d+I,r.transformPerspective=c+"px",(r.zOrigin=parseFloat(L.split(" ")[2])||0)&&(R[qe]=Ke(L)),r.xOffset=r.yOffset=0,r.force3D=U.force3D,r.renderTransform=r.svg?tr:fe?Je:Qe,r.uncache=0,r},Ke=function _firstTwoOnly(t){return(t=t.split(" "))[0]+" "+t[1]},Qe=function _renderNon3DTransforms(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Je(t,e)},We="0deg",Ge="0px",$e=") ",Je=function _renderCSSTransforms(t,e){var r=e||this,i=r.xPercent,n=r.yPercent,a=r.x,s=r.y,o=r.z,u=r.rotation,h=r.rotationY,l=r.rotationX,f=r.skewX,d=r.skewY,c=r.scaleX,p=r.scaleY,_=r.transformPerspective,m=r.force3D,g=r.target,v=r.zOrigin,y="",T="auto"===m&&t&&1!==t||!0===m;if(v&&(l!==We||h!==We)){var b,w=parseFloat(h)*ze,x=Math.sin(w),k=Math.cos(w);w=parseFloat(l)*ze,b=Math.cos(w),a=Hd(g,a,x*b*-v),s=Hd(g,s,-Math.sin(w)*-v),o=Hd(g,o,k*b*-v+v)}_!==Ge&&(y+="perspective("+_+$e),(i||n)&&(y+="translate("+i+"%, "+n+"%) "),!T&&a===Ge&&s===Ge&&o===Ge||(y+=o!==Ge||T?"translate3d("+a+", "+s+", "+o+") ":"translate("+a+", "+s+$e),u!==We&&(y+="rotate("+u+$e),h!==We&&(y+="rotateY("+h+$e),l!==We&&(y+="rotateX("+l+$e),f===We&&d===We||(y+="skew("+f+", "+d+$e),1===c&&1===p||(y+="scale("+c+", "+p+$e),g.style[Le]=y||"translate(0, 0)"},tr=function _renderSVGTransforms(t,e){var r,i,n,a,s,o=e||this,u=o.xPercent,h=o.yPercent,l=o.x,f=o.y,d=o.rotation,c=o.skewX,p=o.skewY,_=o.scaleX,m=o.scaleY,g=o.target,v=o.xOrigin,y=o.yOrigin,T=o.xOffset,b=o.yOffset,w=o.forceCSS,x=parseFloat(l),k=parseFloat(f);d=parseFloat(d),c=parseFloat(c),(p=parseFloat(p))&&(c+=p=parseFloat(p),d+=p),d||c?(d*=ze,c*=ze,r=Math.cos(d)*_,i=Math.sin(d)*_,n=Math.sin(d-c)*-m,a=Math.cos(d-c)*m,c&&(p*=ze,s=Math.tan(c-p),n*=s=Math.sqrt(1+s*s),a*=s,p&&(s=Math.tan(p),r*=s=Math.sqrt(1+s*s),i*=s)),r=aa(r),i=aa(i),n=aa(n),a=aa(a)):(r=_,a=m,i=n=0),(x&&!~(l+"").indexOf("px")||k&&!~(f+"").indexOf("px"))&&(x=sd(g,"x",l,"px"),k=sd(g,"y",f,"px")),(v||y||T||b)&&(x=aa(x+v-(v*r+y*n)+T),k=aa(k+y-(v*i+y*a)+b)),(u||h)&&(s=g.getBBox(),x=aa(x+u/100*s.width),k=aa(k+h/100*s.height)),s="matrix("+r+","+i+","+n+","+a+","+x+","+k+")",g.setAttribute("transform",s),w&&(g.style[Le]=s)};_("padding,margin,Width,Radius",function(e,r){var t="Right",i="Bottom",n="Left",o=(r<3?["Top",t,i,n]:["Top"+n,"Top"+t,i+t,i+n]).map(function(t){return r<2?e+t:"border"+t+e});Xe[1<r?"border"+e:e]=function(e,t,r,i,n){var a,s;if(arguments.length<4)return a=o.map(function(t){return td(e,t,r)}),5===(s=a.join(" ")).split(a[0]).length?a[0]:s;a=(i+"").split(" "),s={},o.forEach(function(t,e){return s[t]=a[e]=a[e]||a[(e-1)/2|0]}),e.init(t,s,n)}});var er,rr,ir,nr={name:"css",register:kd,targetTest:function targetTest(t){return t.style&&t.nodeType},init:function init(t,e,r,i,n){var a,s,o,u,h,l,f,d,c,p,_,m,g,v,y,T=this._props,b=t.style;for(f in oe||kd(),e)if("autoRound"!==f&&(s=e[f],!ht[f]||!Lb(f,e,r,i,t,n)))if(h=typeof s,l=Xe[f],"function"===h&&(h=typeof(s=s.call(r,i,t,n))),"string"===h&&~s.indexOf("random(")&&(s=_a(s)),l)l(this,t,f,s,r)&&(y=1);else if("--"===f.substr(0,2))this.add(b,"setProperty",getComputedStyle(t).getPropertyValue(f)+"",s+"",i,n,0,0,f);else{if(a=td(t,f),u=parseFloat(a),(p="string"===h&&"="===s.charAt(1)?+(s.charAt(0)+"1"):0)&&(s=s.substr(2)),o=parseFloat(s),f in Ie&&("autoAlpha"===f&&(1===u&&"hidden"===td(t,"visibility")&&o&&(u=0),qd(this,b,"visibility",u?"inherit":"hidden",o?"inherit":"hidden",!o)),"scale"!==f&&"transform"!==f&&~(f=Ie[f]).indexOf(",")&&(f=f.split(",")[0])),_=f in De)if(m||((g=t._gsap).renderTransform||Ze(t),v=!1!==e.smoothOrigin&&g.smooth,(m=this._pt=new ee(this._pt,b,Le,0,1,g.renderTransform,g,0,-1)).dep=1),"scale"===f)this._pt=new ee(this._pt,g,"scaleY",g.scaleY,p?p*o:o-g.scaleY),T.push("scaleY",f),f+="X";else{if("transformOrigin"===f){s=wd(s),g.svg?Ed(t,s,0,v,0,this):((c=parseFloat(s.split(" ")[2])||0)!==g.zOrigin&&qd(this,g,"zOrigin",g.zOrigin,c),qd(this,b,f,Ke(a),Ke(s)));continue}if("svgOrigin"===f){Ed(t,s,1,v,0,this);continue}if(f in je){Od(this,g,f,u,s,p);continue}if("smoothOrigin"===f){qd(this,g,"smooth",g.smooth,s);continue}if("force3D"===f){g[f]=s;continue}if("transform"===f){Pd(this,s,t);continue}}else f in b||(f=Ne(f)||f);if(_||(o||0===o)&&(u||0===u)&&!Be.test(s)&&f in b)(d=(a+"").substr((u+"").length))!==(c=(s+"").substr(((o=o||0)+"").length)||(f in U.units?U.units[f]:d))&&(u=sd(t,f,a,c)),this._pt=new ee(this._pt,_?g:b,f,u,p?p*o:o-u,"px"!==c||!1===e.autoRound||_?Tc:Wc),this._pt.u=c||0,d!==c&&(this._pt.b=a,this._pt.r=Vc);else if(f in b)ud.call(this,t,f,a,s);else{if(!(f in t)){L(f,s);continue}this.add(t,f,t[f],s,i,n)}T.push(f)}y&&te(this)},get:td,aliases:Ie,getSetter:function getSetter(t,e,r){var i=Ie[e];return i&&i.indexOf(",")<0&&(e=i),e in De&&e!==qe&&(t._gsap.x||td(t,"x"))?r&&le===r?"scale"===e?ad:_c:(le=r||{})&&("scale"===e?bd:cd):t.style&&!q(t.style[e])?Zc:~e.indexOf("-")?$c:Zt(t,e)},core:{_removeProperty:pd,_getMatrix:Dd}};ie.utils.checkPrefix=Ne,ir=_((er="x,y,z,scale,scaleX,scaleY,xPercent,yPercent")+","+(rr="rotation,rotationX,rotationY,skewX,skewY")+",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",function(t){De[t]=1}),_(rr,function(t){U.units[t]="deg",je[t]=1}),Ie[ir[13]]=er+","+rr,_("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",function(t){var e=t.split(":");Ie[e[1]]=ir[e[0]]}),_("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(t){U.units[t]="px"}),ie.registerPlugin(nr);var ar=ie.registerPlugin(nr)||ie,sr=ar.core.Tween;e.Back=ke,e.Bounce=Me,e.CSSPlugin=nr,e.Circ=Se,e.Cubic=ye,e.Elastic=xe,e.Expo=Ce,e.Linear=ge,e.Power0=de,e.Power1=ce,e.Power2=pe,e.Power3=_e,e.Power4=me,e.Quad=ve,e.Quart=Te,e.Quint=be,e.Sine=Pe,e.SteppedEase=Oe,e.Strong=we,e.TimelineLite=Bt,e.TimelineMax=Bt,e.TweenLite=Ht,e.TweenMax=sr,e.default=ar,e.gsap=ar;if (typeof(window)==="undefined"||window!==e){Object.defineProperty(e,"__esModule",{value:!0})} else {delete e.default}});

window.Modernizr=function(a,b,c){function C(a){j.cssText=a}function D(a,b){return C(n.join(a+";")+(b||""))}function E(a,b){return typeof a===b}function F(a,b){return!!~(""+a).indexOf(b)}function G(a,b){for(var d in a){var e=a[d];if(!F(e,"-")&&j[e]!==c)return"pfx"==b?e:!0}return!1}function H(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:E(f,"function")?f.bind(d||b):f}return!1}function I(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return E(b,"string")||E(b,"undefined")?G(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),H(e,b,c))}function J(){e.input=function(c){for(var d=0,e=c.length;e>d;d++)u[c[d]]=!!(c[d]in k);return u.list&&(u.list=!(!b.createElement("datalist")||!a.HTMLDataListElement)),u}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var e,f,h,d=0,i=a.length;i>d;d++)k.setAttribute("type",f=a[d]),e="text"!==k.type,e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&"textfield"!==h.getComputedStyle(k,null).WebkitAppearance&&0!==k.offsetHeight,g.removeChild(k)):/^(search|tel)$/.test(f)||(e=/^(url|email)$/.test(f)?k.checkValidity&&k.checkValidity()===!1:k.value!=l)),t[a[d]]=!!e;return t}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var x,B,d="2.7.1",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={svg:"http://www.w3.org/2000/svg"},s={},t={},u={},v=[],w=v.slice,y=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))for(;d--;)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},z=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=E(e[d],"function"),E(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),A={}.hasOwnProperty;B=E(A,"undefined")||E(A.call,"undefined")?function(a,b){return b in a&&E(a.constructor.prototype[b],"undefined")}:function(a,b){return A.call(a,b)},Function.prototype.bind||(Function.prototype.bind=function(a){var b=this;if("function"!=typeof b)throw new TypeError;var c=w.call(arguments,1),d=function(){if(this instanceof d){var e=function(){};e.prototype=b.prototype;var f=new e,g=b.apply(f,c.concat(w.call(arguments)));return Object(g)===g?g:f}return b.apply(a,c.concat(w.call(arguments)))};return d}),s.flexbox=function(){return I("flexWrap")},s.canvas=function(){var a=b.createElement("canvas");return!(!a.getContext||!a.getContext("2d"))},s.canvastext=function(){return!(!e.canvas||!E(b.createElement("canvas").getContext("2d").fillText,"function"))},s.webgl=function(){return!!a.WebGLRenderingContext},s.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:y(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=9===a.offsetTop}),c},s.geolocation=function(){return"geolocation"in navigator},s.postmessage=function(){return!!a.postMessage},s.websqldatabase=function(){return!!a.openDatabase},s.indexedDB=function(){return!!I("indexedDB",a)},s.hashchange=function(){return z("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},s.history=function(){return!(!a.history||!history.pushState)},s.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},s.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},s.rgba=function(){return C("background-color:rgba(150,255,150,.5)"),F(j.backgroundColor,"rgba")},s.hsla=function(){return C("background-color:hsla(120,40%,100%,.5)"),F(j.backgroundColor,"rgba")||F(j.backgroundColor,"hsla")},s.multiplebgs=function(){return C("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(j.background)},s.backgroundsize=function(){return I("backgroundSize")},s.borderimage=function(){return I("borderImage")},s.borderradius=function(){return I("borderRadius")},s.boxshadow=function(){return I("boxShadow")},s.textshadow=function(){return""===b.createElement("div").style.textShadow},s.opacity=function(){return D("opacity:.55"),/^0.55$/.test(j.opacity)},s.cssanimations=function(){return I("animationName")},s.csscolumns=function(){return I("columnCount")},s.cssgradients=function(){var a="background-image:",b="gradient(linear,left top,right bottom,from(#9f9),to(white));",c="linear-gradient(left top,#9f9, white);";return C((a+"-webkit- ".split(" ").join(b+a)+n.join(c+a)).slice(0,-a.length)),F(j.backgroundImage,"gradient")},s.cssreflections=function(){return I("boxReflect")},s.csstransforms=function(){return!!I("transform")},s.csstransforms3d=function(){var a=!!I("perspective");return a&&"webkitPerspective"in g.style&&y("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b){a=9===b.offsetLeft&&3===b.offsetHeight}),a},s.csstransitions=function(){return I("transition")},s.fontface=function(){var a;return y('@font-face {font-family:"font";src:url("https://")}',function(c,d){var e=b.getElementById("smodernizr"),f=e.sheet||e.styleSheet,g=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"";a=/src/i.test(g)&&0===g.indexOf(d.split(" ")[0])}),a},s.generatedcontent=function(){var a;return y(["#",h,"{font:0/0 a}#",h,':after{content:"',l,'";visibility:hidden;font:3px/1 a}'].join(""),function(b){a=b.offsetHeight>=3}),a},s.video=function(){var a=b.createElement("video"),c=!1;try{(c=!!a.canPlayType)&&(c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""))}catch(d){}return c},s.audio=function(){var a=b.createElement("audio"),c=!1;try{(c=!!a.canPlayType)&&(c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(d){}return c},s.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},s.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},s.webworkers=function(){return!!a.Worker},s.applicationcache=function(){return!!a.applicationCache},s.svg=function(){return!!b.createElementNS&&!!b.createElementNS(r.svg,"svg").createSVGRect},s.inlinesvg=function(){var a=b.createElement("div");return a.innerHTML="<svg/>",(a.firstChild&&a.firstChild.namespaceURI)==r.svg},s.smil=function(){return!!b.createElementNS&&/SVGAnimate/.test(m.call(b.createElementNS(r.svg,"animate")))},s.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(m.call(b.createElementNS(r.svg,"clipPath")))};for(var K in s)B(s,K)&&(x=K.toLowerCase(),e[x]=s[K](),v.push((e[x]?"":"no-")+x));return e.input||J(),e.addTest=function(a,b){if("object"==typeof a)for(var d in a)B(a,d)&&e.addTest(d,a[d]);else{if(a=a.toLowerCase(),e[a]!==c)return e;b="function"==typeof b?b():b,"undefined"!=typeof f&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},C(""),i=k=null,function(a,b){function l(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function m(){var a=s.elements;return"string"==typeof a?a.split(" "):a}function n(a){var b=j[a[h]];return b||(b={},i++,a[h]=i,j[i]=b),b}function o(a,c,d){if(c||(c=b),k)return c.createElement(a);d||(d=n(c));var g;return g=d.cache[a]?d.cache[a].cloneNode():f.test(a)?(d.cache[a]=d.createElem(a)).cloneNode():d.createElem(a),!g.canHaveChildren||e.test(a)||g.tagUrn?g:d.frag.appendChild(g)}function p(a,c){if(a||(a=b),k)return a.createDocumentFragment();c=c||n(a);for(var d=c.frag.cloneNode(),e=0,f=m(),g=f.length;g>e;e++)d.createElement(f[e]);return d}function q(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?o(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+m().join().replace(/[\w\-]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function r(a){a||(a=b);var c=n(a);return!s.shivCSS||g||c.hasCSS||(c.hasCSS=!!l(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||q(a,c),a}var g,k,c="3.7.0",d=a.html5||{},e=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,f=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,h="_html5shiv",i=0,j={};!function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",g="hidden"in a,k=1==a.childNodes.length||function(){b.createElement("a");var a=b.createDocumentFragment();return"undefined"==typeof a.cloneNode||"undefined"==typeof a.createDocumentFragment||"undefined"==typeof a.createElement}()}catch(c){g=!0,k=!0}}();var s={elements:d.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:c,shivCSS:d.shivCSS!==!1,supportsUnknownElements:k,shivMethods:d.shivMethods!==!1,type:"default",shivDocument:r,createElement:o,createDocumentFragment:p};a.html5=s,r(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.hasEvent=z,e.testProp=function(a){return G([a])},e.testAllProps=I,e.testStyles=y,e.prefixed=function(a,b,c){return b?I(a,b,c):I(a,"pfx")},g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+v.join(" "):""),e}(this,this.document),function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var A,B,l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}};B=function(a){function b(a){var e,f,g,a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a};for(f=0;d>f;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;b>f;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var c,b=0;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var m,n,h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var l,o,k=b.createElement("script"),e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var j,e=b.createElement("link"),c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};

/*! Hammer.JS - v2.0.8 - 2016-04-23
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(j(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;)b.call(c,a[e],e,a),e++;else for(e in a)a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}function h(b,c,d){var e="DEPRECATED METHOD: "+c+"\n"+d+" AT \n";return function(){var c=new Error("get-stack-trace"),d=c&&c.stack?c.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",f=a.console&&(a.console.warn||a.console.log);return f&&f.call(a.console,e,d),b.apply(this,arguments)}}function i(a,b,c){var d,e=b.prototype;d=a.prototype=Object.create(e),d.constructor=a,d._super=e,c&&la(d,c)}function j(a,b){return function(){return a.apply(b,arguments)}}function k(a,b){return typeof a==oa?a.apply(b?b[0]||d:d,b):a}function l(a,b){return a===d?b:a}function m(a,b,c){g(q(b),function(b){a.addEventListener(b,c,!1)})}function n(a,b,c){g(q(b),function(b){a.removeEventListener(b,c,!1)})}function o(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function p(a,b){return a.indexOf(b)>-1}function q(a){return a.trim().split(/\s+/g)}function r(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function s(a){return Array.prototype.slice.call(a,0)}function t(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];r(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function u(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ma.length;){if(c=ma[g],e=c?c+f:b,e in a)return e;g++}return d}function v(){return ua++}function w(b){var c=b.ownerDocument||b;return c.defaultView||c.parentWindow||a}function x(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){k(a.options.enable,[a])&&c.handler(b)},this.init()}function y(a){var b,c=a.options.inputClass;return new(b=c?c:xa?M:ya?P:wa?R:L)(a,z)}function z(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&Ea&&d-e===0,g=b&(Ga|Ha)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,A(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function A(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=D(b)),e>1&&!c.firstMultiple?c.firstMultiple=D(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=E(d);b.timeStamp=ra(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=I(h,i),b.distance=H(h,i),B(c,b),b.offsetDirection=G(b.deltaX,b.deltaY);var j=F(b.deltaTime,b.deltaX,b.deltaY);b.overallVelocityX=j.x,b.overallVelocityY=j.y,b.overallVelocity=qa(j.x)>qa(j.y)?j.x:j.y,b.scale=g?K(g.pointers,d):1,b.rotation=g?J(g.pointers,d):0,b.maxPointers=c.prevInput?b.pointers.length>c.prevInput.maxPointers?b.pointers.length:c.prevInput.maxPointers:b.pointers.length,C(c,b);var k=a.element;o(b.srcEvent.target,k)&&(k=b.srcEvent.target),b.target=k}function B(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};b.eventType!==Ea&&f.eventType!==Ga||(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function C(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Ha&&(i>Da||h.velocity===d)){var j=b.deltaX-h.deltaX,k=b.deltaY-h.deltaY,l=F(i,j,k);e=l.x,f=l.y,c=qa(l.x)>qa(l.y)?l.x:l.y,g=G(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function D(a){for(var b=[],c=0;c<a.pointers.length;)b[c]={clientX:pa(a.pointers[c].clientX),clientY:pa(a.pointers[c].clientY)},c++;return{timeStamp:ra(),pointers:b,center:E(b),deltaX:a.deltaX,deltaY:a.deltaY}}function E(a){var b=a.length;if(1===b)return{x:pa(a[0].clientX),y:pa(a[0].clientY)};for(var c=0,d=0,e=0;b>e;)c+=a[e].clientX,d+=a[e].clientY,e++;return{x:pa(c/b),y:pa(d/b)}}function F(a,b,c){return{x:b/a||0,y:c/a||0}}function G(a,b){return a===b?Ia:qa(a)>=qa(b)?0>a?Ja:Ka:0>b?La:Ma}function H(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function I(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function J(a,b){return I(b[1],b[0],Ra)+I(a[1],a[0],Ra)}function K(a,b){return H(b[0],b[1],Ra)/H(a[0],a[1],Ra)}function L(){this.evEl=Ta,this.evWin=Ua,this.pressed=!1,x.apply(this,arguments)}function M(){this.evEl=Xa,this.evWin=Ya,x.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function N(){this.evTarget=$a,this.evWin=_a,this.started=!1,x.apply(this,arguments)}function O(a,b){var c=s(a.touches),d=s(a.changedTouches);return b&(Ga|Ha)&&(c=t(c.concat(d),"identifier",!0)),[c,d]}function P(){this.evTarget=bb,this.targetIds={},x.apply(this,arguments)}function Q(a,b){var c=s(a.touches),d=this.targetIds;if(b&(Ea|Fa)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=s(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return o(a.target,i)}),b===Ea)for(e=0;e<f.length;)d[f[e].identifier]=!0,e++;for(e=0;e<g.length;)d[g[e].identifier]&&h.push(g[e]),b&(Ga|Ha)&&delete d[g[e].identifier],e++;return h.length?[t(f.concat(h),"identifier",!0),h]:void 0}function R(){x.apply(this,arguments);var a=j(this.handler,this);this.touch=new P(this.manager,a),this.mouse=new L(this.manager,a),this.primaryTouch=null,this.lastTouches=[]}function S(a,b){a&Ea?(this.primaryTouch=b.changedPointers[0].identifier,T.call(this,b)):a&(Ga|Ha)&&T.call(this,b)}function T(a){var b=a.changedPointers[0];if(b.identifier===this.primaryTouch){var c={x:b.clientX,y:b.clientY};this.lastTouches.push(c);var d=this.lastTouches,e=function(){var a=d.indexOf(c);a>-1&&d.splice(a,1)};setTimeout(e,cb)}}function U(a){for(var b=a.srcEvent.clientX,c=a.srcEvent.clientY,d=0;d<this.lastTouches.length;d++){var e=this.lastTouches[d],f=Math.abs(b-e.x),g=Math.abs(c-e.y);if(db>=f&&db>=g)return!0}return!1}function V(a,b){this.manager=a,this.set(b)}function W(a){if(p(a,jb))return jb;var b=p(a,kb),c=p(a,lb);return b&&c?jb:b||c?b?kb:lb:p(a,ib)?ib:hb}function X(){if(!fb)return!1;var b={},c=a.CSS&&a.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(d){b[d]=c?a.CSS.supports("touch-action",d):!0}),b}function Y(a){this.options=la({},this.defaults,a||{}),this.id=v(),this.manager=null,this.options.enable=l(this.options.enable,!0),this.state=nb,this.simultaneous={},this.requireFail=[]}function Z(a){return a&sb?"cancel":a&qb?"end":a&pb?"move":a&ob?"start":""}function $(a){return a==Ma?"down":a==La?"up":a==Ja?"left":a==Ka?"right":""}function _(a,b){var c=b.manager;return c?c.get(a):a}function aa(){Y.apply(this,arguments)}function ba(){aa.apply(this,arguments),this.pX=null,this.pY=null}function ca(){aa.apply(this,arguments)}function da(){Y.apply(this,arguments),this._timer=null,this._input=null}function ea(){aa.apply(this,arguments)}function fa(){aa.apply(this,arguments)}function ga(){Y.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function ha(a,b){return b=b||{},b.recognizers=l(b.recognizers,ha.defaults.preset),new ia(a,b)}function ia(a,b){this.options=la({},ha.defaults,b||{}),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=a,this.input=y(this),this.touchAction=new V(this,this.options.touchAction),ja(this,!0),g(this.options.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function ja(a,b){var c=a.element;if(c.style){var d;g(a.options.cssProps,function(e,f){d=u(c.style,f),b?(a.oldCssProps[d]=c.style[d],c.style[d]=e):c.style[d]=a.oldCssProps[d]||""}),b||(a.oldCssProps={})}}function ka(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var la,ma=["","webkit","Moz","MS","ms","o"],na=b.createElement("div"),oa="function",pa=Math.round,qa=Math.abs,ra=Date.now;la="function"!=typeof Object.assign?function(a){if(a===d||null===a)throw new TypeError("Cannot convert undefined or null to object");for(var b=Object(a),c=1;c<arguments.length;c++){var e=arguments[c];if(e!==d&&null!==e)for(var f in e)e.hasOwnProperty(f)&&(b[f]=e[f])}return b}:Object.assign;var sa=h(function(a,b,c){for(var e=Object.keys(b),f=0;f<e.length;)(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++;return a},"extend","Use `assign`."),ta=h(function(a,b){return sa(a,b,!0)},"merge","Use `assign`."),ua=1,va=/mobile|tablet|ip(ad|hone|od)|android/i,wa="ontouchstart"in a,xa=u(a,"PointerEvent")!==d,ya=wa&&va.test(navigator.userAgent),za="touch",Aa="pen",Ba="mouse",Ca="kinect",Da=25,Ea=1,Fa=2,Ga=4,Ha=8,Ia=1,Ja=2,Ka=4,La=8,Ma=16,Na=Ja|Ka,Oa=La|Ma,Pa=Na|Oa,Qa=["x","y"],Ra=["clientX","clientY"];x.prototype={handler:function(){},init:function(){this.evEl&&m(this.element,this.evEl,this.domHandler),this.evTarget&&m(this.target,this.evTarget,this.domHandler),this.evWin&&m(w(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(w(this.element),this.evWin,this.domHandler)}};var Sa={mousedown:Ea,mousemove:Fa,mouseup:Ga},Ta="mousedown",Ua="mousemove mouseup";i(L,x,{handler:function(a){var b=Sa[a.type];b&Ea&&0===a.button&&(this.pressed=!0),b&Fa&&1!==a.which&&(b=Ga),this.pressed&&(b&Ga&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:Ba,srcEvent:a}))}});var Va={pointerdown:Ea,pointermove:Fa,pointerup:Ga,pointercancel:Ha,pointerout:Ha},Wa={2:za,3:Aa,4:Ba,5:Ca},Xa="pointerdown",Ya="pointermove pointerup pointercancel";a.MSPointerEvent&&!a.PointerEvent&&(Xa="MSPointerDown",Ya="MSPointerMove MSPointerUp MSPointerCancel"),i(M,x,{handler:function(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Va[d],f=Wa[a.pointerType]||a.pointerType,g=f==za,h=r(b,a.pointerId,"pointerId");e&Ea&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ga|Ha)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Za={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},$a="touchstart",_a="touchstart touchmove touchend touchcancel";i(N,x,{handler:function(a){var b=Za[a.type];if(b===Ea&&(this.started=!0),this.started){var c=O.call(this,a,b);b&(Ga|Ha)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}}});var ab={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},bb="touchstart touchmove touchend touchcancel";i(P,x,{handler:function(a){var b=ab[a.type],c=Q.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}});var cb=2500,db=25;i(R,x,{handler:function(a,b,c){var d=c.pointerType==za,e=c.pointerType==Ba;if(!(e&&c.sourceCapabilities&&c.sourceCapabilities.firesTouchEvents)){if(d)S.call(this,b,c);else if(e&&U.call(this,c))return;this.callback(a,b,c)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var eb=u(na.style,"touchAction"),fb=eb!==d,gb="compute",hb="auto",ib="manipulation",jb="none",kb="pan-x",lb="pan-y",mb=X();V.prototype={set:function(a){a==gb&&(a=this.compute()),fb&&this.manager.element.style&&mb[a]&&(this.manager.element.style[eb]=a),this.actions=a.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var a=[];return g(this.manager.recognizers,function(b){k(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),W(a.join(" "))},preventDefaults:function(a){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=p(d,jb)&&!mb[jb],f=p(d,lb)&&!mb[lb],g=p(d,kb)&&!mb[kb];if(e){var h=1===a.pointers.length,i=a.distance<2,j=a.deltaTime<250;if(h&&i&&j)return}return g&&f?void 0:e||f&&c&Na||g&&c&Oa?this.preventSrc(b):void 0},preventSrc:function(a){this.manager.session.prevented=!0,a.preventDefault()}};var nb=1,ob=2,pb=4,qb=8,rb=qb,sb=16,tb=32;Y.prototype={defaults:{},set:function(a){return la(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=_(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function(a){return f(a,"dropRecognizeWith",this)?this:(a=_(a,this),delete this.simultaneous[a.id],this)},requireFailure:function(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=_(a,this),-1===r(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function(a){if(f(a,"dropRequireFailure",this))return this;a=_(a,this);var b=r(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(a){return!!this.simultaneous[a.id]},emit:function(a){function b(b){c.manager.emit(b,a)}var c=this,d=this.state;qb>d&&b(c.options.event+Z(d)),b(c.options.event),a.additionalEvent&&b(a.additionalEvent),d>=qb&&b(c.options.event+Z(d))},tryEmit:function(a){return this.canEmit()?this.emit(a):void(this.state=tb)},canEmit:function(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(tb|nb)))return!1;a++}return!0},recognize:function(a){var b=la({},a);return k(this.options.enable,[this,b])?(this.state&(rb|sb|tb)&&(this.state=nb),this.state=this.process(b),void(this.state&(ob|pb|qb|sb)&&this.tryEmit(b))):(this.reset(),void(this.state=tb))},process:function(a){},getTouchAction:function(){},reset:function(){}},i(aa,Y,{defaults:{pointers:1},attrTest:function(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function(a){var b=this.state,c=a.eventType,d=b&(ob|pb),e=this.attrTest(a);return d&&(c&Ha||!e)?b|sb:d||e?c&Ga?b|qb:b&ob?b|pb:ob:tb}}),i(ba,aa,{defaults:{event:"pan",threshold:10,pointers:1,direction:Pa},getTouchAction:function(){var a=this.options.direction,b=[];return a&Na&&b.push(lb),a&Oa&&b.push(kb),b},directionTest:function(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Na?(e=0===f?Ia:0>f?Ja:Ka,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Ia:0>g?La:Ma,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function(a){return aa.prototype.attrTest.call(this,a)&&(this.state&ob||!(this.state&ob)&&this.directionTest(a))},emit:function(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=$(a.direction);b&&(a.additionalEvent=this.options.event+b),this._super.emit.call(this,a)}}),i(ca,aa,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&ob)},emit:function(a){if(1!==a.scale){var b=a.scale<1?"in":"out";a.additionalEvent=this.options.event+b}this._super.emit.call(this,a)}}),i(da,Y,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[hb]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ga|Ha)&&!f)this.reset();else if(a.eventType&Ea)this.reset(),this._timer=e(function(){this.state=rb,this.tryEmit()},b.time,this);else if(a.eventType&Ga)return rb;return tb},reset:function(){clearTimeout(this._timer)},emit:function(a){this.state===rb&&(a&&a.eventType&Ga?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=ra(),this.manager.emit(this.options.event,this._input)))}}),i(ea,aa,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[jb]},attrTest:function(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&ob)}}),i(fa,aa,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Na|Oa,pointers:1},getTouchAction:function(){return ba.prototype.getTouchAction.call(this)},attrTest:function(a){var b,c=this.options.direction;return c&(Na|Oa)?b=a.overallVelocity:c&Na?b=a.overallVelocityX:c&Oa&&(b=a.overallVelocityY),this._super.attrTest.call(this,a)&&c&a.offsetDirection&&a.distance>this.options.threshold&&a.maxPointers==this.options.pointers&&qa(b)>this.options.velocity&&a.eventType&Ga},emit:function(a){var b=$(a.offsetDirection);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),i(ga,Y,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[ib]},process:function(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&Ea&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ga)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||H(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=rb,this.tryEmit()},b.interval,this),ob):rb}return tb},failTimeout:function(){return this._timer=e(function(){this.state=tb},this.options.interval,this),tb},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==rb&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),ha.VERSION="2.0.8",ha.defaults={domEvents:!1,touchAction:gb,enable:!0,inputTarget:null,inputClass:null,preset:[[ea,{enable:!1}],[ca,{enable:!1},["rotate"]],[fa,{direction:Na}],[ba,{direction:Na},["swipe"]],[ga],[ga,{event:"doubletap",taps:2},["tap"]],[da]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var ub=1,vb=2;ia.prototype={set:function(a){return la(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function(a){this.session.stopped=a?vb:ub},recognize:function(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&rb)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;)c=d[f],b.stopped===vb||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(ob|pb|qb)&&(e=b.curRecognizer=c),f++}},get:function(a){if(a instanceof Y)return a;for(var b=this.recognizers,c=0;c<b.length;c++)if(b[c].options.event==a)return b[c];return null},add:function(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function(a){if(f(a,"remove",this))return this;if(a=this.get(a)){var b=this.recognizers,c=r(b,a);-1!==c&&(b.splice(c,1),this.touchAction.update())}return this},on:function(a,b){if(a!==d&&b!==d){var c=this.handlers;return g(q(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this}},off:function(a,b){if(a!==d){var c=this.handlers;return g(q(a),function(a){b?c[a]&&c[a].splice(r(c[a],b),1):delete c[a]}),this}},emit:function(a,b){this.options.domEvents&&ka(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;)c[d](b),d++}},destroy:function(){this.element&&ja(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},la(ha,{INPUT_START:Ea,INPUT_MOVE:Fa,INPUT_END:Ga,INPUT_CANCEL:Ha,STATE_POSSIBLE:nb,STATE_BEGAN:ob,STATE_CHANGED:pb,STATE_ENDED:qb,STATE_RECOGNIZED:rb,STATE_CANCELLED:sb,STATE_FAILED:tb,DIRECTION_NONE:Ia,DIRECTION_LEFT:Ja,DIRECTION_RIGHT:Ka,DIRECTION_UP:La,DIRECTION_DOWN:Ma,DIRECTION_HORIZONTAL:Na,DIRECTION_VERTICAL:Oa,DIRECTION_ALL:Pa,Manager:ia,Input:x,TouchAction:V,TouchInput:P,MouseInput:L,PointerEventInput:M,TouchMouseInput:R,SingleTouchInput:N,Recognizer:Y,AttrRecognizer:aa,Tap:ga,Pan:ba,Swipe:fa,Pinch:ca,Rotate:ea,Press:da,on:m,off:n,each:g,merge:ta,extend:sa,assign:la,inherit:i,bindFn:j,prefixed:u});var wb="undefined"!=typeof a?a:"undefined"!=typeof self?self:{};wb.Hammer=ha,"function"==typeof define&&define.amd?define(function(){return ha}):"undefined"!=typeof module&&module.exports?module.exports=ha:a[c]=ha}(window,document,"Hammer");
//# sourceMappingURL=hammer.min.js.map
(function() {

  var _instance = [
    // {
    //   name: MapSceneOne,
    //   x: 650,
    //   y: 950,
    //   element: null
    // },
    // {
    //   name: MapSceneTwo, // show brees
    //   x: 650,
    //   y: 950,
    //   element: null
    // },
    // {
    //   name: MapSceneThree, // oblique
    //   x: 810,
    //   y: 700,
    //   element: null
    // },
    // {
    //   name: MapSceneFour, // shoulder
    //   x: 500,
    //   y: 460,
    //   element: null
    // },
    // {
    //   name: MapSceneFive, // thumb
    //   x: 380,
    //   y: 230,
    //   element: null
    // },
    // {
    //   name: MapSceneSix, // zoom out
    //   x: 650,
    //   y: 950,
    //   element: null
    // },
    // {
    //   name: MapSceneSeven, // hide
    //   x: 650,
    //   y: 950,
    //   element: null
    // },
    // {
    //   name: MapSceneTwo, // show rodgers
    //   x: 650,
    //   y: 950,
    //   element: null
    // },
    // {
    //   name: MapSceneThree, // left collarbone
    //   x: 810,
    //   y: 400,
    //   element: null
    // },
    // {
    //   name: MapSceneFour, // right collarbone
    //   x: 610,
    //   y: 400,
    //   element: null
    // },
    // {
    //   name: MapSceneFive, // calf
    //   x: 890,
    //   y: 1430,
    //   element: null
    // },
    // {
    //   name: MapSceneSix, // zoom out
    //   x: 650,
    //   y: 950,
    //   element: null
    // },
    // {
    //   name: MapSceneSeven, // hide
    //   x: 650,
    //   y: 950,
    //   element: null
    // },
    // {
    //   name: MapSceneTwo, // show ben
    //   x: 650,
    //   y: 950,
    //   element: null
    // },
    // {
    //   name: MapSceneThree, // chest/shoulder
    //   x: 640,
    //   y: 400,
    //   element: null
    // },
    // {
    //   name: MapSceneFour, // knee
    //   x: 750,
    //   y: 1360,
    //   element: null
    // },
    // {
    //   name: MapSceneFive, // foot
    //   x: 380,
    //   y: 1700,
    //   element: null
    // },
    // {
    //   name: MapSceneSix,
    //   x: 650,
    //   y: 950,
    //   element: null
    // },
    // {
    //   name: MapSceneSeven,
    //   x: 650,
    //   y: 950,
    //   element: null
    // }
  ];

  _instance.zoomedOut = .23;
  _instance.zoomedIn = .25;
  _instance.zoomedDetail = .5;
  _instance.transitions = [];

  _instance.addTransition = function(obj) {
    _instance.transitions.push(obj);
  };

  // _instance.addHighlight = function(timeline) {
  //   _instance.addHighlightHide(timeline);
  //   _instance.addHighlightShow(timeline);
  // };

  // _instance.addHighlightHide = function(timeline) {
  //   timeline.add(TweenLite.to(Model.spotlight, .5, {
  //     opacity: 0,
  //     ease: Quad.easeInOut
  //   }), '-=4.5');
  // };
  //
  // _instance.addHighlightShow = function(timeline) {
  //   timeline.add(TweenLite.to(Model.spotlight, .5, {
  //     opacity: 1,
  //     ease: Quad.easeInOut
  //   }), '-=.75');
  // };

  // _instance.scaleMovement = function(timeline, scaleEl) {
  //   timeline.add(gsap.to(scaleEl, {
  //     duration: 2,
  //     scale: .43,
  //     ease: 'quad.inOut'
  //   }), '-=4');
  //
  //   timeline.add(gsap.to(scaleEl, {
  //     duration: 2,
  //     scale: .5,
  //     ease: 'quad.inOut'
  //   }), '-=2');
  // };

  window.AnimationSettings = _instance;

})();

(function() {
  var _instance = {};

  _instance.mainContainer;
  _instance.baseScale = 0;
  _instance.spotlight;
  _instance.isSmallScreen = false;
  // _instance.svg;
  // _instance.managers = {};

  _instance.preventWindowScroll = false;





  // _instance.basePath = 'http://espn.joehow.com/mascotville/v2/02/images/';
  // _instance.basePath = 'images/';
  // _instance.basePath = 'images/';// 'https://a.espncdn.com/prod/styles/pagetype/otl/20200604_mascotville/images/';

  _instance.init = function() {
    // _instance.managers.data = new DataManager();
    // _instance.managers.url = new URLManager();
    // _instance.managers.resize = new ResizeManager();
    // _instance.managers.scroll = new ScrollManager();
    // _instance.managers.menu = new MenuManager();
    // _instance.managers.home = new HomeManager();
    // _instance.managers.gallery = new GalleryManager();
    // _instance.managers.artistOverlay = new ArtistOverlayManager();

    // set up tracking

    if (window.screen) {
      if (window.screen.width < 500 || window.screen.height < 500) {
        _instance.isSmallScreen = true;
      }
    }
  };

  _instance.callTracking = function(str) {
    var canESPNAndTrack = espn && espn.track;
    if (canESPNAndTrack) {

      var baseStr = Model.mainContainer.getAttribute('data-tracking-name');
      var fullStr = 'espncom:' + baseStr + ':' + str;

      espn.track.trackLink({
        linkPos: fullStr,
        linkId: null
      });
    }
  };

  _instance.getSVG = function(name) {
    var svg = _instance.svg.querySelector('.svg--' + name).cloneNode(true);

    if (!svg) {
      return false;
    }

    return svg;
  };


  window.Model = _instance;
})();

function MapSceneFive(data, scaleEl, panEl) {

  var _instance = document.createElement('div');

  _instance.isLoaded = false;

  var CLASS_NAME = 'map-scene-five';

  var _entranceTl;
  // var _exitTl;
  var _bg;
  var _mg;
  var _fg;
  var _cameraLight;
  var _tvScreen;
  var _transitionImg;
  var _isEnabledAnimations = false;

  function init() {
    _instance.classList.add('map-scene');
    _instance.classList.add(CLASS_NAME);

    _instance.style.display = 'none';

    gsap.set(_instance, {
      z: 1
    });

    buildLayers();
    buildEffects();
    buildEntrance();
    buildExit();

    addListeners();
  }

  function addListeners() {

  }

  function buildLayers() {
    // _bg = document.createElement('img');
    // _bg.classList.add(CLASS_NAME + '__bg');
    // _instance.appendChild(_bg);
    //
    // _mg = document.createElement('img');
    // _mg.classList.add(CLASS_NAME + '__mg');
    // _instance.appendChild(_mg);
    //
    // _fg = document.createElement('img');
    // _fg.classList.add(CLASS_NAME + '__fg');
    // _instance.appendChild(_fg);
  }

  function buildEffects() {
    // _tvScreen = document.createElement('img');
    // _tvScreen.classList.add(CLASS_NAME + '__tv-screen');
    // _instance.appendChild(_tvScreen);
    // //
    // _cameraLight = document.createElement('img');
    // _cameraLight.classList.add(CLASS_NAME + '__light');
    // _instance.appendChild(_cameraLight);
    //
    // _transitionImg = document.createElement('img');
    // _transitionImg.classList.add(CLASS_NAME + '__transition-image');
    // _instance.appendChild(_transitionImg);
  }

  function buildEntrance() {
    // TweenLite.set(_instance, {
    //   scale: 1.1
    // });
    //
    // TweenLite.set([_bg, _tvScreen], {
    //   y: 150
    // });
    //
    // TweenLite.set(_mg, {
    //   y: 200
    // });
    //
    // TweenLite.set([_fg, _cameraLight, _transitionImg], {
    //   y: 250
    // });

    _entranceTl = gsap.timeline({});

    // _entranceTl.add(TweenLite.to(scaleEl, 2, {
    //   scale: 1,
    //   ease: Quad.easeInOut
    // }));

    _entranceTl.add(gsap.to(panEl, {
      duration: 4,
      x: -data.x,
      y: -data.y,
      ease: Quad.easeInOut
    }));

    AnimationSettings.scaleMovement(_entranceTl, scaleEl);

    // _entranceTl.add(TweenLite.to(scaleEl, 2, {
    //   scale: 1,
    //   ease: Quad.easeInOut
    // }), '-=2');

    // _entranceTl.add(TweenLite.to(Model.spotlight, 1, {
    //   opacity: 0,
    //   ease: Quad.easeInOut
    // }), '-=4');
    //
    // _entranceTl.add(TweenLite.to(Model.spotlight, 1, {
    //   opacity: 1,
    //   ease: Quad.easeInOut
    // }), '-=1');

    AnimationSettings.addHighlight(_entranceTl);

    //
    // _entranceTl.add(TweenLite.to(scaleEl, 4, {
    //   scale: 1.2,
    //   ease: Quad.easeInOut
    // }), '-=4');

    // _entranceTl.add(TweenLite.to(_instance, 4, {
    //   scale: 1,
    //   ease: Quad.easeInOut
    // }), '-=4');
    //
    // _entranceTl.add(TweenLite.to([_bg, _tvScreen, _mg, _fg, _cameraLight, _transitionImg], 4, {
    //   y: 0,
    //   ease: Quad.easeInOut
    // }), '-=4');
    //
    // _entranceTl.add(TweenLite.to([_fg, _cameraLight], 4, {
    //   y: 0,
    //   ease: Quad.easeInOut
    // }), '-=4');

    _entranceTl.pause();
  }

  function buildExit() {
    // _exitTl = new TimelineLite({});

    // NOTE: timing matches the next scene's entrance
    // _exitTl.add(TweenLite.to(_bg, 1, {
    //   x: 50,
    //   y: -50,
    //   ease: Quad.easeInOut
    // }));
    //
    // _exitTl.add(TweenLite.to(_mg, 4, {
    //   x: -50,
    //   ease: Quad.easeInOut
    // }));
    //
    // _exitTl.add(TweenLite.to([_fg, _cameraLight], 4, {
    //   x: -80,
    //   ease: Quad.easeInOut
    // }), '-=4');

    // _exitTl.pause();
  }


  /*
    Event handlers
  */

  function handleEvent(e) {

  }


  /*
    Public methods
  */

  _instance.transitionIn = function(perc) {
    _entranceTl.progress(perc);
  };

  _instance.transitionOut = function(perc) {
    // _exitTl.progress(perc);
  };

  _instance.enableAnimations = function() {
    if (_isEnabledAnimations === false) {
      _isEnabledAnimations = true;
      _instance.classList.add('allow-animations');
    }
  };

  _instance.disableAnimations = function() {
    if (_isEnabledAnimations === true) {
      _isEnabledAnimations = false;
      _instance.classList.remove('allow-animations');
    }
  };

  _instance.load = function() {
    if (_instance.isLoaded === false) {
      _instance.isLoaded = true;
      _instance.style.display = '';
      // _bg.src = Model.basePath + 'scene-three/background.png';
      // _mg.src = Model.basePath + 'scene-three/midground.png';
      // _fg.src = Model.basePath + 'scene-three/foreground.png';
      // _cameraLight.src = Model.basePath + 'scene-three/blinkinglight.png';
      // _tvScreen.src = Model.basePath + 'scene-three/monitor500.gif';
      // _transitionImg.src = Model.basePath + 'scene-three/transition.png';
    }
  };

  _instance.unload = function() {
    if (_instance.isLoaded === true) {
      _instance.isLoaded = false;
      _instance.style.display = 'none';
      // _bg.src = '';
      // _mg.src = '';
      // _fg.src = '';
    }
  };

  init();

  return _instance;
}

function MapSceneFour(data, scaleEl, panEl) {

  var _instance = document.createElement('div');

  _instance.isLoaded = false;

  var CLASS_NAME = 'map-scene-four';

  var _entranceTl;
  // var _exitTl;
  var _bg;
  var _mg;
  var _fg;
  var _isEnabledAnimations = false;

  function init() {
    _instance.classList.add('map-scene');
    _instance.classList.add(CLASS_NAME);

    _instance.style.display = 'none';

    buildLayers();
    buildEffects();
    buildEntrance();
    buildExit();

    addListeners();
  }

  function addListeners() {

  }

  function buildLayers() {
    // _bg = document.createElement('img');
    // _bg.classList.add(CLASS_NAME + '__bg');
    // _instance.appendChild(_bg);
    //
    // _mg = document.createElement('img');
    // _mg.classList.add(CLASS_NAME + '__mg');
    // _instance.appendChild(_mg);
    //
    // _fg = document.createElement('img');
    // _fg.classList.add(CLASS_NAME + '__fg');
    // _instance.appendChild(_fg);
  }

  function buildEffects() {
    // _field = document.createElement('img');
    // _field.classList.add(CLASS_NAME + '__field');
    // _instance.appendChild(_field);

    // for (var j = 0; j < 2; j++) {
    //   var sign = document.createElement('div');
    //   sign.classList.add(CLASS_NAME + '__sign');
    //   sign.classList.add(CLASS_NAME + '__sign--' + (j + 1));
    //   _instance.appendChild(sign);
    // }
    //
    // for (var j = 0; j < 3; j++) {
    //   var flash = document.createElement('div');
    //   flash.classList.add(CLASS_NAME + '__flash');
    //   flash.classList.add(CLASS_NAME + '__flash--' + (j + 1));
    //   _instance.appendChild(flash);
    // }
  }

  function buildEntrance() {
    // TweenLite.set(_bg, {
    //   x: -60
    // });
    // //
    // TweenLite.set(_mg, {
    //   x: -30,
    //   z: 1,
    // });
    //
    // TweenLite.set(_fg, {
    //   x: 0,
    //   z: 1,
    // });

    _entranceTl = gsap.timeline({});

    _entranceTl.add(gsap.to(panEl, {
      duration: 4,
      x: -data.x,
      y: -data.y,
      ease: Quad.easeInOut
    }));

    // TimelineAnimations.addScale(_entranceTl)
    // TimelineAnimations.addSpotlight(_entranceTl)

    AnimationSettings.scaleMovement(_entranceTl, scaleEl);

    // _entranceTl.add(TweenLite.to(Model.spotlight, 1, {
    //   opacity: 0,
    //   ease: Quad.easeInOut
    // }), '-=4');
    //
    // _entranceTl.add(TweenLite.to(Model.spotlight, 1, {
    //   opacity: 1,
    //   ease: Quad.easeInOut
    // }), '-=1');

    AnimationSettings.addHighlight(_entranceTl);

    // _entranceTl.add(TweenLite.to(scaleEl, 2.5, {
    //   scale: 1.4,
    //   ease: Quad.easeInOut
    // }), '-=2.5');

    // _entranceTl.add(TweenLite.to(_bg, 4, {
    //   x: 0,
    //   ease: Quad.easeInOut
    // }), '-=4');
    //
    // _entranceTl.add(TweenLite.to(_mg, 4, {
    //   x: 0,
    //   ease: Quad.easeInOut
    // }), '-=4');
    //
    // _entranceTl.add(TweenLite.to([_bg, _mg, _fg], 4, {
    //   x: 0,
    //   ease: Quad.easeInOut
    // }), '-=4');

    _entranceTl.pause();
  }

  function buildExit() {
    // _exitTl = new TimelineLite({});

    // NOTE: timing matches the next scene's entrance
    // _exitTl.add(TweenLite.to(_bg, 4, {
    //   y: 20,
    //   ease: Quad.easeInOut
    // }));

    // _exitTl.add(TweenLite.to(_mg, 4, {
    //   y: 5,
    //   ease: Quad.easeInOut
    // }), '-=4');

    // _exitTl.add(TweenLite.to(_instance, 4, {
    //   scale: .9,
    //   ease: Quad.easeInOut
    // }), '-=4');

    // _exitTl.add(TweenLite.to(_fg, 4, {
    //   y: -60,
    //   ease: Quad.easeInOut
    // }), '-=4');

    // _exitTl.pause();
  }


  /*
    Event handlers
  */

  function handleEvent(e) {

  }


  /*
    Public methods
  */

  _instance.transitionIn = function(perc) {
    _entranceTl.progress(perc);
  };

  _instance.transitionOut = function(perc) {
    // _exitTl.progress(perc);
  };

  _instance.enableAnimations = function() {
    if (_isEnabledAnimations === false) {
      _isEnabledAnimations = true;
      _instance.classList.add('allow-animations');
    }
  };

  _instance.disableAnimations = function() {
    if (_isEnabledAnimations === true) {
      _isEnabledAnimations = false;
      _instance.classList.remove('allow-animations');
    }
  };

  _instance.load = function() {
    if (_instance.isLoaded === false) {
      _instance.isLoaded = true;
      _instance.style.display = '';
      // _bg.src = Model.basePath + 'scene-two/background.gif';
      // _mg.src = Model.basePath + 'scene-two/midground.png';
      // _fg.src = Model.basePath + 'scene-two/foreground.png';
      // _field.src = Model.basePath + 'scene-two/field.jpg';
    }
  };

  _instance.unload = function() {
    if (_instance.isLoaded === true) {
      _instance.isLoaded = false;
      _instance.style.display = 'none';
      // _bg.src = '';
      // _mg.src = '';
      // _fg.src = '';
    }
  };

  init();

  return _instance;
}

function MapSceneOne(data, scaleEl, panEl) {

  var _instance = document.createElement('div');

  _instance.isLoaded = false;

  var CLASS_NAME = 'map-scene-one';

  var _entranceTl;
  // var _exitTl;
  var _bg;
  var _mg;
  var _fg;
  var _bgEffects;
  var _fgEffects;
  var _isEnabledAnimations = false;

  function init() {
    _instance.classList.add('map-scene');
    _instance.classList.add(CLASS_NAME);

    _instance.style.display = 'none';

    // gsap.set(_instance, {
    //   z: 1
    // });

    buildLayers();
    buildEffects();
    buildEntrance();
    buildExit();

    addListeners();
  }

  function addListeners() {

  }

  function buildLayers() {
    // _bg = document.createElement('img');
    // _bg.classList.add(CLASS_NAME + '__bg');
    // _instance.appendChild(_bg);
    //
    // _mg = document.createElement('img');
    // _mg.classList.add(CLASS_NAME + '__mg');
    // _instance.appendChild(_mg);
    //
    // _fg = document.createElement('img');
    // _fg.classList.add(CLASS_NAME + '__fg');
    // _instance.appendChild(_fg);
  }

  function buildEffects() {

  }

  function buildEntrance() {
    // set initial positions.

    // build timeline.
    _entranceTl = gsap.timeline({});

    _entranceTl.add(gsap.to(panEl, {
      duration: 4,
      x: -data.x,
      y: -data.y,
      ease: Quart.easeInOut
    }));

    _entranceTl.add(gsap.to(scaleEl, {
      duration: 4,
      scale: AnimationSettings.zoomedIn,
      ease: Quart.easeInOut
    }), '-=4');

    // TODO: fade in spotlight

    // _entranceTl.add(TweenLite.to(Model.spotlight, 2, {
    //   opacity: 1,
    //   ease: Quad.easeInOut
    // }), '-=2');

    _entranceTl.pause();
  }

  function buildExit() {
    // _exitTl = new TimelineLite({});
    //
    // _exitTl.pause();
  }


  /*
    Event handlers
  */

  function handleEvent(e) {

  }


  /*
    Public methods
  */

  _instance.transitionIn = function(perc) {
    _entranceTl.progress(perc);
  };

  _instance.transitionOut = function(perc) {
    // _exitTl.progress(perc);
  };

  _instance.enableAnimations = function() {
    if (_isEnabledAnimations === false) {
      _isEnabledAnimations = true;
      _instance.classList.add('allow-animations');
    }
  };

  _instance.disableAnimations = function() {
    if (_isEnabledAnimations === true) {
      _isEnabledAnimations = false;
      _instance.classList.remove('allow-animations');
    }
  };

  _instance.load = function() {
    if (_instance.isLoaded === false) {
      _instance.isLoaded = true;
      _instance.style.display = '';
      // _mg.src = Model.basePath + 'scene-one/midground.png';
      //
      // if (window.innerWidth < 600) {
      //   _bg.src = Model.basePath + 'scene-one/background-solid-1x.jpg';
      //   _fg.src = Model.basePath + 'scene-one/foreground-1x.png';
      // } else {
      //   _bg.src = Model.basePath + 'scene-one/background-solid-2x.jpg';
      //   _fg.src = Model.basePath + 'scene-one/foreground-2x.png';
      // }
    }
  };

  _instance.unload = function() {
    if (_instance.isLoaded === true) {
      _instance.isLoaded = false;
      _instance.style.display = 'none';
      // _bg.src = '';
      // _mg.src = '';
      // _fg.src = '';
    }
  };

  init();

  return _instance;
}

function MapSceneSeven(data, scaleEl, panEl) {

  var _instance = document.createElement('div');

  _instance.isLoaded = false;

  var CLASS_NAME = 'map-scene-seven';

  var _entranceTl;
  // var _exitTl;
  var _bg;
  var _mg;
  var _fg;
  var _bgEffects;
  var _fgEffects;
  var _isEnabledAnimations = false;

  function init() {
    _instance.classList.add('map-scene');
    _instance.classList.add(CLASS_NAME);

    _instance.style.display = 'none';

    // TweenLite.set(_instance, {
    //   z: 1
    // });

    buildLayers();
    buildEffects();
    buildEntrance();
    buildExit();

    addListeners();
  }

  function addListeners() {

  }

  function buildLayers() {
    // _bg = document.createElement('img');
    // _bg.classList.add(CLASS_NAME + '__bg');
    // _instance.appendChild(_bg);
    //
    // _mg = document.createElement('img');
    // _mg.classList.add(CLASS_NAME + '__mg');
    // _instance.appendChild(_mg);
    //
    // _fg = document.createElement('img');
    // _fg.classList.add(CLASS_NAME + '__fg');
    // _instance.appendChild(_fg);
  }

  function buildEffects() {

  }

  function buildEntrance() {
    // set initial positions.

    // build timeline.
    _entranceTl = gsap.timeline({});

    _entranceTl.add(gsap.to(panEl, {
      duration: 4,
      x: -data.x,
      y: -data.y,
      ease: Quad.easeInOut
    }));

    _entranceTl.add(gsap.to(scaleEl, {
      duration: 4,
      scale: AnimationSettings.zoomedOut,
      opacity: 0,
      ease: Quart.easeInOut
    }), '-=4');

    // TODO: fade in spotlight

    // _entranceTl.add(TweenLite.to(Model.spotlight, 1, {
    //   opacity: 1,
    //   ease: Quad.easeInOut
    // }), '-=1');

    _entranceTl.pause();
  }

  function buildExit() {
    // _exitTl = new TimelineLite({});

    // _exitTl.pause();
  }


  /*
    Event handlers
  */

  function handleEvent(e) {

  }


  /*
    Public methods
  */

  _instance.transitionIn = function(perc) {
    _entranceTl.progress(perc);
  };

  _instance.transitionOut = function(perc) {
    // _exitTl.progress(perc);
  };

  _instance.enableAnimations = function() {
    if (_isEnabledAnimations === false) {
      _isEnabledAnimations = true;
      _instance.classList.add('allow-animations');
    }
  };

  _instance.disableAnimations = function() {
    if (_isEnabledAnimations === true) {
      _isEnabledAnimations = false;
      _instance.classList.remove('allow-animations');
    }
  };

  _instance.load = function() {
    if (_instance.isLoaded === false) {
      _instance.isLoaded = true;
      _instance.style.display = '';
      // _mg.src = Model.basePath + 'scene-one/midground.png';
      //
      // if (window.innerWidth < 600) {
      //   _bg.src = Model.basePath + 'scene-one/background-solid-1x.jpg';
      //   _fg.src = Model.basePath + 'scene-one/foreground-1x.png';
      // } else {
      //   _bg.src = Model.basePath + 'scene-one/background-solid-2x.jpg';
      //   _fg.src = Model.basePath + 'scene-one/foreground-2x.png';
      // }
    }
  };

  _instance.unload = function() {
    if (_instance.isLoaded === true) {
      _instance.isLoaded = false;
      _instance.style.display = 'none';
      // _bg.src = '';
      // _mg.src = '';
      // _fg.src = '';
    }
  };

  init();

  return _instance;
}

function MapSceneSix(data, scaleEl, panEl) {

  var _instance = document.createElement('div');

  _instance.isLoaded = false;

  var CLASS_NAME = 'map-scene-six';

  var _entranceTl;
  // var _exitTl;
  var _bg;
  var _mg;
  var _fg;
  var _isEnabledAnimations = false;

  function init() {
    _instance.classList.add('map-scene');
    _instance.classList.add(CLASS_NAME);

    _instance.style.display = 'none';

    buildLayers();
    buildElements();
    buildEntrance();
    buildExit();

    addListeners();
  }

  function addListeners() {

  }

  function buildLayers() {
    // _bg = document.createElement('img');
    // _bg.classList.add(CLASS_NAME + '__bg');
    // _instance.appendChild(_bg);
    //
    // _mg = document.createElement('img');
    // _mg.classList.add(CLASS_NAME + '__mg');
    // _instance.appendChild(_mg);
    //
    // _fg = document.createElement('img');
    // _fg.classList.add(CLASS_NAME + '__fg');
    // _instance.appendChild(_fg);
    //
    // TweenLite.set([_bg, _mg, _fg], {
    //   z: 1
    // });

    // var cable = document.createElement('img');
    // cable.classList.add(CLASS_NAME + '__cable');
    // cable.src = '/images/scene-four/cable-new.png';
    // _instance.appendChild(cable);
  }

  function buildElements() {
    // _fire = document.createElement('img');
    // _fire.classList.add(CLASS_NAME + '__fire');
    // _instance.appendChild(_fire);

    // TweenLite.set(_fire, {
    //   z: 1
    // });
    //
    // var fireSlider = document.createElement('img');
    // fireSlider.classList.add(CLASS_NAME + '__fire-slider');
    // fireSlider.src = Model.basePath + 'scene-four/fire.png';
    // _fire.appendChild(fireSlider);
  }

  function buildEntrance() {
    // TweenLite.set([_bg, _fire], {
    //   y: -120,
    //   x: -30
    //   // x: -40
    // });
    //
    // TweenLite.set(_mg, {
    //   y: -80,
    //   x: -15
    //   // x: -20
    // });

    // TweenLite.set(_fg, {
    //   y: 60
    // });

    _entranceTl = gsap.timeline({});

    _entranceTl.add(gsap.to(panEl, {
      duration: 4,
      x: -data.x,
      y: -data.y,
      ease: Quart.easeInOut
    }));

    _entranceTl.add(gsap.to(scaleEl, {
      duration: 4,
      scale: AnimationSettings.zoomedIn,
      ease: Quart.easeInOut
    }), '-=4');

    // _entranceTl.add(TweenLite.to(scaleEl, 2, {
    //   scale: 1,
    //   ease: Quad.easeInOut
    // }), '-=2');

    // _entranceTl.add(TweenLite.to(Model.spotlight, 1, {
    //   opacity: 0,
    //   ease: Quad.easeInOut
    // }), '-=4');

    AnimationSettings.addHighlightHide(_entranceTl);

    // _entranceTl.add(TweenLite.to(Model.spotlight, 1, {
    //   opacity: 1,
    //   ease: Quad.easeInOut
    // }), '-=1');

    // var motionPath = MorphSVGPlugin.pathDataToBezier("#transition-to-pizza", {
    //   align: '#pan-container',
    //   offsetX: -1307,
    //   offsetY: -785
    // });
    //
    // _entranceTl.add(TweenLite.to(scaleEl, 4, {
    //   scale: 1,
    //   ease: Quad.easeInOut
    // }));
    //
    // _entranceTl.add(TweenLite.to(panEl, 4, {
    //   // x: -data.x,
    //   // y: -data.y,
    //   bezier: {
    //     values: motionPath,
    //     type: "cubic"
    //   },
    //   ease: Quad.easeInOut
    // }), '-=4');

    // _entranceTl.add(TweenLite.to(scaleEl, 2, {
    //   scale: 1,
    //   ease: Quad.easeInOut
    // }), '-=2');

    // _entranceTl.add(TweenLite.to([_bg, _fire], 4, {
    //   y: 0,
    //   x: 0,
    //   ease: Quad.easeInOut
    // }), '-=4');
    //
    // _entranceTl.add(TweenLite.to(_mg, 4, {
    //   y: 0,
    //   x: 0,
    //   ease: Quad.easeInOut
    // }), '-=4');

    // _entranceTl.add(TweenLite.to(_fg, 4, {
    //   y: 0,
    //   ease: Quad.easeInOut
    // }), '-=4');

    _entranceTl.pause();
  }

  function buildExit() {
    // _exitTl = new TimelineLite({});

    // NOTE: timing matches the next scene's entrance
    // _exitTl.add(TweenLite.to(_bg, 1, {
    //   x: 50,
    //   y: -50,
    //   ease: Quad.easeInOut
    // }));
    //
    // _exitTl.add(TweenLite.to(_mg, 4, {
    //   x: -40,
    //   ease: Quad.easeInOut
    // }));
    //
    // _exitTl.add(TweenLite.to(_fg, 4, {
    //   x: -80,
    //   ease: Quad.easeInOut
    // }), '-=4');

    // _exitTl.pause();
  }


  /*
    Event handlers
  */

  function handleEvent(e) {

  }


  /*
    Public methods
  */

  _instance.transitionIn = function(perc) {
    _entranceTl.progress(perc);
  };

  _instance.transitionOut = function(perc) {
    // _exitTl.progress(perc);
  };

  _instance.enableAnimations = function() {
    if (_isEnabledAnimations === false) {
      _isEnabledAnimations = true;
      _instance.classList.add('allow-animations');
    }
  };

  _instance.disableAnimations = function() {
    if (_isEnabledAnimations === true) {
      _isEnabledAnimations = false;
      _instance.classList.remove('allow-animations');
    }
  };

  _instance.load = function() {
    if (_instance.isLoaded === false) {
      _instance.isLoaded = true;
      _instance.style.display = '';
      // _bg.src = Model.basePath + 'scene-four/background.jpg';
      // _mg.src = Model.basePath + 'scene-four/midground.png';
      // _fg.src = Model.basePath + 'scene-four/foreground.png';
      // _fire.src = Model.basePath + 'scene-four/fire.gif';
    }
  };

  _instance.unload = function() {
    if (_instance.isLoaded === true) {
      _instance.isLoaded = false;
      _instance.style.display = 'none';
      // _bg.src = '';
      // _mg.src = '';
      // _fg.src = '';
    }
  };

  init();

  return _instance;
}

function MapSceneThree(data, scaleEl, panEl) {

  var _instance = document.createElement('div');

  _instance.isLoaded = false;

  var CLASS_NAME = 'map-scene-three';

  var _entranceTl;
  // var _exitTl;
  var _bg;
  var _mg;
  var _fg;
  var _bgEffects;
  var _fgEffects;
  var _isEnabledAnimations = false;

  function init() {
    _instance.classList.add('map-scene');
    _instance.classList.add(CLASS_NAME);

    _instance.style.display = 'none';

    // TweenLite.set(_instance, {
    //   z: 1
    // });

    buildLayers();
    buildEffects();
    buildEntrance();
    buildExit();

    addListeners();
  }

  function addListeners() {

  }

  function buildLayers() {
    // _bg = document.createElement('img');
    // _bg.classList.add(CLASS_NAME + '__bg');
    // _instance.appendChild(_bg);
    //
    // _mg = document.createElement('img');
    // _mg.classList.add(CLASS_NAME + '__mg');
    // _instance.appendChild(_mg);
    //
    // _fg = document.createElement('img');
    // _fg.classList.add(CLASS_NAME + '__fg');
    // _instance.appendChild(_fg);
  }

  function buildEffects() {

  }

  function buildEntrance() {
    // set initial positions.

    // build timeline.
    _entranceTl = gsap.timeline({});

    _entranceTl.add(gsap.to(panEl, {
      duration: 4,
      x: -data.x,
      y: -data.y,
      ease: Quart.easeInOut
    }));

    _entranceTl.add(gsap.to(scaleEl, {
      duration: 4,
      scale: AnimationSettings.zoomedDetail,
      ease: Quart.easeInOut
    }), '-=4');

    // TODO: fade in spotlight

    // _entranceTl.add(TweenLite.to(Model.spotlight, 1, {
    //   opacity: 1,
    //   ease: Quad.easeInOut
    // }), '-=1');

    AnimationSettings.addHighlightShow(_entranceTl);

    _entranceTl.pause();
  }

  function buildExit() {
    // _exitTl = new TimelineLite({});
    //
    // _exitTl.pause();
  }


  /*
    Event handlers
  */

  function handleEvent(e) {

  }


  /*
    Public methods
  */

  _instance.transitionIn = function(perc) {
    _entranceTl.progress(perc);
  };

  _instance.transitionOut = function(perc) {
    // _exitTl.progress(perc);
  };

  _instance.enableAnimations = function() {
    if (_isEnabledAnimations === false) {
      _isEnabledAnimations = true;
      _instance.classList.add('allow-animations');
    }
  };

  _instance.disableAnimations = function() {
    if (_isEnabledAnimations === true) {
      _isEnabledAnimations = false;
      _instance.classList.remove('allow-animations');
    }
  };

  _instance.load = function() {
    if (_instance.isLoaded === false) {
      _instance.isLoaded = true;
      _instance.style.display = '';
      // _mg.src = Model.basePath + 'scene-one/midground.png';
      //
      // if (window.innerWidth < 600) {
      //   _bg.src = Model.basePath + 'scene-one/background-solid-1x.jpg';
      //   _fg.src = Model.basePath + 'scene-one/foreground-1x.png';
      // } else {
      //   _bg.src = Model.basePath + 'scene-one/background-solid-2x.jpg';
      //   _fg.src = Model.basePath + 'scene-one/foreground-2x.png';
      // }
    }
  };

  _instance.unload = function() {
    if (_instance.isLoaded === true) {
      _instance.isLoaded = false;
      _instance.style.display = 'none';
      // _bg.src = '';
      // _mg.src = '';
      // _fg.src = '';
    }
  };

  init();

  return _instance;
}

function MapSceneTwo(data, scaleEl, panEl) {

  var _instance = document.createElement('div');

  _instance.isLoaded = false;

  var CLASS_NAME = 'map-scene-two';

  var _entranceTl;
  // var _exitTl;
  var _bg;
  var _mg;
  var _fg;
  var _bgEffects;
  var _fgEffects;
  var _isEnabledAnimations = false;

  function init() {
    _instance.classList.add('map-scene');
    _instance.classList.add(CLASS_NAME);

    _instance.style.display = 'none';

    // TweenLite.set(_instance, {
    //   z: 1
    // });

    buildLayers();
    buildEffects();
    buildEntrance();
    buildExit();

    addListeners();
  }

  function addListeners() {

  }

  function buildLayers() {
    // _bg = document.createElement('img');
    // _bg.classList.add(CLASS_NAME + '__bg');
    // _instance.appendChild(_bg);
    //
    // _mg = document.createElement('img');
    // _mg.classList.add(CLASS_NAME + '__mg');
    // _instance.appendChild(_mg);
    //
    // _fg = document.createElement('img');
    // _fg.classList.add(CLASS_NAME + '__fg');
    // _instance.appendChild(_fg);
  }

  function buildEffects() {

  }

  function buildEntrance() {
    // set initial positions.

    gsap.set(scaleEl, {
      scale: AnimationSettings.zoomedOut,
      opacity: 0
    });

    // build timeline.
    _entranceTl = gsap.timeline({});

    _entranceTl.add(gsap.to(panEl, {
      duration: 4,
      x: -data.x,
      y: -data.y,
      ease: Quart.easeInOut
    }));

    _entranceTl.add(gsap.to(scaleEl, {
      duration: 4,
      scale: AnimationSettings.zoomedIn,
      opacity: 1,
      ease: Quart.easeInOut
    }), '-=4');

    // TODO: fade in spotlight

    // _entranceTl.add(TweenLite.to(Model.spotlight, 1, {
    //   opacity: 1,
    //   ease: Quad.easeInOut
    // }), '-=1');

    _entranceTl.pause();
  }

  function buildExit() {
    // _exitTl = new TimelineLite({});
    //
    // _exitTl.pause();
  }


  /*
    Event handlers
  */

  function handleEvent(e) {

  }


  /*
    Public methods
  */

  _instance.transitionIn = function(perc) {
    _entranceTl.progress(perc);
  };

  _instance.transitionOut = function(perc) {
    // _exitTl.progress(perc);
  };

  _instance.enableAnimations = function() {
    if (_isEnabledAnimations === false) {
      _isEnabledAnimations = true;
      _instance.classList.add('allow-animations');
    }
  };

  _instance.disableAnimations = function() {
    if (_isEnabledAnimations === true) {
      _isEnabledAnimations = false;
      _instance.classList.remove('allow-animations');
    }
  };

  _instance.load = function() {
    if (_instance.isLoaded === false) {
      _instance.isLoaded = true;
      _instance.style.display = '';
      // _mg.src = Model.basePath + 'scene-one/midground.png';
      //
      // if (window.innerWidth < 600) {
      //   _bg.src = Model.basePath + 'scene-one/background-solid-1x.jpg';
      //   _fg.src = Model.basePath + 'scene-one/foreground-1x.png';
      // } else {
      //   _bg.src = Model.basePath + 'scene-one/background-solid-2x.jpg';
      //   _fg.src = Model.basePath + 'scene-one/foreground-2x.png';
      // }
    }
  };

  _instance.unload = function() {
    if (_instance.isLoaded === true) {
      _instance.isLoaded = false;
      _instance.style.display = 'none';
      // _bg.src = '';
      // _mg.src = '';
      // _fg.src = '';
    }
  };

  init();

  return _instance;
}

function TransitionFooter(data, scaleEl, panEl, prevData) {

  var _instance = {};

  _instance.isLoaded = false;

  var _entranceTl;
  var _isEnabledAnimations = false;

  function init() {
    buildEntrance();

    addListeners();
  }

  function addListeners() {

  }

  function buildEntrance() {
    // set initial positions.

    // build timeline.
    _entranceTl = gsap.timeline({});

    // _entranceTl.fromTo(panEl, {
    //   x: -prevData.x,
    //   y: -prevData.y,
    // }, {
    //   duration: 4,
    //   x: -data.x,
    //   y: -data.y,
    //   ease: 'quart.inOut'
    // });
    //
    // _entranceTl.to(scaleEl, {
    //   duration: 4,
    //   opacity: 0
    // }, 0);

    // _entranceTl.fromTo(Model.spotlight, {
    //   opacity: 1
    // }, {
    //   duration: 4,
    //   opacity: 1
    // }, 0);

    // _entranceTl.add(gsap.to(panEl, {
    //   duration: 4,
    //   x: -data.x,
    //   y: -data.y,
    //   ease: 'quad.inOut'
    // }));
    //
    // _entranceTl.add(gsap.to(scaleEl, {
    //   duration: 4,
    //   scale: AnimationSettings.zoomedOut,
    //   opacity: 0,
    //   ease: 'quart.inOut'
    // }), '-=4');

    _entranceTl.pause();
  }

  /*
    Event handlers
  */

  function handleEvent(e) {

  }


  /*
    Public methods
  */

  _instance.transitionIn = function(perc) {
    _entranceTl.progress(perc);
    console.log(perc);

    if (perc > .18) {
      scaleEl.style.opacity = 0;
    }
  };

  _instance.transitionOut = function(perc) {

  };

  _instance.enableAnimations = function() {
    if (_isEnabledAnimations === false) {
      _isEnabledAnimations = true;
      // _instance.classList.add('allow-animations');
    }
  };

  _instance.disableAnimations = function() {
    if (_isEnabledAnimations === true) {
      _isEnabledAnimations = false;
      // _instance.classList.remove('allow-animations');
    }
  };

  _instance.load = function() {
    if (_instance.isLoaded === false) {
      _instance.isLoaded = true;
    }
  };

  _instance.unload = function() {
    if (_instance.isLoaded === true) {
      _instance.isLoaded = false;
    }
  };

  init();

  return _instance;
}

function TransitionHide(data, scaleEl, panEl, prevData) {

  var _instance = {};

  _instance.isLoaded = false;

  var _entranceTl;
  var _isEnabledAnimations = false;

  function init() {
    buildEntrance();

    addListeners();
  }

  function addListeners() {

  }

  function buildEntrance() {
    // set initial positions.

    // build timeline.
    _entranceTl = gsap.timeline({});

    _entranceTl.fromTo(panEl, {
      x: -prevData.x,
      y: -prevData.y,
    }, {
      duration: 4,
      x: -data.x,
      y: -data.y,
      ease: 'quart.inOut'
    });

    _entranceTl.fromTo(scaleEl, {
      scale: AnimationSettings.zoomedIn,
      opacity: 1
    }, {
      duration: 4,
      scale: AnimationSettings.zoomedOut,
      opacity: 0,
      ease: 'quart.inOut'
    }, 0);

    _entranceTl.fromTo(Model.spotlight, {
      opacity: 0
    }, {
      duration: 3,
      opacity: 1,
      ease: 'quart.inOut'
    }, 0);

    // _entranceTl.add(gsap.to(panEl, {
    //   duration: 4,
    //   x: -data.x,
    //   y: -data.y,
    //   ease: 'quad.inOut'
    // }));
    //
    // _entranceTl.add(gsap.to(scaleEl, {
    //   duration: 4,
    //   scale: AnimationSettings.zoomedOut,
    //   opacity: 0,
    //   ease: 'quart.inOut'
    // }), '-=4');

    _entranceTl.pause();
  }

  /*
    Event handlers
  */

  function handleEvent(e) {

  }


  /*
    Public methods
  */

  _instance.transitionIn = function(perc) {
    _entranceTl.progress(perc);
  };

  _instance.transitionOut = function(perc) {

  };

  _instance.enableAnimations = function() {
    if (_isEnabledAnimations === false) {
      _isEnabledAnimations = true;
      // _instance.classList.add('allow-animations');
    }
  };

  _instance.disableAnimations = function() {
    if (_isEnabledAnimations === true) {
      _isEnabledAnimations = false;
      // _instance.classList.remove('allow-animations');
    }
  };

  _instance.load = function() {
    if (_instance.isLoaded === false) {
      _instance.isLoaded = true;
    }
  };

  _instance.unload = function() {
    if (_instance.isLoaded === true) {
      _instance.isLoaded = false;
    }
  };

  init();

  return _instance;
}

function TransitionInitial(data, scaleEl, panEl, prevData) {

  var _instance = {};

  _instance.isLoaded = false;

  var _entranceTl;
  var _isEnabledAnimations = false;

  function init() {
    buildEntrance();

    addListeners();
  }

  function addListeners() {

  }

  function buildEntrance() {
    // set initial positions.

    // build timeline.
    _entranceTl = gsap.timeline({});

    _entranceTl.fromTo(panEl, {
      x: -data.x,
      y: -data.y,
    }, {
      duration: 4,
      x: -data.x,
      y: -data.y,
      ease: 'quart.inOut'
    });

    _entranceTl.fromTo(scaleEl, {
      opacity: 0,
      scale: AnimationSettings.zoomedOut
    }, {
      duration: 4,
      opacity: 0,
      scale: AnimationSettings.zoomedOut
    }, 0);

    _entranceTl.fromTo(Model.spotlight, {
      opacity: 1
    }, {
      duration: 4,
      opacity: 1
    }, 0);

    //
    // _entranceTl.to(scaleEl, {
    //   duration: 3.99,
    //   scale: AnimationSettings.zoomedIn,
    //   opacity: 1,
    //   ease: 'quart.inOut'
    // }, 0.01);

    // _entranceTl.add(gsap.to(panEl, {
    //   duration: 4,
    //   x: -data.x,
    //   y: -data.y,
    //   ease: 'quart.inOut'
    // }));
    //
    // _entranceTl.add(gsap.to(scaleEl, {
    //   duration: 4,
    //   scale: AnimationSettings.zoomedIn,
    //   opacity: 1,
    //   ease: 'quart.inOut'
    // }), '-=4');

    _entranceTl.pause();
  }


  /*
    Event handlers
  */

  function handleEvent(e) {

  }


  /*
    Public methods
  */

  _instance.transitionIn = function(perc) {
    _entranceTl.progress(perc);
  };

  _instance.transitionOut = function(perc) {

  };

  _instance.enableAnimations = function() {
    if (_isEnabledAnimations === false) {
      _isEnabledAnimations = true;
      // _instance.classList.add('allow-animations');
    }
  };

  _instance.disableAnimations = function() {
    if (_isEnabledAnimations === true) {
      _isEnabledAnimations = false;
      // _instance.classList.remove('allow-animations');
    }
  };

  _instance.load = function() {
    if (_instance.isLoaded === false) {
      _instance.isLoaded = true;
    }
  };

  _instance.unload = function() {
    if (_instance.isLoaded === true) {
      _instance.isLoaded = false;
    }
  };

  init();

  return _instance;
}

function TransitionShow(data, scaleEl, panEl, prevData) {

  var _instance = {};

  _instance.isLoaded = false;

  var _entranceTl;
  var _isEnabledAnimations = false;

  function init() {
    buildEntrance();

    addListeners();
  }

  function addListeners() {

  }

  function buildEntrance() {
    // set initial positions.

    // gsap.set(scaleEl, {
    //   scale: AnimationSettings.zoomedOut,
    //   opacity: 0
    // });

    // build timeline.
    _entranceTl = gsap.timeline({});

    _entranceTl.fromTo(panEl, {
      x: -prevData.x,
      y: -prevData.y,
    }, {
      duration: 4,
      x: -data.x,
      y: -data.y,
      ease: 'quart.inOut'
    });

    _entranceTl.fromTo(scaleEl, {
      opacity: 0,
      scale: AnimationSettings.zoomedOut,
    }, {
      duration: 4,
      scale: AnimationSettings.zoomedIn,
      opacity: 1,
      ease: 'quart.inOut'
    }, 0);

    _entranceTl.fromTo(Model.spotlight, {
      opacity: 1
    }, {
      duration: 2,
      opacity: 0,
      ease: 'linear.none'
    }, 2);

    // _entranceTl.add(gsap.to(panEl, {
    //   duration: 4,
    //   x: -data.x,
    //   y: -data.y,
    //   ease: 'quart.inOut'
    // }));
    //
    // _entranceTl.add(gsap.to(scaleEl, {
    //   duration: 4,
    //   scale: AnimationSettings.zoomedIn,
    //   opacity: 1,
    //   ease: 'quart.inOut'
    // }), '-=4');

    _entranceTl.pause();
  }


  /*
    Event handlers
  */

  function handleEvent(e) {

  }


  /*
    Public methods
  */

  _instance.transitionIn = function(perc) {
    _entranceTl.progress(perc);
  };

  _instance.transitionOut = function(perc) {

  };

  _instance.enableAnimations = function() {
    if (_isEnabledAnimations === false) {
      _isEnabledAnimations = true;
      // _instance.classList.add('allow-animations');
    }
  };

  _instance.disableAnimations = function() {
    if (_isEnabledAnimations === true) {
      _isEnabledAnimations = false;
      // _instance.classList.remove('allow-animations');
    }
  };

  _instance.load = function() {
    if (_instance.isLoaded === false) {
      _instance.isLoaded = true;
    }
  };

  _instance.unload = function() {
    if (_instance.isLoaded === true) {
      _instance.isLoaded = false;
    }
  };

  init();

  return _instance;
}

function TransitionZoomIn(data, scaleEl, panEl, prevData) {

  var _instance = {};

  _instance.isLoaded = false;

  var _entranceTl;
  var _isEnabledAnimations = false;

  function init() {
    buildEntrance();

    addListeners();
  }

  function addListeners() {

  }

  function buildEntrance() {
    _entranceTl = gsap.timeline({});

    _entranceTl.fromTo(panEl, {
      x: -prevData.x,
      y: -prevData.y,
    }, {
      duration: 4,
      x: -data.x,
      y: -data.y,
      ease: 'quart.inOut'
    });

    _entranceTl.fromTo(scaleEl, {
      scale: AnimationSettings.zoomedIn,
      opacity: 1,
    }, {
      duration: 4,
      scale: AnimationSettings.zoomedDetail,
      ease: 'quart.inOut'
    }, 0);

    _entranceTl.fromTo(Model.spotlight, {
      opacity: 0
    }, {
      duration: 4,
      opacity: 0
    }, 0);

    // _entranceTl.add(gsap.to(panEl, {
    //   duration: 4,
    //   x: -data.x,
    //   y: -data.y,
    //   ease: 'quart.inOut'
    // }));

    // _entranceTl.add(gsap.to(scaleEl, {
    //   duration: 4,
    //   scale: AnimationSettings.zoomedDetail,
    //   ease: 'quart.inOut'
    // }), '-=4');

    // AnimationSettings.addHighlightShow(_entranceTl);

    _entranceTl.pause();
  }


  /*
    Event handlers
  */

  function handleEvent(e) {

  }


  /*
    Public methods
  */

  _instance.transitionIn = function(perc) {
    _entranceTl.progress(perc);
  };

  _instance.transitionOut = function(perc) {

  };

  _instance.enableAnimations = function() {
    if (_isEnabledAnimations === false) {
      _isEnabledAnimations = true;
      // _instance.classList.add('allow-animations');
    }
  };

  _instance.disableAnimations = function() {
    if (_isEnabledAnimations === true) {
      _isEnabledAnimations = false;
      // _instance.classList.remove('allow-animations');
    }
  };

  _instance.load = function() {
    if (_instance.isLoaded === false) {
      _instance.isLoaded = true;
    }
  };

  _instance.unload = function() {
    if (_instance.isLoaded === true) {
      _instance.isLoaded = false;
    }
  };

  init();

  return _instance;
}

function TransitionZoomInOut(data, scaleEl, panEl, prevData) {

  var _instance = {};

  _instance.isLoaded = false;

  var _entranceTl;
  var _isEnabledAnimations = false;

  function init() {
    buildEntrance();
    buildExit();

    addListeners();
  }

  function addListeners() {

  }

  function buildEntrance() {
    _entranceTl = gsap.timeline({});

    // _entranceTl.add(gsap.to(panEl, {
    //   duration: 4,
    //   x: -data.x,
    //   y: -data.y,
    //   ease: 'quad.inOut'
    // }));

    _entranceTl.fromTo(panEl, {
      x: -prevData.x,
      y: -prevData.y,
    }, {
      duration: 4,
      x: -data.x,
      y: -data.y,
      ease: 'quad.inOut'
    });

    _entranceTl.fromTo(scaleEl, {
      opacity: 1,
      scale: AnimationSettings.zoomedDetail
    }, {
      duration: 2,
      scale: AnimationSettings.zoomedDetail - .07,
      ease: 'quad.inOut'
    }, 0);

    _entranceTl.to(scaleEl, {
      duration: 2,
      scale: AnimationSettings.zoomedDetail,
      ease: 'quad.inOut'
    }, 2);

    _entranceTl.fromTo(Model.spotlight, {
      opacity: 0
    }, {
      duration: 4,
      opacity: 0
    }, 0);

    // timeline.add(gsap.to(scaleEl, {
    //   duration: 2,
    //   scale: .43,
    //   ease: 'quad.inOut'
    // }), '-=4');
    //
    // timeline.add(gsap.to(scaleEl, {
    //   duration: 2,
    //   scale: .5,
    //   ease: 'quad.inOut'
    // }), '-=2');

    // AnimationSettings.scaleMovement(_entranceTl, scaleEl);

    _entranceTl.pause();
  }

  function buildExit() {

  }


  /*
    Event handlers
  */

  function handleEvent(e) {

  }


  /*
    Public methods
  */

  _instance.transitionIn = function(perc) {
    _entranceTl.progress(perc);
  };

  _instance.transitionOut = function(perc) {

  };

  _instance.enableAnimations = function() {
    if (_isEnabledAnimations === false) {
      _isEnabledAnimations = true;
      // _instance.classList.add('allow-animations');
    }
  };

  _instance.disableAnimations = function() {
    if (_isEnabledAnimations === true) {
      _isEnabledAnimations = false;
      // _instance.classList.remove('allow-animations');
    }
  };

  _instance.load = function() {
    if (_instance.isLoaded === false) {
      _instance.isLoaded = true;
    }
  };

  _instance.unload = function() {
    if (_instance.isLoaded === true) {
      _instance.isLoaded = false;
    }
  };

  init();

  return _instance;
}

function TransitionZoomOut(data, scaleEl, panEl, prevData) {

  var _instance = {};

  _instance.isLoaded = false;

  var _entranceTl;
  var _isEnabledAnimations = false;

  function init() {
    buildEntrance();

    addListeners();
  }

  function addListeners() {

  }

  function buildEntrance() {
    // gsap.set(scaleEl, {
    //   opacity: 1
    // });

    _entranceTl = gsap.timeline({});

    // TODO: need to padd in from positions

    _entranceTl.fromTo(panEl, {
      x: -prevData.x,
      y: -prevData.y,
    }, {
      duration: 4,
      x: -data.x,
      y: -data.y,
      ease: 'quart.inOut'
    });

    _entranceTl.fromTo(scaleEl, {
      scale: AnimationSettings.zoomedDetail,
      opacity: 1
    }, {
      duration: 4,
      scale: AnimationSettings.zoomedIn,
      ease: 'quart.inOut'
    }, 0);

    _entranceTl.fromTo(Model.spotlight, {
      opacity: 0
    }, {
      duration: 4,
      opacity: 0
    }, 0);

    // _entranceTl.add(gsap.to(panEl, {
    //   duration: 4,
    //   x: -data.x,
    //   y: -data.y,
    //   ease: 'quart.inOut'
    // }));
    //
    // _entranceTl.add(gsap.to(scaleEl, {
    //   duration: 4,
    //   scale: AnimationSettings.zoomedIn,
    //   ease: 'quart.inOut'
    // }), '-=4');

    // AnimationSettings.addHighlightHide(_entranceTl);

    _entranceTl.pause();
  }


  /*
    Event handlers
  */

  function handleEvent(e) {

  }


  /*
    Public methods
  */

  _instance.transitionIn = function(perc) {
    _entranceTl.progress(perc);
  };

  _instance.transitionOut = function(perc) {

  };

  _instance.enableAnimations = function() {
    if (_isEnabledAnimations === false) {
      _isEnabledAnimations = true;
      // _instance.classList.add('allow-animations');
    }
  };

  _instance.disableAnimations = function() {
    if (_isEnabledAnimations === true) {
      _isEnabledAnimations = false;
      // _instance.classList.remove('allow-animations');
    }
  };

  _instance.load = function() {
    if (_instance.isLoaded === false) {
      _instance.isLoaded = true;
    }
  };

  _instance.unload = function() {
    if (_instance.isLoaded === true) {
      _instance.isLoaded = false;
    }
  };

  init();

  return _instance;
}

function CardSlideshow(node) {

  var _instance = document.createElement('div');

  var CLASS_NAME = 'card-slideshow';
  var DRAG_AXIS_X = 'drag-axis-x';
  var DRAG_AXIS_Y = 'drag-axis-y';

  var _container;
  var _imageCount = 0;
  var _currentSlideIndex = 0;
  var _dotsList = [];
  var _slider;
  var _leftArrow;
  var _rightArrow;
  var _touchVelocity;
  var _startDragX;
  var _dragAxis;

  function init() {
    _instance.classList.add(CLASS_NAME);

    buildImages();
    buildDots();
    buildArrows();

    addListeners();
  }

  function addListeners() {
    if (Modernizr.touch) {
      var options = {
        touchstart: handleDragStart,
        touchmove: handleDrag,
        touchend: handleDragEnd
      };

      _touchVelocity = new TouchVelocityX(node, options, Hammer.DIRECTION_HORIZONTAL);
    }
  }

  function buildImages() {
    // build slider
    _slider = document.createElement('div');
    _slider.classList.add(CLASS_NAME + '__slider');
    node.appendChild(_slider);

    gsap.set(_slider, {
      x: 0
    });

    var imgs = node.querySelectorAll('img');
    _imageCount = imgs.length;

    for (var j = 0; j < _imageCount; j++) {
      _slider.appendChild(imgs[j]);

      if (j > 0) {
        imgs[j].classList.add('additional');
      }
    }
  }

  function buildDots() {
    var dotContainer = document.createElement('div');
    dotContainer.classList.add(CLASS_NAME + '__dots-container');
    node.parentNode.appendChild(dotContainer);

    if (_imageCount < 2) {
      dotContainer.style.display = 'none';
      dotContainer.parentNode.classList.add('no-slideshow-dots');
    }

    for (var j = 0; j < _imageCount; j++) {
      var dot = document.createElement('div');
      dot.classList.add(CLASS_NAME + '__dot');
      dotContainer.appendChild(dot);

      if (j === 0) {
        dot.classList.add('active');
      }

      dot.num = j;
      dot.addEventListener('click', handleDotClick);

      _dotsList.push(dot);
    }
  }

  function buildArrows() {
    var dirs = ['left', 'right'];

    for (var j = 0; j < dirs.length; j++) {
      var btn = document.createElement('div');
      btn.classList.add('card-slideshow__arrow-button');
      btn.classList.add('card-slideshow__arrow-button--' + dirs[j]);
      node.appendChild(btn);

      if (_imageCount < 2) {
        btn.style.display = 'none';
      }

      if (dirs[j] === 'right') {
        _rightArrow = btn;
        btn.classList.add('active');
        btn.addEventListener('click', handleRightArrowClick);
      } else if (dirs[j] === 'left') {
        _leftArrow = btn;
        btn.addEventListener('click', handleLeftArrowClick);
      }
    }
  }

  function updateDotActivity(newIndex, oldIndex) {
    _dotsList[oldIndex].classList.remove('active');
    _dotsList[newIndex].classList.add('active');
  }

  function updateArrowActivity(newIndex) {
    // left arrow
    if (newIndex > 0) {
      _leftArrow.classList.add('active');
    } else {
      _leftArrow.classList.remove('active');
    }

    // right arrow
    if (newIndex < _imageCount - 1) {
      _rightArrow.classList.add('active');
    } else {
      _rightArrow.classList.remove('active');
    }
  }


  /*
    Event handlers
  */

  function handleDotClick(e) {
    var newSlideIndex = e.target.num;

    if (newSlideIndex !== _currentSlideIndex) {
      updateDotActivity(newSlideIndex, _currentSlideIndex);
      updateArrowActivity(newSlideIndex);

      _currentSlideIndex = newSlideIndex;

      var imgWidth = _slider.children[0].clientWidth;
      gsap.to(_slider, {
        duration: .6,
        x: -imgWidth * _currentSlideIndex,
        ease: Quart.easeInOut
      });
    }
  }

  function handleLeftArrowClick(e) {
    var newSlideIndex = _currentSlideIndex - 1;

    if (newSlideIndex >= 0) {
      updateDotActivity(newSlideIndex, _currentSlideIndex);
      updateArrowActivity(newSlideIndex);

      _currentSlideIndex = newSlideIndex;

      var imgWidth = _slider.children[0].clientWidth;
      gsap.to(_slider, {
        duration: .6,
        x: -imgWidth * _currentSlideIndex,
        ease: Quart.easeInOut
      });
    }
  }

  function handleRightArrowClick(e) {
    var newSlideIndex = _currentSlideIndex + 1;

    if (newSlideIndex <= _imageCount - 1) {
      updateDotActivity(newSlideIndex, _currentSlideIndex);
      updateArrowActivity(newSlideIndex);

      _currentSlideIndex = newSlideIndex;

      var imgWidth = _slider.children[0].clientWidth;
      gsap.to(_slider, {
        duration: .6,
        x: -imgWidth * _currentSlideIndex,
        ease: Quart.easeInOut
      });
    }
  }

  function handleDragStart(e, ev) {
    Model.preventWindowScroll = false;


    var imgWidth = _slider.children[0].clientWidth;
    _startDragX = -imgWidth * _currentSlideIndex;
    _dragAxis = null;

    if (Math.abs(ev.deltaX) > Math.abs(ev.deltaY)) {
      _dragAxis = DRAG_AXIS_X;
    } else {
      _dragAxis = DRAG_AXIS_Y;
    }
  }

  function handleDrag(e, ev) {
    if (_dragAxis === DRAG_AXIS_Y) {

    } else if (_dragAxis === DRAG_AXIS_X) {
      Model.preventWindowScroll = true;

      gsap.set(_slider, {
        x: parseInt(_slider._gsap.x) + e.movement
      });
    }
  }

  function handleDragEnd(e, ev) {
    if (Model.preventWindowScroll) {
      Model.preventWindowScroll = false;

      _touchVelocity.stopVelocity();

      if (_dragAxis === DRAG_AXIS_Y) {

      } else if (_dragAxis === DRAG_AXIS_X) {

        // use the throw speed to determine the direction
        if (ev.velocityX > 0) {
          // previous
          advanceDragSlideshowPrevious(Quart.easeOut)
        } else if (ev.velocityX < 0) {
          // next
          advanceDragSlideshowNext(Quart.easeOut);
        } else {
          // if not throwing, detect position
          if (ev.deltaX > 0) {
            advanceDragSlideshowPrevious(Quart.easeInOut)
          } else if (ev.deltaX < 0) {
            advanceDragSlideshowNext(Quart.easeInOut);
          } else {
            // do nothing
          }
        }

        _dragAxis = null; // hack to prevent handleDrag from being called again
      }
    }
  }

  function advanceDragSlideshowNext(ease) {
    var newSlideIndex = _currentSlideIndex + 1;

    if (newSlideIndex <= _imageCount - 1) {
      updateDotActivity(newSlideIndex, _currentSlideIndex);
      updateArrowActivity(newSlideIndex);

      _currentSlideIndex = newSlideIndex;

      var imgWidth = _slider.children[0].clientWidth;
      gsap.to(_slider, {
        duration: .6,
        x: -imgWidth * _currentSlideIndex,
        ease: ease
      });
    } else {
      // edge
      var imgWidth = _slider.children[0].clientWidth;
      gsap.to(_slider, {
        duration: .6,
        x: -imgWidth * _currentSlideIndex,
        ease: Quart.easeOut
      });
    }
  }

  function advanceDragSlideshowPrevious(ease) {
    var newSlideIndex = _currentSlideIndex - 1;

    if (newSlideIndex >= 0) {
      updateDotActivity(newSlideIndex, _currentSlideIndex);
      updateArrowActivity(newSlideIndex);

      _currentSlideIndex = newSlideIndex;

      var imgWidth = _slider.children[0].clientWidth;
      gsap.to(_slider, {
        duration: .6,
        x: -imgWidth * _currentSlideIndex,
        ease: ease
      });
    } else {
      // edge
      var imgWidth = _slider.children[0].clientWidth;
      gsap.to(_slider, {
        duration: .3,
        x: -imgWidth * _currentSlideIndex,
        ease: Quart.easeOut
      });
    }
  }


  /*
    Public methods
  */

  _instance.load = function() {
    // loop through imgs
    // update src
    for (var j = 0; j < _slider.children.length; j++) {
      var img = _slider.children[j];
      var newPath = img.getAttribute('data-src');

      if (newPath) {
        img.src = newPath;
      }
    }
  };

  init();

  return _instance;
}

function Header(node) {

  var _instance = {};

  _instance.node = node;

  var CLASS_NAME = 'header';

  var _imageContainer;
  var _headline;
  var _imageList;
  var _arrowButton;

  function init() {
    _headline = node.querySelector('h2');
    _imageContainer = node.querySelector('.header__image-container')
    _imageList = node.querySelectorAll('img');
    _arrowButton = node.querySelector('.header__arrow-button');

    buildContainer();

    addListeners();
    handleResize();

    setTimeout(function() {
      node.classList.add('show');
    }, 100);
  }

  function addListeners() {
    _arrowButton.addEventListener('click', handleArrowButtonClick);

    if (Modernizr.touch) {
      window.addEventListener('orientationchange', handleOrientationChange);
    } else {
      window.addEventListener('resize', handleResize);
    }
  }

  function buildContainer() {

  }


  /*
    Event handlers
  */

  function handleArrowButtonClick(e) {
    var destinY = window.innerHeight

    WindowScroll.scroll({
      y: destinY,
      ease: Quart.easeInOut,
      speed: .9
    });
  }

  function handleResize() {
    node.style.height = window.innerHeight + 'px';

    // resize the image and position it based on the size of the headline
    for (var j = 0; j < _imageList.length; j++) {
      _imageList[j].style.height = node.clientHeight - _headline.clientHeight + 'px';
    }
  }

  function handleOrientationChange() {
    handleResize();

    setTimeout(handleResize, 500);
    setTimeout(handleResize, 1000);
  }


  /*
    Public methods
  */

  _instance.scrollUpdate = function(perc) {
    var imageRange = window.innerHeight * .2;
    var arrowRange = window.innerHeight * 1.2;

    gsap.set(_imageContainer, {
      y: Math.round(imageRange * perc)
    });

    if (_arrowButton.style.transition !== 'none') {
      _arrowButton.style.transition = 'none';
    }

    gsap.to(_arrowButton, {
      duration: .1,
      y: Math.round(arrowRange * perc)
    });
  };

  init();

  return _instance;
}

function MapLayer() {

  var _instance = document.createElement('div');

  _instance.currentMap;
  _instance.isOverlayShown = false;

  var CLASS_NAME = 'map-layer';
  var ASSET_WIDTH = 300;
  var ASSET_HEIGHT = 500;
  var ASSET_RATIO = ASSET_WIDTH / ASSET_HEIGHT;

  var _baseScaleContainer;
  var _scaleContainer;
  var _panContainer;
  // var _gifContainer;
  var _spotlight;
  var _bgImage;
  var _fgImage;
  var _isLoaded = false;
  var _currentAnimIndex;
  var _overlayImage;
  var _preloadImages = {};

  // var _twnObj = {
  //   perc: 0,
  //   name: 'map-scene-1'
  // };

  function init() {
    _instance.classList.add(CLASS_NAME);

    buildContainers();
    buildBG();
    buildGradient();
    buildScenes();
    // buildGraphicalPaths();

    addListeners();
    handleResize();

    // load the initial scene
    AnimationSettings.transitions[0].element.load();

    // loadMap();
    // buildAnimations();

    // if (_isLoaded === false) {
    //   if (sceneIndex > 1) {
    //     _isLoaded = true;
    //
    //     loadMap();
    //     buildAnimations();
    //   }
    // }

    // delay loading of the 2nd scene
    // setTimeout(function() {
    //   AnimationSettings[1].element.load();
    // }, 2000);
  }

  function addListeners() {
    if (Modernizr.touch) {
      window.addEventListener('orientationchange', handleOrientationChange);
    } else {
      window.addEventListener('resize', handleResize);
    }
  }

  function buildContainers() {
    _baseScaleContainer = document.createElement('div');
    _baseScaleContainer.classList.add(CLASS_NAME + '__base-scale-container');
    _instance.appendChild(_baseScaleContainer);

    _scaleContainer = document.createElement('div');
    _scaleContainer.classList.add(CLASS_NAME + '__scale-container');
    // _scaleContainer.classList.add('cross-hairs');
    _baseScaleContainer.appendChild(_scaleContainer);

    _panContainer = document.createElement('div');
    _panContainer.id = 'pan-container';
    _panContainer.classList.add(CLASS_NAME + '__pan-container');
    _scaleContainer.appendChild(_panContainer);

    // NOTE: perf is better without adding _panContainer here
    gsap.set([_baseScaleContainer, _scaleContainer], {
      z: 1
    });
  }

  function buildBG() {
    _bgImage = document.createElement('img');
    _bgImage.classList.add(CLASS_NAME + '__bg-image')
    _panContainer.appendChild(_bgImage);

    gsap.set(_bgImage, {
      z: 1
    });

    _fgImage = document.createElement('img');
    _fgImage.classList.add(CLASS_NAME + '__fg-image')
    _panContainer.appendChild(_fgImage);

    gsap.set(_fgImage, {
      z: 1
    });
  }

  function buildScenes() {
    var prevPos;
    for (var j = 0; j < AnimationSettings.transitions.length; j++) {
      var scene = new AnimationSettings.transitions[j].template(AnimationSettings.transitions[j], _scaleContainer, _panContainer, prevPos);

      prevPos = {};
      prevPos.x = AnimationSettings.transitions[j].x;
      prevPos.y = AnimationSettings.transitions[j].y;
      // _panContainer.appendChild(scene);

      AnimationSettings.transitions[j].element = scene;

      // gsap.set(scene, {
      //   x: AnimationSettings.transitions[j].x,
      //   y: AnimationSettings.transitions[j].y
      // });
    }

    // _gifContainer = document.createElement('div');
    // _gifContainer.classList.add(CLASS_NAME + '__gif-container');
    // _panContainer.appendChild(_gifContainer);
    //
    // TweenLite.set(_gifContainer, {
    //   z: 1
    // });

    // set initial pan position
    // NOTE: these will likely need to change
    var offsetX = 0;//2;
    var offsetY = 0;//2.2;
    gsap.set(_panContainer, {
      x: -AnimationSettings.transitions[0].x + offsetX,
      y: -AnimationSettings.transitions[0].y + offsetY
    });

    gsap.set(_scaleContainer, {
      scale: AnimationSettings.zoomedOut
    });

    AnimationSettings.transitions[0].element.enableAnimations();
  }

  function buildGradient() {
    _spotlight = document.createElement('div');
    _spotlight.classList.add(CLASS_NAME + '__header-gradient');
    _instance.appendChild(_spotlight);

    gsap.set(_spotlight, {
      z: 1,
      opacity: 1
    });

    Model.spotlight = _spotlight;

    // _headerTl = new TimelineLite({});
    // _headerTl.add(TweenLite.to(_gradient, 1, {
    //   opacity: 0,
    //   ease: Quad.easeInOut
    // }));
    //
    // _headerTl.pause();
  }

  function buildAnimations() {

  }


  /*
    Event handlers
  */

  function handleResize(e) {
    _instance.style.height = window.innerHeight + 'px';

    var ratio = window.innerWidth / window.innerHeight;
    var perc;

    if (ratio < ASSET_RATIO) {
      // portrait
      perc =  window.innerWidth / ASSET_WIDTH;
      // perc = Math.max(perc, 1.4);
    } else {
      // landscape
      perc =  window.innerHeight / ASSET_HEIGHT;
      // perc = Math.max(perc, 1);
    }

    ratio = perc;

    gsap.set(_baseScaleContainer, {
      scale: ratio
    });

    // resize spotlight to cancel out any stretching
    // if (window.innerWidth > window.innerHeight) {
    //   gsap.set(_spotlight, {
    //     scaleX: 1,
    //     scaleY: window.innerWidth / window.innerHeight
    //   });
    // } else {
    //   gsap.set(_spotlight, {
    //     scaleX: window.innerHeight / window.innerWidth,
    //     scaleY: 1
    //   });
    // }
  }

  function handleOrientationChange() {
    handleResize();

    setTimeout(handleResize, 500);
    setTimeout(handleResize, 1000);
  }


  /*
    Public methods
  */

  _instance.scrollUpdate = function(perc, transitionObj) {
    // if (transitionName !== _twnObj.name) {
    //   _twnObj.perc = (_twnObj.perc < .5) ? 1 : 0;
    //   _twnObj.name = transitionName;
    // }

    // console.log(transitionObj);
    transitionObj.element.transitionIn(perc);

    // gsap.killTweensOf(_twnObj);
    // gsap.to(_twnObj, {
    //   duration: 0,
    //   perc: perc,
    //   ease: Quart.easeOut,
    //   onUpdate: function() {
    //
    //     // transitionObj
    //     console.log(_twnObj.perc);
    //     transitionObj.element.transitionIn(_twnObj.perc);
    //
    //     // for (var j = 0; j < AnimationSettings.length; j++) {
    //     //   if (transitionName === 'map-scene-' + (j + 1)) {
    //     //     // if (AnimationSettings[j - 1]) {
    //     //     //   AnimationSettings[j - 1].element.transitionOut(_twnObj.perc);
    //     //     // }
    //     //
    //     //     AnimationSettings[j].element.transitionIn(_twnObj.perc);
    //     //   }
    //     // }
    //   }
    // });
  };

  _instance.snapToScene = function(sceneIndex) {
    // console.log('snap', sceneIndex);
    _currentAnimIndex = sceneIndex;

    gsap.set(_panContainer, {
      x: -AnimationSettings.transitions[sceneIndex].x,
      y: -AnimationSettings.transitions[sceneIndex].y
    });

    // manage lazy loading/unloading
    for (var j = 0; j < AnimationSettings.transitions.length; j++) {

      // loads a max of 4 scenes
      if (j >= sceneIndex - 2 && j <= sceneIndex + 1) {

        if (j === sceneIndex) {
          AnimationSettings.transitions[j].element.enableAnimations();
        } else {
          AnimationSettings.transitions[j].element.disableAnimations();
        }

        // load current scene
        if (AnimationSettings.transitions[j].element.isLoaded === false) {
          AnimationSettings.transitions[j].element.load();
        }

      } else {
        if (AnimationSettings.transitions[j].element.isLoaded === true) {
          AnimationSettings.transitions[j].element.disableAnimations();
          AnimationSettings.transitions[j].element.unload();
        }
      }
    }
  };

  _instance.reset = function(imagePath) {
    // console.log('reset', imagePath);
    if (_instance.currentMap !== imagePath) {
      // console.log('new map', imagePath);
      // console.log(-AnimationSettings[_currentAnimIndex].x, -AnimationSettings[_currentAnimIndex].y);

      // gsap.killTweensOf(_twnObj);

      _instance.currentMap = imagePath;
      _bgImage.src = ''; // remove the current img
      _fgImage.src = '';

      _fgImage.style.display = 'none'; // stops the css transitions from happening
      _instance.hideFG();

      var filename = imagePath;// (Model.isSmallScreen) ? 'athlete.jpg' : 'athlete.jpg';
      _bgImage.src = filename;
      _fgImage.src = filename.split('_grey.jpg')[0] + '_color.jpg';

      _fgImage.style.display = '';

      gsap.set(_panContainer, {
        x: -AnimationSettings.transitions[_currentAnimIndex].x + 0,
        y: -AnimationSettings.transitions[_currentAnimIndex].y + 0
      });

      gsap.set(_scaleContainer, {
        scale: AnimationSettings.zoomedOut,
        opacity: 0
      });
    }
  };

  _instance.addOverlay = function(path) {
    _instance.isOverlayShown = true;
    // console.log('show overlay', path);

    if (_overlayImage) {
      _panContainer.removeChild(_overlayImage);
      _overlayImage = null;
    }

    _overlayImage = document.createElement('img');
    _overlayImage.classList.add(CLASS_NAME + '__overlay-image')
    _overlayImage.onload = function() {
      gsap.to(_overlayImage, {
        duration: .3,
        opacity: 1,
        ease: Linear.easeNone
      });
    };
    _overlayImage.src = path;
    _panContainer.appendChild(_overlayImage);

    gsap.set(_overlayImage, {
      z: 1,
      opacity: 0
    });
  };

  _instance.removeOverlay = function() {
    _instance.isOverlayShown = false;
    // console.log('remove overlay');

    if (_overlayImage) {
      gsap.to(_overlayImage, {
        duration: .2,
        opacity: 0,
        ease: Linear.easeNone,
        onComplete: function() {
          if (_overlayImage) {
            _panContainer.removeChild(_overlayImage);
            _overlayImage = null;
          }
        }
      });
    }
  };

  _instance.loadOverlay = function(path) {
    if (!_preloadImages[path]) {
      var img = document.createElement('img');
      img.src = path;

      _preloadImages[path] = true;

      // console.log('lazy loading overlay', path);
    }
  };

  _instance.showFG = function() {
    if (!_instance.isFGShown()) {
      _fgImage.classList.add('show');
    }
  };

  _instance.hideFG = function() {
    if (_instance.isFGShown()) {
      _fgImage.classList.remove('show');
    }
  };

  _instance.isFGShown = function() {
    return _fgImage.classList.contains('show');
  }

  init();

  return _instance;
}

function SectionItem(node) {

  var _instance = node;
  _instance.isLoaded = false;
  _instance.hasTitle = false;
  _instance.isTitleShown = false;

  var CLASS_NAME = 'section-item';

  var _textContainer;
  var _titleItem;
  var _textItem;
  var _slideshow;
  var _textTicker;
  var _textTicker2;
  var _imageList;
  var _nextArrowButton;

  function init() {
    buildSlideshow();

    _titleItem = node.querySelector('.title-item');
    _textItem = node.querySelector('.text-item');

    _nextArrowButton = node.querySelector('.text-item__arrow-button');

    if (_titleItem) {
      _instance.hasTitle = true;
      _textContainer = _titleItem.querySelector('.title-item__text-container');
      _imageList = _titleItem.querySelectorAll('.title-item__image-container img');

      buildTitle();
    }

    if (_textItem) {
      _textContainer = _textItem.querySelector('.text-item__text-container');
    }

    addListeners();
    handleResize();
  }

  function addListeners() {
    if (Modernizr.touch) {
      window.addEventListener('orientationchange', handleOrientationChange);
    } else {
      window.addEventListener('resize', handleResize);
    }

    if (_nextArrowButton) {
      _nextArrowButton.addEventListener('click', handleNextArrowClick);
    }
  }

  function buildSlideshow() {
    var slideshowNode = node.querySelector('.card-slideshow');

    if (slideshowNode) {
      _slideshow = new CardSlideshow(slideshowNode);
    }
  }

  function buildTitle() {
    // var athleteNameNode = _titleItem.querySelector('.title-item__athlete-name');
    // var str = athleteNameNode.innerHTML;
    // athleteNameNode.innerHTML = '';
    //
    // _textTicker = new TextTicker(true, 4);
    // _textTicker.classList.add('ticker');
    // athleteNameNode.appendChild(_textTicker);
    //
    // _textTicker.reset(str);
    // _textTicker.pause();
  }


  /*
    Event handlers
  */

  function handleNextArrowClick(e) {
    // var destinY = node.offsetTop + node.clientHeight + (window.innerHeight * 1.6);
    var destinY = node.offsetTop + node.clientHeight + (window.innerHeight * 1.5);//  + (window.innerHeight * .6); // + (window.innerHeight * 1.2) + (window.innerHeight * .5);

    // if going to footer, adjust slightly
    Model.callTracking('nextarrow:click');

    WindowScroll.scroll({
      y: destinY,
      speed: 1,
      ease: 'quart.inOut'
    });
  }

  function handleResize(e) {
    if (_textItem) {
      _textItem.style.height = _textContainer.clientHeight + window.innerHeight + 'px';
    }
    if (_instance.hasTitle && node.id !== 'brady') {
      node.style.marginTop = -Math.round((window.innerHeight * .5)) + 'px';
    }
  }

  function handleOrientationChange(e) {
    handleResize();
    setTimeout(handleResize, 500);
    setTimeout(handleResize, 1000);
  }


  /*
    Public methods
  */

  _instance.scrollUpdate = function(scrollAmount) {
    if (_instance.isTitleShown) {
      // TODO: img parallax effect
      var perc = scrollAmount / window.innerHeight; // this is wrong
      var startY1 = (window.innerWidth < 500) ? 50 : 50;
      var img1Range = (window.innerWidth < 500) ? 30 : 50;
      var startY2 = (window.innerWidth < 500) ? 20 : 50;
      var img2Range = (window.innerWidth < 500) ? 60 : 100;

      gsap.set(_imageList[0], {
        y: startY1 - (img1Range * perc)
      });

      gsap.set(_imageList[1], {
        y: startY2 - (img2Range * perc)
      });
    }
  };

  _instance.load = function() {
    if (_instance.isLoaded === false) {
      _instance.isLoaded = true;

      if (_slideshow) {
        _slideshow.load();
      }
    }
  };

  _instance.showTitle = function() {
    _instance.isTitleShown = true;

    // _textTicker.start();
    // _textTicker2.start();
  };

  _instance.hideTitle = function() {
    _instance.isTitleShown = false;

    // _textTicker.pause();
    // _textTicker2.pause();
  };

  init();

  return _instance;
}

(function AJAX(window) {
  var _instance = {};

  _instance.load = function(url, callbackFunction, method) {
    method = method || "GET";

    var xmlhttp;

    if (window.XMLHttpRequest) {
      // code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
    } else {
      // code for IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = onReadyStateChange;
    xmlhttp.open(method, url, true);
    xmlhttp.send();

    function onReadyStateChange() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        callbackFunction(xmlhttp.responseText);
        xmlhttp = null;
      }
    }
  };

  _instance.loadJSONP = function(url, callbackFunction) {
    var uniqueIdentifier = "_" + new Date();
    var script = document.createElement("script");
    var head = document.getElementsByTagName("head")[0] || document.documentElement;

    window[uniqueIdentifier] = function(data) {
      head.removeChild(script);
      callbackFunction(data);
    };

    script.src = url + "&callback=" + uniqueIdentifier;
    head.appendChild(script);
  };

  window.AJAX = _instance;

})(window);

(function() {

  var Animations = {};

  Animations.fadeUp = function(el, delay, callback) {
    TweenLite.set(el, {opacity: 0,y: 40});

    TweenLite.to(el, .5, {
      delay: delay,
      opacity: 1,
      y: 0,
      ease: Quad.easeOut,
      onComplete: function() {
        if (callback) {
          callback();
        }
      }
    });
  };

  Animations.fadeOut = function(el, delay, callback) {
    TweenLite.to(el, .3, {
      delay: delay,
      opacity: 0,
      y: 40,
      ease: Quad.easeIn,
      onComplete: function() {
        if (callback) {
          callback();
        }
      }
    });
  };

  window.Animations = Animations;

})();

function AudioPlayer() {

  var _instance = {};

  _instance.isPlaying = false;

  var _audio;
  var _onCompleteCallback;

  function init() {
    // _instance.classList.add(CLASS_NAME);

    _audio = new Audio();

    addListeners();
  }

  function addListeners() {
    _audio.addEventListener('ended', handleComplete);
  }


  /*
    Event handlers
  */

  function handleComplete(e) {
    _instance.isPlaying = false;

    if (_onCompleteCallback) {
      _onCompleteCallback();
    }
  }


  /*
    Public methods
  */

  _instance.setTrack = function(path, callback) {
    _audio.src = path;

    if (_onCompleteCallback) {
      // stop the previous track if it's playing
      _onCompleteCallback();
    }

    if (callback) {
      _onCompleteCallback = callback;
    }
  };

  _instance.play = function() {
    if (_instance.isPlaying) {
      _audio.pause();

      if (_onCompleteCallback) {
        // stop the previous track if it's playing
        _onCompleteCallback();
      }
    }

    _instance.isPlaying = true;
    _audio.play();
  };

  _instance.pause = function() {
    _instance.isPlaying = false;
    _audio.pause();
  };

  _instance.kill = function() {
    if (_instance.isPlaying) {
      _instance.pause();
    }

    // _audio.src = null;

    if (_onCompleteCallback) {
      _onCompleteCallback = null;
    }
  };

  init();

  return _instance;
}

function EventDispatcher() {
  "use strict";

    function doCleanUp() {
        if (_cleanUp === !0) {
            var i, data, l = _stack.length,
                newStack = [];
            for (i = 0; l > i; i += 1) data = _stack[i], data.kill === !1 && newStack.push(data);
            _cleanUp = !1, _stack = newStack
        }
    }
    var _cleanupTimeout, _stack = [],
        _instance = this,
        _cleanUp = !1;
    _instance.addEventListener = function(name, callback) {
        _stack.push({
            name: name,
            callback: callback,
            kill: !1
        })
    }, _instance.removeEventListener = function(name, callback) {
        var i, data, l = _stack.length;
        for (i = 0; l > i; i += 1) data = _stack[i], data.name === name && data.callback === callback && (data.kill = !0, _cleanUp = !0)
    }, _instance.dispatchEvent = function(name, params) {
        clearTimeout(_cleanupTimeout), _cleanupTimeout = setTimeout(doCleanUp, 1e3);
        var i, data, l = _stack.length;
        for (i = 0; l > i; i += 1)
            if (data = _stack[i], data.name === name) {
                if (data.kill === !0) continue;
                data.callback(params)
            }
    }
}

(function() {

  var Share = {};

  var WINDOW_SETTINGS = 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600';
  var FACEBOOK_URL = 'https://www.facebook.com/sharer.php?u=';
  var TWITTER_URL = 'https://twitter.com/intent/tweet?url=';

  Share.facebook = function(url) {
    window.open(FACEBOOK_URL + url, '_blank', WINDOW_SETTINGS);
  };

  Share.twitter = function(url, text) {
    text = text || '';

    window.open(TWITTER_URL + url + '&text=' + text, '_blank', WINDOW_SETTINGS);
  };

  Share.spotify = function(url) {
    window.open(url, '_blank');
  };

  window.Share = Share;

})();

function TextResizer(el) {
  var _instance = {};

  function init() {
    addListeners();
    handleResize();

    setTimeout(handleResize, 100);
    setTimeout(handleResize, 200);
  }

  function addListeners() {
    window.addEventListener('resize', handleResize);
  }

  function handleResize(e) {
    var size = 12;
    var bottomPadding = 85;

    for (var j = 0; j < 100; j++) {
      el.style.fontSize = size + 'px';

      if (el.clientHeight > window.innerHeight - bottomPadding) {
        // too big. size it down one and stop.
        el.style.fontSize = size - 1 + 'px';
        break;
      } else {

      }

      size += 1;
    }
  }

  init();

  return _instance;
}

function TextTicker(forceScrollMode, speed) {

  var _instance = document.createElement('div');

  var CLASS_NAME = 'text-ticker';

  var _strip;
  var _text1;
  var _text2;
  var _text3;
  var _text4;
  var _text5;
  var _animationInterval;
  var _stripPosX = 0;
  // var _touchVelocity;
  var _dir = 'left';
  var _checkTimer;
  var _isDragging = false;
  var _currentMouseX;
  var _currentMovement;
  var _velocityTicker;

  function init() {
    speed = speed || 2;

    _instance.classList.add(CLASS_NAME);

    buildStrip();
    buildText();

    addListeners();
  }

  function addListeners() {
    window.addEventListener('resize', handleResize);
  }

  function buildStrip() {
    _strip = document.createElement('div');
    _strip.classList.add(CLASS_NAME + '__strip')
    _instance.appendChild(_strip);

    gsap.set(_strip, {
      z: 1
    });
  }

  function buildText() {
    // build 2 texts.
    // use a css class to apply the ellipsis
    // after viewing the ellipsis for 3 secs, change to scrolling mode.
      // on complete, back to ellipsis. rinse and repeat.

    _text1 = document.createElement('div');
    _text1.classList.add(CLASS_NAME + '__text');
    _strip.appendChild(_text1);

    _text2 = document.createElement('div');
    _text2.classList.add(CLASS_NAME + '__text');
    _strip.appendChild(_text2);

    _text3 = document.createElement('div');
    _text3.classList.add(CLASS_NAME + '__text');
    _strip.appendChild(_text3);

    _text4 = document.createElement('div');
    _text4.classList.add(CLASS_NAME + '__text');
    _strip.appendChild(_text4);

    _text5 = document.createElement('div');
    _text5.classList.add(CLASS_NAME + '__text');
    _strip.appendChild(_text5);
  }

  function startTimers() {
    if (!forceScrollMode) {
      _text1.classList.remove('scroll-mode');
      _text2.style.opacity = 0;
    }

    positionText();

    _stripPosX = Math.round(Math.random() * -_text1.clientWidth);

    gsap.killTweensOf(_strip);
    gsap.set(_strip, {
      x: _stripPosX
    });

    handleTickerStart();
  }

  function stopTimers() {
    // if (_animationInterval) {
    //   clearInterval(_animationInterval);
    //   _animationInterval = null;
    // }

    gsap.killTweensOf(_strip);
  }

  function positionText() {
    _text2.style.left = _text1.clientWidth + 'px';
    _text3.style.left = (_text1.clientWidth * 2) + 'px';
    _text4.style.left = (_text1.clientWidth * 3) + 'px';
    _text5.style.left = (_text1.clientWidth * 4) + 'px';
  }

  // function updatePosition(movement) {
  //   stopTimers();
  //
  //   if (_checkTimer) {
  //     clearTimeout(_checkTimer);
  //     _checkTimer = null;
  //   }
  //
  //   _checkTimer = setTimeout(function() {
  //     if (!_currentMouseX) {
  //       handleTickerStart();
  //     }
  //   }, 50);
  //   // startTimers();
  //
  //   // _stripPosX = _strip._gsTransform.x + touch.movement;
  //   _stripPosX += movement;
  //   _dir = (movement <= 0) ? 'left' : 'right';
  //
  //   if (_stripPosX < -_text1.clientWidth) {
  //     _stripPosX = -1;
  //     _stripPosX += movement;
  //   }
  //
  //   if (_stripPosX > 0) {
  //     _stripPosX = -_text1.clientWidth;
  //     _stripPosX += movement;
  //   }
  //
  //   TweenLite.killTweensOf(_strip);
  //   TweenLite.set(_strip, {
  //     x: _stripPosX
  //   });
  // }


  /*
    Event handlers
  */

  // function handleDrag(touch) {
  //   if (_isDragging === false) {
  //     _isDragging = true;
  //     Model.trackAnalyticsEvent('album_info:drag');
  //   }
  //
  //   updatePosition(touch.movement);
  // }

  function handleResize() {
    positionText();
  }

  function handleTickerStart() {
    _isDragging = false;
    // remove ellipsis
    // _text1.classList.add('scroll-mode');

    var fn = function() {
      if (_dir === 'left') {
        _stripPosX -= speed;
      } else {
        _stripPosX += speed;
      }

      if (_stripPosX <= -_text3.offsetLeft) {
        gsap.killTweensOf(_strip);
        gsap.set(_strip, {
          x: speed
        });
        _stripPosX = 0;
      }

      // if (_stripPosX > 0) {
      //   _stripPosX = -_text1.clientWidth;
      //   TweenLite.killTweensOf(_strip);
      //   TweenLite.set(_strip, {
      //     x: _stripPosX
      //   });
      // }

      gsap.to(_strip, {
        duration: .1,
        x: _stripPosX,
        ease: Linear.easeNone,
        onComplete: fn
      });
    }

    // _animationInterval = setInterval(fn, 100);
    fn();
  }

  // function handleMouseWheel(e) {
  //   var movement = e.wheelDeltaX;
  //
  //   if (Math.abs(movement) > Math.abs(e.wheelDeltaY)) {
  //     e.preventDefault();
  //
  //     movement *= -.15; // optimized for apple trackpad
  //
  //     updatePosition(movement);
  //   }
  // }

  // function handleMouseDown(e) {
  //   _instance.parentNode.classList.add('grabbing');
  //
  //   // track movement
  //   _currentMouseX = e.clientX;
  //
  //   if (_velocityTicker) {
  //     cancelAnimationFrame(_velocityTicker);
  //   }
  //
  //   updatePosition(0);
  //
  //   window.addEventListener('mousemove', handleMouseMove);
  //   window.addEventListener('mouseup', handleMouseUp);
  // }
  //
  // function handleMouseUp(e) {
  //   _instance.parentNode.classList.remove('grabbing');
  //
  //   _currentMouseX = null;
  //
  //   window.removeEventListener('mousemove', handleMouseMove);
  //   window.removeEventListener('mouseup', handleMouseUp);
  //
  //   // use _currentMovement to create velocity
  //   if (_currentMovement) {
  //     if (_currentMovement < -100) {
  //       _currentMovement = -100;
  //     }
  //
  //     if (_currentMovement > 100) {
  //       _currentMovement = 100;
  //     }
  //
  //     _velocityTicker = requestAnimationFrame(handleVelocityTick);
  //   } else {
  //     updatePosition(0);
  //   }
  // }
  //
  // function handleMouseMove(e) {
  //   _currentMovement = _currentMouseX - e.clientX;
  //
  //   updatePosition(-_currentMovement);
  //
  //   _currentMouseX = e.clientX;
  // }

  // function handleVelocityTick() {
  //   _currentMovement *= .92;
  //
  //   // var movement = _currentMouseX;// _velocityX * 15;
  //   // _touch.movement = movement;
  //   // _touch.x += movement;
  //
  //   // if (callbacks.touchmove) {
  //   //   callbacks.touchmove(_touch);
  //   // }
  //
  //   updatePosition(-_currentMovement);
  //
  //   if (Math.abs(_currentMovement) > 1) {
  //   // if ((_velocityX > .05 || _velocityX < -.03)) {
  //     _velocityTicker = requestAnimationFrame(handleVelocityTick);
  //   } else {
  //     // _instance.isRunning = false;
  //   }
  // }


  /*
    Public methods
  */

  _instance.reset = function(txt) {
    _text1.innerHTML = txt;
    _text2.innerHTML = txt;
    _text3.innerHTML = txt;
    _text4.innerHTML = txt;
    _text5.innerHTML = txt;

    _instance.start();
  };

  _instance.start = function() {
    stopTimers();
    positionText();
    startTimers();

    // if (Modernizr.touch) {
    //   var options = {
    //     touchmove: handleDrag
    //   };
    //
    //   _touchVelocity = new TouchVelocityX(_instance.parentNode, options, Hammer.DIRECTION_HORIZONTAL);
    // }

    // add mousewheelx detection
    // _instance.parentNode.addEventListener('wheel', handleMouseWheel);
    // _instance.parentNode.addEventListener('mousedown', handleMouseDown);
  };

  _instance.pause = function() {
    stopTimers();

    // if (_touchVelocity) {
    //   _touchVelocity.kill();
    //   _touchVelocity = null;
    // }

    // _instance.parentNode.removeEventListener('wheel', handleMouseWheel);
    // _instance.parentNode.removeEventListener('mousedown', handleMouseDown);
  };

  init();

  return _instance;
}

function TouchVelocityX(node, callbacks, dir) {

  var _instance = {};

  _instance.isRunning = false;

  var _hammer;
  var _velocityX;
  var _velocityTicker;
  var _t;
  var _isSlowingDownDrag = false;
  var _allowVelocity = true;
  var _v;
  var _touch = {
    x: 0,
    y: 0,
    movement: 0
  };

  function init() {
    _hammer = new Hammer(node);

    _pan = new Hammer.Pan({
      direction: dir,
      threshold: 0
    });

    _hammer.add([_pan]);

    _instance.enable();
  }

  function addListeners() {
    _hammer.on("panstart", handleDragStart);
    _hammer.on("pan", handleDrag);
    // _hammer.on("panend", handleDragEnd);
  }

  function removeListeners() {
    if (_hammer) {
      _hammer.off("panstart", handleDragStart);
      _hammer.off("pan", handleDrag);
      // _hammer.off("panend", handleDragEnd);
    }
  }

  var getDifference = function(a, b) {
    return Math.abs(a - b);
  }


  /**
    Event Handlers
  */

  function handleDragStart(ev) {
    if (_velocityTicker) {
      cancelAnimationFrame(_velocityTicker);
    }

    _allowVelocity = true;

    _touch.x = ev.center.x;
    _touch.y = ev.center.y;
    _touch.movement = 0;

    if (callbacks.touchstart) {
      callbacks.touchstart(_touch, ev);
    }
  }

  function handleDrag(ev) {
    if (ev.isFinal) {
      // fixes a bug where dragend doesnt call
      handleDragEnd(ev);
    }

    if (ev.center.x === 0 && ev.center.y === 0) {
      // fixes a bug for android
      return;
    }

    var diff = getDifference(_touch.x, ev.center.x);

    _v = ev.velocityX;

    // stop velocity
    if (_v === 0) {
      if (_t) {
        clearTimeout(_t);
        _t = null;
      }

      _velocityX = 0;
    }

    if (Math.abs(_velocityX) > Math.abs(ev.velocityX)) {

      if (!_isSlowingDownDrag) {
        _isSlowingDownDrag = true;
        _velocityX = _v;

        // if (!_t) {
        //   _t = setTimeout(function() {
        //     _velocityX = _v;
        //   }, 10);
        // }
      }

    } else {
      _isSlowingDownDrag = false;

      if (_t) {
        clearTimeout(_t);
        _t = null;
      }

      _velocityX = ev.velocityX;
    }

    if (_touch.x < ev.center.x) {

    } else {
      diff = -diff;
    }

    _touch.movement = diff;
    _touch.x = ev.center.x;
    _touch.y = ev.center.y;

    if (callbacks.touchmove) {
      callbacks.touchmove(_touch, ev);
    }
  }

  function handleDragEnd(ev) {
    _touch.x = ev.center.x;
    _touch.y = ev.center.y;

    if (callbacks.touchend) {
      callbacks.touchend(_touch, ev);
    }

    if (_t) {
      clearTimeout(_t);
      _t = null;
    }

    _instance.isRunning = true;

    _velocityTicker = requestAnimationFrame(handleVelocityTick);
  }

  function handleVelocityTick() {
    if (_allowVelocity === true) {
      _velocityX *= .98;

      var movement = _velocityX * 15;
      _touch.movement = movement;
      _touch.x += movement;

      if (callbacks.touchmove) {
        callbacks.touchmove(_touch);
      }

      if (Math.abs(_velocityX) > .03) {
      // if ((_velocityX > .05 || _velocityX < -.03)) {
        _velocityTicker = requestAnimationFrame(handleVelocityTick);
      } else {
        _instance.isRunning = false;
      }
    }
  }


  /**
    Public methods
  */

  _instance.stopVelocity = function() {
    _allowVelocity = false;
  };

  _instance.enable = function() {
    addListeners();
  };

  _instance.disable = function() {
    removeListeners();
  };

  _instance.kill = function() {
    _instance.disable();

    if (_velocityTicker) {
      clearTimeout(_velocityTicker);
      _velocityTicker = null;
    }
  };

  init();

  return _instance;
}

(function Triangles() {

  var _instance = {};

  _instance.solve = function(a, b, c, A, B, C) {
    var sides  = (a != null) + (b != null) + (c != null);  // Boolean to integer conversion
  	var angles = (A != null) + (B != null) + (C != null);  // Boolean to integer conversion
  	var area, status;

  	if (sides + angles != 3)
  		throw "Give exactly 3 pieces of information";
  	else if (sides == 0)
  		throw "Give at least one side length";

  	else if (sides == 3) {
  		status = "Side side side (SSS) case";
  		if (a + b <= c || b + c <= a || c + a <= b)
  			throw status + " - No solution";
  		A = solveAngle(b, c, a);
  		B = solveAngle(c, a, b);
  		C = solveAngle(a, b, c);
  		// Heron's formula
  		var s = (a + b + c) / 2;
  		area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

  	} else if (angles == 2) {
  		status = "Angle side angle (ASA) case";
  		// Find missing angle
  		if (A == null) A = 180 - B - C;
  		if (B == null) B = 180 - C - A;
  		if (C == null) C = 180 - A - B;
  		if (A <= 0 || B <= 0 || C <= 0)
  			throw status + " - No solution";
  		var sinA = Math.sin(degToRad(A));
  		var sinB = Math.sin(degToRad(B));
  		var sinC = Math.sin(degToRad(C));
  		// Use law of sines to find sides
  		var ratio;  // side / sin(angle)
  		if (a != null) { ratio = a / sinA; area = a * ratio * sinB * sinC / 2; }
  		if (b != null) { ratio = b / sinB; area = b * ratio * sinC * sinA / 2; }
  		if (c != null) { ratio = c / sinC; area = c * ratio * sinA * sinB / 2; }
  		if (a == null) a = ratio * sinA;
  		if (b == null) b = ratio * sinB;
  		if (c == null) c = ratio * sinC;

  	} else if (A != null && a == null || B != null && b == null || C != null && c == null) {
  		status = "Side angle side (SAS) case";
  		if (A != null && A >= 180 || B != null && B >= 180 || C != null && C >= 180)
  			throw status + " - No solution";
  		if (a == null) a = solveSide(b, c, A);
  		if (b == null) b = solveSide(c, a, B);
  		if (c == null) c = solveSide(a, b, C);
  		if (A == null) A = solveAngle(b, c, a);
  		if (B == null) B = solveAngle(c, a, b);
  		if (C == null) C = solveAngle(a, b, c);
  		if (A != null) area = b * c * Math.sin(degToRad(A)) / 2;
  		if (B != null) area = c * a * Math.sin(degToRad(B)) / 2;
  		if (C != null) area = a * b * Math.sin(degToRad(C)) / 2;

  	} else {
  		status = "Side side angle (SSA) case - ";
  		var knownSide, knownAngle, partialSide;
  		if (a != null && A != null) { knownSide = a; knownAngle = A; }
  		if (b != null && B != null) { knownSide = b; knownAngle = B; }
  		if (c != null && C != null) { knownSide = c; knownAngle = C; }
  		if (a != null && A == null) partialSide = a;
  		if (b != null && B == null) partialSide = b;
  		if (c != null && C == null) partialSide = c;
  		if (knownAngle >= 180)
  			throw status + "No solution";
  		var ratio = knownSide / Math.sin(degToRad(knownAngle));
  		var temp = partialSide / ratio;  // sin(partialAngle)
  		var partialAngle, unknownSide, unknownAngle;
  		if (temp > 1 || knownAngle >= 90 && knownSide <= partialSide)
  			throw status + "No solution";
  		else if (temp == 1 || knownSide >= partialSide) {
  			status += "Unique solution";
  			partialAngle = radToDeg(Math.asin(temp));
  			unknownAngle = 180 - knownAngle - partialAngle;
  			unknownSide = ratio * Math.sin(degToRad(unknownAngle));  // Law of sines
  			area = knownSide * partialSide * Math.sin(degToRad(unknownAngle)) / 2;
  		} else {
  			status += "Two solutions";
  			var partialAngle0 = radToDeg(Math.asin(temp));
  			var partialAngle1 = 180 - partialAngle0;
  			var unknownAngle0 = 180 - knownAngle - partialAngle0;
  			var unknownAngle1 = 180 - knownAngle - partialAngle1;
  			var unknownSide0 = ratio * Math.sin(degToRad(unknownAngle0));  // Law of sines
  			var unknownSide1 = ratio * Math.sin(degToRad(unknownAngle1));  // Law of sines
  			partialAngle = [partialAngle0, partialAngle1];
  			unknownAngle = [unknownAngle0, unknownAngle1];
  			unknownSide = [unknownSide0, unknownSide1];
  			area = [knownSide * partialSide * Math.sin(degToRad(unknownAngle0)) / 2,
  			        knownSide * partialSide * Math.sin(degToRad(unknownAngle1)) / 2];
  		}
  		if (a != null && A == null) A = partialAngle;
  		if (b != null && B == null) B = partialAngle;
  		if (c != null && C == null) C = partialAngle;
  		if (a == null && A == null) { a = unknownSide; A = unknownAngle; }
  		if (b == null && B == null) { b = unknownSide; B = unknownAngle; }
  		if (c == null && C == null) { c = unknownSide; C = unknownAngle; }
  	}

    var obj = {};

    obj.sideA = a;
    obj.sideB = b;
    obj.sideC = c;
    obj.angleA = A;
    obj.angleB = B;
    obj.angleC = C;

    return obj;

  	// return [a, b, c, A, B, C, area, status];
  }

  function solveSide(a, b, C) {
  	C = degToRad(C);

  	if (C > 0.001)
  		return Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(C));
  	else  // Explained in https://www.nayuki.io/page/numerically-stable-law-of-cosines
  		return Math.sqrt((a - b) * (a - b) + a * b * C * C * (1 - C * C / 12));
  }


  // Returns angle C using law of cosines
  function solveAngle(a, b, c) {
  	var temp = (a * a + b * b - c * c) / (2 * a * b);
  	if (-1 <= temp && temp <= 0.9999999)
  		return radToDeg(Math.acos(temp));
  	else if (temp <= 1)  // Explained in https://www.nayuki.io/page/numerically-stable-law-of-cosines
  		return radToDeg(Math.sqrt((c * c - (a - b) * (a - b)) / (a * b)));
  	else
  		throw "No solution";
  }

  function degToRad(x) {
  	return x / 180 * Math.PI;
  }

  function radToDeg(x) {
  	return x / Math.PI * 180;
  }

  window.Triangles = _instance;

})();

(function WindowScroll(window) {

	var _instance = {};

	var _obj = {};
	var _scrollElement;
	var _isAnimating = false;

	_instance.init = function(el) {
		_scrollElement = el || window;

		_instance._setPositions();

		_scrollElement.addEventListener('scroll', function(e) {
			_instance._setPositions(e);
		});
	}

	_instance.scroll = function(opts) {
		var options = {
			x: 0,
			y: 0,
			speed: .8,
			ease: Quad.easeInOut,
			animate: true,
			onComplete: function() {},
			onUpdate: function() {}
		}

		for (var o in opts) {
			options[o] = opts[o];
		}

		_obj.x = _instance.getPositionX();
		_obj.y = _instance.getPositionY();

		// window.scrollTo(options.x, options.y);
		// _instance._setPositions();

		if (options.animate === true) {
			_isAnimating = true;

			TweenLite.killTweensOf(_obj);
			TweenLite.to(_obj, options.speed, {
				onUpdate: update,
				x: options.x,
				y: options.y,
				ease: options.ease,
				onComplete: function() {
					_isAnimating = false;

					options.onComplete();
				}
			});
		} else {
			TweenLite.killTweensOf(_obj);

			_scrollElement.scrollTo(options.x, options.y);
			_instance._setPositions();
		}
	};

	function update() {
		_scrollElement.scrollTo(_obj.x, _obj.y);
	}

	_instance._setPositions = function(e) {
		_obj.x = (_scrollElement === window) ? window.pageXOffset : _scrollElement.scrollLeft;
		_obj.y = (_scrollElement === window) ? window.pageYOffset : _scrollElement.scrollTop;

		if (_obj.x < 0) {
			_obj.x = 0;
		}

		if (_obj.y <= 0) {
			_obj.y = 0;
		}
	};

	_instance.getPositionX = function() {
		return _obj.x;
	};

	_instance.getPositionY = function() {
		return _obj.y;
	};

	_instance.getDocumentHeight = function() {
		var body = document.body;
    var html = document.documentElement;

		var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

		return height;
	};

	_instance.killScroll = function() {
		TweenLite.killTweensOf(_obj);
	};

	window.WindowScroll = _instance;

})(window);

(function() {

  var _instance = {};

  var _mainContainer;
  var _contentContainer;
  var _header;
  var _footer;
  var _map;
  var _contentItems = [];
  var _textSections = [];
  var _miniNavList;

  _instance.init = function() {
    if (window.location.hash) {
      window.location = window.location.href.split('#')[0]; // remove the hash on reload
    }

    _mainContainer = document.querySelector('.nfl-retirement');
    _contentContainer = document.querySelector('.content-container');
    _header = new Header(document.querySelector('.header'));
    _footer = document.querySelector('.footer');
    var toolbar = document.querySelector('#toolbar');
    _header.node.appendChild(toolbar);

    _miniNavList = _mainContainer.querySelectorAll('.mini-nav');

    var scrollContainer = (Modernizr.touch) ? _contentContainer : window;
    // var scrollContainer = _mainContainer;//  (Modernizr.touch) ? _mainContainer : window;

    WindowScroll.init(scrollContainer);
    Model.init();

    Model.mainContainer = _mainContainer;
    Model.svg = _mainContainer.querySelector('.svg');

    // if mobile, check
    if (Modernizr.touch) {
      setTimeout(function() {
        // console.log(WindowScroll.getPositionY());

        if (WindowScroll.getPositionY() !== 0) {
          // console.log('scrolling up');
          WindowScroll.scroll({
            y: 0,
            speed: 0
          })
        }
      }, 0);
    }

    buildItems();
    buildMap();
    buildNav();

    addListeners();
    handleResize();

    Model.callTracking('load');
    Model.callTracking('window:' + window.innerWidth + 'x' + window.innerHeight);
  }

  function addListeners() {
    if (Modernizr.touch) {
      _contentContainer.addEventListener('scroll', handleScroll);
      // window.addEventListener('scroll', handleScroll);
      window.addEventListener('orientationchange', handleOrientationChange);

      _mainContainer.addEventListener('touchmove', function(e) {
        if (Model.preventWindowScroll === true) {
          e.preventDefault();
        }
      });

      // window.addEventListener('touchmove', function(e) {
      //   e.preventDefault();
      // });
    } else {
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);
    }
  }

  function buildMap() {
    _map = new MapLayer();
    document.body.appendChild(_map);
  }

  function buildItems() {
    var mainEl = document.querySelector('main');
    var len = mainEl.children.length;
    var transitionCountIndex = 0;
    var sectionCountIndex = 0;
    for (var j = 0; j < len; j++) {
      var el = mainEl.children[j];

      if (el.classList.contains('transition-item')) {

        if (el.getAttribute('data-x')) {
          var obj = {};
          obj.x = el.getAttribute('data-x');
          obj.y = el.getAttribute('data-y');

          var template = el.getAttribute('data-template');

          // show,hide,zoomin,zoomout,zoominout,slide
          if (template === 'initial') {
            obj.template = TransitionInitial;
          } else if (template === 'show') {
            obj.template = TransitionShow;
          } else if (template === 'hide') {
            obj.template = TransitionHide;
          } else if (template === 'zoomin') {
            obj.template = TransitionZoomIn;
          } else if (template === 'zoomout') {
            obj.template = TransitionZoomOut;
          } else if (template === 'zoominout') {
            obj.template = TransitionZoomInOut;
          } else if (template === 'slide') {
            // obj.template = TransitionSlide;
          } else if (template === 'footer') {
            obj.template = TransitionFooter;
          }

          AnimationSettings.addTransition(obj);

          transitionCountIndex++;
          el.transitionCount = transitionCountIndex;

          _contentItems.push(el);
        }
      } else if (el.classList.contains('section-item')) {
        var s = new SectionItem(el);
        sectionCountIndex++;

        if (s.hasTitle) {
          transitionCountIndex = 0;
          sectionCountIndex = 0;
        }

        s.sectionCount = sectionCountIndex;

        _contentItems.push(s);
        _textSections.push(s);
      }
    }
  }

  function buildNav() {
    for (var j = 0; j < _miniNavList.length; j++) {
      var el = _miniNavList[j];
      el.num = j;

      var btns = el.querySelectorAll('a');
      for (var i = 0; i < btns.length; i++) {
        btns[i].num = i;
      }

      el.classList.add('allow-animations');
      el.addEventListener('click', handleNavButtonClick);
    }
  }

  function getCurrentMap(scrollY) {
    var len = _contentItems.length;
    var offset = window.innerHeight * .5;
    var mapStr;
    for (var j = 0; j < len; j++) {
      var el = _contentItems[j];

      var dataMap = el.getAttribute('data-map');

      if (dataMap) {
        if (scrollY > el.offsetTop + offset) {
          mapStr = dataMap;
        }
      }
    }

    return mapStr;
  }

  function determineTitleTickers(scrollY) {
    var len = _textSections.length;

    for (var j = 0; j < len; j++) {
      var el = _textSections[j];

      if (el.hasTitle) {
        // determine if it's in view
        if (scrollY > el.offsetTop && scrollY < el.offsetTop + el.clientHeight + window.innerHeight) {

          if (!el.isTitleShown) {
            el.showTitle();
          }

        } else {
          if (el.isTitleShown) {
            el.hideTitle();
          }
        }
      }
    }
  }


  function determineMiniNavs(scrollY) {
    var len = _miniNavList.length;
    var revealPadding = 30;

    for (var j = 0; j < len; j++) {
      var el = _miniNavList[j];
      var elY = el.offsetTop || el.parentNode.offsetTop;//  - window.innerHeight; // window height is the header height

      if (!el.isShown) {
        if (scrollY > elY + el.clientHeight + revealPadding && scrollY < elY + window.innerHeight) {
          // is in view, so animate in
          el.isShown = true;
          el.classList.add('show');


          if (j < 5) {
            Model.callTracking('athleteheader:show' + Number(j + 1))
          } else {
            Model.callTracking('footer:show')
          }

          var e = el;
          var del = _isNavClick ? 0 : 500;
          setTimeout(function() {
            e.classList.add('allow-hover')
          }, del);
        }
      } else {
        // has been shown, but out of view
        var boundaryReveal = window.innerHeight; // extra boundaries so they dont animate too often
        if (scrollY < elY - boundaryReveal || scrollY > elY + el.clientHeight + window.innerHeight + boundaryReveal) {
          // reset the classes
          el.isShown = false;
          el.classList.remove('show');
          el.classList.remove('allow-hover')
          el.classList.add('allow-animations')
        }
      }

    }

    _isNavClick = false;
  }


  /*
    Event Handlers
  */
  var _isNavClick = false;
  function handleNavButtonClick(e) {
    _isNavClick = true;
    var el = _miniNavList[e.target.num];

    Model.callTracking('nav:click:' + Number(e.target.num + 1));

    if (el.classList.contains('allow-animations')) {
      el.classList.remove('allow-animations');
    }
  }

  function handleScroll() {
    var scrollY = WindowScroll.getPositionY();

    if (scrollY < window.innerHeight) {
      _header.scrollUpdate(scrollY / window.innerHeight);
    }

    // is a title in view? if so, start it's tickers
    determineTitleTickers(scrollY);
    determineMiniNavs(scrollY);

    // loop through the main.children to see whats in view
    var len = _contentItems.length;
    var sceneIndex = -1;
    var transitionIndex = -1;

    for (var j = 0; j < len; j++) {
      var el = _contentItems[j];

      if (el.classList.contains('section-item')) {
        sceneIndex++;
      }

      if (el.classList.contains('transition-item')) {
        transitionIndex++;
      }

      if (scrollY > el.offsetTop && scrollY < el.offsetTop + el.clientHeight) {

        if (el.classList.contains('transition-item')) {
          var percInView = (scrollY - el.offsetTop) / el.clientHeight;
          _map.scrollUpdate(percInView, AnimationSettings.transitions[transitionIndex]);

          // if map has an overlay, fade it out.
          if (_map.isOverlayShown === true) {
            _map.removeOverlay();
          }

          if (el.transitionCount < 2) {
            // show color
            if (!_map.isFGShown()) {
              _map.showFG();
            }
          } else {
            // hide color
            if (_map.isFGShown()) {
              _map.hideFG();
            }
          }

        } else if (el.classList.contains('section-item')) {
          if (el.sectionCount === 1) {
            // show color
            if (!_map.isFGShown()) {
              _map.showFG();
            }
          } else {
            // hide color
            if (_map.isFGShown()) {
              _map.hideFG();
            }
          }

          var internalScrollPos = scrollY - el.offsetTop;

          el.scrollUpdate(internalScrollPos);

          // perfect the scene's position
          _map.snapToScene(sceneIndex);

          var previousScene = _textSections[sceneIndex - 1];
          var currentScene = _textSections[sceneIndex];
          var nextScene = _textSections[sceneIndex + 1];
          var currentOverlayImage = currentScene.getAttribute('data-overlay-image');

          if (nextScene) {
            var nextOverlayImage = nextScene.getAttribute('data-overlay-image');

            if (nextOverlayImage) {
              _map.loadOverlay(nextOverlayImage);
            }

            if (nextScene.load) {
              if (!nextScene.isLoaded) {
                nextScene.load();
              }
            }
          }

          if (previousScene) {
            if (previousScene.load) {
              if (!previousScene.isLoaded) {
                previousScene.load();
              }
            }
          }

          if (currentOverlayImage && !_map.isOverlayShown) {
            _map.addOverlay(currentOverlayImage);
          }

        }
      }
    }

    // determine the current map image
    var dataMap = getCurrentMap(scrollY);
    if (dataMap) {
      if (_map.currentMap !== dataMap) {
        _map.reset(dataMap);
      }
    }
  }

  function handleResize() {
    // _header.style.height = window.innerHeight + 'px';
    // _footer.style.height = window.innerHeight + 'px';
    document.body.style.height = window.innerHeight + 'px';

    _footer.style.marginTop = -Math.round(window.innerHeight * .5) + 'px';

    // loop through transition items and resize their height
    var transitionHeight = (window.innerWidth < 700) ? window.innerHeight : window.innerHeight * 2;

    for (var j = 0; j < _contentItems.length; j++) {
      var el = _contentItems[j];

      if (el.classList.contains('transition-item')) {
        var destinTransitionHeight = el.classList.contains('transition-item--short') ? window.innerHeight : transitionHeight;

        if (el.classList.contains('footer')) {
          el.style.height = '';
        } else {
          el.style.height = destinTransitionHeight + 'px';
        }
      }
    }

    if (Modernizr.touch) {
      _contentContainer.style.height = window.innerHeight + 'px';
    } else {
      _contentContainer.style.height = '';
    }
  }

  function handleOrientationChange() {
    handleResize();

    setTimeout(handleResize, 500);
    setTimeout(handleResize, 1000);
  }

  window.Main = _instance;

})();

window.onbeforeunload = function() {
  window.scrollTo(0, 0);
};

window.onload = function() {
  window.scrollTo(0, 0);
  Main.init();
};
