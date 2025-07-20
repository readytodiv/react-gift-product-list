import { useEffect, useState } from 'react';
import type { Theme } from '../api';
import { fetchThemes } from '../api';

export default function ThemeSection() {
  const [themes, setThemes] = useState<Theme[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchThemes()
      .then(setThemes)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <section><p>테마 로딩중...</p></section>;
  }

  if (error || !themes || themes.length === 0) {
    return null;
  }

  return (
    <section>
      <h2>선물 테마</h2>
      <ul>
        {themes.map(theme => (
          <li key={theme.themeId}>
            <img src={theme.image} alt={theme.name} width={100} />
            <p>{theme.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
