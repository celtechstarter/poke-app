module.exports = {
  authenticate: jest.fn(() => (req, res, next) => next()),
};

module.exports = {
  use: jest.fn(),
  authenticate: jest.fn(() => (req, res, next) => next()),
};
