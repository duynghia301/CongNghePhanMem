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
import { getCities, getDistricts, getStreets } from "@/lib/locationService"; // Import locationService functions

interface AddressFormProps {
  initialData: House;
  houseId: string;
}

const formSchema = z.object({
  city: z.string().min(1, { message: "City is required" }),
  district: z.string().min(1, { message: "District is required" }),
  street: z.string().min(1, { message: "Street or house number is required" }),
});

export const AddressForm = ({ initialData, houseId }: AddressFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [streets, setStreets] = useState<string[]>([]);
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
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const fullAddress = `${values.street}, ${values.district}, ${values.city}`;
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
    const fetchCities = async () => {
      const result = await getCities();
      setCities(result);
    };
    fetchCities();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedCity) {
        const result = await getDistricts(selectedCity);
        setDistricts(result);
      }
    };
    fetchDistricts();
  }, [selectedCity]);

  useEffect(() => {
    const fetchStreets = async () => {
      if (selectedDistrict) {
        const result = await getStreets(selectedCity, selectedDistrict);
        setStreets(result);
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
    setDistricts([]);
    setStreets([]);
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    form.setValue("district", district);
    form.setValue("street", "");
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
          {isEditing ? <>Hủy</> : <>
            <Pencil className="h-4 w-4 mr-2" />
            Chỉnh sửa
          </>}
        </Button>
      </div>
      {!isEditing && (
        <p className={cn(
          "text-sm mt-2",
          !initialData.address && "text-slate-500"
        )}>
          {initialData.address || "No description"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
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
                      {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
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
                      {districts.map(district => (
                        <option key={district} value={district}>{district}</option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
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
                      {streets.map(street => (
                        <option key={street} value={street}>{street}</option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Lưu
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
