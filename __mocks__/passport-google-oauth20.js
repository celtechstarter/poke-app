module.exports = {
    Strategy: jest.fn().mockImplementation((options, verify) => ({
      name: "google",
      authenticate: jest.fn(),
    })),
  };
  