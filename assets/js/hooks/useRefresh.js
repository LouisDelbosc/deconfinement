import {useState} from 'react';

export function useRefresh() {
  const [refreshToken, setRefreshToken] = useState({});
  return [refreshToken, () => setRefreshToken({})];
}
