const stats = require('./stats');

describe('stats', () => {
  it('gets maximum value', () => {
    expect(stats.max([1, 2, 3, 4])).toBe(4);
  });

  it('gets minimum value', () => {
    expect(stats.min([1, 2, 3, 4])).toBe(1);
  });

  it('gets average value', () => {
    expect(stats.avg([1, 2, 3, 4, 5])).toBe(3);
  });

  describe('median', () => {
    it('gets the median for odd length', () => {
      expect(stats.median([2, 3, 1, 5, 4])).toBe(3);
    });
    it('gets median for even length', () => {
      expect(stats.median([1, 10, 90, 100])).toBe(50);
    });
  });

  describe('mode', () => {
    it('has one mode', () => {
      expect(stats.mode([1, 2, 2, 2, 3])).toBe(2);
    });
    it('has no mode', () => {
      expect(stats.mode([1, 2, 3])).toBe(null);
    });
    it('has multiple mode', () => {
      expect(stats.mode([1, 2, 2, 3, 3, 4])).toEqual([2, 3]);
    });
  });
});
