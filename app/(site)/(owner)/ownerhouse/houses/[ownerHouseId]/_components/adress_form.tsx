"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { House } from "@prisma/client";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

interface AddressFormProps {
  initialData: House;
  houseId: string;
}

const formSchema = z.object({
  city: z.string().min(1, { message: "City is required" }),
  district: z.string().min(1, { message: "District is required" }),
  street: z.string().min(1, { message: "Street is required" }),
  streetName: z.string().min(1, { message: "Street name or house number is required" }),
});

export const AddressForm = ({ initialData, houseId }: AddressFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cities, setCities] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [streets, setStreets] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      district: "",
      street: "",
      streetName: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Concatenate the full address with city, district, and street names
      const fullAddress = `${values.streetName}, ${streets.find(street => street.id === values.street)?.full_name}, ${districts.find(district => district.id === values.district)?.full_name}, ${cities.find(city => city.id === values.city)?.full_name}`;
      await axios.patch(`/api/houses/${houseId}`, { address: fullAddress });
      toast.success("Updated");
      toggleEdit();
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    // Fetch cities
    const fetchCities = async () => {
      try {
        const result = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
        if (result.data.error === 0) {
          setCities(result.data.data); // Set cities data
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    // Fetch districts based on selected city
    const fetchDistricts = async () => {
      if (selectedCity) {
        try {
          const result = await axios.get(`https://esgoo.net/api-tinhthanh/2/${selectedCity}.htm`);
          if (result.data.error === 0) {
            setDistricts(result.data.data); // Set districts data
          }
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      }
    };
    fetchDistricts();
  }, [selectedCity]);

  useEffect(() => {
    // Fetch streets based on selected district
    const fetchStreets = async () => {
      if (selectedDistrict) {
        try {
          const result = await axios.get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict}.htm`);
          if (result.data.error === 0) {
            setStreets(result.data.data); // Set streets data
          }
        } catch (error) {
          console.error("Error fetching streets:", error);
        }
      }
    };
    fetchStreets();
  }, [selectedDistrict]);

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    setSelectedCity(city);
    form.setValue("city", city);
    form.setValue("district", "");
    form.setValue("street", "");
    form.setValue("streetName", "");
    setDistricts([]);
    setStreets([]);
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    form.setValue("district", district);
    form.setValue("street", "");
    form.setValue("streetName", "");
    setStreets([]);
  };

  const handleStreetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    form.setValue("street", e.target.value);
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Địa chỉ
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? <>Hủy</> : <><Pencil className="h-4 w-4 mr-2" /> Chỉnh sửa</>}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn("text-sm mt-2", !initialData.address && "text-slate-500")}>
          {initialData.address || "No description"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="flex space-x-4">
              <div className="w-full">
                <FormField control={form.control} name="city" render={({ field }) => (
                  <FormItem>
                    <div className="text-xs text-gray-500">Thành phố</div>
                    <FormControl>
                      <select
                        {...field}
                        value={selectedCity}
                        onChange={(e) => {
                          field.onChange(e);
                          handleCityChange(e);
                        }}
                      >
                        <option value="" disabled>Select city</option>
                        {cities.map((city: any) => (
                          <option key={city.id} value={city.id}>{city.full_name}</option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <div className="w-full">
                <FormField control={form.control} name="district" render={({ field }) => (
                  <FormItem>
                    <div className="text-xs text-gray-500">Quận/Huyện</div>
                    <FormControl>
                      <select
                        {...field}
                        value={selectedDistrict}
                        onChange={(e) => {
                          field.onChange(e);
                          handleDistrictChange(e);
                        }}
                        disabled={!selectedCity}
                      >
                        <option value="" disabled>Select district</option>
                        {districts.map((district: any) => (
                          <option key={district.id} value={district.id}>{district.full_name}</option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>
            <div className="w-full">
              <FormField control={form.control} name="street" render={({ field }) => (
                <FormItem>
                  <div className="text-xs text-gray-500">Phường/xã</div>
                  <FormControl>
                    <select
                      {...field}
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        handleStreetChange(e);
                      }}
                      disabled={!selectedDistrict}
                    >
                      <option value="" disabled>Select street</option>
                      {streets.map((street: any) => (
                        <option key={street.id} value={street.id}>{street.full_name}</option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <div className="w-full">
              <FormField control={form.control} name="streetName" render={({ field }) => (
                <FormItem>
                  <div className="text-xs text-gray-500">Tên đường/Số nhà</div>
                  <FormControl>
                    <input
                      {...field}
                      type="text"
                      placeholder="Street Name or House Number"
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Lưu
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
