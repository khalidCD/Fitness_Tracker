import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from "@mui/x-charts/Gauge";
import "./GaugeCard.css";

function GaugePointer({ color }: { color: string }) {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();
  if (valueAngle === null) return null;

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };

  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill={color} />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke={color}
        strokeWidth={2}
      />
    </g>
  );
}

export default function GaugeCard() {
  return (
    <div className="gauge-card">
      <GaugeContainer
        width={200}
        height={150}
        startAngle={-100}
        endAngle={100}
        value={70} 
      >
        <GaugeReferenceArc />
        <GaugeValueArc />
        <GaugePointer color="#ff2929" /> 
      </GaugeContainer>
      <p className="gauge-text">Today</p>
    </div>
  );
}
