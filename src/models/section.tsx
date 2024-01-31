import { Document } from "./document";
import { Subsection } from "./subsection";

export interface Section {
  id?: string;
  name: string;
  type?: string;
  description?: string;
  priority?: number;
  status?: boolean;
  url?: string;
  documents?: Document[];
  subsection?: Subsection[];
}
