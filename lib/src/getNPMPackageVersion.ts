export const getNPMPackageVersion = () => {
  // We expect __VIEWS_LIB_VERSION__ to be filled out by vite, but
  // in cases where it might not be (e.g. unit tests), we return a placeholder string.
  try {
    return __VIEWS_LIB_VERSION__;
  } catch (e) {
    if (e instanceof ReferenceError) {
      return "(unknown)";
    }
    throw e;
  }
};
