import { Section } from "./section";

export interface Subsection {
  id?: number;
  name?: string;
  description?: string;
  priority?: number;
  status?: boolean;
  url?: string;
  sectionId?: number;
  section?: Section;
}
