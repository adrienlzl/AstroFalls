export const transformStringValuePipe = (value: string | undefined, transformationMap: { [key: string]: string }): string => {
  if (!value) return "NC";

  const lowerCaseValue = value.toLowerCase();

  if (transformationMap[lowerCaseValue]) {
    return transformationMap[lowerCaseValue];
  }

  return "NC";
};
