procrastinever.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ procrastinever.showFirefoxContextMenu(e); }, false);
};

procrastinever.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-procrastinever").hidden = gContextMenu.onImage;
};

window.addEventListener("load", procrastinever.onFirefoxLoad, false);
