import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface ProfileUser {
  type: string;
  name: string;
  photo: string;
  email: string;
  position: string;
  location: string;
  qualification: string;
  rate: string;
  startDate: Date;
}

export interface NavigationItem {
  routeLink: string;
  icon: IconDefinition;
  label: string;
}
