/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
 */

var _05_TEMPLATE_CONTENT_OWNER_02 = {
	name : '_05_TEMPLATE_CONTENT_OWNER_02',
	assert : 'Template contents owner have no browsing context',
	help : 'http://www.w3.org/TR/2013/WD-html-templates-20130214/#definitions',
	highlight : 'Otherwise, let TEMPLATE CONTENTS OWNER be a new Document node '
			+ 'that does not have a browsing context'
};

// test document in iframe which has browsing context
testInIFrame(null, function(ctx) {
	var d = ctx.iframes[0].contentDocument;
	var t = d.createElement('template');

	var div = d.createElement('div');
	div.setAttribute('id', 'div1');
	div.innerText = 'Some text';

	t.appendChild(div);

	d.body.appendChild(t);

	// d has browsing context. There should be another document as a template
	// content owner
	assert_true(t.content.ownerDocument != d, 'Wrong template owner document');

}, '_05_TEMPLATE_CONTENT_OWNER_02_T01', PROPS(_05_TEMPLATE_CONTENT_OWNER_02, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));
