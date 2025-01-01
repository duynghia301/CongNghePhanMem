"use client";

export const LocationForm = ({ initialData }: { initialData: any; houseId: string }) => {
    return (
      <form>
        <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
          Latitude
        </label>
        <input
          id="latitude"
          name="latitude"
          type="number"
          defaultValue={initialData.latitude}
          placeholder="Nhập tọa độ vĩ độ"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <label htmlFor="longitude" className="block mt-4 text-sm font-medium text-gray-700">
          Longitude
        </label>
        <input
          id="longitude"
          name="longitude"
          type="number"
          defaultValue={initialData.longitude}
          placeholder="Nhập tọa độ kinh độ"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </form>
    );
  };
  