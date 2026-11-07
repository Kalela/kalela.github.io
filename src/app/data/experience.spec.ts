import { describe, it, expect } from 'vitest';
import { JOBS } from './experience';

describe('JOBS (resume-aligned work history)', () => {
  it('has exactly six roles', () => {
    expect(JOBS.length).toBe(6);
  });

  it('leads with CarePay DevCo', () => {
    expect(JOBS[0].company).toBe('CarePay DevCo, Kenya');
    expect(JOBS[0].title).toBe('Software Engineer');
  });

  it('does not include Workfleek (dropped per the resume)', () => {
    expect(JOBS.some((j) => /workfleek/i.test(j.company))).toBe(false);
  });

  it('every role has a destination url and an icon', () => {
    for (const job of JOBS) {
      expect(job.url).toMatch(/^https?:\/\//);
      expect(job.icon.type === 'image' || job.icon.type === 'fa').toBe(true);
    }
  });
});
