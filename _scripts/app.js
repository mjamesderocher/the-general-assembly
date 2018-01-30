
var tabs = function() {
  if ($(window).width() > 700) {
    var tabs = $("#tabs li").length;
    var tabClick = function(ev) {
      $(".tablink").attr("aria-selected","false"); //deselect all the tabs 
      $(ev).attr("aria-selected","true");  // select this tab
      tabpanid = $(ev).attr("aria-controls"); //find out what tab panel this tab controls  
      var tabpan = $("#" + tabpanid);  
      $("div[role='tabpanel']").attr("aria-hidden","true"); //hide all the panels 
      tabpan.attr("aria-hidden","false");  // show our panel
    }
    $("div[role='tabpanel']").attr("aria-hidden","true");
    $("#panel1").attr("aria-hidden","false");
    $(".tablink").on("click", function(ev) {  
      ev.preventDefault();
      tabClick(this);
    });
    $(".tablink").on("keydown", function(ev) {
      if (ev.which == 39  || ev.which == 37) {
        var selected= $(this).attr("aria-selected"); 
        if (selected == "true") {
          var tabpanid = $(".tablink[aria-selected='true']").attr("aria-controls").slice(5);
          var next = 0;
          if (ev.which == 39 && Number(tabpanid) < tabs) {
            next = Number(tabpanid) + 1;
          } else if (ev.which == 37 && Number(tabpanid) > 1) {
            next = Number(tabpanid) - 1;
          }
          if (next != 0) {
            $("#tab" + next).attr("aria-selected","true").focus(); 
            $(this).attr("aria-selected","false");  
            $("div[role='tabpanel']").attr("aria-hidden","true");
            var tabpan = $("#panel"+next);
            tabpan.attr("aria-hidden","false");
          }
        }
      } else if (ev.which == 13) {
        tabClick(this);
      }
    });
  } else {
    $("div[role='tabpanel']").attr("aria-hidden","false");
    $(".tablink").off();
  }
}