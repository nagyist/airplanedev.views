export const getIsLocalDev = () => {
  return !process.env["AIRPLANE_DEPLOYMENT_ID"];
};
