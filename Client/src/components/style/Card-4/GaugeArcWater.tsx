import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import "./GaugeArcWater.css";

interface ArcDesignProps {
  value: number;
}

export default function ArcDesign({ value }: ArcDesignProps) {
  return (
    <div className="gaugeArc">
      <Gauge
        width={150}
        height={130}
        value={value}
        text={value + " L"}
        cornerRadius="50%"
        sx={(theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 25,
            [`text`]: {
              fill: "white",
            },
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: "#ffffff",
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: theme.palette.text.disabled,
          },
        })}
      />
    </div>
  );
}
