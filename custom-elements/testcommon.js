/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
 */

"use strict";

var HTML5_ELEMENTS = [ 'a', 'abbr', 'address', 'area', 'article', 'aside',
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

// self-closing HTML5 elements
var HTML5_SELF_CLOSING_ELEMENTS = [ 'area', 'base', 'br', 'col', 'command', 'embed',
        'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source',
        'track', 'wbr' ];

// http://www.whatwg.org/specs/web-apps/current-work/multipage/forms.html#form-associated-element
var HTML5_FORM_ASSOCIATED_ELEMENTS = [ 'button', 'fieldset', 'input', 'keygen',
        'label', 'object', 'output', 'select', 'textarea' ];

var HTML5_DOCUMENT_ELEMENTS = [ 'html', 'head', 'body' ];

var HTML5_TABLE_ELEMENTS = [ 'caption', 'col', 'colgroup', 'tbody', 'td',
        'tfoot', 'th', 'thead', 'tr' ];

var ExtenderChars = {
        EXTENDER_CHARS: [ 0x00B7, 0x02D0, 0x02D1, 0x0387, 0x0640, 0x0E46, 0x0EC6,
            0x3005, 0x3031, 0x3032, 0x3033, 0x3034, 0x3035, 0x309D, 0x309E, 0x30FC,
            0x30FD, 0x30FE ],

        testEach: function(doc, nameFunction, checkFunction) {
            testCharCodeArray(doc, this.EXTENDER_CHARS, nameFunction, checkFunction);
        }
};

var CombiningChars = {
        COMBINING_CHARS: [ 0x0300, 0x0301, 0x0302, 0x0303, 0x0304, 0x0305, 0x0306,
            0x0307, 0x0308, 0x0309, 0x030A, 0x030B, 0x030C, 0x030D, 0x030E, 0x030F,
            0x0310, 0x0311, 0x0312, 0x0313, 0x0314, 0x0315, 0x0316, 0x0317, 0x0318,
            0x0319, 0x031A, 0x031B, 0x031C, 0x031D, 0x031E, 0x031F, 0x0320, 0x0321,
            0x0322, 0x0323, 0x0324, 0x0325, 0x0326, 0x0327, 0x0328, 0x0329, 0x032A,
            0x032B, 0x032C, 0x032D, 0x032E, 0x032F, 0x0330, 0x0331, 0x0332, 0x0333,
            0x0334, 0x0335, 0x0336, 0x0337, 0x0338, 0x0339, 0x033A, 0x033B, 0x033C,
            0x033D, 0x033E, 0x033F, 0x0340, 0x0341, 0x0342, 0x0343, 0x0344, 0x0345,
            0x0360, 0x0361, 0x0483, 0x0484, 0x0485, 0x0486, 0x0591, 0x0592, 0x0593,
            0x0594, 0x0595, 0x0596, 0x0597, 0x0598, 0x0599, 0x05A0, 0x05A1, 0x05A3,
            0x05A4, 0x05A5, 0x05A6, 0x05A7, 0x05A8, 0x05A9, 0x05AA, 0x05AB, 0x05AC,
            0x05AD, 0x05AE, 0x05AF, 0x05B0, 0x05B1, 0x05B2, 0x05B3, 0x05B4, 0x05B5,
            0x05B6, 0x05B7, 0x05B8, 0x05B9, 0x05BB, 0x05BC, 0x05BD, 0x05BF, 0x05C1,
            0x05C2, 0x05C4, 0x064B, 0x064C, 0x064D, 0x064E, 0x064F, 0x0650, 0x0651,
            0x0652, 0x0670, 0x06D6, 0x06D7, 0x06D8, 0x06D9, 0x06DA, 0x06DB, 0x06DC,
            0x06DD, 0x06DE, 0x06DF, 0x06E0, 0x06E1, 0x06E2, 0x06E3, 0x06E4, 0x06E7,
            0x06E8, 0x06EA, 0x06EB, 0x06EC, 0x06ED, 0x0901, 0x0902, 0x0903, 0x093C,
            0x093E, 0x093F, 0x0940, 0x0941, 0x0942, 0x0943, 0x0944, 0x0945, 0x0946,
            0x0947, 0x0948, 0x0949, 0x094A, 0x094B, 0x094C, 0x094D, 0x0951, 0x0952,
            0x0953, 0x0954, 0x0962, 0x0963, 0x0981, 0x0982, 0x0983, 0x09BC, 0x09BE,
            0x09BF, 0x09C0, 0x09C1, 0x09C2, 0x09C3, 0x09C4, 0x09C7, 0x09C8, 0x09CB,
            0x09CC, 0x09CD, 0x09D7, 0x09E2, 0x09E3, 0x0A02, 0x0A3C, 0x0A3E, 0x0A3F,
            0x0A40, 0x0A41, 0x0A42, 0x0A47, 0x0A48, 0x0A4B, 0x0A4C, 0x0A4D, 0x0A70,
            0x0A71, 0x0A81, 0x0A82, 0x0A83, 0x0ABC, 0x0ABE, 0x0ABF, 0x0AC0, 0x0AC1,
            0x0AC2, 0x0AC3, 0x0AC4, 0x0AC5, 0x0AC7, 0x0AC8, 0x0AC9, 0x0ACB, 0x0ACC,
            0x0ACD, 0x0B01, 0x0B02, 0x0B03, 0x0B3C, 0x0B3E, 0x0B3F, 0x0B40, 0x0B41,
            0x0B42, 0x0B43, 0x0B47, 0x0B48, 0x0B4B, 0x0B4C, 0x0B4D, 0x0B56, 0x0B57,
            0x0B82, 0x0B83, 0x0BBE, 0x0BBF, 0x0BC0, 0x0BC1, 0x0BC2, 0x0BC6, 0x0BC7,
            0x0BC8, 0x0BCA, 0x0BCB, 0x0BCC, 0x0BCD, 0x0BD7, 0x0C01, 0x0C02, 0x0C03,
            0x0C3E, 0x0C3F, 0x0C40, 0x0C41, 0x0C42, 0x0C43, 0x0C44, 0x0C46, 0x0C47,
            0x0C48, 0x0C4A, 0x0C4B, 0x0C4C, 0x0C4D, 0x0C55, 0x0C56, 0x0C82, 0x0C83,
            0x0CBE, 0x0CBF, 0x0CC0, 0x0CC1, 0x0CC2, 0x0CC3, 0x0CC4, 0x0CC6, 0x0CC7,
            0x0CC8, 0x0CCA, 0x0CCB, 0x0CCC, 0x0CCD, 0x0CD5, 0x0CD6, 0x0D02, 0x0D03,
            0x0D3E, 0x0D3F, 0x0D40, 0x0D41, 0x0D42, 0x0D43, 0x0D46, 0x0D47, 0x0D48,
            0x0D4A, 0x0D4B, 0x0D4C, 0x0D4D, 0x0D57, 0x0E31, 0x0E34, 0x0E35, 0x0E36,
            0x0E37, 0x0E38, 0x0E39, 0x0E3A, 0x0E47, 0x0E48, 0x0E49, 0x0E4A, 0x0E4B,
            0x0E4C, 0x0E4D, 0x0E4E, 0x0EB1, 0x0EB4, 0x0EB5, 0x0EB6, 0x0EB7, 0x0EB8,
            0x0EB9, 0x0EBB, 0x0EBC, 0x0EC8, 0x0EC9, 0x0ECA, 0x0ECB, 0x0ECC, 0x0ECD,
            0x0F18, 0x0F19, 0x0F35, 0x0F37, 0x0F39, 0x0F3E, 0x0F3F, 0x0F71, 0x0F72,
            0x0F73, 0x0F74, 0x0F75, 0x0F76, 0x0F77, 0x0F78, 0x0F79, 0x0F7A, 0x0F7B,
            0x0F7C, 0x0F7D, 0x0F7E, 0x0F7F, 0x0F80, 0x0F81, 0x0F82, 0x0F83, 0x0F84,
            0x0F86, 0x0F87, 0x0F88, 0x0F89, 0x0F8A, 0x0F8B, 0x0F90, 0x0F91, 0x0F92,
            0x0F93, 0x0F94, 0x0F95, 0x0F97, 0x0F99, 0x0F9A, 0x0F9B, 0x0F9C, 0x0F9D,
            0x0F9E, 0x0F9F, 0x0FA0, 0x0FA1, 0x0FA2, 0x0FA3, 0x0FA4, 0x0FA5, 0x0FA6,
            0x0FA7, 0x0FA8, 0x0FA9, 0x0FAA, 0x0FAB, 0x0FAC, 0x0FAD, 0x0FB1, 0x0FB2,
            0x0FB3, 0x0FB4, 0x0FB5, 0x0FB6, 0x0FB7, 0x0FB9, 0x20D0, 0x20D1, 0x20D2,
            0x20D3, 0x20D4, 0x20D5, 0x20D6, 0x20D7, 0x20D8, 0x20D9, 0x20DA, 0x20DB,
            0x20DC, 0x20E1, 0x302A, 0x302B, 0x302C, 0x302D, 0x302E, 0x302F, 0x3099,
            0x309A ],

        testEach: function(doc, nameFunction, checkFunction) {
            testCharCodeArray(doc, this.COMBINING_CHARS, nameFunction, checkFunction);
        }
};

var BaseChars = {
        BASE_CHARS_SINGLE: [ 0x0386, 0x038C, 0x03DA, 0x03DC, 0x03DE, 0x03E0,
            0x0559, 0x06D5, 0x093D, 0x09B2, 0x0A5E, 0x0A8D, 0x0ABD, 0x0AE0, 0x0B3D,
            0x0B9C, 0x0CDE, 0x0E30, 0x0E84, 0x0E8A, 0x0E8D, 0x0EA5, 0x0EA7, 0x0EB0,
            0x0EBD, 0x1100, 0x1109, 0x113C, 0x113E, 0x1140, 0x114C, 0x114E, 0x1150,
            0x1159, 0x1163, 0x1165, 0x1167, 0x1169, 0x1175, 0x119E, 0x11A8, 0x11AB,
            0x11BA, 0x11EB, 0x11F0, 0x11F9, 0x1F59, 0x1F5B, 0x1F5D, 0x1FBE, 0x2126,
            0x212E ],

        BASE_CHARS_RANGES: [ 0x0041, 0x005A, 0x0061, 0x007A, 0x00C0, 0x00D6,
            0x00D8, 0x00F6, 0x00F8, 0x00FF, 0x0100, 0x0131, 0x0134, 0x013E, 0x0141,
            0x0148, 0x014A, 0x017E, 0x0180, 0x01C3, 0x01CD, 0x01F0, 0x01F4, 0x01F5,
            0x01FA, 0x0217, 0x0250, 0x02A8, 0x02BB, 0x02C1, 0x0388, 0x038A, 0x038E,
            0x03A1, 0x03A3, 0x03CE, 0x03D0, 0x03D6, 0x03E2, 0x03F3, 0x0401, 0x040C,
            0x040E, 0x044F, 0x0451, 0x045C, 0x045E, 0x0481, 0x0490, 0x04C4, 0x04C7,
            0x04C8, 0x04CB, 0x04CC, 0x04D0, 0x04EB, 0x04EE, 0x04F5, 0x04F8, 0x04F9,
            0x0531, 0x0556, 0x0561, 0x0586, 0x05D0, 0x05EA, 0x05F0, 0x05F2, 0x0621,
            0x063A, 0x0641, 0x064A, 0x0671, 0x06B7, 0x06BA, 0x06BE, 0x06C0, 0x06CE,
            0x06D0, 0x06D3, 0x06E5, 0x06E6, 0x0905, 0x0939, 0x0958, 0x0961, 0x0985,
            0x098C, 0x098F, 0x0990, 0x0993, 0x09A8, 0x09AA, 0x09B0, 0x09B6, 0x09B9,
            0x09DC, 0x09DD, 0x09DF, 0x09E1, 0x09F0, 0x09F1, 0x0A05, 0x0A0A, 0x0A0F,
            0x0A10, 0x0A13, 0x0A28, 0x0A2A, 0x0A30, 0x0A32, 0x0A33, 0x0A35, 0x0A36,
            0x0A38, 0x0A39, 0x0A59, 0x0A5C, 0x0A72, 0x0A74, 0x0A85, 0x0A8B, 0x0A8F,
            0x0A91, 0x0A93, 0x0AA8, 0x0AAA, 0x0AB0, 0x0AB2, 0x0AB3, 0x0AB5, 0x0AB9,
            0x0B05, 0x0B0C, 0x0B0F, 0x0B10, 0x0B13, 0x0B28, 0x0B2A, 0x0B30, 0x0B32,
            0x0B33, 0x0B36, 0x0B39, 0x0B5C, 0x0B5D, 0x0B5F, 0x0B61, 0x0B85, 0x0B8A,
            0x0B8E, 0x0B90, 0x0B92, 0x0B95, 0x0B99, 0x0B9A, 0x0B9E, 0x0B9F, 0x0BA3,
            0x0BA4, 0x0BA8, 0x0BAA, 0x0BAE, 0x0BB5, 0x0BB7, 0x0BB9, 0x0C05, 0x0C0C,
            0x0C0E, 0x0C10, 0x0C12, 0x0C28, 0x0C2A, 0x0C33, 0x0C35, 0x0C39, 0x0C60,
            0x0C61, 0x0C85, 0x0C8C, 0x0C8E, 0x0C90, 0x0C92, 0x0CA8, 0x0CAA, 0x0CB3,
            0x0CB5, 0x0CB9, 0x0CE0, 0x0CE1, 0x0D05, 0x0D0C, 0x0D0E, 0x0D10, 0x0D12,
            0x0D28, 0x0D2A, 0x0D39, 0x0D60, 0x0D61, 0x0E01, 0x0E2E, 0x0E32, 0x0E33,
            0x0E40, 0x0E45, 0x0E81, 0x0E82, 0x0E87, 0x0E88, 0x0E94, 0x0E97, 0x0E99,
            0x0E9F, 0x0EA1, 0x0EA3, 0x0EAA, 0x0EAB, 0x0EAD, 0x0EAE, 0x0EB2, 0x0EB3,
            0x0EC0, 0x0EC4, 0x0F40, 0x0F47, 0x0F49, 0x0F69, 0x10A0, 0x10C5, 0x10D0,
            0x10F6, 0x1102, 0x1103, 0x1105, 0x1107, 0x110B, 0x110C, 0x110E, 0x1112,
            0x1154, 0x1155, 0x115F, 0x1161, 0x116D, 0x116E, 0x1172, 0x1173, 0x11AE,
            0x11AF, 0x11B7, 0x11B8, 0x11BC, 0x11C2, 0x1E00, 0x1E9B, 0x1EA0, 0x1EF9,
            0x1F00, 0x1F15, 0x1F18, 0x1F1D, 0x1F20, 0x1F45, 0x1F48, 0x1F4D, 0x1F50,
            0x1F57, 0x1F5F, 0x1F7D, 0x1F80, 0x1FB4, 0x1FB6, 0x1FBC, 0x1FC2, 0x1FC4,
            0x1FC6, 0x1FCC, 0x1FD0, 0x1FD3, 0x1FD6, 0x1FDB, 0x1FE0, 0x1FEC, 0x1FF2,
            0x1FF4, 0x1FF6, 0x1FFC, 0x212A, 0x212B, 0x2180, 0x2182, 0x3041, 0x3094,
            0x30A1, 0x30FA, 0x3105, 0x312C, 0xAC00, 0xD7A3 ],

        testEach: function(doc, nameFunction, checkFunction) {
            testCharCodeArray(doc, this.BASE_CHARS_SINGLE, nameFunction, checkFunction);
            testCharCodeRangesArray(doc, this.BASE_CHARS_RANGES, nameFunction, checkFunction);
        }
};

var IdeorgaphicChars = {
        IDEOGRAPHIC_CHARS_SINGLE: [ 0x3007 ],

        IDEOGRAPHIC_CHARS_RANGES: [ 0x3021, 0x3029, 0x4E00, 0x9FA5 ],

        testEach: function(doc, nameFunction, checkFunction) {
            testCharCodeArray(doc, this.IDEOGRAPHIC_CHARS_SINGLE, nameFunction, checkFunction);
            testCharCodeRangesArray(doc, this.IDEOGRAPHIC_CHARS_RANGES, nameFunction,
                    checkFunction);
        }
};

var DigitChars = {
        DIGIT_CHARS_RANGES: [ 0x0030, 0x0039, 0x0660, 0x0669, 0x06F0, 0x06F9,
            0x0966, 0x096F, 0x09E6, 0x09EF, 0x0A66, 0x0A6F, 0x0AE6, 0x0AEF, 0x0B66,
            0x0B6F, 0x0BE7, 0x0BEF, 0x0C66, 0x0C6F, 0x0CE6, 0x0CEF, 0x0D66, 0x0D6F,
            0x0E50, 0x0E59, 0x0ED0, 0x0ED9, 0x0F20, 0x0F29 ],
               
        testEach: function(doc, nameFunction, checkFunction) {
            testCharCodeRangesArray(doc, this.DIGIT_CHARS_RANGES, nameFunction, checkFunction);
        }
};

var HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
var SVG_NAMESPACE = 'http://www.w3.org/2000/svg';


function newHTMLDocument() {
    return document.implementation.createHTMLDocument('Test Document');
}

function newXHTMLDocument() {
    var doctype = document.implementation.createDocumentType('html',
            '-//W3C//DTD XHTML 1.0 Transitional//EN',
            'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd');

    var d = document.implementation.createDocument(
            'http://www.w3.org/1999/xhtml', 'html', doctype);
    return d;
}


//Creates new iframe and loads given url into it.
//Returns reference to created iframe.
function newIFrame(url) {
    assert_not_equals(url, null, 'argument url should not be null');
    var iframe = document.createElement('iframe');
    iframe.src = url;
    document.body.appendChild(iframe);
    return iframe;
}

function _newIFrame(context, src) {
    if (typeof (context) === 'undefined'
            || typeof (context.iframes) !== 'object') {
        assert_unreached('Illegal context object in _newIFrame');
    }

    var iframe = document.createElement('iframe');
    iframe.style.display = 'none';

    if (typeof (src) != 'undefined') {
        iframe.src = src;
    }
    document.body.appendChild(iframe);
    context.addIFrame(iframe);

    assert_true(typeof (iframe.contentWindow) != 'undefined'
            && typeof (iframe.contentWindow.document) != 'undefined'
            && iframe.contentWindow.document != document,
            'Failed to create new rendered document');
    return iframe;
}

function newHTMLDocumentWithBrowsingContext(context) {
    var frame = _newIFrame(context);
    var d = frame.contentWindow.document;
    return d;
}

function Context() {
    this.iframes = [];
}

Context.prototype.clean = function() {
    this.iframes.forEach(function(e) {
        e.parentNode.removeChild(e);
    });
    this.iframes = [];
};

Context.prototype.addIFrame = function(iframe) {
    this.iframes.push(iframe);
};

// run given test function in context
// the context is cleaned up after test completes.
function inContext(f) {
    return function() {
        var context = new Context();
        try {
            f(context);
        } finally {
            context.clean();
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
            var context = new Context();
            var iframe = _newIFrame(context, url);
            iframe.onload = t.step_func(function() {
                try {
                    f(iframe.contentDocument);
                    t.done();
                } finally {
                    context.clean();
                }
            });
        });
    } else {
        test(inContext(function(context) {
            var doc = newHTMLDocumentWithBrowsingContext(context);
            f(doc);
        }), testName, testProps);
    }
}

