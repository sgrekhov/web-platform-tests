/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_06_00_02 = {
    name:'A_06_00_02',
    assert:'HEAD element cannot be content of TEMPLATE element',
    link:'https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/templates/index.html#template-element',
    highlight:'Any, except the html element, [[the head element]], the body element, ' +
    	'or the frameset element.',
    bug: ''
};


// Test innerHTML. Test HEAD element only
test(function () {
    var d = newHTMLDocument();
    var t = d.createElement('template');
    
    t.innerHTML = '<head><title>test</title></head>';
    
    d.body.appendChild(t);

    assert_equals(t.content.childNodes.length, 0, 'Template cannot contain HEAD element');

}, 'A_06_00_02_T01', PROPS(A_06_00_02, {
	  author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	  reviewer:''
}));


//Test innerHTML. Test HEAD element and some valid element
test(function () {
    var d = newHTMLDocument();
    var t = d.createElement('template');
    
    t.innerHTML = '<div id="dv">Some text</div><head><title>test</title></head>';
    
    d.body.appendChild(t);

    assert_equals(t.content.childNodes.length, 1, 'Template cannot contain HEAD element');
    assert_true(t.content.querySelector('#dv') != null, 'Template should contain valid element');

}, 'A_06_00_02_T02', PROPS(A_06_00_02, {
	  author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	  reviewer:''
}));


//Test innerHTML. Test HEAD element and some valid element
test(function () {
    var d = newHTMLDocument();
    var t = d.createElement('template');
    
    t.innerHTML = '<head><title>test</title></head><div id="dv">Some text</div>';
    
    d.body.appendChild(t);

    assert_equals(t.content.childNodes.length, 1, 'Template cannot contain HEAD element');
    assert_true(t.content.querySelector('#dv') != null, 'Template should contain valid element');

}, 'A_06_00_02_T03', PROPS(A_06_00_02, {
	  author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	  reviewer:''
}));


//test HEAD element. Test appendChild
test(function () {
    var d = newHTMLDocument();
    var t = d.createElement('template');
    
    var eHead = d.createElement('head');
    
    t.content.appendChild(eHead);
    
    d.body.appendChild(t);

    assert_equals(t.content.childNodes.length, 0, 'Template cannot contain HEAD element');

}, 'A_06_00_02_T04', PROPS(A_06_00_02, {
	  author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	  reviewer:''
}));

//Test nested template. innerHTML
test(function () {
    var d = newHTMLDocument();
    var t = d.createElement('template');
    
    t.innerHTML = '<template id="t2"><head><title>test</title></head></template>';
    
    d.body.appendChild(t);

    assert_equals(t.content.childNodes.length, 1, 'Template should contain nested template');
    assert_true(t.content.querySelector('#t2') != null, 'Template should contain nested element');
    
    var t2 = t.content.querySelector('#t2');
    
    assert_equals(t2.content.childNodes.length, 0, 'Template cannot contain HEAD element');

}, 'A_06_00_02_T05', PROPS(A_06_00_02, {
	  author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	  reviewer:''
}));


//Test nested template. appendChild
test(function () {
    var d = newHTMLDocument();
    var t = d.createElement('template');
    var t2 = d.createElement('template');
    t2.setAttribute('id', 't2');
    
    var eHead = d.createElement('head');
    
    t2.content.appendChild(eHead);
    t.content.appendChild(t2);
    
    d.body.appendChild(t);

    assert_equals(t.content.childNodes.length, 1, 'Template should contain nested template');
    assert_equals(t.content.querySelector('#t2'), t2, 'Template should contain nested element');
    
    assert_equals(t2.content.childNodes.length, 0, 'Template cannot contain HEAD element');

}, 'A_06_00_02_T06', PROPS(A_06_00_02, {
	  author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
	  reviewer:''
}));
