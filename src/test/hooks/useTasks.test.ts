import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useTasks } from '../../dashboard/hooks/useTasks';
import { Task } from '../../dashboard/types/types';

describe('useTasks Hook', () => {
  beforeEach(() => {
    window.localStorage.clear();
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

    act(() => {
      result.current.addTask(newTask);
    });

    expect(result.current.tasks).toHaveLength(1);
  });

  it('should delete a task permanently', () => {
    const { result } = renderHook(() => useTasks());
    
    act(() => {
      result.current.addTask({
        id: 'to-delete',
        title: 'Delete Me',
        assignee: 'QA',
        status: 'backlog',
        createdAt: '',
      });
    });

    expect(result.current.tasks).toHaveLength(1);

    act(() => {
      result.current.deleteTask('to-delete');
    });

    expect(result.current.tasks).toHaveLength(0);
  });

  it('should archive completed tasks', () => {
    const { result } = renderHook(() => useTasks());
    
    act(() => {
      result.current.addTask({
        id: 'done-task',
        title: 'Finished Work',
        assignee: 'Developer',
        status: 'done',
        createdAt: '',
      });
    });

    act(() => {
      result.current.archiveCompleted();
    });

    expect(result.current.tasks).toHaveLength(0);
    expect(result.current.archivedTasks).toHaveLength(1);
    expect(result.current.archivedTasks[0].id).toBe('done-task');
  });
});