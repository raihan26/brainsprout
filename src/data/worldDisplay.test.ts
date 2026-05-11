import { describe, it, expect } from 'vitest';
import { WORLD_DISPLAY, getWorldDisplay, GRADE_MISSION_NAMES } from './worldDisplay';
import type { SectionId } from '../types';

describe('worldDisplay', () => {
  const sections: SectionId[] = ['math', 'science', 'reading', 'shapes', 'logic', 'life-skills', 'trucks', 'stem'];

  it('has an entry for every SectionId', () => {
    for (const s of sections) {
      expect(WORLD_DISPLAY[s]).toBeDefined();
      expect(WORLD_DISPLAY[s].label).toBeTruthy();
      expect(WORLD_DISPLAY[s].tagline).toBeTruthy();
      expect(WORLD_DISPLAY[s].missionCopy).toBeTruthy();
      expect(WORLD_DISPLAY[s].hotspotIcon).toBeTruthy();
      expect(WORLD_DISPLAY[s].accent).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });

  it('getWorldDisplay returns the right world for a known id', () => {
    const math = getWorldDisplay('math');
    expect(math.id).toBe('math');
    expect(math.label).toBe('Math Lab');
  });

  it('maps math to rocket-related copy', () => {
    expect(getWorldDisplay('math').missionCopy.toLowerCase()).toContain('rocket');
  });

  it('maps stem to Sprout Bot or robot copy', () => {
    expect(getWorldDisplay('stem').missionCopy.toLowerCase()).toContain('bot');
  });

  it('each world has a unique label', () => {
    const labels = Object.values(WORLD_DISPLAY).map((w) => w.label);
    expect(new Set(labels).size).toBe(labels.length);
  });
});

describe('GRADE_MISSION_NAMES', () => {
  it('has an entry for each grade', () => {
    expect(GRADE_MISSION_NAMES.k).toBeDefined();
    expect(GRADE_MISSION_NAMES['1']).toBeDefined();
    expect(GRADE_MISSION_NAMES['2']).toBeDefined();
    expect(GRADE_MISSION_NAMES['3']).toBeDefined();
  });

  it('each grade has a distinct mission name', () => {
    const names = Object.values(GRADE_MISSION_NAMES).map((m) => m.name);
    expect(new Set(names).size).toBe(names.length);
  });
});
