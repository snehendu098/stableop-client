"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface ModalContextType {
  isModalOpen: boolean;
  modalType: string | null;
  modalData: any;
  openModal: (type: string, data?: any) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);

  useEffect(() => {
    console.log("ModalContext - isModalOpen:", isModalOpen, "type:", modalType, "data:", modalData);
  }, [isModalOpen, modalType, modalData]);

  const openModal = (type: string, data?: any) => {
    console.log("Opening modal - type:", type, "data:", data);
    setModalType(type);
    setModalData(data || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal - before:", isModalOpen);
    setIsModalOpen(false);
    setModalType(null);
    setModalData(null);
    console.log("Closing modal - after setState called");
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, modalType, modalData, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};