var Data = {

	mode: "html5",
	
	init: function() {
		if(!Data.isHtml5()) mode="cookie"; 
	},

	isHtml5: function() {
		return typeof(Storage)!=='undefined';
	},
	
	hasVar: function(check) {
		return Data.mode == "html5" ? 
		(typeof Data._html5VarGetRaw(check)	!= 'undefined' &&
		  Data._html5VarGetRaw(check) 	!= 'undefined' &&
		  Data._html5VarGetRaw(check) 	!= null) : 
		  Data._cookieVarGet(check)     !== null;
	},

	getVar: function(check) {
		return Data.mode == "html5" ? Data._html5VarGet(check) : Data._cookieVarGet(check);
	},

	_cookieVarGet: function(check) {
		return $.parseJSON($.cookie(check));
	},

	_html5VarGet: function(check) {
		if(!Data.isHtml5()) 
			throw new Error("You don't have an HTML5 compliant browser, don't try to fool me!");
		try { 
			return $.parseJSON(localStorage[check]);
		} catch(e) {
			return null;
		}
	},

	_cookieVarGetRaw: function(check) {
		return $.cookie(check);
	},

	_html5VarGetRaw: function(check) {
		if(localStorage == null) 
			throw new Error("localStorage is null in "+Data.mode+" for "+navigator.userAgent);
		return localStorage[check];
	},

	clearVar: function(check) {
		return Data.mode == "html5" ? localStorage.removeItem(check) : Data._cookieVarSet(check, null);
	},

	setVar: function(check, val) {
		val = JSON.stringify(val);
		return Data.mode == "html5" ? Data._html5VarSet(check, val) : Data._cookieVarSet(check, val);
	},

	_html5VarSet: function(check, val) {
		if(!Data.isHtml5()) 
			throw new Error("You don't have an HTML5 compliant browser, don't try to fool me!");
		localStorage[check] = val;
	},

	_cookieVarSet: function(check, val) {
		$.cookie(check, val);
	}
	
};
