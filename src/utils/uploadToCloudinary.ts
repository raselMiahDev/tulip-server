import cloudinary from "../config/cloudinary";

export const uploadToCloudinary = (
    file: Express.Multer.File
): Promise<string> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader
            .upload_stream(
                {
                    folder: "tulip/user-profiles",
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result?.secure_url as string);
                }
            )
            .end(file.buffer);
    });
};
