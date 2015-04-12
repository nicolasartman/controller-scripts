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
		// An action button is any of the 12 non-modifier arcade buttons
		isAction: function (note) {
			return constant.note.actionButtonMin <= note &&
				note <= constant.note.actionButtonMax
		},
		// Returns which of the 4 columns on the mf the button corresponds to
		// as an object with x and y properties for the positions
		getCoordinatesForNote: function (note) {
			return {
				x: note % 4,
				y: 3 - Math.floor((note - constant.note.base) / 4)
			};
		},
		getNoteForCoordinates: function (coordinates) {
			return constant.note.base +
				// X offset
				coordinates.x +
				// Y offset
				constant.note.base + 4 * (3 - coordinates.y)
		}
	};
}(this));