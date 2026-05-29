import React from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../../theme/ThemeProvider';
import { BuiltForSection, FAQSection, FeatureGrid, HeroSection, LandingNavbar, PricingSection, ProductDemo } from './LandingSections';

function renderWithProviders(ui) {
  return render(
    <MemoryRouter>
      <ThemeProvider>{ui}</ThemeProvider>
    </MemoryRouter>,
  );
}

beforeEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: () => ({
      matches: false,
      media: '',
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});

describe('Landing sections', () => {
  it('renders the premium navbar with a CTA', () => {
    renderWithProviders(<LandingNavbar />);

    expect(screen.getByText('ResumeAI')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /start free/i })).toBeInTheDocument();
  });

  it('renders the hero headline and supporting CTA', () => {
    renderWithProviders(<HeroSection />);

    const headline = screen.getByRole('heading', { level: 1 });
    expect(headline).toHaveTextContent(/your resume is costing you/i);
    expect(headline).toHaveTextContent(/interviews/i);
    expect(screen.getByRole('link', { name: /start free/i })).toBeInTheDocument();
  });

  it('renders the product demo workflow', () => {
    render(<ProductDemo />);

    expect(screen.getByRole('heading', { name: /resume analysis timeline/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /resume upload/i })).toBeInTheDocument();
  });

  it('shows the pricing plan labels', () => {
    render(<PricingSection />);

    expect(screen.getByText('Starter')).toBeInTheDocument();
    expect(screen.getByText('Pro')).toBeInTheDocument();
    expect(screen.getByText('Team')).toBeInTheDocument();
  });

  it('renders the four feature cards', () => {
    render(<FeatureGrid />);

    expect(screen.getByText('ATS Intelligence')).toBeInTheDocument();
    expect(screen.getByText('AI Resume Builder')).toBeInTheDocument();
    expect(screen.getByText('Resume Analyzer')).toBeInTheDocument();
    expect(screen.getByText('Recruiter Feedback AI')).toBeInTheDocument();
  });

  it('renders the built-for trust section', () => {
    render(<BuiltForSection />);

    expect(screen.getByText('Students')).toBeInTheDocument();
    expect(screen.getByText('Developers')).toBeInTheDocument();
    expect(screen.getByText('Professionals')).toBeInTheDocument();
  });

  it('renders the faq accordion', () => {
    render(<FAQSection />);

    expect(screen.getByRole('button', { name: /how does resumeai improve ats performance/i })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: /is resumeai only for job seekers with experience/i })).toHaveAttribute('aria-expanded', 'false');
  });
});
