import { create } from "zustand";

type JobForm = {
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  requirements: string;
};

type Store = {
  modalOpen: boolean;
  jobForm: JobForm;
  setVisible: (open: boolean) => void;
  changeForm: (field: keyof JobForm, value: string) => void;
  resetForm: () => void;
};

const initialForm: JobForm = {
  title: "",
  company: "",
  location: "",
  salary: "",
  type: "",
  description: "",
  requirements: "",
};

export const useJobStore = create<Store>((set) => ({
  modalOpen: false,
  jobForm: initialForm,
  setVisible: (open) => set({ modalOpen: open }),
  changeForm: (field, value) =>
    set((state) => ({
      jobForm: { ...state.jobForm, [field]: value },
    })),
  resetForm: () => set({ jobForm: initialForm }),
}));
