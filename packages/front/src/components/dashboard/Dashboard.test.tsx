import { describe, expect, it, vi } from 'vitest';

import { render } from 'utils/customRenderForTests';
import { mockComponent } from 'utils/mockComponent';

import { Dashboard } from './Dashboard';

vi.mock('./details/Details', () => mockComponent('Details'));
vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
  useParams: () => vi.fn,
}));
vi.mock('store/projects/useGetProjectsQuery', () => ({
  useGetProjectsQuery: vi.fn(),
}));

describe('Dashboard', () => {
  it('should render Dashboard', () => {
    const { getByText } = render(<Dashboard />);
    expect(getByText('Dashboard')).toBeTruthy();
  });
});
