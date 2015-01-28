/*
Distributed under both the W3C Test Suite License [1] and the W3C
3-clause BSD License [2]. To contribute to a W3C Test Suite, see the
policies and contribution forms [3].

[1] http://www.w3.org/Consortium/Legal/2008/04-testsuite-license
[2] http://www.w3.org/Consortium/Legal/2008/03-bsd-license
[3] http://www.w3.org/2004/10/27-testcases
 */

"use strict";

// Epsilon value for assert_approx_equals(). Used for time measurements
var TIME_EPSILON = 5;
// Precision for computedOffset
var COMPUTED_OFFSET_EPSILON = 0.000001;
// Precision (in px) for expected style at the moment and the one returned by getComputedStyle()
var COMPUTED_STYLE_EPSILON = 5;

var ANIMATION_DURATION = 1000;
var ANIMATION_TOP_DEFAULT = 300;
var ANIMATION_TOP_0 = 10;
var ANIMATION_TOP_0_5 = 100;
var ANIMATION_TOP_1 = 200;

var KEYFRAMES = [ {
    top : ANIMATION_TOP_0 + 'px',
    offset : 0
}, {
    top : ANIMATION_TOP_0_5 + 'px',
    offset : 1 / 2
}, {
    top : ANIMATION_TOP_1 + 'px',
    offset : 1
} ];

// Default timing values as specified at
// http://w3c.github.io/web-animations/#dictdef-animationtimingproperties
var DEFAULT_TIMING = {
    delay : 0,
    endDelay : 0,
    fill : 'auto',
    iterationStart : 0.0,
    iterations : 1.0,
    duration : 'auto',
    playbackRate : 1.0,
    direction : 'normal',
    easing : 'linear'
};

// Creates and returns new HTML document
function newHTMLDocument() {
    return document.implementation.createHTMLDocument('Test Document');
}

function newAnimationPlayer(animationTarget) {
	// FIXME replace this by document.timeline.play(animationTarget);
	// when document.timeline.play(animationTarget) will return correct
	// implementation of AnimationPlayer
    var animation = new Animation(animationTarget, KEYFRAMES, ANIMATION_DURATION);
    var player = new AnimationPlayer(animation, document.timeline);
    player.play();
    return  player;
}

function newKeyframeEffect(options) {
    if (options) {
        return new KeyframeEffect(KEYFRAMES, options);
    }
    return new KeyframeEffect(KEYFRAMES);
}

// creates div element, appends it to the document body and
// add removing of the created element to test cleanup
function createDiv(test, doc) {
    if (!doc) {
        doc = document;
    }
    var div = doc.createElement('div');
    doc.body.appendChild(div);
    div.style.top = ANIMATION_TOP_DEFAULT + 'px';
    test.add_cleanup(function() {
        removeElement(div);
    });
    return div;
}

// creates two div elements, appends them to the document body and
// add removing of the created elements to test cleanup
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
function type(object) {
    return Object.prototype.toString.call(object).slice(8, -1);
}

// Returns expected top of the target element at currentTime
function getExpectedTop(currentTime, iterationDuration) {
    if (!iterationDuration) {
        iterationDuration = ANIMATION_DURATION;
    }
    var iterationFraction = (currentTime / iterationDuration) % 1;
    if (iterationFraction <= 0.5) {
        return ANIMATION_TOP_0 + (ANIMATION_TOP_0_5 - ANIMATION_TOP_0) *
            iterationFraction * 2;
    } else {
        return ANIMATION_TOP_0_5 + (ANIMATION_TOP_1 - ANIMATION_TOP_0_5) *
            (iterationFraction - 0.5) * 2;
    }
}

// Compares actual and expected keyframes similar to
// assert_object_equals way, except for the property computedOffset,
// which is compared via assert_approx_equals with COMPUTED_OFFSET_EPSILON
function assert_keyframe_instance_equals(actual, expected, description) {
    for (var propertyName in expected) {
        assert_true(actual.hasOwnProperty(propertyName),
            description + ', expected property ' + propertyName + ' missing');
        var message = description + ', property ' + propertyName + ', ';
        if (propertyName === 'computedOffset') {
            assert_approx_equals(actual[propertyName],
                expected[propertyName], COMPUTED_OFFSET_EPSILON, message);
        } else {
            assert_equals(actual[propertyName], expected[propertyName], message);
        }
    }
    for (var propertyName in actual) {
        assert_true(expected.hasOwnProperty(propertyName), description +
            ', unexpected property ' + propertyName);
    }
}

