export interface RedisSetParams {
  key: string;
  value: unknown;
  ttl: number;
}

export interface RedisSetHashParams {
  key: unknown;
  value: unknown;
  ttl: number;
}
