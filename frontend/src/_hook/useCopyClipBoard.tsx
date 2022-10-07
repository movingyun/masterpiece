import { useState } from 'react';

type OnCopyFn = (text: string) => Promise<boolean>;

function useCopyClipBoard(): [boolean, OnCopyFn] {
  const [isCopy, setIsCopy] = useState<boolean>(false);

  const onCopy: OnCopyFn = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopy(true);

      return true;
    } catch (error) {
      console.error(error);
      setIsCopy(false);

      return false;
    }
  };

  return [isCopy, onCopy];
}

export default useCopyClipBoard;
