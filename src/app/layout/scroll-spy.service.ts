import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SpyEntry {
  id: string;
  isIntersecting: boolean;
  ratio: number;
}

/**
 * Tracks which section is currently in view. The selection logic (`update`) is
 * pure and unit-tested; `observe` wires a real IntersectionObserver to it and is
 * a no-op during server-side prerendering (no `IntersectionObserver`).
 */
@Injectable({ providedIn: 'root' })
export class ScrollSpyService implements OnDestroy {
  private readonly _active = new BehaviorSubject<string>('');
  readonly activeSection$ = this._active.asObservable();
  private observer?: IntersectionObserver;

  get active(): string {
    return this._active.value;
  }

  /** Choose the most-visible intersecting section and emit it. */
  update(entries: SpyEntry[]): void {
    const visible = entries.filter((e) => e.isIntersecting);
    if (visible.length === 0) {
      return;
    }
    const top = visible.reduce((a, b) => (b.ratio > a.ratio ? b : a));
    if (top.id !== this._active.value) {
      this._active.next(top.id);
    }
  }

  observe(ids: string[]): void {
    if (typeof IntersectionObserver === 'undefined' || typeof document === 'undefined') {
      return;
    }
    this.observer?.disconnect();
    this.observer = new IntersectionObserver(
      (entries) =>
        this.update(
          entries.map((e) => ({
            id: (e.target as HTMLElement).id,
            isIntersecting: e.isIntersecting,
            ratio: e.intersectionRatio,
          })),
        ),
      { threshold: [0.15, 0.4, 0.7], rootMargin: '-20% 0px -40% 0px' },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) {
        this.observer.observe(el);
      }
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
