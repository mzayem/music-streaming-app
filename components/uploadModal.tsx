"use client";

import useUploadModal from "@/hooks/useUploadModal";

import Modal from "@/components/modal";

export default function UploadModal() {
  const { isOpen, onClose } = useUploadModal();

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Modal
      title="Add a song"
      description="Upload an Mp3 file."
      isOpen={isOpen}
      onChange={onChange}
    >
      upload content here!
    </Modal>
  );
}
