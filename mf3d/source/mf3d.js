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
	if (utility.isModifier(note)) {
		if (utility.isNoteOn(status)) {
			state.enableModifier(note);
		} else if (utility.isNoteOff(status)) {
			state.disableModifier(note);
		}
	}
}

function handleAction(status, note) {
	if (utility.isAction(note)) {
		var coordinates = utility.getCoordinatesForNote(note);
		if (utility.isNoteOn(status)) {
			view.setArcadeButton(note, constant.color.purple);
			console.log('coords', JSON.stringify(coordinates));
			global.clipLaunchers[coordinates.x].select(coordinates.y);
		} else if (utility.isNoteOff(status)) {
			view.clearArcadeButton(note);
		}
	}
}

function handleMidiInput(status, data1, data2) {
	var outPort = host.getMidiOutPort(0);

	if (utility.isNoteOn(status)) {
		console.log('received note on: ', status, data1, data2);
	}

	var note = data1;
	var color = constant.color.blue;
	var animation = constant.animation.flash.eighth;

	if (utility.isNoteOnOrOff(status)) {
		handleModifier(status, data1);
		handleAction(status, data1);
	}
}

function init() {
	host.getMidiInPort(0).setMidiCallback(handleMidiInput);
	global.transport = host.createTransport();
	var trackBank = host.createMainTrackBank(4, 2, 3);

	global.clipLaunchers = _.map(_.range(0,4), function (trackNumber) {
		return trackBank.getTrack(trackNumber).getClipLauncherSlots();
	});

	_.each(clipLaunchers, function (launcher) {
		launcher.setIndication(true);
	});

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
