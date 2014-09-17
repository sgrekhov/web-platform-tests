/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
 */

"use strict";

// Epsilon value for assert_approx_equals()
var EPSILON = 20;
var ANIMATION_END_TIME = 1000;
var ANIMATION_TOP_DEFAULT = 300;
var ANIMATION_TOP_0 = 10;
var ANIMATION_TOP_0_5 = 100;
var ANIMATION_TOP_1 = 200;

var KEYFRAMES = [
    {top: ANIMATION_TOP_0 + 'px', offset: 0},
    {top: ANIMATION_TOP_0_5 + 'px', offset: 1/2},
    {top: ANIMATION_TOP_1 + 'px', offset: 1}];

// Default timing values as specified at
// http://dev.w3.org/fxtf/web-animations/#the-animationtiminginput-dictionary
var DEFAULT_TIMING = {
        delay: 0,
        endDelay: 0,
        fill: 'auto',
        iterationStart: 0.0,
        iterations: 1.0,
        duration: 'auto',
        playbackRate: 1.0,
        direction: 'normal',
        easing: 'linear'
};

// Creates and returns new HTML document
function newHTMLDocument() {
    return document.implementation.createHTMLDocument('Test Document');
}

function newAnimation(animationTarget) {
    animationTarget.style.top = ANIMATION_TOP_DEFAULT + 'px';
    return new Animation(animationTarget, KEYFRAMES, ANIMATION_END_TIME);
}

function newAnimationPlayer(animationTarget) {
    var animation = newAnimation(animationTarget);
    return document.timeline.play(animation);
}

function newKeyframeEffect(options) {
    if (options) {
        return new KeyframeEffect(KEYFRAMES, options);
    }
    return new KeyframeEffect(KEYFRAMES);
}

function newMotionPathEffect(options) {
    var pathString = 'M 0 ' + ANIMATION_TOP_0 + ' L 0 ' + ANIMATION_TOP_1 + ' z';
    if (options) {
        return new MotionPathEffect(pathString, options);
    }
    return new MotionPathEffect(pathString);
}

// creates div element, appends it to the document body and
// add removing of the created element to test cleanup
function createDiv(test, doc) {
    if (!doc) {
        doc = document;
    }
    var div = doc.createElement('div');
    doc.body.appendChild(div);
    test.add_cleanup(function() {
        removeElement(div);
    });
    return div;
}

//creates two div elements, appends them to the document body and
//add removing of the created elements to test cleanup
function createPseudoElement(test, doc) {
    if (!doc) {
        doc = document;
    }
    var div1 = doc.createElement('div');
    var div2 = doc.createElement('div');
    doc.body.appendChild(div1);
    doc.body.appendChild(div2);

    test.add_cleanup(function() {
        removeElement(div1);
        removeElement(div2);
    });
    return div2.pseudo(':before');
}

// Removes element
function removeElement(element) {
    element.parentNode.removeChild(element);
}

// Returns true if there is className in object prototype chain
function hasAncestorClassString(object, classString) {
    var proto = Object.getPrototypeOf(object);
    if (proto === null) {
        return false;
    }
    if (proto.constructor.name === classString) {
        return true;
    }
    return hasAncestorClassString(proto, classString);
}

// Returns the type name of given object
function type(object){
    return Object.prototype.toString.call(object).slice(8, -1);
}

// Returns expected top of the target element width at currentTime
function getExpectedTop(currentTime) {
    return ANIMATION_TOP_0 + (ANIMATION_TOP_1 - ANIMATION_TOP_0) *
        (currentTime % ANIMATION_END_TIME);
}

// FIXME The code below is stubs for Web Animations objects that don't implemented yet
// Remove all of the code below before merge it with w3c branch

// AnimationNode stub
function AnimationNode() {
    this.timing = null;
    this.computedTiming = null;
    this.parent = null;
    this.previousSibling = null;
    this.nextSibling = null;
    this.player = null;
}

AnimationNode.prototype.before = function(nodes) {
};

AnimationNode.prototype.after = function(nodes) {
};

AnimationNode.prototype.replace = function(nodes) {
};

AnimationNode.prototype.remove = function() {
};

// AnimationGroup stub
function AnimationGroup(children, timing) {
    this.children = children;
    this.timing = timing;
    this.firstChild = null;
    this.lastChild = null;
    this.parent = null;
    this.updateFirstLastChild();
}

AnimationGroup.prototype = new AnimationNode();

AnimationGroup.prototype.updateFirstLastChild = function() {
    if (this.children.length>0){
        this.firstChild = this.children[0];
    } else {
        this.firstChild = null;
    }
};

AnimationGroup.prototype.prepend = function() {
    for (var i = arguments.length - 1; i >= 0; i--) {
        var node = arguments[i];
        this.children.unshift(node);
        if (node.parent){
            var k = node.parent.children.indexOf(node);
            node.parent.children = node.parent.children.splice(k,1);
            node.parent.updateFirstLastChild();
        }
        node.parent = this;
    }
    var prev = null;
    this.children.forEach(function(node){
        node.previousSibling = prev;
        node.nextSibling = null;
        if (prev) {
            prev.nextSibling = node;
        }
        prev = node;
    });
    this.updateFirstLastChild();
};

AnimationGroup.prototype.append = function() {
    for (var i = 0; i < arguments.length; i++) {
        var node = arguments[i];
        this.children.push(node);
        if (node.parent){
            var k = node.parent.children.indexOf(node);
            node.parent.children = node.parent.children.splice(k,1);
            node.parent.updateFirstLastChild();
        }
        node.parent = this;
    }
    var prev = null;
    this.children.forEach(function(node){
        node.previousSibling = prev;
        node.nextSibling = null;
        if (prev) {
            prev.nextSibling = node;
        }
        prev = node;
    });
    this.updateFirstLastChild();
};

AnimationGroup.prototype.clone = function() {
    return this;
};

// AnimationSequence stub
function AnimationSequence(children, timing) {
    this.children = children;
    this.timing = timing;
    this.parent = null;
    this.updateFirstLastChild();
}

AnimationSequence.prototype = new AnimationGroup([]);

//AnimationEffect stub
function AnimationEffect() {
    this.iterationComposite = null;
    this.composite = null;
}

AnimationEffect.prototype.clone = function() {
    return this;
};

// MotionPathEffect stub
function MotionPathEffect(path, options) {
    this.segments = null;
    this.autoRotate = null;
    this.angle = null;
    this.spacing = null;
}

MotionPathEffect.prototype = new AnimationEffect();

// KeyframeEffect stub
function KeyframeEffect(frames, options) {
    this.spacing = null;
}

KeyframeEffect.prototype = new AnimationEffect();

KeyframeEffect.prototype.getFrames = function() {
    return [];
};

KeyframeEffect.prototype.setFrames = function(frames) {
};