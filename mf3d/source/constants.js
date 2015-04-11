(function (global) {
	global.constant = {};
	
	global.constant.color = {
		none: 0,
		red: 13,
		lowRed: 19,
		orange: 25,
		lowOrange: 31,
		yellow: 37,
		lowYellow: 43,
		lime: 49,
		lowLime: 55,
		green: 61,
		lowGreen: 67,
		cyan: 73,
		lowCyan: 79,
		blue: 85,
		lowBlue: 91,
		purple: 97,
		lowPurple: 103,
		pink: 109,
		lowPink: 115,
		white: 121,
		black: 127
	};

	global.constant.status = {
		modeButton: {
			on: 147,
			off: 131
		},
		arcadeButton: {
			on: 146,
			off: 130
		},
		animation: {
			on: 147,
			off: 131
		},
		noteOnMin: 144,
		noteOnMax: 159,
		noteOffMin: 128,
		noteOffMax: 143
	};
	
	global.constant.note = {
		modifier: {
			command: 36,
			option: 37,
			control: 38,
			shift: 39
		},
		// The base midi note number that the mf3d starts from
		base: 36,
		// The number of primary arcade buttons in the main grid
		arcadeButtonCount: 16
	};
	
	// Just a list of all the modifiers
	constant.note.modifiers = [
		global.constant.note.modifier.command,
		global.constant.note.modifier.option,
		global.constant.note.modifier.control,
		global.constant.note.modifier.shift
	];
	
	constant.modifierColors = {};
	constant.modifierColors[global.constant.note.modifier.command] = constant.color.lowCyan;
	constant.modifierColors[global.constant.note.modifier.option] = constant.color.lowOrange;
	constant.modifierColors[global.constant.note.modifier.control] = constant.color.lowGreen;
	constant.modifierColors[global.constant.note.modifier.shift] = constant.color.lowYellow;
		
	global.constant.animation = {
		none: 0,
		// Gated (flashing) color rate
		flash: {
			fourBar: 34,
			twoBar: 35,
			wholeNote: 36,
			halfNote: 37,
			quarterNote: 38,
			eighthNote: 39,
			sixteenthNote: 40,
			thirdySecondNote: 41
		},		
		pulse: {
		
		},
	};
	
	// 16 brightness levels for the color of the button
	global.constant.brightness = [
		24,
		25,
		26,
		27,
		28,
		29,
		30,
		31,
		32,
		33,
		34,
		35,
		36,
		37,
		38,
		39
	];

}(this));