// compares two sequences of keyframes, similar to
// assert_array_equals way, except for the property computedOffset,
// which is compared via assert_approx_equals with COMPUTED_OFFSET_EPSILON
function assert_keyframes_equals(actual, expected, description) {
    assert_equals(actual.length, expected.length, description +
        ', length differ, ');
    for (var i = 0; i < actual.length; i++) {
        assert_keyframe_instance_equals(actual[i], expected[i], description + ', index ' + i);
    }
}

// Test that values of expected object properties are equal to the values of
// keyframe object
// properties with the same names and tests additional property computedOffset
function testKeyframe(keyframe, expected, message, computedOffset) {
    var epsilon = 0.001;
    for (var propertyName in expected) {
        if (propertyName === 'computedOffset') {
            assert_approx_equals(keyframe[propertyName],
                expected[propertyName], epsilon, message
                    + '. Wrong value of property \'' + propertyName + '\'');
        } else {
            assert_equals(keyframe[propertyName], expected[propertyName],
                message + '. Wrong value of property \'' + propertyName + '\'');
        }
    }
    if (computedOffset) {
        assert_approx_equals(keyframe.computedOffset, computedOffset, epsilon,
                message +'. Wrong computedOffset value');
    }
}

// Computes keyframe offset according
// http://w3c.github.io/web-animations/#applying-spacing-to-keyframes
// and puts computed value to computedOffset property
function computeOffset(keyframes, spacing, pacedProperty) {
    // If pacedProperty is not specified set it to top
    if (!pacedProperty) {
        pacedProperty = 'top';
    }
    // Set computedOffset to offset. Further check computedOffset only
    keyframes.forEach(function(keyframe) {
        // If computedOffset not null - don't touch it
        // (it could be calculated earlier in paced mode for example)
        if (!keyframe.computedOffset) {
            keyframe.computedOffset = keyframe.offset;
        }
    });
    // If keyframes contains more than one keyframe and the keyframe offset of
    // the first keyframe in keyframes is null, set the keyframe offset of the
    // first keyframe to 0
    // FIXME use === below
    if (keyframes.length > 1 && keyframes[0].computedOffset == null) {
        keyframes[0].computedOffset = 0;
    }
    // If the keyframe offset of the last keyframe in distributed keyframes is
    // null, set its keyframe offset to 1.
    // FIXME use === below
    if (keyframes[keyframes.length - 1].computedOffset == null) {
        keyframes[keyframes.length - 1].computedOffset = 1;
    }
    // Find pair of frames startFrame and endFrame
    // All frames between them have null offset
    var startFrame = 0;
    var endFrame = 0;
    for (var i = 1; i < keyframes.length; i++) {
        // FIXME use !== below
        if (keyframes[i].computedOffset != null) {
            endFrame = i;
            if (endFrame - startFrame > 1) {
                if (spacing === 'paced') {
                    distributeKeyframesPaced(keyframes, startFrame, endFrame,
                            pacedProperty);
                } else {
                    // Treat all other vaues as 'distribute'
                    evenlyDistributeKeyframes(keyframes, startFrame, endFrame);
                }
                startFrame = i;
            } else {
                startFrame = i;
            }
        }
    }
    return keyframes;
}

function evenlyDistributeKeyframes(keyframes, start, end) {
    for (var i = start + 1; i < end; i++) {
        keyframes[i].computedOffset = keyframes[start].computedOffset
            + (keyframes[end].computedOffset - keyframes[start].computedOffset)
            * (i - start) / (end - start);
    }
    return keyframes;
}

