interface LocationData {
    [key: string]: {
      districts: {
        [key: string]: string[];
      };
    };
  }
  
  const vietnamLocationData: LocationData = {
    "Hà Nội": {
      districts: {
        "Ba Đình": ["Phố Đội Cấn", "Phố Kim Mã"],
        "Hoàn Kiếm": ["Phố Bà Triệu", "Phố Hàng Bông"],
        "Tây Hồ": ["Phố Xuân Diệu", "Phố Tô Ngọc Vân"],
      },
    },
    "Hồ Chí Minh": {
      districts: {
        "Quận 1": ["Đường Nguyễn Huệ", "Đường Đồng Khởi"],
        "Quận 3": ["Đường Võ Thị Sáu", "Đường Lê Văn Sỹ"],
        "Quận 7": ["Đường Nguyễn Thị Thập", "Đường Huỳnh Tấn Phát"],
      },
    },
    "Đà Nẵng": {
      districts: {
        "Hải Châu": ["Đường Lê Duẩn", "Đường Nguyễn Văn Linh"],
        "Thanh Khê": ["Đường Trần Phú", "Đường Điện Biên Phủ"],
        "Sơn Trà": ["Đường Võ Nguyên Giáp", "Đường Ngô Quyền"],
      },
    },
  };
  
  export const getCities = async (): Promise<string[]> => {
    return Object.keys(vietnamLocationData);
  };
  
  export const getDistricts = async (city: string): Promise<string[]> => {
    const cityData = vietnamLocationData[city];
    return cityData ? Object.keys(cityData.districts) : [];
  };
  
  export const getStreets = async (city: string, district: string): Promise<string[]> => {
    const cityData = vietnamLocationData[city];
    if (!cityData) return [];
    const districtData = cityData.districts[district];
    return districtData || [];
  };
  