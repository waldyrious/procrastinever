//  var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
  const prefName = "extensions.procrastinever.toolbarButtonInstalled";
//  if(!prefs.getBoolPref(prefName))
  if(!Application.prefs.getValue(prefName, false))
//  if(Application.extensions.get("procrastinever@codebits.eu").firstRun)
  {
    var myId    = "procrastinever-toolbar-button"; // ID of button to add
    var afterId = "urlbar-container";    // ID of element to insert after
    var navBar  = document.getElementById("nav-bar");
    var curSet  = navBar.currentSet.split(",");

    if (curSet.indexOf(myId) == -1) {
      var pos = curSet.indexOf(afterId) + 1 || curSet.length;
      var set = curSet.slice(0, pos).concat(myId).concat(curSet.slice(pos));

      navBar.setAttribute("currentset", set.join(","));
      navBar.currentSet = set.join(",");
      document.persist(navBar.id, "currentset");
      //prefs.setBoolPref(prefName, true);
      Application.prefs.setValue(prefName, true);
      try {
        BrowserToolboxCustomizeDone(true);
      }
      catch (e) {}
    }
  }
