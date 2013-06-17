/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
 */

var _05_TEMPLATE_CONTENTS = {
	name : '_05_TEMPLATE_CONTENTS',
	assert : 'The template contents must be a DocumentFragment',
	help : 'http://www.w3.org/TR/2013/WD-html-templates-20130214/#definitions',
	highlight : 'The template contents must be a DocumentFragment'
};

// empty template
test(function() {
	var d = newHTMLDocument();
	var t = d.createElement('template');

	d.body.appendChild(t);

	assert_equals(t.content.nodeName, '#document-fragment',
			'Template content should be a documentFragment');

}, '_05_TEMPLATE_CONTENTS_T01', PROPS(_05_TEMPLATE_CONTENTS, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// non empty template
test(function() {
	var d = newHTMLDocument();
	var t = d.createElement('template');

	t.innerHTML = '<div>This is a div</div><span>This is a span</span>';

	d.body.appendChild(t);

	assert_equals(t.content.nodeName, '#document-fragment',
			'Template content should be ' + 'a documentFragment');

}, '_05_TEMPLATE_CONTENTS_T02', PROPS(_05_TEMPLATE_CONTENTS, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// non empty template containing div which is a Node element, not the document
// fragment
test(function() {
	var d = newHTMLDocument();
	var t = d.createElement('template');

	t.innerHTML = '<div>This is a div</div>';

	d.body.appendChild(t);

	assert_equals(t.content.nodeName, '#document-fragment',
			'Template content should be ' + 'a documentFragment');

}, '_05_TEMPLATE_CONTENTS_T03', PROPS(_05_TEMPLATE_CONTENTS, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// non empty template containing text node
test(function() {
	var d = newHTMLDocument();
	var t = d.createElement('template');

	t.innerHTML = 'Some text';

	d.body.appendChild(t);

	assert_equals(t.content.nodeName, '#document-fragment',
			'Template content should be ' + 'a documentFragment');

}, '_05_TEMPLATE_CONTENTS_T04', PROPS(_05_TEMPLATE_CONTENTS, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// nested template containing text node
test(function() {
	var d = newHTMLDocument();
	var t = d.createElement('template');

	t.innerHTML = '<template id="t2">Some text</template>';

	d.body.appendChild(t);

	assert_equals(t.content.nodeName, '#document-fragment',
			'Template content should be ' + 'a documentFragment');
	var t2 = t.content.querySelector("#t2");
	assert_equals(t2.content.nodeName, '#document-fragment',
			'Nested template content should be ' + 'a documentFragment');

}, '_05_TEMPLATE_CONTENTS_T05', PROPS(_05_TEMPLATE_CONTENTS, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>'
}));

// the empty template tag inside HTML file loaded in iframe
testInIFrame('resources/template-contents-empty.html', function(ctx) {
	var d = ctx.iframes[0].contentWindow.document;

	var t = d.getElementsByTagName('template').item(0);

	assert_equals(t.content.nodeName, '#document-fragment',
			'Template content should be a documentFragment');

}, '_05_TEMPLATE_CONTENTS_T06', PROPS(_05_TEMPLATE_CONTENTS, {
	author : 'Aleksei Yu. Semenov <a.semenov@unipro.ru>'
}));

// the non empty template tag inside HTML file loaded in iframe
testInIFrame('resources/template-contents.html', function(ctx) {
	var d = ctx.iframes[0].contentWindow.document;

	var t = d.getElementsByTagName('template').item(0);

	assert_equals(t.content.nodeName, '#document-fragment',
			'Template content should be a documentFragment');

}, '_05_TEMPLATE_CONTENTS_T07', PROPS(_05_TEMPLATE_CONTENTS, {
	author : 'Aleksei Yu. Semenov <a.semenov@unipro.ru>'
}));

// the template tag with some text inside HTML file loaded in iframe
testInIFrame('resources/template-contents-text.html', function(ctx) {
	var d = ctx.iframes[0].contentWindow.document;

	var t = d.getElementsByTagName('template').item(0);

	assert_equals(t.content.nodeName, '#document-fragment',
			'Template content should be a documentFragment');

}, '_05_TEMPLATE_CONTENTS_T08', PROPS(_05_TEMPLATE_CONTENTS, {
	author : 'Aleksei Yu. Semenov <a.semenov@unipro.ru>'
}));

// the template tag with nested template tag inside HTML file loaded in iframe
testInIFrame('resources/template-contents-nested.html', function(ctx) {
	var d = ctx.iframes[0].contentWindow.document;

	var t = d.getElementsByTagName('template').item(0);

	assert_equals(t.content.nodeName, '#document-fragment',
			'Template content should be a documentFragment');

	var t2 = t.content.querySelector("template");

	assert_equals(t2.content.nodeName, '#document-fragment',
			'Nested template content should be a documentFragment');

}, '_05_TEMPLATE_CONTENTS_T09', PROPS(_05_TEMPLATE_CONTENTS, {
	author : 'Aleksei Yu. Semenov <a.semenov@unipro.ru>'
}));
