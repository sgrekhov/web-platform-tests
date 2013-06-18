/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
 */

var _12_NODE_DOCUMENT = {
	name : '_12_NODE_DOCUMENT',
	assert : 'Node\'s node document must be set to the element to which it will be appended',
	help : 'http://www.w3.org/TR/2013/WD-html-templates-20130214/#parsing-xhtml-documents',
	highlight : 'Also, when the user agent creates a node for insertion to the DOM tree, the created node\'s '
			+ 'node document must be set to that of the element to which it will be appended.',
	bug: ['https://code.google.com/p/chromium/issues/detail?id=251183']
};

// Empty template
test(function() {
	var d1 = newXHTMLDocument();
	var t = d1.createElement('template');

	assert_equals(t.ownerDocument, d1, 'Wrong template node owner document');
	assert_equals(t.content.ownerDocument, d1,
			'Wrong template content owner document');

	var d2 = newXHTMLDocument();

	d2.body = d2.createElement('body');
	d2.body.appendChild(t);

	assert_equals(t.ownerDocument, d2,
			'Template node owner document should be changed');
	assert_equals(t.content.ownerDocument, d2,
			'Template content owner document should be changed');

}, '_12_NODE_DOCUMENT_T01', PROPS(_12_NODE_DOCUMENT, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// Non empty template
test(function() {
	var d1 = newXHTMLDocument();

	d1.body = d1.createElement('body');
	d1.body.innerHTML = '<template id="tmpl"><div>Div content</div></template>';

	var t = d1.querySelector('#tmpl');

	assert_equals(t.ownerDocument, d1,
					'Wrong template node owner document');
//			assert_equals(t.content.ownerDocument, d1,
//					'Wrong template content owner document');

	var d2 = newXHTMLDocument();
	var body2 = d2.createElement('body');
	d2.body = body2;
	d2.body.appendChild(t);

	assert_equals(t.ownerDocument, d2,
			'Template node owner document should be changed');
//	assert_equals(t.content.ownerDocument, d2,
//			'Template content owner document should be changed');

}, '_12_NODE_DOCUMENT_T02', PROPS(_12_NODE_DOCUMENT, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// Nested templates
test(function() {
	var d1 = newXHTMLDocument();
	d1.body = d1.createElement('body');
	d1.body.innerHTML = ''
			+ '<template id="tmpl"><div>Div content</div> And some more text'
			+ '<template id="tmpl2"><div>Template content</div></template>'
			+ '</template>';

	var t = d1.querySelector('#tmpl');

	assert_equals(t.ownerDocument, d1, 'Wrong template node owner document');
//	assert_equals(t.content.ownerDocument, d1,
//			'Wrong template content owner document');

	var t2 = t.content.querySelector('#tmpl2');

	assert_equals(t2.ownerDocument, d1,
			'Wrong nested template node owner document');
//	assert_equals(t2.content.ownerDocument, d1,
//			'Wrong nested template content owner document');

	var d2 = newXHTMLDocument();
	var body2 = d2.createElement('body');
	d2.body = body2;
	d2.body.appendChild(t);

	assert_equals(t.ownerDocument, d2,
			'Template node owner document should be changed');
//	assert_equals(t.content.ownerDocument, d2,
//			'Template content owner document should be changed');

	assert_equals(t2.ownerDocument, d2,
			'Nested template node owner document should be changed');
//	assert_equals(t2.content.ownerDocument, d2,
//			'Nested template content owner document should be changed');

}, '_12_NODE_DOCUMENT_T03', PROPS(_12_NODE_DOCUMENT, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// load document from server
testInIFrame('resources/template-child-nodes-div.xhtml', function(ctx) {
	var d = ctx.iframes[0].contentDocument;

	var t = d.querySelector('template');

	assert_equals(t.ownerDocument, d, 'Wrong template node owner document');

}, '_12_NODE_DOCUMENT_T04', PROPS(_12_NODE_DOCUMENT, {
	author : 'Aleksei Yu. Semenov <a.semenov@unipro.ru>'
}));

//load document with nested templates from server
testInIFrame('resources/template-child-nodes-nested.xhtml', function(ctx) {
	var d = ctx.iframes[0].contentDocument;

	var t1 = d.querySelector('template');

	assert_equals(t1.ownerDocument, d, 'Wrong template node owner document');

	var t2 = t1.content.querySelector('template');

	assert_equals(t2.ownerDocument, t1.content.ownerDocument, 'Wrong template node owner document');

}, '_12_NODE_DOCUMENT_T05', PROPS(_12_NODE_DOCUMENT, {
	author : 'Aleksei Yu. Semenov <a.semenov@unipro.ru>'
}));

//load document from server
//append template node to other document
testInIFrame('resources/template-child-nodes-div.xhtml', function(ctx) {
	var d1 = ctx.iframes[0].contentDocument;

	var t = d1.querySelector('template');

	var d2 = newXHTMLDocument();
	d2.body = d2.createElement('body');
	d2.body.appendChild(t);

	assert_equals(t.ownerDocument, d2, 'Wrong template node owner document');

}, '_12_NODE_DOCUMENT_T06', PROPS(_12_NODE_DOCUMENT, {
	author : 'Aleksei Yu. Semenov <a.semenov@unipro.ru>'
}));

//load document with nested templates from server
// append template node to other document
testInIFrame('resources/template-child-nodes-nested.xhtml', function(ctx) {
	var d1 = ctx.iframes[0].contentDocument;

	var t1 = d1.querySelector('template');
	var t2 = t1.content.querySelector('template');

	var d2 = newXHTMLDocument();
	d2.body = d2.createElement('body');
	d2.body.appendChild(t1);

	assert_equals(t1.ownerDocument, d2, 'Wrong template node owner document');
	assert_equals(t2.ownerDocument, t1.content.ownerDocument, 'Wrong template node owner document');

}, '_12_NODE_DOCUMENT_T05', PROPS(_12_NODE_DOCUMENT, {
	author : 'Aleksei Yu. Semenov <a.semenov@unipro.ru>'
}));
