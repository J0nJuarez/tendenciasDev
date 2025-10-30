import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';

export type PieDatum = { name: string; value: number; fill?: string };

const defaultData: PieDatum[] = [
  { name: 'Group A', value: 400, fill: '#0088FE' },
  { name: 'Group B', value: 300, fill: '#00C49F' },
  { name: 'Group C', value: 300, fill: '#FFBB28' },
  { name: 'Group D', value: 200, fill: '#FF8042' },
];

const colors = ["#8884d8", "#82ca9d", "#ff7300", "#413ea0", "#00C49F", "#FFBB28", "#FF8042", "#0088FE", "#A28FD0", "#E67E22"]


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
  // construir fills usando entry.fill si existe, sino tomar del array colors (rotando)
  const fills = (data || []).map((entry, i) => entry.fill ?? colors[i % colors.length])

  // payload explícito para que la leyenda muestre los mismos colores
  const legendPayload = (data || []).map((entry, i) => ({
    value: entry.name,
    type: 'square' as const,
    color: fills[i],
  }))

  return (
    <div style={{ width: '100%', maxWidth, maxHeight: '80vh' }}>
      <ResponsiveContainer width="100%" aspect={1}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            cornerRadius={cornerRadius}
            paddingAngle={paddingAngle}
            isAnimationActive={isAnimationActive}
          >
            {(data || []).map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={fills[index]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend payload={legendPayload} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PieChartWithPaddingAngle;
