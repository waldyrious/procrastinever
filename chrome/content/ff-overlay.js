var procrastinever = {
/*
  onFirefoxLoad: function(event) {
    document.getElementById("contentAreaContextMenu")
            .addEventListener("popupshowing", function (e){ procrastinever.showFirefoxContextMenu(e); }, false);
  };

  showFirefoxContextMenu: function(event) {
    // show or hide the menuitem based on what the context menu is on
    document.getElementById("context-procrastinever").hidden = gContextMenu.onImage;
  };*/

createTable: function(username) {	
	alert("CREATE TABLE IF NOT EXISTS"+username+"(web_app_name VARCHAR(50), blocked BOOLEAN ,PRIMARY KEY( web_app_name))");			
	       var file = Components.classes["@mozilla.org/file/directory_service;1"]  
			                      .getService(Components.interfaces.nsIProperties)  
			                      .get("ProfD", Components.interfaces.nsIFile);  
			file.append("procrastinever.sqlite");  
			 var storageService = Components.classes["@mozilla.org/storage/service;1"]  
			                         .getService(Components.interfaces.mozIStorageService);  
			 var mDBConn = storageService.openDatabase(file);
			 mDBConn.executeSimpleSQL("CREATE TABLE IF NOT EXISTS "+username+" (web_app_name VARCHAR(50), blocked BOOLEAN ,PRIMARY KEY( web_app_name))");
 },


  getUsername: function() {
    do{
      var username = prompt("Please insert your Wakoopa username:");
      if(username.length < 3) alert("The username must have 3 or more characters.");
    } while(username.length < 3);

    x=new(window.ActiveXObject||XMLHttpRequest)('Microsoft.XMLHTTP');
    x.open('GET', "http://api.wakoopa.com/"+username+"/software.json?limit=1", true);
    x.onreadystatechange=function() {
      if (x.readyState==4){
        if(x.status==200){
          var usernamePref = "extensions.procrastinever.wakoopa-username";
          Application.prefs.setValue(usernamePref, username);
          procrastinever.createTable(username);
        }
        else {
          alert("Username '"+username+"' not found on the Wakoopa servers");
        }
      }
    };
    x.send();
  },

  onToolbarButtonCommand: function(event) {
    var usernamePref = "extensions.procrastinever.wakoopa-username";
    // If we don't have the user's Wakoopa username, ask for it
    if(!Application.prefs.getValue(usernamePref, false)) {
      procrastinever.getUsername();
  //    var username = Application.prefs.getValue(usernamePref,false);
    }
    // Otherwise, get the data
    else{
      alert("we're working on it :)");
    }
  }
};

//window.addEventListener("load", procrastinever.onFirefoxLoad, false);
