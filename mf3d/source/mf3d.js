var state = {
	transportIsPlaying: false,
	// Modifiers
	modifiers: {}, // private internal state storage
	enableModifier: function (modifier) {
		state.modifiers[modifier] = true;
	},
	disableModifier: function (modifier) {
			state.modifiers[modifier] = false;
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

// TODO: implement dirty tracking
function flush() {
	console.log('flushing');
	_.each(constant.note.modifiers, function (modifier) {
		if (state.modifiers[modifier]) {
			host.getMidiOutPort(0).sendMidi(constant.status.button.on,
					modifier, constant.modifierColors[modifier]);
		} else {
			host.getMidiOutPort(0).sendMidi(constant.status.button.off,
				modifier, constant.color.none);			
		}
	});
};


function handleModifier(status, note) {
	if (_.contains(constant.note.modifiers, note)) {
		if (status === constant.status.button.on) {
			state.enableModifier(note);
		} else if (status === constant.status.button.off) {
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

	if (_.contains([constant.status.button.on, constant.status.button.off], status)) {
		handleModifier(status, data1);
	}

	// if (status === constant.status.button.on) {
	// 	outPort.sendMidi(constant.status.animation.on, note, constant.animation.flash.halfNote);
	// 	outPort.sendMidi(constant.status.button.on, note, constant.color.lowBlue);
	// } else if (constant.status.button.off) {
	// 	outPort.sendMidi(constant.status.animation.off, note, 0);
	// 	outPort.sendMidi(constant.status.button.on, note, 0);
	// }
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
