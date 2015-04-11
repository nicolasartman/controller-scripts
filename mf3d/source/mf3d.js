var state = {
	transportIsPlaying: false,
	// Modifiers
	modifiers: {}, // private internal state storage
	enableModifier: function (modifier) {
		state.modifiers[modifier] = true;
		view.setArcadeButton(modifier, constant.modifierColors[modifier]);
	},
	disableModifier: function (modifier) {
		state.modifiers[modifier] = false;
		view.clearArcadeButton(modifier);
	},
	modifierIsEnabled: function (modifier) {
		return state.modifiers[modifier];
	}
};

var console = {
	log: function () {
		var args = _.toArray(arguments);
		println(args.join(', '));
	}
};

function flush() {
	view.render();
};


function handleModifier(status, note) {
	console.log('one');
	if (utility.isModifier(note)) {
		console.log('two');
		if (utility.isNoteOn(status)) {
			console.log('three');
			state.enableModifier(note);
		} else if (utility.isNoteOff(status)) {
			state.disableModifier(note);
		}
	}
}

function handleMidiInput(status, data1, data2) {
	var outPort = host.getMidiOutPort(0);

	println('received midi message: ' + status + ' ' + data1 + ' ' + data2);
	
	var note = data1;
	var color = constant.color.blue;
	var animation = constant.animation.flash.eighth;

	if (utility.isNoteOnOrOff(status)) {
		handleModifier(status, data1);
	}
}

function init() {
	host.getMidiInPort(0).setMidiCallback(handleMidiInput);
	global.transport = host.createTransport();

	global.transport.addIsPlayingObserver(function (isPlaying) {
		console.log('isPlaying', isPlaying);
		
		// If going from stopped to playing, reset the midi on the midi fighter
		if (!global.state.transportIsPlaying && isPlaying) {
			// TODO: something
		}
		
		// Update state
		global.state.transportIsPlaying = isPlaying;
	});
	
}

function exit() {
	println('exiting...goodbye!');
}
