"use client";

import { useRouter, usePathname } from "next/navigation";

const useNavigation = () => {
  const router = useRouter();
  const currentPath = usePathname();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return { navigateTo, currentPath };
};

export default useNavigation;
