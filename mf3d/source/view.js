(function (global) {
	var arcadeButtonStateChanged = {};
	var modeButtonStateChanged = {};
	var arcadeButtonStates = {};
	var modeButtonStates = {};
		
	var resetChangeTracking = function () {
		arcadeButtonStateChanged = {};
		modeButtonStateChanged = {};
	};
	
	// Main buttons start in the top left and go down and right, like so
	// (o are arcade buttons, - are the top 4 mode buttons)
	//
	//     0 1 2 3
	//
	// 0   o o o o
	// 1   o o o o
	// 2   o o o o
	// 3   o o o o
	//
	// so the lower left button would have coordinates 0, 3, or {x:0, y:3}
	global.view = {
		setArcadeButton: function (buttonCoordinatePairOrNote, color, animation) {
			var note = buttonCoordinatePairOrNote;

			if (_.isObject(buttonCoordinatePairOrNote)) {
				note = utility.getNoteForCoordinates(buttonCoordinatePairOrNote);
			}

			// Verify the note is valid and bail if it's not
			if (!(constant.note.base <= note &&
				note <= constant.note.base + constant.note.arcadeButtonCount)) {
				
				console.log("ERROR: invalid note sent to view", JSON.stringify(note));
				return;
			}

			var newState = {
				status: color === constant.color.none ?
						constant.status.arcadeButton.off : constant.status.arcadeButton.on,
				note: note,
				color: color
			};
			if (animation || animation === constant.animation.none) {
				newState.animation = animation;
				newState.animationStatus = animation === constant.animation.none ?
						constant.status.animation.off : constant.status.animation.on
			}
			if (!_.isEqual(arcadeButtonStates[note], newState)) {
				// Merge the new state into the existing state,
				// in case multiple state changes occur before a render.
				newState = _.extend({}, arcadeButtonStates[note], newState);
				arcadeButtonStateChanged[note] = true;
			}
			arcadeButtonStates[note] = newState;
		},
		clearArcadeButton: function (buttonCoordinatePairOrNote) {
			global.view.setArcadeButton(buttonCoordinatePairOrNote,
				constant.color.none, constant.animation.none);
		},
		// Convenience method for clearing all buttons. This also clears modifiers.
		clearAllArcadeButtons: function () {
			_.each(_.range(constant.note.base, constant.note.arcadeButtonCount), function (note) {
				global.view.clearArcadeButton(note);				
			});
		},
		// Sets a mode button to on or off
		// Mode buttons are 0 through 3 from left to right
		// true sets it to on, false sets it to off
		setModeButton: function (buttonNumber, on) {
			// To be consistent, a missing status arg (`on`) is
			// considered a "turn on" command
			var on = on !== false;
			var newState = {
				note: buttonNumber,
				status: on ? constant.status.modeButton.on : constant.status.modeButton.off
			}
			if (!_.isEqual(modeButtonStates[buttonNumber], newState)) {
				modeButtonStateChanged[buttonNumber] = true;
			}
			modeButtonStates[buttonNumber] = newState;
		},
		// Sets 
		clearModeButton: function (buttonNumber) {
			global.view.setModeButton(buttonNumber, false);
		},
		// Update the controller for all buttons that have changed state
		render: function () {
			console.log('=== render called');
			// Update the arcade buttons
			_.each(arcadeButtonStates, function (state) {
				if (arcadeButtonStateChanged[state.note]) {
					console.log('sending updated state: ', JSON.stringify(state));
					this.host.getMidiOutPort(0).sendMidi(state.status,
						state.note, state.color);
					if (_.has(state, 'animation')) {
						this.host.getMidiOutPort(0).sendMidi(state.animationStatus,
							state.note, state.animation);
					}
				}
			});
			// Update the mode buttons
			_.each(modeButtonStates, function (state) {
					console.log('sending updated modifier state for', state.note);
					this.host.getMidiOutPort(0).sendMidi(state.status,
						state.note);				
			});
			resetChangeTracking();
			console.log('=== render complete');
		}
	}
}(this));