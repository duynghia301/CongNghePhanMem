"use client";
import { BiSearch } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

const Search = () => {
  const [value, setValue] = useState(""); // Giá trị tìm kiếm
  const [searchType, setSearchType] = useState("address"); // Loại tìm kiếm, mặc định là địa chỉ
  const [selectedArea, setSelectedArea] = useState<string | null>(null); // Chỉ chứa một diện tích
  const [isAreaMenuOpen, setIsAreaMenuOpen] = useState(false); // Quản lý trạng thái của bảng diện tích
  const debounceValue = useDebounce(value); // Để giảm thiểu số lần gọi API khi nhập
  const searchParams = useSearchParams(); // Lấy tham số tìm kiếm từ URL
  const router = useRouter(); // Để điều hướng URL
  const pathname = usePathname(); // Để lấy pathname hiện tại
  const currentCategoryId = searchParams?.get("categoryId"); // Lấy categoryId từ URL nếu có

  // Hàm xử lý thay đổi diện tích (chỉ chọn một diện tích duy nhất)
  const handleAreaChange = (area: string) => {
    setSelectedArea(selectedArea === area ? null : area); // Bỏ chọn nếu diện tích đã chọn, ngược lại chọn diện tích
  };

  useEffect(() => {
    const queryParams: any = {
      categoryId: currentCategoryId,
      [searchType]: debounceValue, // Tìm kiếm theo address hoặc name
      roomArea: selectedArea, // Truyền diện tích đã chọn
    };

    // Kiểm tra nếu đang tìm kiếm theo địa chỉ và có giá trị nhập vào
    if (searchType === "address" && debounceValue.trim() === "") {
      delete queryParams[searchType]; // Nếu không có giá trị tìm kiếm, không gửi tham số address
    }

    const url = qs.stringifyUrl(
      {
        url: pathname || "",
        query: queryParams,
      },
      { skipNull: true, skipEmptyString: true }
    );

    // Cập nhật URL khi giá trị tìm kiếm thay đổi
    router.push(url);
  }, [debounceValue, selectedArea, searchType, currentCategoryId, router, pathname]);

  return (
    <div className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer flex items-center bg-white">
      <input
        type="text"
        placeholder="Keyword"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="text-sm font-semibold px-6 flex-1 outline-none"
      />
      <div
        onClick={() => setSearchType(searchType === "address" ? "name" : "address")}
        className="text-sm font-semibold px-6 border-x-[1px] cursor-pointer"
      >
        {searchType === "address" &&" name" ? "Địa chỉ" : "Tên bài đăng"}
      </div>

      {/* Chọn diện tích (bảng dropdown mở khi nhấp vào) */}
      <div
        onMouseEnter={() => setIsAreaMenuOpen(true)} // Mở dropdown khi di chuột vào
        onMouseLeave={() => setIsAreaMenuOpen(false)} // Đóng dropdown khi chuột rời ngoài
        className="relative"
      >
        <div
          className="text-sm font-semibold px-6 border-x-[20px] cursor-pointer"
        >
          {selectedArea ? selectedArea : "Select Area"}
        </div>

        {isAreaMenuOpen && (
          <div
            className="absolute z-10 bg-white border rounded-md mt-1 w-full shadow-lg"
            onMouseEnter={() => setIsAreaMenuOpen(true)} // Mở lại menu nếu chuột vào dropdown
            onMouseLeave={() => setIsAreaMenuOpen(false)} // Đóng menu khi chuột rời khỏi dropdown
          >
            <div className="text-sm font-semibold px-6 py-2 cursor-pointer">
              <div className="flex flex-col">
                {/* Các ô diện tích theo hàng dọc */}
                <div
                  onClick={() => handleAreaChange("10-12")}
                  className={`p-2 cursor-pointer ${selectedArea === "10-12" ? "bg-sky-500 text-white" : "hover:bg-slate-200"}`}
                >
                  10-12
                </div>
                <div
                  onClick={() => handleAreaChange("15-20")}
                  className={`p-2 cursor-pointer ${selectedArea === "15-20" ? "bg-sky-500 text-white" : "hover:bg-slate-200"}`}
                >
                  15-20
                </div>
                <div
                  onClick={() => handleAreaChange("20-25")}
                  className={`p-2 cursor-pointer ${selectedArea === "20-25" ? "bg-sky-500 text-white" : "hover:bg-slate-200"}`}
                >
                  20-25
                </div>
                <div
                  onClick={() => handleAreaChange("30-40")}
                  className={`p-2 cursor-pointer ${selectedArea === "30-40" ? "bg-sky-500 text-white" : "hover:bg-slate-200"}`}
                >
                  30-40
                </div>
                <div
                  onClick={() => handleAreaChange("40-50")}
                  className={`p-2 cursor-pointer ${selectedArea === "40-50" ? "bg-sky-500 text-white" : "hover:bg-slate-200"}`}
                >
                  40-50
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Nút tìm kiếm */}
      <div
        onClick={() => {
          // Trigger the search action if necessary (you can also handle this in useEffect)
          console.log("Searching for:", debounceValue, searchType, selectedArea);
        }}
        className="bg-rose-500 text-white p-2 rounded-full cursor-pointer"
      >
        <BiSearch size={18} />
      </div>
    </div>
  );
};

export default Search;
