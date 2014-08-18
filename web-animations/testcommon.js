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
var ANIMATION_WIDTH_DEFAULT = 300;
var ANIMATION_WIDTH_0 = 10;
var ANIMATION_WIDTH_0_5 = 100;
var ANIMATION_WIDTH_1 = 200;

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
    animationTarget.style.width = ANIMATION_WIDTH_DEFAULT + 'px';
    return new Animation(animationTarget, [
        {width: ANIMATION_WIDTH_0 + 'px', offset: 0},
        {width: ANIMATION_WIDTH_0_5 + 'px', offset: 1/2},
        {width: ANIMATION_WIDTH_1 + 'px', offset: 1}], ANIMATION_END_TIME);
}

function newAnimationPlayer(animationTarget) {
    var animation = newAnimation(animationTarget);
    return document.timeline.play(animation);
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

function assert_timing_equlas(actual, expected){
    assert_equals(actual.delay, expected.delay, 'Value of AnimationNode.timing.delay ' +
        'is unexpected');
    assert_equals(actual.endDelay, expected.endDelay, 'Value of AnimationNode.timing.endDelay ' +
        'is unexpected');
    assert_equals(actual.fill, expected.fill, 'Value of AnimationNode.timing.fill ' +
        'is unexpected');
    assert_equals(actual.iterationStart, expected.iterationStart, 'Value of ' +
        'AnimationNode.timing.iterationStart is unexpected');
    assert_equals(actual.iterations, expected.iterations, 'Value of ' +
        'AnimationNode.timing.iterations is unexpected');
    assert_equals(actual.duration, expected.duration, 'Value of AnimationNode.timing.duration ' +
        'is unexpected');
    assert_equals(actual.playbackRate, expected.playbackRate, 'Value of ' +
        'AnimationNode.timing.playbackRate is unexpected');
    assert_equals(actual.direction, expected.direction, 'Value of ' +
        'AnimationNode.timing.direction is unexpected');
    assert_equals(actual.easing, expected.easing, 'Value of AnimationNode.timing.easing ' +
        'is unexpected');
}
