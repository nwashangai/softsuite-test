class RequestCache {
  private static instance: RequestCache | null = null;
  private cache: Map<string, any> = new Map();

  private constructor() {}

  public static getInstance(): RequestCache {
    if (!RequestCache.instance) {
      RequestCache.instance = new RequestCache();
    }
    return RequestCache.instance;
  }

  public get<T>(url: string): T | undefined {
    return this.cache.get(url) as T | undefined;
  }

  public set<T>(url: string, data: T): void {
    this.cache.set(url, data);
  }

  public clear(): void {
    this.cache.clear();
  }
}

export default RequestCache;
