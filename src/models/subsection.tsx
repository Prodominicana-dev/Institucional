import { Section } from "./section";

export interface Subsection {
  id?: string;
  name?: string;
  type?: string;
  description?: string;
  priority?: number;
  status?: boolean;
  url?: string;
  sectionId?: string;
  section?: Section;
}
