import Image from "next/image";
import React, { useRef, useState } from "react";

type Props = {
  onFilesSelect: (files: File[]) => void;
};

const SliderLoader = ({ onFilesSelect }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  const [blobURLs, setBlobURLS] = useState<string[]>([]);

  return (
    <>
      <input
        type="file"
        accept="image/*"
        ref={ref}
        onChange={(e) => {
          const files = Array.from(e.target.files as FileList);
          const urls = files.map((file) => URL.createObjectURL(file));
          setBlobURLS(urls);
          onFilesSelect(files);
        }}
        hidden
        multiple
      />
      <button type="button" onClick={() => ref.current?.click()}>
        {blobURLs.length > 0
          ? blobURLs.map((url, index) => (
              <Image key={index} src={url} alt="" width={100} height={100} />
            ))
          : "Upload Images"}
      </button>
    </>
  );
};

export default SliderLoader;
