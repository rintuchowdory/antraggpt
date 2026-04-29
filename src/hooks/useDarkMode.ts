import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
export function useDarkMode() {
  const [dark, setDark] = useLocalStorage<boolean>('antraggpt-dark', false);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }, [dark]);
  return [dark, setDark] as const;
}
