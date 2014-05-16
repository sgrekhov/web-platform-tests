/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
 */

"use strict";

// Creates and returns new HTML document
function newHTMLDocument() {
    return document.implementation.createHTMLDocument('Test Document');
}

// Returns true if timed item is in current as defined at
// http://dev.w3.org/fxtf/web-animations/#dfn-current
function isCurrent(timedItem) {
    // FIXME Add the third condition:
    // it has a parent animation group and the parent animation group is
    // current.
    return isInBeforePhase(timedItem) || isInPlay(timedItem);
}

// Returns true if timed item is in before phase as defined at
// http://dev.w3.org/fxtf/web-animations/#dfn-before-phase
function isInBeforePhase(timedItem) {
    return timedItem.localTime != null
            && timedItem.startTime < timedItem.timing.delay;
}

// Returns true if timed item is in play as defined at
// http://dev.w3.org/fxtf/web-animations/#dfn-in-play
function isInPlay(timedItem) {
    // FIXME Add the second condition:
    // 2. the timed item has a parent animation group
    // that is in play or else is directly associated with a player that is not
    // limited.
    return isInActivePhase(timedItem);
}

// Returns true if timed item is in active phase as defined at
// http://dev.w3.org/fxtf/web-animations/#dfn-active-phase
function isInActivePhase(timedItem) {
    return timedItem.localTime != null
            && timedItem.startTime >= timedItem.timing.delay
            && timedItem.startTime <= timedItem.timing.delay
                    + timedItem.activeDuration;
}
