export const toArray = (element: any): any[] => {
  return Array.isArray(element) ? element : [element];
}
