import { useState } from "react";

interface FilterByAreaProps {
  onFilter: (area: string | null) => void;
}

const FilterByArea = ({ onFilter }: FilterByAreaProps) => {
  const [selectedArea, setSelectedArea] = useState<string | null>(null);

  const handleAreaChange = (area: string) => {
    setSelectedArea(area);
    onFilter(area); // Gọi hàm lọc khi chọn diện tích
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Lọc theo diện tích</h2>
      <div className="space-y-2">
        <div
          onClick={() => handleAreaChange("10-12")}
          className={`cursor-pointer p-2 rounded-md ${selectedArea === "10-12" ? "bg-sky-500 text-white" : "hover:bg-slate-200"}`}
        >
          10-12 m²
        </div>
        <div
          onClick={() => handleAreaChange("15-20")}
          className={`cursor-pointer p-2 rounded-md ${selectedArea === "15-20" ? "bg-sky-500 text-white" : "hover:bg-slate-200"}`}
        >
          15-20 m²
        </div>
        <div
          onClick={() => handleAreaChange("20-25")}
          className={`cursor-pointer p-2 rounded-md ${selectedArea === "20-25" ? "bg-sky-500 text-white" : "hover:bg-slate-200"}`}
        >
          20-25 m²
        </div>
        <div
          onClick={() => handleAreaChange("30-40")}
          className={`cursor-pointer p-2 rounded-md ${selectedArea === "30-40" ? "bg-sky-500 text-white" : "hover:bg-slate-200"}`}
        >
          30-40 m²
        </div>
        <div
          onClick={() => handleAreaChange("40-50")}
          className={`cursor-pointer p-2 rounded-md ${selectedArea === "40-50" ? "bg-sky-500 text-white" : "hover:bg-slate-200"}`}
        >
          40-50 m²
        </div>
        <div
          onClick={() => handleAreaChange("")}
          className={`cursor-pointer p-2 rounded-md ${selectedArea === null ? "bg-sky-500 text-white" : "hover:bg-slate-200"}`}
        >
          Tất cả diện tích
        </div>
      </div>
    </div>
  );
};

export default FilterByArea;
