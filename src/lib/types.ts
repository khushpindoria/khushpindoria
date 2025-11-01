export interface PhotographyEvent {
  title: string;
  coverPhotoUrl: string;
  photos?: { url: string }[];
}

export interface DjMix {
  name: string;
  src: string;
}
