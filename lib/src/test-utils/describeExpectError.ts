/**
 * Convenience function for tests that expect an error to be thrown.
 *
 * This suppresses the expected error from being logged to the console.
 */
export const describeExpectError = (fn: () => void) => {
  describe("handles errors", () => {
    beforeEach(() => {
      jest.spyOn(console, "error").mockImplementation();
      jest.spyOn(console, "warn").mockImplementation();
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    fn();
  });
};
