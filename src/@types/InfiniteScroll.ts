export interface IntersectionOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
}

export interface UseInfiniteScrollReturnType {
  isIntersecting: boolean;
}
