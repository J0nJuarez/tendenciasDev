import { Pie, PieChart } from 'recharts';

export type PieDatum = { name: string; value: number; fill?: string };

const defaultData: PieDatum[] = [
  { name: 'Group A', value: 400, fill: '#0088FE' },
  { name: 'Group B', value: 300, fill: '#00C49F' },
  { name: 'Group C', value: 300, fill: '#FFBB28' },
  { name: 'Group D', value: 200, fill: '#FF8042' },
];

export type Props = {
  data?: PieDatum[];
  isAnimationActive?: boolean;
  maxWidth?: string | number;
  innerRadius?: string | number;
  outerRadius?: string | number;
  paddingAngle?: number;
  cornerRadius?: string | number;
};

export function PieChartWithPaddingAngle({
  data = defaultData,
  isAnimationActive = true,
  maxWidth = '500px',
  innerRadius = '80%',
  outerRadius = '100%',
  paddingAngle = 5,
  cornerRadius = '50%',
}: Props) {
  return (
    <PieChart style={{ width: '100%', maxWidth, maxHeight: '80vh', aspectRatio: 1 }} responsive>
      <Pie
        data={data}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        cornerRadius={cornerRadius}
        fill="#8884d8"
        paddingAngle={paddingAngle}
        dataKey="value"
        isAnimationActive={isAnimationActive}
      />
    </PieChart>
  );
}

export default PieChartWithPaddingAngle;
