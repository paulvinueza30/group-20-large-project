import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts";
import { useCategories } from "../../hooks/category/useCategories";
import { Category } from "../../hooks/category/useCategories";

interface RadarProps {
  Pcolor: string;
  categories: Category[] | null; // Use the imported Category interface
}

// TODO: connect to API
const RadarCharti: React.FC<RadarProps> = ({ Pcolor, categories }: any) => {
  // const { data } = useCategories(true);

  const radarData = categories?.map((category: any) => ({
    name: category.name,
    x: category.experience,
  }));

  return (
    <div className=" w-42 h-42 flex flex-col items-center">
      <h3 className="text-center p-2 text-lg font-bold dark:text-white">
        Current Level
      </h3>
      <RadarChart
        width={350}
        height={300}
        outerRadius="80%"
        data={radarData}
        className="pl-2 w-10 h-10"
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="name" />
        <Radar dataKey="x" stroke={Pcolor} fill={Pcolor} fillOpacity={0.5} />
      </RadarChart>
    </div>
  );
};

export default RadarCharti;
