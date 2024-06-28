export type FileData = {
  status: "processing" | "uploading" | "done";
  progress: number;
  name: string;
  id?: string;
  type: string;
  size: number;
};
