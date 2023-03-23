// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockRunData = (runID: string, outputFn: () => any) => {
  return [
    {
      url: "http://api/v0/tasks/execute",
      method: "POST",
      status: 200,
      response: {
        runID,
      },
    },
    {
      url: "http://api/v0/runs/get?id=" + runID,
      method: "GET",
      status: 200,
      response: {
        id: runID,
        status: "Succeeded",
        taskID: "unused",
      },
    },
    {
      url: "http://api/v0/runs/getOutputs?id=" + runID,
      method: "GET",
      status: 200,
      response: () => {
        return JSON.stringify({
          output: outputFn(),
        });
      },
    },
  ];
};
