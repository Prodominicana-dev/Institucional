import { Section } from "./section";
import { Subsection } from "./subsection";

export interface Document {
  id?: string;
  name?: string;
  description?: string;
  path?: string;
  date?: any;
  size?: string;
  period?: string;
  createdAt?: Date;
  sectionId?: string;
  subsectionId?: string;
  section?: Section;
  subsection?: Subsection;
  url?: string;
}
