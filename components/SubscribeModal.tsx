"use client";

import Modal from "./modal";

export default function SubscribeModal() {
  let content = <div className="text-center">No Product available.</div>;

  return (
    <Modal
      title="Only for premium users"
      description="Listen to music with Beat Stream Premium"
      isOpen
      onChange={() => {}}
    >
      SubscribeModal
    </Modal>
  );
}