function distributeKeyframesPaced(keyframes, start, end, pacedProperty) {
    // In range [start, end] find two frames pacedA and pacedB that contain
    // value for peaced property. peacedA is the first, peacedB is the last. If
    // there are no such frames let both of them refer to end
    var pacedA = -1;
    var pacedB = -1;
    for (var i = start; i <= end; i++) {
        if (keyframes[i][pacedProperty]) {
            if (pacedA === -1) {
                pacedA = i;
            } else {
                pacedB = i;
            }
        }
    }
    if (pacedA === -1 || pacedB === -1) {
        pacedA = end;
        pacedB = end;
    }
    if (pacedA !== pacedB) {
        // For each keyframe in the range (start, paced A] and [paced B, end),
        // apply the procedure for evenly distributing a keyframe using
        // start and end as the start and end keyframes respectively.
        var keyframesToDistributeEvently = [];
        if (pacedA !== start) {
            keyframesToDistributeEvently = keyframes.slice(start, pacedA + 1);
        } else {
            keyframesToDistributeEvently = [ keyframes[start] ];
        }
        if (pacedB !== end) {
            keyframesToDistributeEvently = keyframesToDistributeEvently
                    .concat(end + 1 >= keyframes.length ? keyframes
                            .slice(pacedB) : keyframes.slice(pacedB, end + 1));
        } else {
            keyframesToDistributeEvently = keyframesToDistributeEvently
                    .concat(keyframes[end]);
        }
        var distributed = evenlyDistributeKeyframes(
                keyframesToDistributeEvently, 0,
                keyframesToDistributeEvently.length - 1);

        // Apply computed offset values to keyframe array
        var counter = 1;
        for (var j = start + 1; j <= pacedA; j++, counter++) {
            keyframes[j].computedOffset = distributed[counter].computedOffset;
        }
        for (j = pacedB; j < end; j++, counter++) {
            keyframes[j].computedOffset = distributed[counter].computedOffset;
        }

        // Now distribute each pacable keyframe in the range (pacedA, pacedB)
        var totalDistance = cumulativeDistance(keyframes, pacedA, pacedB,
                pacedProperty);
        for (var k = pacedA + 1; k < pacedB; k++) {
            if (keyframes[k][pacedProperty]) {
                keyframes[k].computedOffset = keyframes[pacedA].computedOffset
                        + (keyframes[pacedB].computedOffset - keyframes[pacedA].computedOffset)
                        * cumulativeDistance(keyframes, pacedA, k,
                                pacedProperty) / totalDistance;
            }
        }

        // Now evently distribute other (not paced) keyframes between pacedA and
        // pacedB
        var keyframesToDistribute = (pacedB + 1 >= keyframes.length ? keyframes
                .slice(pacedA) : keyframes.slice(pacedA, end + 1));
        var distributedKeyframes = computeOffset(keyframesToDistribute,
                'distribute', pacedProperty);

        // Apply computed offset values to keyframe array
        counter = 1;
        for (var j = pacedA + 1; j <= pacedB; j++, counter++) {
            keyframes[j].computedOffset = distributedKeyframes[counter].computedOffset;
        }
    } else {
        // There's only one keyframe with paced property or none.
        // Spacing behavior degenerates to distribute spacing
        evenlyDistributeKeyframes(keyframes, start, end);
    }
    return keyframes;
}

// Returns cumulative distance cumulative distance to a keyframe end
// from paced start as calculated by applying the distance computation
// defined by the animation behavior of the paced property to the values of
// the paced property on each pair of successive paceable keyframes
// in the range [start, end]
function cumulativeDistance(keyframes, start, end, property) {
    var sum = 0;
    var previousPaced = start;
    for (var i = start + 1; i <= end; i++) {
        if (keyframes[i][property]) {
            sum += distance(keyframes[previousPaced], keyframes[i], property);
            previousPaced = i;
        }
    }
    return sum;
}

// Returns distance between two target properties as defined at
// http://w3c.github.io/web-animations/#distance-computation
// This function works for properties with scalar value only
function distance(keyframeStart, keyframeEnd, property) {
    // FIXME Probably it makes sense to add processing of non-scalar properties
    // as well
    return Math.abs(parseFloat(keyframeEnd[property])
            - parseFloat(keyframeStart[property]));
}

// Implementation of AnimationTimeline interface that represents inactive timeline
function InactiveTimeline() {
    this.currentTime = null;
    this.players = [];
}

InactiveTimeline.prototype.play = function(source) {
    var player = new AnimationPlayer(source, this);
    this.players.push(player);
    return player;
};

InactiveTimeline.prototype.getAnimationPlayers = function() {
    return players;
};


// FIXME The code below is stubs for Web Animations objects that don't
// implemented yet
// Remove all of the code below before merge it with w3c branch

// AnimationNode stub
function AnimationNode() {
    this.timing = null;
    this.computedTiming = null;
    this.parent = null;
    this.previousSibling = null;
    this.nextSibling = null;
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
    if (this.children.length > 0) {
        this.firstChild = this.children[0];
        this.lastChild = this.children[this.children.length - 1];
    } else {
        this.firstChild = null;
        this.lastChild = null;
    }
};

