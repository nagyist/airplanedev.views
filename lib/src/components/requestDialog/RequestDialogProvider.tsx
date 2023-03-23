import { useState } from "react";
import * as React from "react";

import { DefaultParams } from "client";
import { RequestRunnableDialog } from "components/requestDialog/RequestRunnableDialog";

type RequestDialogContextType = {
  setState: (state: {
    params: DefaultParams;
    taskSlug?: string;
    runbookSlug?: string;
    opened: boolean;
  }) => void;
};

const defaultContext: RequestDialogContextType = {
  setState: () => {
    // Empty
  },
};

export const RequestDialogContext = React.createContext(defaultContext);

export const RequestDialogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<{
    params: DefaultParams;
    taskSlug?: string;
    runbookSlug?: string;
    opened: boolean;
  }>({ params: {}, opened: false });
  const { params, taskSlug, runbookSlug, opened } = state;

  return (
    <RequestDialogContext.Provider
      value={{
        setState,
      }}
    >
      {children}
      {(taskSlug || runbookSlug) && (
        <RequestRunnableDialog
          opened={opened}
          onSubmit={() => setState({ ...state, opened: false })}
          onClose={() => setState({ ...state, opened: false })}
          taskSlug={taskSlug}
          runbookSlug={runbookSlug}
          paramValues={params || {}}
        />
      )}
    </RequestDialogContext.Provider>
  );
};
