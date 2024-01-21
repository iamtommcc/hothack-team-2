"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function FileUploadInput() {
  const uploadImage = async (event: any) => {
    const supabase = createClientComponentClient();
    const file = event.target.files[0];
    const bucket = "Image Bucket";
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(file.name, file);
    // Handle error if upload failed
    if (error) {
      console.log(error);
      alert("Error uploading file.");
      return;
    }

    alert("File uploaded successfully!");
  };

  return (
    <>
      <input
        className="py-2 bg-inherit mb-2"
        type="file"
        id="myfile"
        name="myfile"
        onChange={uploadImage}
      ></input>
      <button className="bg-gray-200 rounded-md px-4 py-2 text-foreground mb-2">
        Submit
      </button>
    </>
  );
}
