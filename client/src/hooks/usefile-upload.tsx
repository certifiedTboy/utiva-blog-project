import { useUploadFileToAWSs3Mutation } from "@/features/apis/post-apis";
import { useToast } from "@/hooks/use-toast";

export const useFileUpload = (
  textareaRef: React.RefObject<HTMLTextAreaElement | null>,
  field: any,
) => {
  // RTK Query mutation for file uploads.
  const [uploadFileToAWSs3] = useUploadFileToAWSs3Mutation();

  // Hook for displaying toast notifications.
  const { toast } = useToast();

  /**
   * Inserts the markdown for an image into the textarea at the current cursor position.
   * It first uploads the image file to get a URL.
   * @param file The image file to upload and insert.
   */
  async function insertImage(file: File) {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Capture cursor position and current value before the async upload.
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentValue = textarea.value;

    try {
      const imageUrl = await handleImageUpload(file);

      if (!imageUrl) return;

      // Format the markdown for the image.
      const imageMarkdown = `\n![Pasted image](${imageUrl})\n`;

      // Construct the new value with the image markdown inserted.
      const newValue =
        currentValue.slice(0, start) + imageMarkdown + currentValue.slice(end);

      field.onChange(newValue);

      const newCursorPosition = start + imageMarkdown.length;

      // Use requestAnimationFrame to ensure the DOM has updated before setting the cursor.
      requestAnimationFrame(() => {
        const currentTextarea = textareaRef.current;

        if (!currentTextarea) return;

        currentTextarea.focus();
        currentTextarea.setSelectionRange(newCursorPosition, newCursorPosition);
      });
    } catch (error) {
      console.error("Unable to upload and insert image:", error);
      toast({ title: "Error", description: "Failed to insert image." });
    }
  }

  /**
   * Handles the actual file upload process to an AWS S3 bucket.
   * @param file The file to be uploaded.
   * @returns A promise that resolves with the URL of the uploaded file, or null on failure.
   */
  async function handleImageUpload(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    try {
      toast({
        title: "Uploading Image...",
        description: "Please wait while the image is being uploaded.",
      });
      // Call the RTK mutation and unwrap the result.
      const result = await uploadFileToAWSs3(formData).unwrap();
      toast({
        title: "Image Uploaded",
        description: "The image has been added to your post.",
      });
      return result.data.url;
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Could not upload the image. Please try again.",
        variant: "destructive",
      });
      console.error("Upload failed:", error);
      return null;
    }
  }

  /**
   * Handles file selection from the hidden file input, triggered by the "Upload Image" button.
   */
  async function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    // If a file is selected, insert it and reset the input.
    if (file) {
      await insertImage(file);
      // Reset file input to allow uploading the same file again
      if (event.target) {
        event.target.value = "";
      }
    }
  }

  /**
   * Handles the `onPaste` event to allow pasting images directly into the editor.
   */
  async function handlePaste(event: React.ClipboardEvent<HTMLTextAreaElement>) {
    // Find if there's an image item in the clipboard data.
    const imageItem = Array.from(event.clipboardData.items).find((item) =>
      item.type.startsWith("image/"),
    );

    // If no image is found, do nothing and let the default paste behavior occur.
    if (!imageItem) return;

    const file = imageItem.getAsFile();
    if (!file) return;

    event.preventDefault();

    await insertImage(file);
  }

  return { handleFileSelect, handlePaste };
};
