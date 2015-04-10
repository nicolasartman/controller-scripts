var global = this;

loadAPI(1);

host.defineController('djtechtools', 'mf3d', '0.2', 'd2e93c80-da7f-11e4-8830-0800200c9a66');

host.defineMidiPorts(1, 1);


host.addDeviceNameBasedDiscoveryPair(["Midi Fighter 3D"], ["Midi Fighter 3D"]);

load('source/lodash.js');

// The core script and supporting libraries
load('source/constants.js');
load('source/mf3d.js');