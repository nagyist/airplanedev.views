import { createStyles } from "@mantine/core";
import { useState } from "react";

import { MagnifyingGlassIconMini } from "components/icon";
import { TextInputComponent as TextInput } from "components/textinput/TextInput";

import { useAsyncDebounce } from "./useAsyncDebounce";

type Props = {
  initialValue: string;
  setValue: (value: string | undefined) => void;
};

const useStyles = createStyles((theme) => {
  return {
    filterWrapper: {
      width: "200px",
      height: "2rem",
    },
  };
});

const Filter = ({ initialValue, setValue }: Props) => {
  const { classes } = useStyles();
  const [filter, setFilter] = useState(initialValue);
  const onChange = useAsyncDebounce((value: string) => {
    setValue(value || undefined);
  }, 200);

  return (
    <TextInput
      value={filter || ""}
      size="xs"
      onChange={(e) => {
        setFilter(e.target.value);
        onChange(e.target.value);
      }}
      styles={(theme) => ({
        icon: { color: theme.colors.gray[6] },
        input: {
          color: theme.colors.gray[6],
          height: "2rem",
          minHeight: "2rem",
        },
      })}
      icon={<MagnifyingGlassIconMini />}
      className={classes.filterWrapper}
      aria-label="filter"
    />
  );
};

export default Filter;
