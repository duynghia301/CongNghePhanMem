"use client"

import { useState } from "react";

interface FacilityFormProps {
  initialData?: { name: string; type: string; value: string };
  onSubmit: (data: { name: string; type: string; value: string }) => void;
}

export const FacilityForm: React.FC<FacilityFormProps> = ({ initialData, onSubmit }) => {
  const [name, setName] = useState<string>(initialData?.name || "");
  const [type, setType] = useState<string>(initialData?.type || "");
  const [value, setValue] = useState<string>(initialData?.value || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, type, value });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          className="input"
        />
      </div>
      <div>
        <label>Type</label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Enter type"
          className="input"
        />
      </div>
      <div>
        <label>Value</label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
          className="input"
        />
      </div>
      <button type="submit" className="btn">Submit</button>
    </form>
  );
};
