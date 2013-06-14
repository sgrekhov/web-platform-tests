/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
 */

var _06_TEMPLATE_CONTENT_BODY = {
	name : '_06_TEMPLATE_CONTENT_BODY',
	assert : 'BODY element cannot be content of TEMPLATE element',
	help : 'http://www.w3.org/TR/2013/WD-html-templates-20130214/#template-element',
	highlight : 'Any, except the html element, the head element, [[the body element]], '
			+ 'or the frameset element.'
};

// innerHTML. Test BODY element only
test(function() {
	var d = newHTMLDocument();
	var t = d.createElement('template');

	t.innerHTML = '<body><div>Some content</div></body>';

	d.body.appendChild(t);

	assert_equals(t.content.childNodes.length, 1,
			'Wrong number of template content children');
	assert_equals(t.content.firstChild.nodeName, 'DIV',
			'Template should contain children of ignored HEAD element');

}, '_06_TEMPLATE_CONTENT_BODY_T01', PROPS(_06_TEMPLATE_CONTENT_BODY, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// innerHTML. Test BODY element and some valid element
test(function() {
	var d = newHTMLDocument();
	var t = d.createElement('template');

	t.innerHTML = '<body><div <div id="dv1">Some content</div></body><div id="dv2">Some valid content</div>';

	d.body.appendChild(t);

	assert_equals(t.content.childNodes.length, 2,
			'Wrong number of template content children');
	assert_true(t.content.querySelector('#dv1') != null,
			'Template should contain children of '
					+ 'the ignored BODY element');
	assert_true(t.content.querySelector('#dv2') != null,
			'Template should contain valid element');

}, '_06_TEMPLATE_CONTENT_BODY_T02', PROPS(_06_TEMPLATE_CONTENT_BODY, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// innerHTML. Test BODY element and some valid element
test(function() {
	var d = newHTMLDocument();
	var t = d.createElement('template');

	t.innerHTML = '<div id="dv1">Some valid content</div><body><div id="dv2">Some content</div></body>';

	d.body.appendChild(t);

	assert_equals(t.content.childNodes.length, 2,
			'Template cannot contain BODY element');
	assert_true(t.content.querySelector('#dv1') != null,
			'Template should contain valid element');
	assert_true(t.content.querySelector('#dv2') != null,
			'Template should contain children of '
					+ 'the ignored BODY element');

}, '_06_TEMPLATE_CONTENT_BODY_T03', PROPS(_06_TEMPLATE_CONTENT_BODY, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// Test nested template. innerHTML
test(function() {
	var d = newHTMLDocument();
	var t = d.createElement('template');

	t.innerHTML = '<template id="t2"><body><span>Body!<span></body></template>';

	d.body.appendChild(t);

	assert_equals(t.content.childNodes.length, 1,
			'Template should contain nested template');
	assert_true(t.content.querySelector('#t2') != null,
			'Template should contain nested element');

	var t2 = t.content.querySelector('#t2');

	assert_equals(t2.content.childNodes.length, 1,
			'Template cannot contain BODY element');
	assert_equals(t2.content.firstChild.nodeName, 'SPAN',
			'Template cannot contain BODY element');

}, '_06_TEMPLATE_CONTENT_BODY_T04', PROPS(_06_TEMPLATE_CONTENT_BODY, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// innerHTML. Test empty BODY element
test(function() {
	var d = newHTMLDocument();
	var t = d.createElement('template');

	t.innerHTML = '<body></body>';

	d.body.appendChild(t);

	assert_equals(t.content.childNodes.length, 0,
			'Template cannot contain BODY element');

}, '_06_TEMPLATE_CONTENT_BODY_T05', PROPS(_06_TEMPLATE_CONTENT_BODY, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));
