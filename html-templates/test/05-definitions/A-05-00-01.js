/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
 */

var A_05_00_01 = {
	name : 'A_05_00_01',
	assert : 'The template contents must be a DocumentFragment',
	link : 'https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/templates/index.html#definitions',
	highlight : 'The template contents must be a DocumentFragment',
	seealso : 'http://www.w3.org/TR/domcore/#interface-documentfragment'
};

// empty template
test(function() {
	var d = newHTMLDocument();
	var t = d.createElement('template');

	d.body.appendChild(t);

	assert_equals(t.content.nodeName, '#document-fragment',
			'Template content should be ' + 'a documentFragment');

}, 'A_05_00_01_T01', PROPS(A_05_00_01, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer : 'Aleksei Yu. Semenov <a.semenov@unipro.ru>'
}));

// non empty template
test(function() {
	var d = newHTMLDocument();
	var t = d.createElement('template');

	t.innerHTML = '<div>This is a div</div><span>This is a span</span>';

	d.body.appendChild(t);

	assert_equals(t.content.nodeName, '#document-fragment',
			'Template content should be ' + 'a documentFragment');

}, 'A_05_00_01_T02', PROPS(A_05_00_01, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer : 'Aleksei Yu. Semenov <a.semenov@unipro.ru>'
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

}, 'A_05_00_01_T03', PROPS(A_05_00_01, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer : ''
}));

// non empty template containing text node
test(function() {
	var d = newHTMLDocument();
	var t = d.createElement('template');

	t.innerHTML = 'Some text';

	d.body.appendChild(t);

	assert_equals(t.content.nodeName, '#document-fragment',
			'Template content should be ' + 'a documentFragment');

}, 'A_05_00_01_T04', PROPS(A_05_00_01, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer : 'Aleksei Yu. Semenov <a.semenov@unipro.ru>'
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

}, 'A_05_00_01_T05', PROPS(A_05_00_01, {
	author : 'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	reviewer : 'Aleksei Yu. Semenov <a.semenov@unipro.ru>'
}));
