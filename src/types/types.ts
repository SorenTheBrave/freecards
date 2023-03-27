export type GameDisplay = {
  name: string, // display name, with capitalization and punctuation
  code: string, // unique identifier
  type: string,
  description: string,
  tags: string[],
  favorited?: boolean,
}