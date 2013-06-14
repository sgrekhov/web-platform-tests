/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
 */

var _06_CONTENT_ATTRIBUTE = {
	name : '_06_CONTENT_ATTRIBUTE',
	assert : 'Content attribute of templeate element is read-only',
	help : 'http://www.w3.org/TR/2013/WD-html-templates-20130214/#template-element',
	highlight : '[[content of type DocumentFragment, read-only]]'
};

// DOM content
test(function() {
	var d = newHTMLDocument();
	var t = d.createElement('template');
	var el1 = d.createElement('div');
	var el2 = d.createElement('span');
	el1.appendChild(el2);

	t.content = el1;

	assert_equals(t.content.childNodes.length, 0,
			'Content attribute of templeate element '
					+ 'should be a read-only');

}, '_06_CONTENT_ATTRIBUTE_T01', PROPS(_06_CONTENT_ATTRIBUTE, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// html content
test(function() {
	var d = newHTMLDocument();
	d.body.innerHTML = '<template id="tmpl1" content="<div id=div1>Div content</div>"></template>';

	var t = d.querySelector('#tmpl1');

	assert_equals(t.content.childNodes.length, 0,
			'Content attribute of templeate element should be a read-only');

}, '_06_CONTENT_ATTRIBUTE_T02', PROPS(_06_CONTENT_ATTRIBUTE, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// text content
test(function() {
	var d = newHTMLDocument();
	d.body.innerHTML = '<template id="tmpl1" content="Some text as a content"></template>';

	var t = d.querySelector('#tmpl1');

	assert_equals(t.content.childNodes.length, 0,
			'Content attribute of templeate element should be a read-only');

}, '_06_CONTENT_ATTRIBUTE_T03', PROPS(_06_CONTENT_ATTRIBUTE, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));
