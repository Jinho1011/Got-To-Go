import { useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";

const useSelect = <T>() => {
  const [state, setState] = useState<T>();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<BottomSheet>(null);

  const onPress = (item: T) => {
    setState(item);
    ref?.current?.close();
  };

  const toggle = () => {
    if (isOpen) {
      ref?.current?.close();
      setIsOpen(false);
    } else {
      ref?.current?.expand();
      setIsOpen(true);
    }
  };

  return { state, setState, ref, toggle, onPress };
};

export default useSelect;