AnimationGroup.prototype.prepend = function() {
    for ( var i = arguments.length - 1; i >= 0; i--) {
        var node = arguments[i];
        this.children.unshift(node);
        if (node.parent) {
            var k = node.parent.children.indexOf(node);
            node.parent.children = node.parent.children.splice(k, 1);
            node.parent.updateFirstLastChild();
        }
        node.parent = this;
    }
    var prev = null;
    this.children.forEach(function(node) {
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
    for ( var i = 0; i < arguments.length; i++) {
        var node = arguments[i];
        this.children.push(node);
        if (node.parent) {
            var k = node.parent.children.indexOf(node);
            node.parent.children = node.parent.children.splice(k, 1);
            node.parent.updateFirstLastChild();
        }
        node.parent = this;
    }
    var prev = null;
    this.children.forEach(function(node) {
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

// AnimationEffect stub
function AnimationEffect() {
    this.iterationComposite = null;
    this.composite = null;
}

AnimationEffect.prototype.clone = function() {
    return this;
};

// KeyframeEffect stub
function KeyframeEffect(frames, options) {
    if (options){
        this.name = options.name;
        this.iterationComposite = options.iterationComposite;
        this.composite = options.composite;
        this.spacing = options.spacing;
    } else {
        this.name = '';
        this.iterationComposite='replace';
        this.composite = 'replace';
        this.spacing = 'distribute';
    }
}

KeyframeEffect.prototype = new AnimationEffect();

KeyframeEffect.prototype.getFrames = function() {
    return [];
};

KeyframeEffect.prototype.setFrames = function(frames) {
};
// Animation stub
function Animation(target, effect, timing) {
	this.target = target;
	this.effect = effect;
	this.timing = timing;
}

Animation.prototype = new AnimationNode();

Animation.prototype.clone = function() {
    return this;
};

// AnimationPlayer stub
function AnimationPlayer(source, timeline){
    if (source){
        this.source = source;
    } else {
        this.source = null;
    }
    if (timeline){
        this.timeline = timeline;
    } else {
        this.timeline = null;
    }
    this.playbackRate = 1.0;
    var player = this;
    var readyPromise = new Promise();
    this.ready = readyPromise;
    this.currentTime = 0;
    setTimeout(function(){
        readyPromise.resolve(player);
    }, 0);
    this.finished = new Promise();
    this.finish = function() {
        this.finished.resolve(this);
    };
    this.play = function() {};
    this.pause = function() {};
    this.cancel = function() {
        this.ready.reject(new Error('AbortError'));
        this.ready = new Promise();
        this.ready.resolve();
        this.finished.reject(new Error('AbortError'));
        this.finished = new Promise();
    };
}


// (c) copyright unscriptable.com / John Hann
// License MIT
// For more robust promises, see https://github.com/briancavalier/when.js.

function Promise () {
	this._thens = [];
}

Promise.prototype = {

	/* This is the "front end" API. */

	// then(onResolve, onReject): Code waiting for this promise uses the
	// then() method to be notified when the promise is complete. There
	// are two completion callbacks: onReject and onResolve. A more
	// robust promise implementation will also have an onProgress handler.
	then: function (onResolve, onReject) {
		// capture calls to then()
		this._thens.push({ resolve: onResolve, reject: onReject });
	},

	// Some promise implementations also have a cancel() front end API that
	// calls all of the onReject() callbacks (aka a "cancelable promise").
	// cancel: function (reason) {},

	/* This is the "back end" API. */

	// resolve(resolvedValue): The resolve() method is called when a promise
	// is resolved (duh). The resolved value (if any) is passed by the resolver
	// to this method. All waiting onResolve callbacks are called
	// and any future ones are, too, each being passed the resolved value.
	resolve: function (val) { this._complete('resolve', val); },

	// reject(exception): The reject() method is called when a promise cannot
	// be resolved. Typically, you'd pass an exception as the single parameter,
	// but any other argument, including none at all, is acceptable.
	// All waiting and all future onReject callbacks are called when reject()
	// is called and are passed the exception parameter.
	reject: function (ex) { this._complete('reject', ex); },

	// Some promises may have a progress handler. The back end API to signal a
	// progress "event" has a single parameter. The contents of this parameter
	// could be just about anything and is specific to your implementation.
	// progress: function (data) {},

	/* "Private" methods. */

	_complete: function (which, arg) {
		// switch over to sync then()
		this.then = which === 'resolve' ?
			function (resolve, reject) { resolve && resolve(arg); } :
			function (resolve, reject) { reject && reject(arg); };
		// disallow multiple calls to resolve or reject
		this.resolve = this.reject =
			function () { /*throw new Error('Promise already completed.');*/ };
		// complete all waiting (async) then()s
		var aThen, i = 0;
		while (aThen = this._thens[i++]) { aThen[which] && aThen[which](arg); }
		delete this._thens;
	}

};