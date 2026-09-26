import { useEffect, useState } from 'react';

export function useContentProtection() {
  const [isProtectedBlur, setIsProtectedBlur] = useState<boolean>(false);

  useEffect(() => {
    // 1. Disable right-click context menu (prevents Save Image As..., Inspect Element)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Disable dragging images or cards onto desktop/folders
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    // 3. Intercept print, save, inspect and screenshot shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+P / Cmd+P (Print to PDF or printer)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        return;
      }

      // Ctrl+S / Cmd+S (Save webpage HTML / assets)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        return;
      }

      // Ctrl+U / Cmd+U (View Source)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
        e.preventDefault();
        return;
      }

      // F12 or Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C (DevTools Inspect)
      if (
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) &&
          e.shiftKey &&
          (e.key.toLowerCase() === 'i' ||
            e.key.toLowerCase() === 'j' ||
            e.key.toLowerCase() === 'c'))
      ) {
        e.preventDefault();
        return;
      }

      // PrintScreen key (Hardware screenshot key on Windows)
      if (e.key === 'PrintScreen' || e.key === 'Snapshot') {
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText('');
          }
        } catch {
          // ignore
        }
        setIsProtectedBlur(true);
        setTimeout(() => setIsProtectedBlur(false), 1500);
      }
    };

    // 4. Blur protection when window loses focus (Snipping Tool, Lightshot, or OS capture overlay)
    const handleBlur = () => {
      setIsProtectedBlur(true);
    };

    const handleFocus = () => {
      setIsProtectedBlur(false);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsProtectedBlur(true);
      } else {
        setIsProtectedBlur(false);
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('dragstart', handleDragStart);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return { isProtectedBlur };
}
