import React from 'react';
import VirtualTour from '../components/VirtualTour';
import { Language } from '../App';

interface Props {
  currentLanguage: Language;
}

const VirtualTourPage: React.FC<Props> = ({ currentLanguage }) => (
  <VirtualTour currentLanguage={currentLanguage} />
);

export default VirtualTourPage;
