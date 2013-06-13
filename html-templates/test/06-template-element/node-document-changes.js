/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
 */

var _06_NODE_DOCUMENT_CHANGES = {
	name : '_06_NODE_DOCUMENT_CHANGES',
	assert : 'When node\'s document changes its owner document should be changed too',
	link : 'https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/templates/index.html#template-element',
	highlight : 'When a template element\'s node document changes, the template element\'s content '
			+ 'DocumentFragment must be adopted into the new node document\'s template contents owner document.'
};

// Empty template
test(function() {
	var d1 = newHTMLDocument();
	var t = d1.createElement('template');

	assert_equals(t.ownerDocument, d1, 'Wrong template node owner document');
	assert_equals(t.content.ownerDocument, d1,
			'Wrong template content owner document');

	var d2 = newHTMLDocument();
	d2.body.appendChild(t);

	assert_equals(t.ownerDocument, d2,
			'Template node owner document should be changed');
	assert_equals(t.content.ownerDocument, d2,
			'Template content owner document should be changed');

}, '_06_NODE_DOCUMENT_CHANGES_T01', PROPS(_06_NODE_DOCUMENT_CHANGES, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer : ''
}));

// Non empty template
test(function() {
	var d1 = newHTMLDocument();
	d1.body.innerHTML = '<template id="tmpl"><div>Div content</div> And some more text</template>';

	var t = d1.querySelector('#tmpl');

	assert_equals(t.ownerDocument, d1,
			'Wrong template node owner document');
	assert_equals(t.content.ownerDocument, d1,
			'Wrong template content owner document');

	var d2 = newHTMLDocument();
	d2.body.appendChild(t);

	assert_equals(t.ownerDocument, d2,
			'Template node owner document should be changed');
	assert_equals(t.content.ownerDocument, d2,
			'Template content owner document should be changed');

}, '_06_NODE_DOCUMENT_CHANGES_T02', PROPS(_06_NODE_DOCUMENT_CHANGES, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer : ''
}));

// Nested templates
test(function() {
	var d1 = newHTMLDocument();
	d1.body.innerHTML = ''
			+ '<template id="tmpl"><div>Div content</div> And some more text'
			+ '<template id="tmpl2"><div>Template content</div></template>'
			+ '</template>';

	var t = d1.querySelector('#tmpl');

	assert_equals(t.ownerDocument, d1, 'Wrong template node owner document');
	assert_equals(t.content.ownerDocument, d1,
			'Wrong template content owner document');

	var t2 = t.content.querySelector('#tmpl2');

	assert_equals(t2.ownerDocument, d1,
			'Wrong nested template node owner document');
	assert_equals(t2.content.ownerDocument, d1,
			'Wrong nested template content owner document');

	var d2 = newHTMLDocument();
	d2.body.appendChild(t);

	assert_equals(t.ownerDocument, d2,
			'Template node owner document should be changed');
	assert_equals(t.content.ownerDocument, d2,
			'Template content owner document should be changed');

	assert_equals(t2.ownerDocument, d2,
			'Nested template node owner document should be changed');
	assert_equals(t2.content.ownerDocument, d2,
			'Nested template content owner document should be changed');

}, '_06_NODE_DOCUMENT_CHANGES_T03', PROPS(_06_NODE_DOCUMENT_CHANGES, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer : ''
}));
