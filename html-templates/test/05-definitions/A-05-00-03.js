/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
*/

var A_05_00_03 = {
    name:'A_05_00_03',
    assert:'Test the template contents owner (has browsing context)',
    link:'https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/templates/index.html#definitions',
    highlight:'Otherwise, let TEMPLATE CONTENTS OWNER be a new Document node ' +
    	'that does not have a browsing context'
};

// test document in iframe which has browsing context
var A_05_00_03_T01 = async_test('A_05_00_03_T01', PROPS(A_05_00_03, {
    author:'Sergey G. Grekhov <sgrekhov@unipro.ru>',
    reviewer:''
}));

A_05_00_03_T01.step(unit(function (ctx) {	

    var d = newRenderedHTMLDocument(ctx);
    
    var t = d.createElement('template');
    
    var div = d.createElement('div');
    div.setAttribute('id', 'div1');
    div.innerText = 'Some text';
    
    t.appendChild(div);
    
    d.body.appendChild(t);
    
    // d has browsing context. There should be another document as a template content owner
    assert_true(t.content.ownerDocument != d, 'Wrong template owner document');
        
    A_05_00_03_T01.done();
}));