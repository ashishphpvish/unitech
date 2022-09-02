"use strict";

var layoutType = "ltr"; // ltr or rtl
var themeType = "light"; // light or dark
var sidebarColor = "menu_light"; // menu_light or menu_dark
var logoColor = "logo-white"; // logo-white or logo-black
var themeColor = "theme-black"; // theme-black",theme-white",theme-purple,theme-blue,theme-cyan,theme-green,theme-orange

$(function () {
  $.MyAdmin.browser.activate();
  $.MyAdmin.leftSideBar.activate();
  $.MyAdmin.rightSideBar.activate();
  $.MyAdmin.navbar.activate();
  $.MyAdmin.input.activate();
  $.MyAdmin.select.activate();
  $.MyAdmin.tooltip.activate();
  skinChanger();
  activateNotificationAndTasksScroll();
  setSkinListHeightAndScroll(true);
  setSettingListHeightAndScroll(true);
  $(window).resize(function () {
    setSkinListHeightAndScroll(false);
    setSettingListHeightAndScroll(false);
  });
  callFullScreen();

  feather.replace();

  setTimeout(function () {
    $(".page-loader-wrapper").fadeOut();
  }, 50);
});

if (typeof jQuery === "undefined") {
  throw new Error("jQuery plugins need to be before this file");
}

// declare variables
$.MyAdmin = {};
$.MyAdmin.options = {
  leftSideBar: {
    scrollColor: "rgba(0,0,0,0.5)",
    scrollWidth: "4px",
    scrollAlwaysVisible: false,
    scrollBorderRadius: "0",
    scrollRailBorderRadius: "0",
    scrollActiveItemWhenPageLoad: true,
    breakpointWidth: 1170,
  },
  dropdownMenu: {
    effectIn: "pullDown",
    effectOut: "fadeOut",
  },
};
/* Tooltip */
$.MyAdmin.tooltip = {
  activate: function () {
    $('[data-toggle="tooltip"]').tooltip({
      placement: "top",
    });
  },
};
/* Title Sparkline chart data */
/* Left Sidebar */

