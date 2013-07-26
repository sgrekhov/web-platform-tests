/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
 */

"use strict";

var HTML5_ELEMNTS = [ 'a', 'abbr', 'address', 'area', 'article', 'aside',
        'audio', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'body', 'br',
        'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup',
        'command', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div',
        'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure',
        'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header',
        'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd',
        'keygen', 'label', 'legend', 'li', 'link', 'map', 'mark', 'menu',
        'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup',
        'option', 'output', 'p', 'param', 'pre', 'progress', 'q', 'rp', 'rt',
        'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source',
        'span', 'strong', 'style', 'sub', 'table', 'tbody', 'td', 'textarea',
        'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul',
        'var', 'video', 'wbr' ];

// only void (without end tag) HTML5 elements
var HTML5_VOID_ELEMENTS = [ 'area', 'base', 'br', 'col', 'command', 'embed',
        'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source',
        'track', 'wbr' ];

// http://www.whatwg.org/specs/web-apps/current-work/multipage/forms.html#form-associated-element
var HTML5_FORM_ASSOCIATED_ELEMENTS = [ 'button', 'fieldset', 'input', 'keygen',
        'label', 'object', 'output', 'select', 'textarea' ];

function newDocument() {
    var d = document.implementation.createDocument();
    return d;
}

function newHTMLDocument() {
    var d = document.implementation.createHTMLDocument('Test Document');
    return d;
}

function newXHTMLDocument() {
    var doctype = document.implementation.createDocumentType('html',
            '-//W3C//DTD XHTML 1.0 Transitional//EN',
            'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd');

    var d = document.implementation.createDocument(
            'http://www.w3.org/1999/xhtml', 'html', doctype);
    return d;
}

function newIFrame(ctx, src) {
    if (typeof (ctx) === 'undefined' || typeof (ctx.iframes) !== 'object') {
        assert_unreached('Illegal context object in newIFrame');
    }

    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';

    if (typeof (src) != 'undefined') {
        iframe.src = src;
    }
    document.body.appendChild(iframe);
    ctx.iframes.push(iframe);

    assert_true(typeof (iframe.contentWindow) != 'undefined'
            && typeof (iframe.contentWindow.document) != 'undefined'
            && iframe.contentWindow.document != document,
            'Failed to create new rendered document');
    return iframe;
}

function newRenderedHTMLDocument(ctx) {
    var frame = newIFrame(ctx);
    var d = frame.contentWindow.document;
    return d;
}

function newContext() {
    return {
        iframes : []
    };
}

function cleanContext(ctx) {
    ctx.iframes.forEach(function(e) {
        e.parentNode.removeChild(e);
    });
}

// run given test function in context
// the context is cleaned up after test completes.
function inContext(f) {
    return function() {
        var ctx = newContext();
        try {
            f(ctx);
        } finally {
            cleanContext(ctx);
        }
    };
}

// new context and iframe are created and url (if supplied) is asigned to
// iframe.src
// function f is bound to the iframe onload event or executed directly after
// iframe creation
// the context is passed to function as argument
function testInIFrame(url, f, testName, testProps) {
    if (url) {
        var t = async_test(testName, testProps);
        t.step(function() {
            var ctx = newContext();
            var iframe = newIFrame(ctx, url);
            iframe.onload = t.step_func(function() {
                try {
                    f(ctx);
                    t.done();
                } finally {
                    cleanContext(ctx);
                }
            });
        });
    } else {
        test(inContext(function(ctx) {
            newRenderedHTMLDocument(ctx);
            f(ctx);
        }), testName, testProps);
    }
}

function assert_nodelist_contents_equal_noorder(actual, expected, message) {
    assert_equals(actual.length, expected.length, message);
    var used = [];
    for ( var i = 0; i < expected.length; i++) {
        used.push(false);
    }
    for (i = 0; i < expected.length; i++) {
        var found = false;
        for ( var j = 0; j < actual.length; j++) {
            if (used[j] == false && expected[i] == actual[j]) {
                used[j] = true;
                found = true;
                break;
            }
        }
        if (!found) {
            assert_unreached(message + ". Fail reason:  element not found: "
                    + expected[i]);
        }
    }
}

function isVisible(el) {
    return el.offsetTop != 0;
}

function isVoidElement(elementName) {
    for ( var i = 0; i < HTML5_VOID_ELEMENTS.length; i++) {
        if (elementName === HTML5_VOID_ELEMENTS[i]) {
            return true;
        }
    }
    return false;
}

function checkTemplateContent(d, obj, html, id, nodeName) {

    obj.innerHTML = '<template id="tmpl">' + html + '</template>';

    var t = d.querySelector('#tmpl');

    if (id != null) {
        assert_equals(t.content.childNodes.length, 1, 'Element ' + nodeName
                + ' should present among template nodes');
        assert_equals(t.content.firstChild.id, id, 'Wrong element ID');
    }
    if (nodeName != null) {
        assert_equals(t.content.firstChild.nodeName, nodeName.toUpperCase(),
                'Wrong node name');
    }
}

function checkBodyTemplateContent(d, html, id, nodeName) {
    checkTemplateContent(d, d.body, html, id, nodeName);
}

function checkHeadTemplateContent(d, html, id, nodeName) {
    checkTemplateContent(d, d.head, html, id, nodeName);
}

function assert_null(value, description) {
    assert_true(value == null, description);
}

function assert_not_null(value, description) {
    assert_false(value == null, description);
}
