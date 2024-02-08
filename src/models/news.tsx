import { Section } from "./section";
import { Subsection } from "./subsection";

export interface News {
  id?: string;
  image?: string;
  news_metadata?: NewsMetadata;
  created_At?: Date;
  updated_At?: Date;
  status?: boolean;
}

export interface NewsMetadata {
  title?: string;
  category?: string;
  language?: string;
  content?: NewsContent;
}

export interface NewsContent {
  id?: any;
  type?: string;
  content?: any;
}