function isVisible(el) {
    return el.offsetTop != 0;
}

function isSelfClosingElement(elementName) {
    return HTML5_SELF_CLOSING_ELEMENTS.indexOf(elementName) >= 0;
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

function d2h(d) {
    var hex = d.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function h2d(h) {
    return parseInt(h, 16);
}

// Helper function, which verifies that given custom element name is valid
function checkValidName(doc, name) {
    try {
        doc.registerElement(name);
    } catch (e) {
        assert_unreached('The custom element name \'' + name +
            '\' should be registered without errors');
    }
}

// Helper function, which verifies that given custom element name is invalid
function checkInvalidName(doc, name) {
    assert_throws(null,
        function(){ doc.registerElement(name); },
        'Registering invalid custom element name \'' + name +
            '\' should fail');
}
// Helper function to extract character code from given object
// expected input: either charater code or one character long string.
function getCharCode(c) {
    if (typeof(c) === 'string') {
        assert_equals(1, c.length, 'Error in test: input string should be one character long');
        c = c.charCodeAt(0);
    }
    assert_equals('number', typeof(c), 'Error in test: unexpected type for charater code');
    return c;
}

// check each element of the supplied array with the checkFunction
// the input array should contain either characters or character codes
// (mixing is is allowed)
function testCharCodeArray(doc, charCodeArray, nameFunction, checkFunction) {
    for (var i = 0; i < charCodeArray.length; i++) {
        var c = getCharCode(charCodeArray[i]);
        checkFunction(doc, nameFunction(c));
    }
}

// check each element of the supplied ranges array with the checkFunction
// the input array should contain either characters or character codes
//(mixing is is allowed)
function testCharCodeRangesArray(doc, charCodeRangesArray, nameFunction, checkFunction) {
    for (var i = 0; i < charCodeRangesArray.length; i += 2) {
        var rangeStart = getCharCode(charCodeRangesArray[i]);
        var rangeEnd = getCharCode(charCodeRangesArray[i+1]);
        for (var c = rangeStart; c <= rangeEnd; c++) {
            checkFunction(doc, nameFunction(c));
        }
    }
}
