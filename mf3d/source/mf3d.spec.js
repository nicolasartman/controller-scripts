// Not hooked up yet, ignore for now
describe('The MF3D Script', function() {
  it('can convert a button grid representation into the correct note number', function () {
		var grid = [
			0,1,0,0,
			0,0,0,0,
			0,0,0,0,
			0,0,0,0
		];
    expect(getNote(grid)).toEqual(37);
  });
});