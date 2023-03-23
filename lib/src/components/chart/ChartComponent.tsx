import { createStyles } from "@mantine/core";
import Plotly, { Data } from "plotly.js-basic-dist";
import createPlotlyComponent from "react-plotly.js/factory";

import { Heading } from "components/heading/Heading";

import { buildLayout } from "./buildLayout";
import { ChartProps } from "./Chart.types";
import { useCommonLayoutStyle } from "../layout/useCommonLayoutStyle";

const Plot = createPlotlyComponent(Plotly);

type ChartComponentProps = ChartProps & {
  normalizedData: Data[];
  onSelected?: (event: Plotly.PlotSelectionEvent) => void;
  onDeselect?: () => void;
};

const useStyles = createStyles(() => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    rowGap: "0.5rem",
  },
  title: {
    alignSelf: "center",
  },
  plot: {
    width: "100%",
    height: "100%",
  },
}));

/**
 * Presentational component. Assumes data fetching, wrangling, etc. has been handled.
 */
const ChartComponent = ({
  onSelected,
  onDeselect,
  title,
  normalizedData,
  className,
  style,
  width,
  height,
  grow,
  ...restProps
}: ChartComponentProps) => {
  const { classes, cx } = useStyles();
  const { classes: layoutClasses } = useCommonLayoutStyle({
    width,
    height,
    grow,
  });
  // Layout controls the visual aspects of the chart.
  const layout = buildLayout(restProps);

  return (
    <div style={style} className={cx(classes.wrapper, layoutClasses.style)}>
      {
        // Render title using our own component, instead of Plotly's.
        title ? (
          <Heading className={classes.title} level={2}>
            {title}
          </Heading>
        ) : null
      }
      <Plot
        onDeselect={onDeselect}
        onSelected={onSelected}
        data={normalizedData}
        layout={layout}
        useResizeHandler
        config={{
          modeBarButtonsToRemove: ["select2d", "lasso2d"],
        }}
        className={classes.plot}
      />
    </div>
  );
};

export default ChartComponent;
