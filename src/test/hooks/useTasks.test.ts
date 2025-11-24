import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useTasks } from '../../dashboard/hooks/useTasks';
import { Task } from '../../dashboard/types/types';

describe('useTasks Hook', () => {
  // Limpiar localStorage antes de cada test
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should initialize with empty tasks if storage is empty', () => {
    const { result } = renderHook(() => useTasks());
    expect(result.current.tasks).toEqual([]);
  });

  it('should add a new task', () => {
    const { result } = renderHook(() => useTasks());
    
    const newTask: Task = {
      id: '1',
      title: 'Test Task',
      assignee: 'Developer',
      status: 'backlog',
      createdAt: new Date().toISOString(),
    };

    // Act: Ejecutamos la función que modifica el estado
    act(() => {
      result.current.addTask(newTask);
    });

    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].title).toBe('Test Task');
  });

  it('should update a task status', () => {
    const { result } = renderHook(() => useTasks());
    
    const newTask: Task = {
      id: '1',
      title: 'Test Task',
      assignee: 'Developer',
      status: 'backlog',
      createdAt: new Date().toISOString(),
    };

    act(() => {
      result.current.addTask(newTask);
    });

    // Actualizamos status
    act(() => {
      result.current.updateTask('1', { status: 'in-progress' });
    });

    expect(result.current.tasks[0].status).toBe('in-progress');
  });
});