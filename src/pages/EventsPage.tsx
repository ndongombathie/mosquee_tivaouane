import React from 'react';
import Events from '../components/Events';
import { Language } from '../App';

interface Props {
  currentLanguage: Language;
}

const EventsPage: React.FC<Props> = ({ currentLanguage }) => (
  <Events currentLanguage={currentLanguage} />
);

export default EventsPage;
