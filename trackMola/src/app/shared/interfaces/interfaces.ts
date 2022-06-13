import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface ProfileUser {
  type?: string;
  photo?: string;
  name?: string;
  uid?: string;
}

export interface NavigationItem {
  routeLink: string;
  icon: IconDefinition;
  label: string;
}
