/**
 * Matches express-like URL patterns and extracts data if they do match. This takes a path, and a pattern, and compares the URL to the pattern. A pattern looks like a path, but it has the following extra features:
 * * A segment of the path can be `*`, in which case it will match anything.
 * * A segment of the path can start with `:`, in which case it will match anything and whatever it matches will be stored in the output under the name of anything after the `:` in the current segment.
 * * A segment starting with `:` can end with `?`, making it optional. These must appear last in the pattern.
 * @param path {string} - the path of the request.
 * @param pattern {string - the pattern being matches against.
 * @returns {object} An object containing all of the matches of path segments starting with `:`, or null if it does not match.
 */
export const MatchURLPattern = (path: string, pattern: string) : object => {
  const pathSplit = path.replace(/^\/?(.+?)\/?$/, "$1").split("/");
  const patternSplit = pattern.replace(/^\/?(.+?)\/?$/, "$1").split("/");

  if(pathSplit.length > patternSplit.length || patternSplit.length < 1) return null;

  const output = {};

  for (let i = 0; i < patternSplit.length; i++){
    const pathSegment = pathSplit[i];
    const patternSegment = patternSplit[i];

    if(pathSegment == null) {
      if(patternSegment.endsWith("?")) break;
      else return null;
    }

    if(patternSegment === "*" || patternSegment === pathSegment) continue;

    if(patternSegment.startsWith(":")) {
      output[patternSegment.replace(/^:(.+?)\??$/, "$1")] = pathSegment;
      continue;
    }

    return null;
  }

  return output;
};