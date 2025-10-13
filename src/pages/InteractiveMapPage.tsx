import React from 'react';
import InteractiveMap from '../components/InteractiveMap';
import { Language } from '../App';

interface Props {
  currentLanguage: Language;
}

const InteractiveMapPage: React.FC<Props> = ({ currentLanguage }) => (
  <InteractiveMap currentLanguage={currentLanguage} />
);

export default InteractiveMapPage;
