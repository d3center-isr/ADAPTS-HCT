// Setting up Types for everything -- TODO: Move this to a seperate file in utils so that it can 
// be imported by the message viewer screen, too.
export const ELEMENT_TYPES = ["text", "image", "link"];
export type ElementType = typeof ELEMENT_TYPES[number];

export interface Message {
  name: string;
  /** A list of elements to be displayed */
  elementList: Element[];
  /** ISO-8601 date string -- can be fed into the Date constructor for direct coversion*/
  receivedAt: string | "Unknown";
}

/**
 * A basic component of a Message used by the Messages Interface. contains a "value" and a type label which 
 * allows the Viewer to correctly process it.
 */
export interface Element {
    type: ElementType,
    value: string,
}
