/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_06_00_06 = {
    name:'A_06_00_06',
    assert:'Node document of the template content attribute must be a document',
    link:'https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/templates/index.html#template-element',
    highlight:'Let CONTENTS be a new DocumentFragment object [[whose node document is DOCUMENT]] ' +
    	'and associated host element is TEMPLATE.'
};


test(function () {
    var d = newHTMLDocument();
    var t = d.createElement('template');
    
    assert_equals(t.content.ownerDocument, d, 'Wrong template content owner document');
    
}, 'A_06_00_06_T01', PROPS(A_06_00_06, {
	  author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	  reviewer:''
}));

