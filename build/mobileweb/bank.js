// Show Bank View
var bankView = Ti.UI.createTableView({editable: true, height:Ti.UI.SIZE, 
	top:'10%', bottom:'20%', left:5, right:5, separatorColor:"#000",
    font:{fontSize:20,fontWeight:'bold'},});

// Functions
function doBank() {
bankData = [];
var rows = db.execute('SELECT * FROM MyDB');
bankView.data = "";
while (rows.isValidRow()) {
    var row = Titanium.UI.createTableViewRow({
        className:'row', height:'40', width:'25%',
        title:rows.fieldByName('name'), id:rows.fieldByName('id'),
        color:'#fffced', backgroundColor:'#fffced', });
    var bankLabel = Titanium.UI.createLabel({
        text:rows.fieldByName('name'),
        width:'50%', height:'auto', top:5, left:10,
        font:{fontFamily:'AmericanTypewriter', fontSize:20,}, minimumFontSize:15,
        color:'navy', textAlign:'left', });
        // Address
    var accountLabel =  Titanium.UI.createLabel({
        text:rows.fieldByName('account'), width:'20%', top:5, left:50,
        font:{ fontFamily:'HelveticaNeue', fontSize:20,},
        color:'blue', textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER, });
    checkbox = Ti.UI.createSwitch({
        style:Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
        value:false, height:20, color:'blue',
        top:5, right:20, width:40,
        borderColor: 'blue', borderWidth: 2, borderRadius: 5, backgroundColor: '#b1b1b1',
        item_type : 'CHECKBOX',id: rows.fieldByName('id')});
    row.add(bankLabel);
    row.add(accountLabel);
    row.add(checkbox);
    bankData.push(row);
    rows.next();
};
bankView.data = bankData;
rows.close();
resetViews(); win.add(bankView); win.add(bview);
}

bankView.addEventListener('click', function(e){
    if(e.source.item_type == 'CHECKBOX'){
        if(false == e.source.value) {
        	deleteID = e.source.id;
			alert("UnDelete: " + deleteID);
        } else {
        	deleteID = e.source.id;
        	alert("Delete: " + deleteID);
        	db.execute('DELETE FROM MyDB WHERE id=?',deleteID);
			doBank();
        }
    }
});

// Bottom screen view
var bview = Ti.UI.createView({ font:{fontSize:20,fontWeight:'bold'}, color:'blue',
    textAlign:'left', editable: true,
	top:'90%', left:5, right:5});
var baddBtn = Titanium.UI.createButton({top: '5%', left: '2%', width:100, 
	height:30, title: "Add", borderRadius:20,
	id: 'A', backgroundColor: 'green', backgroundSelectedColor: 'blue', opacity:0.5});
var bdelBtn = Titanium.UI.createButton({top: '5%', left: '40%', width:100, 
	height:30, title: "Del", borderRadius:20,
	id: 'D', backgroundColor: 'green', backgroundSelectedColor: 'blue', opacity:0.5});
var bbackBtn = Titanium.UI.createButton({top: '5%', left: '75%', width:100, 
	height:30, title: "Back", borderRadius:20,
	id: 'D', backgroundColor: 'green', backgroundSelectedColor: 'blue', opacity:0.5});
bview.add(baddBtn); bview.add(bbackBtn); bview.add(bdelBtn);
baddBtn.addEventListener('click', function(e) {
	resetViews();
	win.add(addBankView);
});
bbackBtn.addEventListener('click', function(e) {
	resetViews();
	win.add(myTableView); win.add(view);
});
bdelBtn.addEventListener('click', function(e) {});


//Add Bank View
var addBankView = Ti.UI.createView({editable: true, height:Ti.UI.SIZE, 
	top:'10%', left:5, right:5});
var bankLabel = Titanium.UI.createLabel({left: '2%', top:'5%', text: "Bank:", 
	textAlign:'center', width: '30%', height:40, backgroundColor: 'yellow', color:'blue',
	font:{fontSize:20,fontFamily:'Helvetica Neue'}, opacity:0.5});
var bankText = Titanium.UI.createTextField({
	color:'blue', font:{fontSize:16,fontFamily:'Helvetica Neue'},
	textAlign:'left', width:'60%', height:40, 
	autocorrect: false, top:'5%', left:'35%',
    borderRadius : '10', borderWidth : '1', borderColor : 'blue',
    backgroundColor:'transparent'
});
var accLabel = Titanium.UI.createLabel({left: '2%', top:'25%', text: "Account No:", textAlign:'center',
	width: '30%', height:40, font:{fontSize:20,fontFamily:'Helvetica Neue'}, color:'blue',
	backgroundColor: 'yellow', backgroundSelectedColor: 'green', opacity:0.5});
var accNo = Titanium.UI.createTextField({
	color:'blue', font:{fontSize:16,fontFamily:'Helvetica Neue'},
	textAlign:'left', width:'60%', height:40, 
	autocorrect: false, top:'25%', left:'35%',
	borderRadius : '10', borderWidth : '1', borderColor : 'blue', backgroundColor:'transparent'
});
var addBankBtn = Titanium.UI.createButton({left: '25%', top:'55%', title: "Add", id: 'AB',
	font:{fontSize:20, fontWeight:'bold'}, color: 'blue', height: 50, width: 100, 
	borderRadius : '10', borderWidth : '1', borderColor : 'blue',
	backgroundColor: 'green', backgroundSelectedColor: 'blue', opacity:0.3});
var cancelBankBtn = Titanium.UI.createButton({left: '55%', top:'55%', title: "Cancel", id: 'AB',
	font:{fontSize:20, fontWeight:'bold'}, color: 'blue', height: 50, width: 100, 
	borderRadius : '10', borderWidth : '1', borderColor : 'blue',
	backgroundColor: 'yellow', backgroundSelectedColor: 'blue', opacity:0.3});
addBankView.add(bankLabel); addBankView.add(bankText);
addBankView.add(accLabel); addBankView.add(accNo); 
addBankView.add(addBankBtn); addBankView.add(cancelBankBtn);
addBankBtn.addEventListener('click', function(e) {
	alert("Adding: " + bankText.value);
	db.execute('INSERT INTO MyDB (name, account) VALUES(?,?)', bankText.value, accNo.value);
	//resetViews(); win.add(bankView); win.add(bview);
	doBank();
});
