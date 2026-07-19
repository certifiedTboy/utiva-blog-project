import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useLocation } from "wouter";

interface UnsaveContextType {
  isDirty: boolean;
  navigate: (path: string) => void;
  showConfirm: boolean;
  confirmNavigation: () => void;
  cancelNavigation: () => void;
  setIsDirty: (content: string) => void;
}

const UnsaveContext = createContext<UnsaveContextType>({
  isDirty: false,
  navigate: () => {},
  showConfirm: false,
  confirmNavigation: () => {},
  cancelNavigation: () => {},
  setIsDirty: () => {},
});

export const UnsaveContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [isDirty, setIsDirty] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);

  const [, setLocation] = useLocation();

  const navigate = useCallback(
    (path: string) => {
      if (!isDirty) {
        setLocation(path);
        return;
      }

      setPendingPath(path);
      setShowConfirm(true);
    },
    [isDirty, setLocation],
  );

  const confirmNavigation = useCallback(() => {
    if (pendingPath) {
      setLocation(pendingPath);
    }

    setPendingPath(null);
    setShowConfirm(false);
  }, [pendingPath, setLocation]);

  const cancelNavigation = useCallback(() => {
    setPendingPath(null);
    setShowConfirm(false);
  }, []);

  // Browser refresh / close
  useEffect(() => {
    const beforeUnload = (e: BeforeUnloadEvent) => {
      if (!isDirty) return;

      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", beforeUnload);

    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [isDirty]);

  const value = {
    isDirty,
    navigate,
    showConfirm,
    confirmNavigation,
    cancelNavigation,
    setIsDirty: (content: string) =>
      setIsDirty(content?.trim().length > 0 || content?.trim() !== ""),
  };

  return (
    <UnsaveContext.Provider value={value}>{children}</UnsaveContext.Provider>
  );
};

export const useUnsaveContext = () => {
  return useContext(UnsaveContext);
};
