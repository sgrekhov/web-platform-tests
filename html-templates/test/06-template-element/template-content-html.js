/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
 */

var _06_TEMPLATE_CONTENT_HTML = {
	name : '_06_TEMPLATE_CONTENT_HTML',
	assert : 'HTML element cannot be content of TEMPLATE element',
	help : 'http://www.w3.org/TR/2013/WD-html-templates-20130214/#template-element',
	highlight : 'Any, [[except the html element]], the head element, the body element, '
			+ 'or the frameset element.'
};

// Test innerHTML. HTML element only
test(function() {
	var d = newHTMLDocument();
	var t = d.createElement('template');

	t.innerHTML = '<html><body></body></html>';

	d.body.appendChild(t);

	assert_equals(t.content.childNodes.length, 0,
			'Template cannot contain HTML element');

}, '_06_TEMPLATE_CONTENT_HTML_T01', PROPS(_06_TEMPLATE_CONTENT_HTML, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// Test innerHTML. Valid element and HTML element
test(function() {
	var d = newHTMLDocument();
	var t = d.createElement('template');

	t.innerHTML = '<div id="dv">Some text</div><html><body></body></html>';

	d.body.appendChild(t);

	assert_equals(t.content.childNodes.length, 1,
			'Template cannot contain HTML element');
	assert_true(t.content.querySelector('#dv') != null,
			'Template should contain valid element');

}, '_06_TEMPLATE_CONTENT_HTML_T02', PROPS(_06_TEMPLATE_CONTENT_HTML, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// Test innerHTML. Valid element and HTML element
test(function() {
	var d = newHTMLDocument();
	var t = d.createElement('template');

	t.innerHTML = '<html><body></body></html><div id="dv">Some text</div>';

	d.body.appendChild(t);

	assert_equals(t.content.childNodes.length, 1,
			'Template cannot contain HTML element');
	assert_true(t.content.querySelector('#dv') != null,
			'Template should contain valid element');

}, '_06_TEMPLATE_CONTENT_HTML_T03', PROPS(_06_TEMPLATE_CONTENT_HTML, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// Test nested template. innerHTML
test(function() {
	var d = newHTMLDocument();
	var t = d.createElement('template');

	t.innerHTML = '<template id="t2"><html><body></body></html></template>';

	d.body.appendChild(t);

	assert_equals(t.content.childNodes.length, 1,
			'Template should contain nested template');
	assert_true(t.content.querySelector('#t2') != null,
			'Template should contain nested element');

	var t2 = t.content.querySelector('#t2');

	assert_equals(t2.content.childNodes.length, 0,
			'Template cannot contain HTML element');

}, '_06_TEMPLATE_CONTENT_HTML_T04', PROPS(_06_TEMPLATE_CONTENT_HTML, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// Test innerHTML. Valid element inside HTML element
test(function() {
	var d = newHTMLDocument();
	var t = d.createElement('template');

	t.innerHTML = '<html><div id="dv">Some text</div></html>';

	d.body.appendChild(t);

	assert_equals(t.content.childNodes.length, 1,
			'Template cannot contain HTML element');
	assert_true(t.content.querySelector('#dv') != null,
			'Template should contain valid element');

}, '_06_TEMPLATE_CONTENT_HTML_T05', PROPS(_06_TEMPLATE_CONTENT_HTML, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));
