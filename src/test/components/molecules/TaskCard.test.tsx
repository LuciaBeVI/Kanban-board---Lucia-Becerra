import React from 'react'; // Necesario en algunos entornos de test
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskCard } from '../../../dashboard/components/molecules/TaskCard';
import { Task } from '../../../dashboard/types/types';

// Mock de dnd-kit porque usa referencias al DOM que no existen fácilmente en test básico
vi.mock('@dnd-kit/sortable', () => ({
  useSortable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: (node: any) => node,
    transform: null,
    transition: null,
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
  };

  it('should render task title and description', () => {
    render(<TaskCard task={mockTask} />);
    
    expect(screen.getByText('Fix Login Bug')).toBeInTheDocument();
    expect(screen.getByText('Critical error on auth')).toBeInTheDocument();
  });

  it('should display the correct assignee', () => {
    render(<TaskCard task={mockTask} />);
    expect(screen.getByText(/Developer/)).toBeInTheDocument();
  });
});