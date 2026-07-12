/**
 * Google Maps URLs for the practice address, built from the CMS-managed
 * contact settings so the map follows address changes automatically. Both
 * endpoints are keyless and free: `output=embed` is the classic embeddable
 * iframe view; the search URL is the officially documented Maps URLs format
 * for opening the location on the Google Maps site.
 */
export interface Address {
  addressLine: string;
  postalCode: string;
  city: string;
}

function addressQuery({ addressLine, postalCode, city }: Address): string {
  return encodeURIComponent(`${addressLine}, ${postalCode} ${city}, België`);
}

/** Iframe src for the embedded map, with Dutch UI labels. */
export function mapsEmbedUrl(address: Address): string {
  return `https://www.google.com/maps?q=${addressQuery(address)}&output=embed&hl=nl`;
}

/** Link that opens the same location on the Google Maps site. */
export function mapsLinkUrl(address: Address): string {
  return `https://www.google.com/maps/search/?api=1&query=${addressQuery(address)}`;
}
