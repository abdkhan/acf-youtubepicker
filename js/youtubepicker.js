!function(e){function i(e,i){var t="",a=i.prefix,n=i.language;switch(e){case"panel":t='<div id="'+a+"-"+i.id+'" class="'+a+'"><div class="'+a+'-wrap"><div class="'+a+'-results nano"><div class="'+a+'-content nano-content"></div><div class="'+a+'-no-records">'+n.labels.noRecords+'</div></div><div class="'+a+'-preview"><div class="'+a+'-actions"><a herf="javascript:;" class="'+a+'-preview-select-btn">'+n.buttons.select+'</a><a herf="javascript:;" class="'+a+'-preview-close-btn">'+n.buttons.close+'</a></div><div class="'+a+'-player"></div></div></div></div>';break;case"item":t='<div class="'+a+'-item"><div class="'+a+'-thumbnail"><p class="'+a+'-duration">'+i.duration.hours+":"+i.duration.minutes+":"+i.duration.minutes+'</p><img src="http://i.ytimg.com/vi/'+i.vid+'/default.jpg"/></div><div class="'+a+'-info"><p class="'+a+'-title">'+i.title+'</p><div class="'+a+'-rating"><div class="'+a+'-likes" style="width:'+i.likes+'%"></div></div><div class="'+a+'-view-count">'+i.views+" <span>"+n.labels.views+'</span></div></div><div class="'+a+'-actions"><a class="'+a+'-preview-btn" href="javascript:;">'+n.buttons.preview+'</a><a class="'+a+'-select-btn" href="javascript:;">'+n.buttons.select+"</a></div></div>";break;case"iframe":t='<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+i.vid+'?autoplay=1" frameborder="0" allowfullscreen></iframe>'}return t}function t(e){e=parseInt(e,10);var i=Math.floor(e/3600),t=e%3600,a=Math.floor(t/60);return e=Math.round(t%60),{hours:(10>i?"0":"")+i,minutes:(10>a?"0":"")+a,seconds:(10>e?"0":"")+e}}function a(i,t,a,n){a=parseInt(a,10),t=a*(parseInt(t,10)-1)+1;var s=i.val(),r={q:s,v:2,format:5,"max-results":a,"start-index":t,alt:"jsonc"},l="http://gdata.youtube.com/feeds/api/"+(n?"users/"+n+"/uploads":"videos");i.trigger("loadInit",{field:i}),e.getJSON(l,r,function(t){t=e.extend({},t,{field:i,hasItems:Boolean(t.data.items)}),i.trigger("loadComplete",t)}).fail(function(){i.trigger("loadError",{field:i})})}function n(a){if(a.field){var n=a.field.data("YPFieldData"),s=e("#"+n.prefix+"-"+n.ypid),r=s.find("."+n.prefix+"-content"),l=s.find("."+n.prefix+"-no-records");if(a.hasItems){var o,c,d=a.data;l.hide();for(o in d.items)d.items.hasOwnProperty(o)&&(c=d.items[o],c={title:c.title,vid:c.id,views:c.viewCount,thumb:c.thumbnail.sqDefault,likes:Math.round(100*c.likeCount/c.ratingCount),prefix:n.prefix,language:n.language,duration:t(c.duration)},r.append(i("item",c)),e.data(s.find("."+n.prefix+"-item:last")[0],"YPItemData",c))}else l.show();s.find(".nano").nanoScroller()}}function s(e){var i=e.attr("class"),t=e.find("."+i+"-preview");t.hasClass("show")&&t.removeClass("show"),e.find("."+i+"-player").empty()}var r={prefix:"youtubepicker",minChar:3,searchDelay:1e3,channel:"",preview:!0,itemsPerPage:50,offset:{x:0,y:0},nanoScroller:{preventPageScrolling:!0},cloneField:!0,language:{buttons:{preview:"Preview",select:"Select",close:"&times;"},labels:{views:"Views",noRecords:"No records"}}};e.fn.youtubepicker=function(t){var l=e.extend({},r,e.fn.youtubepicker.options,t);return this.each(function(){var t=e(this),r=(new Date).getTime(),o=1,c=null,d="",f=i("panel",{id:r,prefix:l.prefix,language:l.language});if(l.cloneField){var u=t.clone(!0);t.removeAttr("name"),u.insertAfter(t),u.hide().removeAttr("class")}e.data(t[0],"YPFieldData",{ypid:r,prefix:l.prefix,language:l.language}),e(f).insertAfter(t),f=e("#"+l.prefix+"-"+r),l.offset.x&&f.css("margin-left",parseInt(l.offset.x,10)+"px"),l.offset.y&&f.css("margin-top",parseInt(l.offset.y,10)+"px"),e.isFunction(f.find(".nano").nanoScroller)&&f.find(".nano").nanoScroller(setTimeout.nanoScroller).on("scrollend",function(){o++,a(t,o,l.itemsPerPage,l.channel)}),t.on("keyup",function(){var i=e(this),n=i.val(),r=f.find("."+l.prefix+"-content");clearTimeout(c),n.length?n.length>=l.minChar&&d!==n&&(s(f),c=setTimeout(function(){d=n,a(t,o,l.itemsPerPage,l.channel),r.empty()},l.searchDelay)):r.empty()}).on("focus",function(){e("."+l.prefix).hide(),f.is(":visible")||f.show()}).on("blur",function(){f.is(":hover")||f.hide()}).on("loadComplete",function(a,r){n(r),f.find("."+l.prefix+"-select-btn").on("click",function(){var i=e(this).closest("."+l.prefix+"-item").data("YPItemData");l.cloneField&&(u.val(i.vid),i=e.extend({},i,{clone:u,field:t,term:d})),t.trigger("itemSelected",i),f.hide(),s(f)}),f.find("."+l.prefix+"-preview-btn").on("click",function(){var t=e(this).closest("."+l.prefix+"-item"),a=t.data("vid"),n=i("iframe",{vid:a}),s=f.find("."+l.prefix+"-preview");s.find("."+l.prefix+"-preview-select-btn").off().click(function(){t.find("."+l.prefix+"-select-btn").click()}),s.addClass("show").show(),f.find("."+l.prefix+"-player").html(n)})}),e("."+l.prefix+"-preview-close-btn").click(function(){return s(f),!1})})}}(jQuery);