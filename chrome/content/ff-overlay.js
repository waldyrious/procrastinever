procrastinever.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ procrastinever.showFirefoxContextMenu(e); }, false);
};

procrastinever.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-procrastinever").hidden = gContextMenu.onImage;
};

procrastinever.getUsername = function() {
  var username = prompt("Please insert your Wakoopa username:");
  if (!username) return;
  x=new(window.ActiveXObject||XMLHttpRequest)('Microsoft.XMLHTTP');
  x.open('GET',"http://api.wakoopa.com/"+username+"/software.json?limit=1",true);
  x.onreadystatechange=function() {
    if (x.readyState==4 && x.status==200){
      if(x.responseText.indexOf("wakoopaApi") != 0) {
        alert("Username '"+username+"' not found on the Wakoopa servers");
      }
      else {
        var usernamePref = "extensions.procrastinever.wakoopa-username";
        Application.prefs.setValue(usernamePref, username);
      }
    }
  };
  x.send();
}

procrastinever.onToolbarButtonCommand = function(event) {
  var usernamePref = "extensions.procrastinever.wakoopa-username";
  // If we don't have the user's Wakoopa username, ask for it
  if(!Application.prefs.getValue(usernamePref, false)) {
    procrastinever.getUsername();
  }
  // Otherwise, get the data
  else{
    alert("we're working on it :)");
  }
};

window.addEventListener("load", procrastinever.onFirefoxLoad, false);
