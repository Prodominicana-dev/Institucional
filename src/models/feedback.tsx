export interface Feedback {
  id?: string;
  nameOrAlias?: string;
  rating?: number; // 1-5 stars
  testimony?: string;
  createdAt?: Date;
  contactCode?: string;
}
