/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
 */

var _05_TEMPLATE_CONTENTS_OWNER_01 = {
	name : '_05_TEMPLATE_CONTENTS_OWNER_01',
	assert : 'if enclosing document have no browsing context, it must be template contents owner',
	link : 'https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/templates/index.html#definitions',
	highlight : 'If DOCUMENT does not have a browsing context, let TEMPLATE CONTENTS OWNER be DOCUMENT '
			+ 'and abort these steps.'
};

// document content owner is the current document (has no browsing content)
test(function() {
	var d = newHTMLDocument();
	var t = d.createElement('template');

	d.body.appendChild(t);

	assert_equals(t.content.ownerDocument, d, 'Wrong template content owner');

}, '_05_TEMPLATE_CONTENTS_OWNER_01_T01', PROPS(_05_TEMPLATE_CONTENTS_OWNER_01, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer : 'Aleksei Yu. Semenov <a.semenov@unipro.ru>'
}));
