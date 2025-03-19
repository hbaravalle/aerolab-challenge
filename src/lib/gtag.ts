import { env } from './env';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
interface GtagPageview {
  path?: string;
  title?: string;
  location?: string;
  userId?: string;
}

export const pageview = (view: GtagPageview) => {
  if (!env.NEXT_PUBLIC_GA_MEASUREMENT_ID || !window.gtag) return;

  window.gtag('config', env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
    page_path: view.path,
    page_title: view.title,
    user_id: view.userId,
    page_location: view.location,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
interface GtagEvent {
  action: string;
  category: string;
  label: string;
  value: number;
}

export const event = ({ action, category, label, value }: GtagEvent) => {
  if (!window.gtag) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
