(function (global) {
	global.utility = {
		isNoteOn: function (status) {
			return constant.status.noteOnMin <= status &&
				status <= constant.status.noteOnMax;
		},
		isNoteOff: function (status) {
			return constant.status.noteOffMin <= status &&
				status <= constant.status.noteOffMax;
		},
		isNoteOnOrOff: function (status) {
			return utility.isNoteOn(status) || utility.isNoteOff(status);
		},
		// Is the note one of the designated modifier buttons
		isModifier: function (note) {
			return _.contains(constant.note.modifiers, note);
		},
		
	};
}(this));