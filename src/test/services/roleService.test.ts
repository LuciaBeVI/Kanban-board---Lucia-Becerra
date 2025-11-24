import { describe, it, expect } from 'vitest';
import { canMoveTask } from '../../dashboard/services/roleService';

describe('Role Logic - canMoveTask', () => {
  // --- DEVELOPER RULES ---
  describe('Role: Developer', () => {
    it('should allow moving from Backlog to In-Progress', () => {
      expect(canMoveTask('Developer', 'backlog', 'in-progress')).toBe(true);
    });

    it('should allow moving from In-Progress to QA', () => {
      expect(canMoveTask('Developer', 'in-progress', 'qa')).toBe(true);
    });

    it('should NOT allow moving from QA to Done', () => {
      expect(canMoveTask('Developer', 'qa', 'done')).toBe(false);
    });

    it('should NOT allow moving backwards (QA to In-Progress)', () => {
      expect(canMoveTask('Developer', 'qa', 'in-progress')).toBe(false);
    });
  });

  // --- QA RULES ---
  describe('Role: QA', () => {
    it('should allow moving from QA to Done', () => {
      expect(canMoveTask('QA', 'qa', 'done')).toBe(true);
    });

    it('should NOT allow moving from Backlog to In-Progress', () => {
      expect(canMoveTask('QA', 'backlog', 'in-progress')).toBe(false);
    });

    it('should NOT allow moving from In-Progress to QA', () => {
      expect(canMoveTask('QA', 'in-progress', 'qa')).toBe(false);
    });
  });

  // --- GENERAL RULES ---
  describe('General Rules', () => {
    it('should allow dropping in the same column (reordering)', () => {
      expect(canMoveTask('Developer', 'in-progress', 'in-progress')).toBe(true);
    });
  });
});