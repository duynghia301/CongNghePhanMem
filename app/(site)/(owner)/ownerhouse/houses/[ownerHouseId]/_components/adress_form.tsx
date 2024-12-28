"use client"
export const AddressForm = ({ initialData, houseId }: { initialData: any; houseId: string }) => {
    return (
      <form>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Địa chỉ
        </label>
        <input
          id="address"
          name="address"
          defaultValue={initialData.address}
          placeholder="Nhập địa chỉ"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </form>
    );
  };
  