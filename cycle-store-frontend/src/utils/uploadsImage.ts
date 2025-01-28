import { config } from "@/config";
import axios from "axios";

interface IUploadImageResponse {
  secure_url: string;
}

export const uploadImage = async (
  imageFile: File | undefined
): Promise<string> => {
  const formData = new FormData();

  if (imageFile) {
    formData.append("file", imageFile);
    formData.append("upload_preset", config.cloudinary_product_preset);

    try {
      const response = await axios.post<IUploadImageResponse>(
        config.cloudinary_api,
        formData
      );

      console.log("Thumbnail uploaded: ", response);

      return response?.data?.secure_url;
    } catch (err) {
      console.log("err ", err);
      return "";
    }
  }
  return "";
};
