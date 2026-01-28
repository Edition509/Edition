
// Fix: Added React import to resolve React.ReactNode namespace error
import React from 'react';

export interface EditorialSection {
  id: string;
  title: string;
  content: React.ReactNode;
  icon: string;
}

export interface ReportData {
  title: string;
  author: string;
  mainObjective: string;
  secondaryObjectives: string[];
  targetAudience: {
    level: string;
    expectations: string;
    painPoints: string;
  };
  promise: string;
  bookType: string;
}