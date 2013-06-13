/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
 */

var _06_TEMPLATE_CONTENT_FRAMESET = {
	name : '_06_TEMPLATE_CONTENT_FRAMESET',
	assert : 'FRAMESET element cannot be content of TEMPLATE element',
	help : 'https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/templates/index.html#template-element',
	highlight : 'Any, except the html element, the head element, the body element, '
			+ 'or [[the frameset element.]]'
};

// Test innerHTML. Test FRAMESET element only.
test(function() {
	var d = newHTMLDocument();
	var t = d.createElement('template');

	t.innerHTML = '<frameset cols="25%,*,25%">' + '<frame src="frame_a.htm">'
			+ '<frame src="frame_b.htm">' + '<frame src="frame_c.htm">'
			+ '</frameset>';

	d.body.appendChild(t);

	assert_equals(t.content.childNodes.length, 0,
			'Template cannot contain FRAMESET element');

}, '_06_TEMPLATE_CONTENT_FRAMESET_T01', PROPS(_06_TEMPLATE_CONTENT_FRAMESET, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// Test innerHTML. Test FRAMESET element and some valid element.
test(function() {
	var d = newHTMLDocument();
	var t = d.createElement('template');

	t.innerHTML = '<div id="dv">Some text</div><frameset cols="25%,*,25%">'
			+ '<frame src="frame_a.htm">' + '<frame src="frame_b.htm">'
			+ '<frame src="frame_c.htm">' + '</frameset>';

	d.body.appendChild(t);

	assert_equals(t.content.childNodes.length, 1,
			'Template cannot contain FRAMESET element');
	assert_true(t.content.querySelector('#dv') != null,
			'Template should contain valid element');

}, '_06_TEMPLATE_CONTENT_FRAMESET_T02', PROPS(_06_TEMPLATE_CONTENT_FRAMESET, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// Test innerHTML. Test FRAMESET element and some valid element.
test(function() {
	var d = newHTMLDocument();
	var t = d.createElement('template');

	t.innerHTML = '<frameset cols="25%,*,25%">' + '<frame src="frame_a.htm">'
			+ '<frame src="frame_b.htm">' + '<frame src="frame_c.htm">'
			+ '</frameset><div id="dv">Some text</div>';

	d.body.appendChild(t);

	assert_equals(t.content.childNodes.length, 1,
			'Template cannot contain FRAMESET element');
	assert_true(t.content.querySelector('#dv') != null,
			'Template should contain valid element');

}, '_06_TEMPLATE_CONTENT_FRAMESET_T03', PROPS(_06_TEMPLATE_CONTENT_FRAMESET, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// Test nested template. innerHTML
test(function() {
	var d = newHTMLDocument();
	var t = d.createElement('template');

	t.innerHTML = '<template id="t2"><frameset cols="25%,*,25%">'
			+ '<frame src="frame_a.htm">' + '<frame src="frame_b.htm">'
			+ '<frame src="frame_c.htm">' + '</frameset></template>';

	d.body.appendChild(t);

	assert_equals(t.content.childNodes.length, 1,
			'Template should contain nested template');
	assert_true(t.content.querySelector('#t2') != null,
			'Template should contain nested element');

	var t2 = t.content.querySelector('#t2');

	assert_equals(t2.content.childNodes.length, 0,
			'Template cannot contain FRAMESET element');

}, '_06_TEMPLATE_CONTENT_FRAMESET_T04', PROPS(_06_TEMPLATE_CONTENT_FRAMESET, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));