$.MyAdmin.leftSideBar = {
  activate: function () {
    var _this = this;
    var $body = $("body");
    var $overlay = $(".overlay");

    //Close sidebar
    $(window).on("click", function (e) {
      var $target = $(e.target);
      if (e.target.nodeName.toLowerCase() === "i") {
        $target = $(e.target).parent();
      }

      if (
        !$target.hasClass("bars") &&
        _this.isOpen() &&
        $target.parents("#leftsidebar").length === 0
      ) {
        if (!$target.hasClass("js-right-sidebar")) $overlay.fadeOut();
        $body.removeClass("overlay-open");
      }
    });

    $.each($(".menu-toggle.toggled"), function (i, val) {
      $(val).next().slideToggle(0);
    });

    //When page load
    $.each($(".menu .list li.active"), function (i, val) {
      var $activeAnchors = $(val).find("a:eq(0)");

      $activeAnchors.addClass("toggled");
      $activeAnchors.next().show();
    });

    //Collapse or Expand Menu
    $(".menu-toggle").on("click", function (e) {
      var $this = $(this);
      var $content = $this.next();

      if ($($this.parents("ul")[0]).hasClass("list")) {
        var $not = $(e.target).hasClass("menu-toggle")
          ? e.target
          : $(e.target).parents(".menu-toggle");

        $.each($(".menu-toggle.toggled").not($not).next(), function (i, val) {
          if ($(val).is(":visible")) {
            $(val).prev().toggleClass("toggled");
            $(val).slideUp();
          }
        });
      }

      $this.toggleClass("toggled");
      $content.slideToggle(320);
    });

    //Set menu height
    _this.setMenuHeight();
    _this.checkStatuForResize(true);
    $(window).resize(function () {
      _this.setMenuHeight();
      _this.checkStatuForResize(false);
    });

    //Set Waves
    Waves.attach(".menu .list a", ["waves-block"]);
    Waves.init();
  },
  setMenuHeight: function (isFirstTime) {
    if (typeof $.fn.slimScroll != "undefined") {
      var configs = $.MyAdmin.options.leftSideBar;
      //var height = ($(window).height() - ($('.legal').outerHeight() + $('.user-info').outerHeight() + $('.navbar').innerHeight()));
      var height = $(window).height() - $(".navbar").innerHeight();
      var $el = $(".list");

      $el.slimscroll({
        height: height + "px",
        color: configs.scrollColor,
        size: configs.scrollWidth,
        alwaysVisible: configs.scrollAlwaysVisible,
        borderRadius: configs.scrollBorderRadius,
        railBorderRadius: configs.scrollRailBorderRadius,
      });

      //Scroll active menu item when page load, if option set = true
      if ($.MyAdmin.options.leftSideBar.scrollActiveItemWhenPageLoad) {
        var activeItemOffsetTop = $(".menu .list li.active")[0].offsetTop;
        if (activeItemOffsetTop > 150)
          $el.slimscroll({ scrollTo: activeItemOffsetTop + "px" });
      }
    }
  },
  checkStatuForResize: function (firstTime) {
    var $body = $("body");
    var $openCloseBar = $(".navbar .navbar-header .bars");
    var width = $body.width();

    if (firstTime) {
      $body
        .find(".content, .sidebar")
        .addClass("no-animate")
        .delay(1000)
        .queue(function () {
          $(this).removeClass("no-animate").dequeue();
        });
    }

    if (width < $.MyAdmin.options.leftSideBar.breakpointWidth) {
      $body.addClass("ls-closed");
      $openCloseBar.fadeIn();
    } else {
      $body.removeClass("ls-closed");
      $openCloseBar.fadeOut();
    }
  },
  isOpen: function () {
    return $("body").hasClass("overlay-open");
  },
};

/*  Left sidemenu collapse */
$(".sidemenu-collapse").on("click", function () {
  var $body = $("body");
  if ($body.hasClass("side-closed")) {
    $body.removeClass("side-closed");
    $body.removeClass("submenu-closed");
  } else {
    $body.addClass("side-closed");
    $body.addClass("submenu-closed");
  }
});
$(".content, .navbar").mouseenter(function () {
  var $body = $("body");
  $body.removeClass("side-closed-hover");
  $body.addClass("submenu-closed");
});
$(".sidebar").mouseenter(function () {
  var $body = $("body");
  $body.addClass("side-closed-hover");
  $body.removeClass("submenu-closed");
});

if (localStorage.getItem("sidebar_option")) {
  jQuery("body").addClass(localStorage.getItem("sidebar_option"));
}
if ($("body").hasClass("side-closed")) {
  $(".sidebar-user-panel").css({ display: "none" });
} else {
  $(".sidebar-user-panel").css({ display: "block" });
}
jQuery(document).on("click", ".sidemenu-collapse", function () {
  var sidebar_option = "";
  if ($("body").hasClass("side-closed")) {
    var sidebar_option = "side-closed submenu-closed";
    $(".sidebar-user-panel").css({ display: "none" });
  } else {
    $(".sidebar-user-panel").css({ display: "block" });
  }
  jQuery("body").addClass(sidebar_option);
  localStorage.setItem("sidebar_option", sidebar_option);
});

/* Right Sidebar */
$.MyAdmin.rightSideBar = {
  activate: function () {
    var _this = this;
    var $sidebar = $("#rightsidebar");
    var $overlay = $(".overlay");

    //Close sidebar
    $(window).on("click", function (e) {
      var $target = $(e.target);
      if (e.target.nodeName.toLowerCase() === "i") {
        $target = $(e.target).parent();
      }

      if (
        !$target.hasClass("js-right-sidebar") &&
        _this.isOpen() &&
        $target.parents("#rightsidebar").length === 0
      ) {
        if (!$target.hasClass("bars")) $overlay.fadeOut();
        $sidebar.removeClass("open");
      }
    });
    $(".js-right-sidebar").on("click", function () {
      $sidebar.toggleClass("open");
      if (_this.isOpen()) {
        $overlay.fadeIn();
      } else {
        $overlay.fadeOut();
      }
    });
  },
  isOpen: function () {
    return $(".right-sidebar").hasClass("open");
  },
};

