/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
 */

var _05_TEMPLATE_CONTENTS_OWNER_DOCUMENT_TYPE = {
	name : '_05_TEMPLATE_CONTENTS_OWNER_DOCUMENT_TYPE',
	assert : 'The template contents owner document type is HTML document, if template is declared in HTML document ',
	help : 'http://www.w3.org/TR/2013/WD-html-templates-20130214/#definitions',
	highlight : 'If DOCUMENT is an HTML document, Mark TEMPLATE CONTENTS OWNER as an HTML document.'
};

var _05_TEMPLATE_CONTENTS_OWNER_DOCUMENT_TYPE_T01 = async_test(
		'_05_TEMPLATE_CONTENTS_OWNER_DOCUMENT_TYPE_T01', PROPS(
				_05_TEMPLATE_CONTENTS_OWNER_DOCUMENT_TYPE, {
					author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
				}));

// document has browsing context
_05_TEMPLATE_CONTENTS_OWNER_DOCUMENT_TYPE_T01.step(inContext(function(ctx) {

	var d = newRenderedHTMLDocument(ctx);

	var t = d.createElement('template');

	var div = d.createElement('div');
	div.setAttribute('id', 'div1');
	div.innerText = 'Some text';

	t.appendChild(div);

	d.body.appendChild(t);

	assert_equals(t.content.ownerDocument.constructor.name, 'HTMLDocument',
			'Template content owner ' + 'should be a HTML document');

	_05_TEMPLATE_CONTENTS_OWNER_DOCUMENT_TYPE_T01.done();
}));

// document has no browsing context
test(function() {
	var d = newHTMLDocument();
	var t = d.createElement('template');

	d.body.appendChild(t);

	assert_equals(t.content.ownerDocument.constructor.name, 'HTMLDocument',
			'Template content owner ' + 'should be a HTML document');

}, '_05_TEMPLATE_CONTENTS_OWNER_DOCUMENT_TYPE_T02', PROPS(
		_05_TEMPLATE_CONTENTS_OWNER_DOCUMENT_TYPE, {
			author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));