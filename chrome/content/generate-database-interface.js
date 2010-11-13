var usernamePref = "extensions.procrastinever.wakoopa-username";
var file = Components.classes["@mozilla.org/file/directory_service;1"]  
                     .getService(Components.interfaces.nsIProperties)  
                     .get("ProfD", Components.interfaces.nsIFile);  
file.append("procrastinever.sqlite");  
var storageService = Components.classes["@mozilla.org/storage/service;1"]  
                               .getService(Components.interfaces.mozIStorageService);  
var mDBConn = storageService.openDatabase(file);

var readDatabase = function(){

  //The user name -> the table name
  var user = Application.prefs.getValue(usernamePref, false);

  var statement = mDBConn.createStatement("SELECT * FROM " + user);

  statement.executeAsync({
    handleResult: function(aResultSet) {
      var appList = document.getElementById("applist");
      for (var row = aResultSet.getNextRow();  row; row = aResultSet.getNextRow()) {
        var name = row.getResultByName("web_app_name");
        var blocked = row.getResultByName("blocked");
        var checkBox = document.createElement("checkbox");
        checkBox.setAttribute("label",name);
        checkBox.checked = blocked;
        appList.appendChild(checkBox);
      }
    },
    handleError: function(aError) {alert("Error: " + aError.message);},
    handleCompletion: function(aReason) {
    if (aReason != Components.interfaces.mozIStorageStatementCallback.REASON_FINISHED)
      alert("Abort");
    }
  });
};
