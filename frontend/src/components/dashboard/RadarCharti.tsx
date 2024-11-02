import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts";

const RadarCharti = ({ color }: any) => {
  // Sample data
  const data = [
    { name: "A", x: 21 },
    { name: "B", x: 22 },
    { name: "C", x: -32 },
    { name: "D", x: -14 },
    { name: "E", x: -51 },
    { name: "F", x: 59 },
  ];

  return (
    <div className=" w-42 h-42 ">
      <h3 className="text-center p-2 text-lg font-bold">Current Level</h3>
      <RadarChart
        width={300}
        height={300}
        outerRadius="80%"
        data={data}
        className="pl-2 w-10 h-10"
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <Radar dataKey="x" stroke={color} fill={color} fillOpacity={0.5} />
      </RadarChart>
    </div>
  );
};

export default RadarCharti;
