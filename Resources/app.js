// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');

// Create the DB
var db = Ti.Database.open("MyDB");
db.execute('CREATE TABLE IF NOT EXISTS MyDB (id INTEGER PRIMARY KEY, name TEXT, account TEXT)');

var win = Titanium.UI.createWindow({title:'Personal Data', backgroundColor:'#fff', 
	exitOnClose: true});
	
Ti.include("bank.js");

function resetViews() {
	win.remove(myTableView); win.remove(view);
	win.remove(addBankView); win.remove(bankView); win.remove(bview);
}
// Bottom screen view
var view = Ti.UI.createView({ font:{fontSize:20,fontWeight:'bold'}, color:'blue',
    textAlign:'left', editable: true,
	top:'90%', left:5, right:5});
var delBtn = Titanium.UI.createButton({top: '5%', left: '2%', width:100, 
	height:30, title: "Wipe All", borderRadius:20,
	id: 'D', backgroundColor: 'red', backgroundSelectedColor: 'blue', opacity:0.5});
var backBtn = Titanium.UI.createButton({top: '5%', left: '75%', width:100, 
	height:30, title: "Back", borderRadius:20,
	id: 'D', backgroundColor: 'red', backgroundSelectedColor: 'blue', opacity:0.5});
view.add(delBtn); view.add(backBtn);
delBtn.addEventListener('click', function(e) {
	db.execute('DROP TABLE IF EXISTS MyDB');
	alert("DB purged of all data");
	db.execute('CREATE TABLE IF NOT EXISTS MyDB (id INTEGER PRIMARY KEY, name TEXT, account TEXT)');
});
backBtn.addEventListener('click', function(e) {resetViews();
	win.add(myTableView); win.add(view);	
});
//win.add(view);

// Main View
var data=[];
var categories=["Aadhar", "PAN", "Bank A/C", "Locker A/C", "Credit Cards", "Policies"];
for (var i=0; i < categories.length; i++) {
	var row = Ti.UI.createTableViewRow({className:categories[i], rowIndex:i, height:60, hasDetail:true,});
	var label = Titanium.UI.createLabel({text:categories[i], left:5, 
		font:{fontSize:20,fontWeight:'bold'}, color:'blue', width:200});
	row.add(label);
	data.push(row);
}
var myTableView = Titanium.UI.createTableView({data:data, separatorColor:"#000",
	headerTitle:'Categories:',
	borderRadius:5, left: '3%', right: '3%', top: '5%', bottom: '10%'});

myTableView.addEventListener('click', function(eventObject){
	if (eventObject.rowData.className == "Bank A/C") {
		label.blur();
		doBank();
	} else if (eventObject.rowData.className == "Locker A/C") {
		label.blur();
	}
});
win.add(myTableView); win.add(view);
win.open();

// added during app creation. this will automatically login to
// ACS for your application and then fire an event (see below)
// when connected or errored. if you do not use ACS in your
// application as a client, you should remove this block
(function(){
var ACS = require('ti.cloud'),
    env = Ti.App.deployType.toLowerCase() === 'production' ? 'production' : 'development',
    username = Ti.App.Properties.getString('acs-username-'+env),
    password = Ti.App.Properties.getString('acs-password-'+env);

// if not configured, just return
if (!env || !username || !password) { return; }
/**
 * Appcelerator Cloud (ACS) Admin User Login Logic
 *
 * fires login.success with the user as argument on success
 * fires login.failed with the result as argument on error
 */
ACS.Users.login({
	login:username,
	password:password,
}, function(result){
	if (env==='development') {
		Ti.API.info('ACS Login Results for environment `'+env+'`:');
		Ti.API.info(result);
	}
	if (result && result.success && result.users && result.users.length){
		Ti.App.fireEvent('login.success',result.users[0],env);
	} else {
		Ti.App.fireEvent('login.failed',result,env);
	}
});

})();

