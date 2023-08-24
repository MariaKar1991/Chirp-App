import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import Image from "next/image";

/**
 * Props for the ImageUpload
 * component.
 */
interface ImageUploadProps {
  onChange: (base64: string) => void;
  label: string;
  value?: string;
  disabled?: boolean;
}

/**
 * Component for uploading images using a drop zone with previews.
 *
 * @component
 * @param {ImageUploadProps} props - Props for configuring the image upload behavior and appearance.
 */
const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  label,
  value,
  disabled,
}) => {
  const [base64, setBase64] = useState(value);

  /**
   * Handles changes when an image is selected or uploaded.
   *
   * @param {string} base64 - The base64-encoded representation of the uploaded image.
   */
  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  /**
   * Handles the drop event when an image is added to the drop zone.
   *
   * @param {Array<File>} files - An array of dropped files.
   */
  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setBase64(event.target.result);
        handleChange(event.target.result);
      };
      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
  });

  return (
    <div
      {...getRootProps({
        className:
          "w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700",
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image src={base64} height="100" width="100" alt="Uploaded image" />
        </div>
      ) : (
        <p className="text-white">{label}</p>
      )}
    </div>
  );
};

export default ImageUpload;
