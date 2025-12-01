import React from 'react'; 
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskCard } from '../../../dashboard/components/molecules/TaskCard';
import { Task } from '../../../dashboard/types/types';

vi.mock('@dnd-kit/sortable', () => ({
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: (node: any) => node,
    transform: null,
    transition: null,
    setActivatorNodeRef: (node: any) => node,
  }),
}));

describe('TaskCard Component', () => {
  const mockTask: Task = {
    id: '123',
    title: 'Fix Login Bug',
    description: 'Critical error on auth',
    assignee: 'Developer',
    status: 'in-progress',
    createdAt: '2023-01-01',
    storyPoints: 5,
  };

  const mockOnClick = vi.fn();

  it('should render task details correctly', () => {
    render(<TaskCard task={mockTask} onClick={mockOnClick} />);
    
    expect(screen.getByText('Fix Login Bug')).toBeInTheDocument();
    expect(screen.getByText('Critical error on auth')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('J')).toBeInTheDocument();
  });


  it('should call onClick when clicked', () => {
    render(<TaskCard task={mockTask} onClick={mockOnClick} />);
    fireEvent.click(screen.getByText('Critical error on auth'));
    expect(mockOnClick).toHaveBeenCalledWith(mockTask);
  });
});