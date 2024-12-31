// components/HouseAttachments.tsx
import Image from "next/image";

interface HouseAttachmentsProps {
  attachments: any[];
}

const HouseAttachments = ({ attachments }: HouseAttachmentsProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Attachments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {attachments.map((attachment) => (
          <div key={attachment.id} className="border p-4 rounded-md">
            <a href={attachment.url} target="_blank" rel="noopener noreferrer">
              <Image
                src={attachment.url}
                alt={attachment.name}
                width={500}
                height={300}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
            </a>
            <p className="text-sm text-gray-700">{attachment.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HouseAttachments;
