import { createStyles, HoverCard } from "@mantine/core";
import { useState, useLayoutEffect, RefObject, useRef } from "react";

import { Label } from "components/text/Text";
import { FontWeight } from "components/theme/typography";

// Modified from https://www.robinwieruch.de/react-custom-hook-check-if-overflow/
export const useIsOverflow = (ref: RefObject<HTMLElement>) => {
  const [isOverflow, setIsOverflow] = useState<boolean | undefined>(undefined);

  useLayoutEffect(() => {
    const { current } = ref;

    const trigger = () => {
      const hasOverflow = current!.scrollWidth > current!.clientWidth;
      setIsOverflow(hasOverflow);
    };

    if (current) {
      trigger();
      if ("ResizeObserver" in window) {
        new ResizeObserver(trigger).observe(current);
        new ResizeObserver(trigger).observe(document.body);
      }
    }
  }, [ref]);

  return isOverflow;
};

const useStyles = createStyles(() => {
  return {
    truncate: {
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
    wrap: {
      overflowWrap: "break-word",
      overflow: "hidden",
    },
  };
});

type OverflowTextProps = {
  className?: string;
  wrap?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  weight?: FontWeight;
};

export const OverflowText = ({
  className,
  value,
  wrap,
  weight,
}: OverflowTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isOverflow = useIsOverflow(ref);
  const { classes, cx } = useStyles();
  const target = (
    <Label
      ref={ref}
      size="md"
      className={cx(wrap ? classes.wrap : classes.truncate, className)}
      weight={weight}
    >
      {value}
    </Label>
  );
  return (
    <HoverCard
      position="right-start"
      shadow="sm"
      radius={4}
      transitionDuration={300}
      openDelay={300}
      withinPortal
    >
      <HoverCard.Target>{target}</HoverCard.Target>
      {isOverflow && (
        <HoverCard.Dropdown>
          <Label size="sm">{value}</Label>
        </HoverCard.Dropdown>
      )}
    </HoverCard>
  );
};
