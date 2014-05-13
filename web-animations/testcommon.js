/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
 */

"use strict";

function newHTMLDocument() {
    return document.implementation.createHTMLDocument('Test Document');
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

//Creates new iframe and loads given url into it.
//Function f is bound to the iframe's onload event.
//Function f receives iframe's contentDocument as argument.
//The iframe is disposed after function f is executed.
function testInIFrame(url, f, testName, testProps) {
    var t = async_test(testName, testProps);
    t.step(function() {
        var iframe = newIFrame(url);
        iframe.onload = t.step_func(function() {
            try {
                f(iframe.contentDocument);
                t.done();
            } finally {
                iframe.parentNode.removeChild(iframe);
            }
        });
    });
}

function testInBlankDocumentWithBrowsingContext(f, testName, testProps) {
    testInIFrame('../resources/blank.html', f, testName, testProps);
}

function newAnimation(animationTarget) {
    var animation = new Animation(animationTarget, 
            [{top: "0px", offset: 0}, 
             {top: "100px", offset: 1/2}, 
             {top: "200px", offset: 1}], 
             5);
    return animation;
}

// Creates new AnimationPlayer object
function newAnimationPlayer(doc) {
    var animationTarget = doc.createElement('div');
    var animation = newAnimation(animationTarget);
    return doc.timeline.play(animation);
}

// Returns true if timed item is in current as defined at
// http://dev.w3.org/fxtf/web-animations/#dfn-current
function isCurrent(timedItem) {
    // FIXME Add the third condition:
    // it has a parent animation group and the parent animation group is current.
    return isBeforePhase(timedItem) || isPlayPhase(timedItem);
}

// Returns true if timed item is in before phase as defined at
// http://dev.w3.org/fxtf/web-animations/#dfn-before-phase
function isBeforePhase(timedItem) {
    return timedItem.localTime != null && timedItem.startTime < timedItem.timing.delay;
}

// Returns true if timed item is in play phase as defined at
// http://dev.w3.org/fxtf/web-animations/#dfn-in-play
function isPlayPhase(timedItem) {
    // FIXME Add the second condition:
    // 2. the timed item has a parent animation group
    // that is in play or else is directly associated with a player that is not limited.
    return isActivePhase(timedItem);
}

// Returns true if timed item is in active phase as defined at
// http://dev.w3.org/fxtf/web-animations/#dfn-active-phase
function isActivePhase(timedItem) {
    return timedItem.localTime != null &&
        timedItem.startTime >= timedItem.timing.delay &&
        timedItem.startTime <= timedItem.timing.delay + timedItem.activeDuration;
}


// TODO Revisit all of the methods below. If they won't be used then remove them

// Calculates Current time as described at
// http://dev.w3.org/fxtf/web-animations/#the-current-time-of-a-player
function calculateCurrentTime(timelineTime, adjustedStartTime, playbackRate, holdTime) {
    if (holdTime == null) {
        return (timelineTime - adjustedStartTime) * playbackRate;
    } else {
        return holdTime;
    }
}

// Returns animation player adjusted start time as described at
// http://dev.w3.org/fxtf/web-animations/#calculating-the-adjusted-start-time
function getAdjustedTime(player) {
    if (player.paused) {
        return player.timeline.currentTime - getHoldTime(player) / player.playbackRate;
    } else {
        // FIXME How to get stored value for the adjusted start time?
        return player.startTime;
    }
}

// Returns Effective Timeline Time as described at
// http://dev.w3.org/fxtf/web-animations/#dfn-effective-timeline-time
function getEffectiveTimelineTime(player) {
    if (player.timeline.currentTime != null) {
        return player.timeline.currentTime;
    }
    return 0;
}

// Retuns Effective Current Time as described at
// http://dev.w3.org/fxtf/web-animations/#dfn-effective-current-time
function getEffectiveCurrentTime(player) {
    return calculateCurrentTime(getEffectiveTimelineTime(player), getAdjustedTime(player),
        player.playbackRate, getHoldTime(player));
}

// Returns player hold time as described at
// http://dev.w3.org/fxtf/web-animations/#dfn-hold-time
function getHoldTime(player) {
    var holdTime = null;
    if (player.paused) {
        holdTime = getEffectiveCurrentTime(player);
    }
    // FIXME Shouldn't the conditions for limited behaviour and automaticaly updationg
    // of the hold time be applied here?
    return holdTime;
}