/* Navbar */
$.MyAdmin.navbar = {
  activate: function () {
    var $body = $("body");
    var $overlay = $(".overlay");

    //Open left sidebar panel
    $(".bars").on("click", function () {
      $body.toggleClass("overlay-open");
      if ($body.hasClass("overlay-open")) {
        $overlay.fadeIn();
      } else {
        $overlay.fadeOut();
      }
    });

    //Close collapse bar on click event
    $('.nav [data-close="true"]').on("click", function () {
      var isVisible = $(".navbar-toggle").is(":visible");
      var $navbarCollapse = $(".navbar-collapse");

      if (isVisible) {
        $navbarCollapse.slideUp(function () {
          $navbarCollapse.removeClass("in").removeAttr("style");
        });
      }
    });
  },
};
/* Input - Function */
$.MyAdmin.input = {
  activate: function () {
    //On focus event
    $(".form-control").focus(function () {
      $(this).parent().addClass("focused");
    });

    //On focusout event
    $(".form-control").focusout(function () {
      var $this = $(this);
      if ($this.parents(".form-group").hasClass("form-float")) {
        if ($this.val() == "") {
          $this.parents(".form-line").removeClass("focused");
        }
      } else {
        $this.parents(".form-line").removeClass("focused");
      }
    });

    //On label click
    $("body").on("click", ".form-float .form-line .form-label", function () {
      $(this).parent().find("input").focus();
    });

    //Not blank form
    $(".form-control").each(function () {
      if ($(this).val() !== "") {
        $(this).parents(".form-line").addClass("focused");
      }
    });
  },
};
/* Form - Select */
$.MyAdmin.select = {
  activate: function () {
    if ($.fn.selectpicker) {
      $("select:not(.ms)").selectpicker();
    }
  },
};

/* Browser */
var edge = "Microsoft Edge";
var ie10 = "Internet Explorer 10";
var ie11 = "Internet Explorer 11";
var opera = "Opera";
var firefox = "Mozilla Firefox";
var chrome = "Google Chrome";
var safari = "Safari";

