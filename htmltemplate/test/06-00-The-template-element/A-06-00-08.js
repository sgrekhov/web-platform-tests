/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_06_00_08 = {
    name:'A_06_00_08',
    assert:'Template may contain any element, except the html element, the head element, ' + 
    	'the body element, or the frameset element',
    link:'https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/templates/index.html#template-element',
    highlight:'[[Any]], except the html element, the head element, the body element, ' +
    	'or the frameset element.',
    bug: ''
};

test(function () {
    var d = newHTMLDocument();    
    
    HTML5_TAG.forEach(function (value) {
    	if (value != 'body' && value != 'html' && value != 'head' && value != 'frameset') {
    		var t = d.createElement('template');
    		var e = d.createElement(value);
    	    t.content.appendChild(e);
    	    
    	    d.body.appendChild(t);
    	    
    	    assert_equals(t.content.childNodes.length, 1, 'Template should contain ' + value + ' element');
    	}    	
    });

}, 'A_06_00_08_T01', PROPS(A_06_00_08, {
	  author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	  reviewer:''
}));
