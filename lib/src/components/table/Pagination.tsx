import { ActionIcon, createStyles, Text } from "@mantine/core";

import { ChevronRightIconMini, ChevronLeftIconMini } from "components/icon";

const useStyles = createStyles((theme) => {
  return {
    wrapper: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      "> *": {
        marginLeft: theme.spacing.xs,
      },
    },
    arrowWrapper: {
      display: "flex",
    },
    arrowButton: {
      color: theme.colors.gray[6],

      "&:disabled": {
        color: theme.colors.gray[4],
        background: "none",
        border: "none",
      },
    },
  };
});

type PaginationProps = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onNext: () => void;
  onPrev: () => void;
  pageIndex: number;
  pageSize: number;
  total: number;
};

export const Pagination = ({
  hasNextPage,
  hasPrevPage,
  onNext,
  onPrev,
  pageIndex,
  pageSize,
  total,
}: PaginationProps) => {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <PageInfo pageIndex={pageIndex} pageSize={pageSize} total={total} />
      <div className={classes.arrowWrapper}>
        <ActionIcon
          className={classes.arrowButton}
          onClick={onPrev}
          disabled={!hasPrevPage}
          aria-label="previous"
          size="sm"
        >
          <ChevronLeftIconMini />
        </ActionIcon>
        <ActionIcon
          className={classes.arrowButton}
          onClick={onNext}
          disabled={!hasNextPage}
          aria-label="next"
          size="sm"
        >
          <ChevronRightIconMini />
        </ActionIcon>
      </div>
    </div>
  );
};

interface PageInfoProps {
  pageIndex: number;
  pageSize: number;
  total: number;
}

const PageInfo = ({ pageIndex, pageSize: limit, total }: PageInfoProps) => {
  if (total === 0) {
    return (
      <Text
        size={10}
        sx={(theme) => ({
          color: theme.colors.gray[5],
          fontWeight: 500,
        })}
      >
        No results
      </Text>
    );
  }
  const startItemNum = pageIndex * limit + 1;
  const endItemNum = Math.min(startItemNum + limit - 1, total);
  return (
    <Text
      size={10}
      sx={(theme) => ({
        color: theme.colors.gray[5],
        fontWeight: 500,
      })}
    >
      {startItemNum} – {endItemNum} of {total}
    </Text>
  );
};
