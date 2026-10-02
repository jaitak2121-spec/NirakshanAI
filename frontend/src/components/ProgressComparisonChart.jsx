import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const TOOLTIP_STYLE = {
  fontSize: 12,
  borderRadius: 4,
  border: '1px solid #d5dae2',
  boxShadow: '0 1px 3px rgb(15 23 42 / 0.08)',
}

/**
 * Financial vs physical progress, side by side.
 *
 * Purely a visualization of two figures already on the record — the same two
 * values the existing progress bars show. It reinforces the Progress Mismatch
 * signal without computing anything: the signal and the risk score come from
 * the anomaly engine, never from this chart. The financial bar picks up the
 * risk-high colour only when the gap is material, matching the existing
 * ProgressBar so one colour keeps one meaning across the interface.
 */
export default function ProgressComparisonChart({ physical, financial, gapThreshold = 10 }) {
  const p = Number(physical)
  const f = Number(financial)
  if (!Number.isFinite(p) || !Number.isFinite(f)) return null

  const gap = f - p
  const material = gap > gapThreshold

  const data = [
    { name: 'Physical', value: Math.max(0, Math.min(100, p)), fill: '#4a5568' },
    { name: 'Financial', value: Math.max(0, Math.min(100, f)), fill: material ? '#c2410c' : '#8492a6' },
  ]

  return (
    <div className="mt-3 border-t border-ink-100 pt-3">
      <div className="mb-1 flex items-baseline justify-between">
        <span className="label">Financial vs physical</span>
        <span className={`tnum text-2xs font-semibold ${material ? 'text-risk-high' : 'text-ink-500'}`}>
          gap {gap > 0 ? '+' : ''}
          {gap.toFixed(0)} pp
        </span>
      </div>

      <div className="h-36">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 8, left: -24, bottom: 0 }}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: '#64748b' }}
              axisLine={{ stroke: '#d5dae2' }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tick={{ fontSize: 11, fill: '#64748b' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip formatter={(v) => [`${v}%`, 'Progress']} contentStyle={TOOLTIP_STYLE} />
            <Bar dataKey="value" radius={[2, 2, 0, 0]} maxBarSize={72}>
              {data.map((d) => (
                <Cell key={d.name} fill={d.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="mt-1 text-2xs leading-relaxed text-ink-400">
        A view of the recorded figures. The Progress Mismatch signal and the risk score are computed
        by the anomaly engine, not from this chart.
      </p>
    </div>
  )
}
