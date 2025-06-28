export class PlatformUtils {
  public static isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }
}