// chat gpt function
export function removeExifData(file: File): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      if (!event.target?.result) {
        return reject("Failed to read file");
      }
      const arrayBuffer = event.target.result as ArrayBuffer;
      const dataView = new DataView(arrayBuffer);
      let offset = 2;
      const fileLength = dataView.byteLength;

      // Check if the file is a valid JPEG
      if (dataView.getUint16(0, false) !== 0xffd8) {
        return reject("Not a valid JPEG file");
      }

      // Iterate through the segments of the JPEG file
      while (offset < fileLength) {
        // Check for EXIF segment (APP1 marker)
        if (dataView.getUint16(offset, false) === 0xffe1) {
          const exifLength = dataView.getUint16(offset + 2, false);
          // Create a new ArrayBuffer without the EXIF segment
          const newArrayBuffer = new ArrayBuffer(fileLength - exifLength - 2);
          const newDataView = new DataView(newArrayBuffer);
          // Copy data before the EXIF segment
          new Uint8Array(newArrayBuffer, 0, offset).set(new Uint8Array(arrayBuffer, 0, offset));
          // Copy data after the EXIF segment
          new Uint8Array(newArrayBuffer, offset, fileLength - offset - exifLength - 2).set(
            new Uint8Array(
              arrayBuffer,
              offset + exifLength + 2,
              fileLength - offset - exifLength - 2,
            ),
          );

          // Create a new Blob and then convert it to a File
          const newBlob = new Blob([newArrayBuffer], { type: "image/jpeg" });
          const newFile = new File([newBlob], file.name, { type: "image/jpeg" });
          return resolve(newFile);
        } else {
          // Move to the next segment
          offset += 2 + dataView.getUint16(offset + 2, false);
        }
      }

      // No EXIF data found, return the original file
      resolve(file);
    };

    reader.onerror = function () {
      reject("Failed to read file");
    };

    reader.readAsArrayBuffer(file);
  });
}
