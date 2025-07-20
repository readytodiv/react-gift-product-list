import { useEffect, useState } from 'react';
import type { Product } from '../api';
import { fetchRanking } from '../api';

const genders = [
  { label: '전체', value: 'ALL' },
  { label: '남성', value: 'MALE' },
  { label: '여성', value: 'FEMALE' },
  { label: '청소년', value: 'TEEN' },
];

const types = [
  { label: '받고 싶어한', value: 'MANY_WISH' },
  { label: '많이 선물한', value: 'MANY_RECEIVE' },
  { label: '위시로 받은', value: 'MANY_WISH_RECEIVE' },
];

export default function RankingSection() {
  const [gender, setGender] = useState(genders[0].value);
  const [type, setType] = useState(types[0].value);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchRanking({ targetType: gender, rankType: type })
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [gender, type]);

  return (
    <section>
      <h2>실시간 급상승 선물랭킹</h2>
      <div>
        <select value={gender} onChange={e => setGender(e.target.value)}>
          {genders.map(g => (
            <option key={g.value} value={g.value}>{g.label}</option>
          ))}
        </select>
        <select value={type} onChange={e => setType(e.target.value)}>
          {types.map(t => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>
      {loading && <p>랭킹 로딩중...</p>}
      {!loading && products && products.length === 0 && (
        <p>상품 목록이 없습니다.</p>
      )}
      {!loading && products && products.length > 0 && (
        <ul>
          {products.map((item, index) => (
            <li key={item.id}>
              <span>{index + 1}. </span>
              <img src={item.imageURL} alt={item.name} width={80} />
              <span>{item.name}</span>
              <strong>{item.price.sellingPrice.toLocaleString()}원</strong>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
