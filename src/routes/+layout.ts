export const prerender = false;
export const load = ({ url }) => {
  return {
    url: url.pathname,
    direction: url.searchParams.get("direction")
  }
}