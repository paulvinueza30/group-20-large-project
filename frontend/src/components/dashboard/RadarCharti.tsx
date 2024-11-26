import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts";
import { Category } from "../../hooks/category/useCategories";

interface RadarProps {
  Pcolor: string;
  categories: Category[] | null;
}

const RadarCharti: React.FC<RadarProps> = ({ Pcolor, categories }: RadarProps) => {
  const radarData = categories?.map((category: Category) => ({
    name: category.name,
    categoryExperience: category.categoryExperience, // Ensure this is numeric
  }));

  console.log("Radar Data:", radarData); // Debugging output

  return (
    <div className="w-42 h-42 flex flex-col items-center">
      <h3 className="text-center p-2 text-lg font-bold dark:text-white">
        Decks Experience
      </h3>
      {radarData && radarData.length > 0 ? (
        <RadarChart
          width={350}
          height={300}
          outerRadius="80%"
          data={radarData}
          className="pl-2 w-10 h-10"
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="name" />
          <Radar
            dataKey="categoryExperience" // Matches radarData key
            stroke={Pcolor}
            fill={Pcolor}
            fillOpacity={0.5}
          />
        </RadarChart>
      ) : (
        <div>No data available for the radar chart</div>
      )}
    </div>
  );
};

export default RadarCharti;
