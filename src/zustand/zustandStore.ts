import { tZustandStore } from "@/types/zustandstore.type";
import { create } from "zustand";

// 주스탠드 스토어 변경 시 type에서도 적절히 변형시켜줘야 함
const zustandStore = create<tZustandStore>((set) => ({}));

export default zustandStore;
