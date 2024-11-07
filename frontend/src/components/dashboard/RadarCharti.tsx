import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts";
import { useCategories } from "../../hooks/category/useCategories";

// TODO: connect to API
const RadarCharti = ({ color }: any) => {
  const { data } = useCategories();

  // Sample data
  const radarData = data?.map((category) => ({
    name: category.name,
    x: 10,
  }));

  return (
    <div className=" w-42 h-42 ">
      <h3 className="text-center p-2 text-lg font-bold dark:text-white">
        Current Level
      </h3>
      <RadarChart
        width={300}
        height={300}
        outerRadius="80%"
        data={radarData}
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
