/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
 */

var _12_TEMPLATE_CHILD_NODES = {
	name : '_12_TEMPLATE_CHILD_NODES',
	assert : 'Child nodes of template element in XHTML documents are always appended '
			+ 'to the template content (instead of template itself)',
	help : 'http://www.w3.org/TR/2013/WD-html-templates-20130214/#parsing-xhtml-documents',
	highlight : 'When a user agent is contructing a DOM tree corresponding to the input '
			+ 'passed to the XML parser, and a node is about to be appended to a template element, '
			+ 'the node must instead be appended to the template element\'s content DocumentFragment.',
	bug : [ 'https://code.google.com/p/chromium/issues/detail?id=251183' ]
};

// test innerHTML
test(function() {
	var d = newXHTMLDocument();

	d.body = d.createElement('body');
	d.body.innerHTML = '<template id="tmpl1">'
			+ '<div id="div1">This is div inside template</div>'
			+ '<div id="div2">This is another div inside template</div>'
			+ '</template>';

	var t = d.querySelector('#tmpl1');

	assert_equals(t.childNodes.length, 0,
			'Wrong number of template child nodes');
	assert_equals(t.content.childNodes.length, 2,
			'Wrong number of template content child nodes');

}, '_12_TEMPLATE_CHILD_NODES_T01', PROPS(_12_TEMPLATE_CHILD_NODES, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// test appendChild
test(function() {
	var d = newXHTMLDocument();

	var t = d.createElement('template');
	d.body = d.createElement('body');
	d.body.appendChild(t);

	var div1 = d.createElement('div');
	var div2 = d.createElement('div');

	t.appendChild(div1);
	t.appendChild(div2);

	assert_equals(t.childNodes.length, 0,
			'Wrong number of template child nodes');
	assert_equals(t.content.childNodes.length, 2,
			'Wrong number of template content child nodes');

}, '_12_TEMPLATE_CHILD_NODES_T02', PROPS(_12_TEMPLATE_CHILD_NODES, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// Test nested template. innerHTML
test(function() {
	var d = newXHTMLDocument();
	d.body = d.createElement('body');
	d.body.innerHTML = '<template id="tmpl1">'
			+ '<div id="div1">This is div inside template</div>'
			+ '<div id="div2">This is another div inside template</div>'
			+ '<template id="tmpl2">'
			+ '<div id="div3">This is div inside nested template</div>'
			+ '<div id="div4">This is another div inside nested template</div>'
			+ '</template>' + '</template>';

	var t = d.querySelector('#tmpl1');

	assert_equals(t.childNodes.length, 0,
			'Wrong number of template child nodes');
	assert_equals(t.content.childNodes.length, 3,
			'Wrong number of template content child nodes');

	var t2 = t.content.querySelector('#tmpl2');

	assert_equals(t2.childNodes.length, 0,
			'Wrong number of template child nodes');
	assert_equals(t2.content.childNodes.length, 2,
			'Wrong number of nested template content child nodes');

}, '_12_TEMPLATE_CHILD_NODES_T03', PROPS(_12_TEMPLATE_CHILD_NODES, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// Test nested template. appendChild
test(function() {
	var d = newXHTMLDocument();
	d.body = d.createElement('body');

	var t = d.createElement('template');
	d.body.appendChild(t);

	var div1 = d.createElement('div');
	var div2 = d.createElement('div');

	t.appendChild(div1);
	t.appendChild(div2);

	var t2 = d.createElement('template');

	var div3 = d.createElement('div');
	var div4 = d.createElement('div');

	t2.appendChild(div3);
	t2.appendChild(div4);

	t.appendChild(t2);

	assert_equals(t.childNodes.length, 0,
			'Wrong number of template child nodes');
	assert_equals(t.content.childNodes.length, 3,
			'Wrong number of template content child nodes');

	assert_equals(t2.childNodes.length, 0,
			'Wrong number of nested template child nodes');
	assert_equals(t2.content.childNodes.length, 2,
			'Wrong number of nested template content child nodes');

}, '_12_TEMPLATE_CHILD_NODES_T04', PROPS(_12_TEMPLATE_CHILD_NODES, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

testInIFrame('resources/template-child-nodes-div.xhtml', function(ctx) {
	var d = ctx.iframes[0].contentDocument;

	var t = d.querySelector('template');

	assert_equals(t.childNodes.length, 0,
			'Wrong number of template child nodes');
	assert_equals(t.content.querySelectorAll('div').length, 2,
			'Wrong number of template content child nodes');

}, '_12_TEMPLATE_CHILD_NODES_T05', PROPS(_12_TEMPLATE_CHILD_NODES, {
	author : 'Aleksei Yu. Semenov <a.semenov@unipro.ru>'
}));

testInIFrame('resources/template-child-nodes-nested.xhtml', function(ctx) {
	var d = ctx.iframes[0].contentDocument;

	var t = d.querySelector('template');

	assert_equals(t.childNodes.length, 0,
			'Wrong number of template child nodes');

	var nt = t.content.querySelector('template');

	assert_equals(nt.childNodes.length, 0,
			'Wrong number of template child nodes');

	assert_equals(nt.content.querySelectorAll('div').length, 2,
			'Wrong number of template content child nodes');

}, '_12_TEMPLATE_CHILD_NODES_T06', PROPS(_12_TEMPLATE_CHILD_NODES, {
	author : 'Aleksei Yu. Semenov <a.semenov@unipro.ru>'
}));