$.MyAdmin.browser = {
  activate: function () {
    var _this = this;
    var className = _this.getClassName();

    if (className !== "") $("html").addClass(_this.getClassName());
  },
  getBrowser: function () {
    var userAgent = navigator.userAgent.toLowerCase();

    if (/edge/i.test(userAgent)) {
      return edge;
    } else if (/rv:11/i.test(userAgent)) {
      return ie11;
    } else if (/msie 10/i.test(userAgent)) {
      return ie10;
    } else if (/opr/i.test(userAgent)) {
      return opera;
    } else if (/chrome/i.test(userAgent)) {
      return chrome;
    } else if (/firefox/i.test(userAgent)) {
      return firefox;
    } else if (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) {
      return safari;
    }

    return undefined;
  },
  getClassName: function () {
    var browser = this.getBrowser();

    if (browser === edge) {
      return "edge";
    } else if (browser === ie11) {
      return "ie11";
    } else if (browser === ie10) {
      return "ie10";
    } else if (browser === opera) {
      return "opera";
    } else if (browser === chrome) {
      return "chrome";
    } else if (browser === firefox) {
      return "firefox";
    } else if (browser === safari) {
      return "safari";
    } else {
      return "";
    }
  },
};
//Skin changer
function skinChanger() {
  $(".right-sidebar .demo-choose-skin li").on("click", function () {
    var $body = $("body");
    var $this = $(this);

    if (localStorage.getItem("choose_skin")) {
      var existTheme = localStorage.getItem("choose_skin");
    } else {
      var existTheme = $(".right-sidebar .demo-choose-skin li.actived").data(
        "theme"
      );
      existTheme = "theme-" + existTheme;
    }
    $(".right-sidebar .demo-choose-skin li").removeClass("actived");
    $body.removeClass(existTheme);
    $this.addClass("actived");

    $body.addClass("theme-" + $this.data("theme"));
    var choose_skin = "theme-" + $this.data("theme");
    localStorage.setItem("choose_skin", choose_skin);
    localStorage.setItem("choose_skin_active", $this.data("theme"));
  });
}
//Full screen window
function callFullScreen() {
  $(document).on("click", ".fullscreen-btn", function (e) {
    if (
      !document.fullscreenElement && // alternative standard method
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  });
}
function setSkinListHeightAndScroll(isFirstTime) {
  var height =
    $(window).height() -
    ($(".navbar").innerHeight() + $(".right-sidebar .nav-tabs").outerHeight());
  var $el = $(".right-sidebar .demo-skin");

  if (!isFirstTime) {
    $el.slimScroll({ destroy: true }).height("auto");
    $el.parent().find(".slimScrollBar, .slimScrollRail").remove();
  }

  $el.slimscroll({
    height: height + "px",
    color: "rgba(0,0,0,0.5)",
    size: "6px",
    alwaysVisible: false,
    borderRadius: "0",
    railBorderRadius: "0",
  });
}

//Setting tab content set height and show scroll
function setSettingListHeightAndScroll(isFirstTime) {
  var height =
    $(window).height() -
    ($(".navbar").innerHeight() + $(".right-sidebar .nav-tabs").outerHeight());
  var $el = $(".right-sidebar .demo-settings");

  if (!isFirstTime) {
    $el.slimScroll({ destroy: true }).height("auto");
    $el.parent().find(".slimScrollBar, .slimScrollRail").remove();
  }

  $el.slimscroll({
    height: height + "px",
    color: "rgba(0,0,0,0.5)",
    size: "6px",
    alwaysVisible: false,
    borderRadius: "0",
    railBorderRadius: "0",
  });
}

//Activate notification and task dropdown on top right menu
function activateNotificationAndTasksScroll() {
  $(".navbar-right .dropdown-menu .body .menu").slimscroll({
    height: "254px",
    color: "rgba(0,0,0,0.5)",
    size: "4px",
    alwaysVisible: false,
    borderRadius: "0",
    railBorderRadius: "0",
  });
}

//Dark Light Sidebar ======================================================================================
$(".sidebar-color input:radio").change(function () {
  if ($(this).val() == "1") {
    $("body").removeClass("menu_dark logo-black");
    $("body").addClass("menu_light logo-white");
    var menu_option = "menu_light";
    localStorage.setItem("choose_logoheader", "logo-white");
    localStorage.setItem("menu_option", menu_option);
  } else {
    $("body").removeClass("menu_light logo-white");
    $("body").addClass("menu_dark logo-black");
    var menu_option = "menu_dark";
    localStorage.setItem("choose_logoheader", "logo-black");
    localStorage.setItem("menu_option", menu_option);
  }
});

// dark light theme button setting
$(".theme-color input:radio").change(function () {
  if ($(this).val() == "1") {
    $("body").removeClass();
    $("body").addClass(
      "light submenu-closed menu_light logo-white theme-black"
    );
    var theme = "light";
    var menu_option = "menu_light";
    $(".sidebar-color .btn-check[value|='1']").prop("checked", true);
    $(".choose-theme li").removeClass("actived");
    $(".choose-theme li[data-theme|='black']").addClass("actived");

    localStorage.setItem("choose_logoheader", "logo-white");
    localStorage.setItem("choose_skin", "theme-black");
    localStorage.setItem("theme", theme);
    localStorage.setItem("menu_option", menu_option);
  } else {
    $("body").removeClass();
    $("body").addClass("dark submenu-closed menu_dark logo-black theme-black");

    var theme = "dark";
    var menu_option = "menu_dark";
    $(".sidebar-color .btn-check[value|='2']").prop("checked", true);
    $(".choose-theme li").removeClass("actived");
    $(".choose-theme li[data-theme|='black']").addClass("actived");

    localStorage.setItem("choose_logoheader", "logo-black");
    localStorage.setItem("choose_skin", "theme-black");
    localStorage.setItem("theme", theme);
    localStorage.setItem("menu_option", menu_option);
  }
  $("body").addClass(localStorage.getItem("layout"));
});

// restore default to light theme
$(".btn-restore-theme").on("click", function () {
  //remove all class from body
  $("body").removeClass();

  jQuery("body").addClass(themeType);
  jQuery("body").addClass("submenu-closed");
  jQuery("body").addClass(sidebarColor);
  jQuery("body").addClass(logoColor);
  jQuery("body").addClass("theme-black");

  // set default theme
  $(".choose-theme li").removeClass("actived");
  $(".choose-theme li[data-theme|='black']").addClass("actived");
  $(".theme-color .btn-check[value|='1']").prop("checked", true);
  $(".sidebar-color .btn-check[value|='1']").prop("checked", true);

  localStorage.setItem("choose_logoheader", logoColor);
  localStorage.setItem("choose_skin", "theme-black");
  localStorage.setItem("theme", themeType);
  localStorage.setItem("menu_option", sidebarColor);
  if (layoutType == "rtl") setRtlLayout();
  else setLtrLayout();
});

$(document).on("change", ".layout-change", function (e) {
  let isChecked = $(this).is(":checked");
  if (isChecked) {
    setRtlLayout();
  } else {
    setLtrLayout();
  }
});

// set ltr or rtl on startup

if (localStorage.getItem("layout")) {
  if (localStorage.getItem("layout") == "rtl") {
    setRtlLayout();
  } else {
    setLtrLayout();
  }
} else {
  if (layoutType == "rtl") setRtlLayout();
  else setLtrLayout();
}

//set theme on startup
if (localStorage.getItem("theme")) {
  if (localStorage.getItem("theme") == "light") {
    $(".theme-color .btn-check[value|='1']").prop("checked", true);
  } else {
    $(".theme-color .btn-check[value|='2']").prop("checked", true);
  }
  $("body").removeClass("dark light");
  jQuery("body").addClass(localStorage.getItem("theme"));
  localStorage.setItem("theme", localStorage.getItem("theme"));
} else {
  $("body").removeClass("dark light");
  if (themeType == "light") {
    jQuery("body").addClass("light");
    $(".theme-color .btn-check[value|='1']").prop("checked", true);
  } else {
    jQuery("body").addClass("dark");
    $(".theme-color .btn-check[value|='2']").prop("checked", true);
  }
  localStorage.setItem("theme", themeType);
}

if (localStorage.getItem("choose_skin")) {
  jQuery("body").addClass(localStorage.getItem("choose_skin"));
  $(".choose-theme li").removeClass("actived");
  $(".choose-theme li[data-theme|='black']").addClass("actived");
} else {
  jQuery("body").addClass(themeColor);
  localStorage.setItem("choose_skin", themeColor);
  $(".choose-theme li").removeClass("actived");
  $(".choose-theme li[data-theme|='black']").addClass("actived");
}

// set sidebar menu color on startup
if (localStorage.getItem("menu_option")) {
  if (localStorage.getItem("menu_option") == "menu_light") {
    $(".sidebar-color .btn-check[value|='1']").prop("checked", true);
  } else {
    $(".sidebar-color .btn-check[value|='2']").prop("checked", true);
  }
  $("body").removeClass("menu_dark menu_light");
  jQuery("body").addClass(localStorage.getItem("menu_option"));
  localStorage.setItem("menu_option", localStorage.getItem("menu_option"));
} else {
  $("body").removeClass("menu_dark menu_light");
  if (sidebarColor == "menu_light") {
    jQuery("body").addClass("menu_light");
    $(".sidebar-color .btn-check[value|='1']").prop("checked", true);
  } else {
    jQuery("body").addClass("menu_dark");
    $(".sidebar-color .btn-check[value|='2']").prop("checked", true);
  }
  localStorage.setItem("menu_option", sidebarColor);
}

// set header color on startup
if (localStorage.getItem("choose_skin")) {
  jQuery("body").addClass(localStorage.getItem("choose_skin"));
} else {
  jQuery("body").addClass("theme-black");
}
if (localStorage.getItem("choose_skin_active")) {
  $(".right-sidebar .demo-choose-skin li").each(function (index) {
    jQuery(this).removeClass("actived");
    if (
      jQuery(this).attr("data-theme") ==
      localStorage.getItem("choose_skin_active")
    ) {
      jQuery(this).addClass("actived");
    }
  });
}
// set logo color on startup
if (localStorage.getItem("choose_logoheader")) {
  jQuery("body").addClass(localStorage.getItem("choose_logoheader"));
  localStorage.setItem(
    "choose_logoheader",
    localStorage.getItem("choose_logoheader")
  );
} else {
  $("body").removeClass("logo-white, logo-black");
  if (logoColor == "logo-white") {
    jQuery("body").addClass("logo-white");
  } else {
    jQuery("body").addClass("logo-black");
  }
  localStorage.setItem("choose_logoheader", logoColor);
}

if (localStorage.getItem("choose_logoheader_active")) {
  $(".right-sidebar .demo-choose-logoheader li").each(function (index) {
    jQuery(this).removeClass("actived");
    if (
      jQuery(this).attr("data-theme") ==
      localStorage.getItem("choose_logoheader_active")
    ) {
      jQuery(this).addClass("actived");
    }
  });
}

$(window).on("scroll", function () {
  if ($(window).scrollTop() > 50) {
    $(".navbar").addClass("active");
  } else {
    $(".navbar").removeClass("active");
  }
});

/************* collapse button in panel***************8*/
$(document).on("click", ".card .tools .t-collapse", function () {
  var el = $(this).parents(".card").children(".card-body");
  if ($(this).hasClass("fa-chevron-down")) {
    $(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
    el.slideUp(200);
  } else {
    $(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
    el.slideDown(200);
  }
});

/**************** close button in panel *****************/
$(document).on("click", ".card .tools .t-close", function () {
  $(this).parents(".card").parent().remove();
});

/****************** refresh button in panel *****************/
$(".box-refresh").on("click", function (br) {
  br.preventDefault();
  $(
    "<div class='refresh-block'><span class='refresh-loader'><i class='fa fa-spinner fa-spin'></i></span></div>"
  ).appendTo($(this).parents(".tools").parents(".card-head").parents(".card"));
  setTimeout(function () {
    $(".refresh-block").remove();
  }, 1000);
});

function setRtlLayout() {
  $("body").addClass("rtl");
  $(".layout-change").prop("checked", true);
  var path = window.location.pathname;
  var page = path.split("https://www.einfosoft.com/").pop();
  if (page === "index.html") {
    $("head").prepend(
      '<link rel="stylesheet" href="assets/js/bundles/materialize-rtl/materialize-rtl.min.css" type="text/css" id="material-rtl"/>'
    );
  } else {
    $("head").prepend(
      '<link rel="stylesheet" href="../../assets/js/bundles/materialize-rtl/materialize-rtl.min.css" type="text/css" id="material-rtl"/>'
    );
  }
  localStorage.setItem("layout", "rtl");
}

function setLtrLayout() {
  document.body.classList.remove("rtl");
  $(".layout-change").prop("checked", false);
  $("#material-rtl").remove();
  localStorage.setItem("layout", "ltr");
}

//==========================================================================================================================
