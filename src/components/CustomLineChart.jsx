import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import moment from "moment";

const PRIMARY = "#0077CC";

/* -------------------- CUSTOM TOOLTIP -------------------- */
const CustomTooltip = ({ active, payload, labelName }) => {
  if (!active || !payload?.length) return null;

  const { date, value, incomes } = payload[0].payload;

  return (
    <div className="bg-white rounded-xl px-4 py-3 shadow-xl text-sm min-w-60">
      {/* Date */}
      <p className="font-semibold mb-1">
        {moment(date).format("Do MMM YYYY")}
      </p>

      {/* Chart label */}
      <p className="text-xs text-gray-500 mb-1">{labelName}</p>

      {/* Total */}
      <p className="font-semibold text-primary mb-2">
        Total: ₹{value.toLocaleString("en-IN")}
      </p>

      {/* Income list */}
      <div className="space-y-1">
        {incomes?.map((inc, idx) => (
          <div
            key={idx}
            className="flex justify-between text-xs text-gray-700"
          >
            <span>
              {inc.name}
              <span className="text-gray-400"> · {inc.category}</span>
            </span>
            <span>₹{inc.amount.toLocaleString("en-IN")}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------- CHART COMPONENT -------------------- */
const CustomLineChart = ({ data = [], labelName = "Income" }) => {
  if (!data.length) {
    return (
      <div className="text-center text-sm text-gray-400 py-10">
        No data available
      </div>
    );
  }

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>
          {/* Gradient */}
          <defs>
            <linearGradient id="incomeShadow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={PRIMARY} stopOpacity={0.3} />
              <stop offset="30%" stopColor={PRIMARY} stopOpacity={0.12} />
              <stop offset="100%" stopColor={PRIMARY} stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Grid */}
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            opacity={0.15}
          />

          {/* X Axis */}
          <XAxis
            dataKey="date"
            tickFormatter={(d) => moment(d).format("Do MMM")}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />

          {/* Y Axis */}
          <YAxis
            domain={[0, (max) => Math.ceil(max / 15000) * 15000]}
            tickCount={5}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />

          {/* Tooltip */}
          <Tooltip
            content={(props) => (
              <CustomTooltip {...props} labelName={labelName} />
            )}
          />

          {/* Area */}
          <Area
            type="monotone"
            dataKey="value"
            stroke={PRIMARY}
            strokeWidth={3}
            fill="url(#incomeShadow)"
            dot={{
              r: 4,
              strokeWidth: 2,
              fill: "#fff",
              stroke: PRIMARY,
            }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
