// ==UserScript==
// @include http://www.amazon.com/*
// @include http://amazon.com/*
// @include http://www.amazon.co.uk/*
// @include http://amazon.co.uk/*
// @include http://www.amazon.de/*
// @include http://amazon.de/*
// @include http://www.amazon.ca/*
// @include http://amazon.ca/*
// @include http://www.audible.com/*
// @include http://audible.com/*
// @include http://www.mint.com/*
// @include http://mint.com/*
// @include http://www.bestbuy.com/*
// @include http://bestbuy.com/*
// @include http://www.thinkgeek.com/*
// @include http://thinkgeek.com/*
// @include http://www.newegg.com/*
// @include http://newegg.com/*
// @include http://www.newegg.ca/*
// @include http://newegg.ca/*
// @include http://www.guitarcenter.com/*
// @include http://guitarcenter.com/*
// ==/UserScript==

var configurations = {
  amazon : {
  	rx: /^http.*?\.amazon.com.*?(\/dp\/|obidos.tg.detail|.gp.product)/i,
  	params: [
      { param: "tag", paramValue: "thelinactsho-20" }
  	]
  },
  amazonuk : {
   rx: /^http.*?\.amazon.co.uk.*?(\/dp\/|obidos.tg.detail|.gp.product)/i,
   params: [
     { param: "tag", paramValue: "jupitebroadc-21" }
   ]
  },
  amazonde : { 
  	rx: /^http.*?\.amazon.de.*?(\/dp\/|obidos.tg.detail|.gp.product)/i, 
  	params: [
  	  { param: "tag", paramValue: "jupitebroad02-21" }
  	]
  },
  amazonca : { 
  	rx: /^http.*?\.amazon.ca.*?(\/dp\/|obidos.tg.detail|.gp.product)/i,
  	params: [
  	  { param: "tag", paramValue: "jbcanada-20" }
  	]
  },
  audible : { 
  	rx: /^http.*?\.audible.com/i, 
  	params: [
  	  { param: "source_code", paramValue: "COMA0230WS012110" },
  	  { param: "AID", paramValue: "10298646" },
  	  { param: "PID", paramValue: "4897915" }
  	]
  },
  mint : { 
  	rx: /^http.*?\.mint.com/i, 
  	params: [
      { param: "PID", paramValue: "4897915" },
      { param: "priorityCode", paramValue: "4216102399" },
      { param: "source", paramValue: "cj_pfm" }
    ]
  },
  bestbuy : {
   rx: /^http.*?\.bestbuy.com.site.*?\?id=/i, 
   params: [
     { param: "AID", paramValue: "10483113" },
     { param: "PID", paramValue: "4897915" },
     { param: "ref", paramValue: "39" },
     { param: "CJPID", paramValue: "4897915" },
     { param: "loc", paramValue: "01" }
   ]
  },
  thinkgeek : { 
  	rx: /^http.*?\.thinkgeek.com/i, 
  	params: [
	  { param: "cpg", paramValue: "cj" },
	  { param: "ref", paramValue: "" },
	  { param: "CJURL", paramValue: "" },
	  { param: "CJID", paramValue: "3282554"}
	]
  },
  neweggcom : {
   rx: /^http.*?\.newegg.com.(product.product.aspx\?item=|special.shellshocker.aspx\?)/i,
   params: [
     { param: "nm_mc", paramValue: "AFC-C8Junction" },
     { param: "cm_mmc", paramValue: "AFC-C8Junction-_-Branding-_-na-_-na" },
     { param: "AID", paramValue: "10440554" },
     { param: "PID", paramValue: "4897915" }
   ]
  },
  neweggca : {
   rx: /^http.*?\.newegg.ca.(product.product.aspx\?item=|special.shellshocker.aspx\?)/i,
   params: [
     { param: "nm_mc", paramValue: "AFC-C8junctionCA" },
     { param: "cm_mmc", paramValue: "AFC-C8JunctionCA-_-homepage-_-na-_-na" },
     { param: "AID", paramValue: "10606701" },
     { param: "PID", paramValue: "4897915" }
   ]
  },
  guitarcenter : {
  	rx: /^http.*?\.guitarcenter.com/i, 
  	params: [
  	  { param: "CJAID", paramValue: "10453836" },
  	  { param: "CJPID", paramValue: "4897915" }
  	]
  }
};

var url = window.location.href;
for( var configVariable in configurations ) {
  if( configurations.hasOwnProperty(configVariable) ) {
	//Be grateful and do not steel other affiliate links & further avoid circular redirection
	var config = configurations[configVariable];
	if(url.match(config.rx) && url.indexOf(config.params[0].param) == -1) {
	  if(url.indexOf("?") == -1) {
		url = url + "?" + createTag(config.params);
	  } else {
	    url = url + "&" + createTag(config.params);
	  }
	  window.location.href=url;
	}
  }
}

function createTag( parameters ) {
	var result = "";
	for( var i = 0; i < parameters.length; i++ ) {
		result = result + parameters[i].param + "=" + parameters[i].paramValue;
		if( i >= 0 && i < parameters.length - 1 ) {
			result = result + "&";
		}
	}
	return result;
}