export const getCurrentDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  return yyyy + '-' + mm + '-' + dd;
};

export const getHighestQuality = (formats: Record<string, unknown>) => {
  let highestFormat: Record<string, unknown> | null = null;
  Object.entries(formats).map(([key, value]) => {
    const currentFormat = { [key]: value };
    if (!highestFormat) {
      highestFormat = { ...currentFormat };
    } else {
      highestFormat = findMax(highestFormat, currentFormat);
    }
  });
  if (highestFormat) {
    const format_name = Object.keys(highestFormat)[0];
    const resolution: Record<string, unknown> = highestFormat[format_name];
    return `${format_name} ${resolution.res}`;
  }
  return '';
};

const findMax = (format1: Record<string, unknown>, format2: Record<string, unknown>): Record<string, unknown> => {
  const value1: { res: string; size: number } = Object.values(format1)[0] as { res: string; size: number };
  const value2: { res: string; size: number } = Object.values(format2)[0] as { res: string; size: number };

  if (value1.size > value2.size) {
    // Checking for size
    return format1;
  } else if (value2.size > value1.size) {
    return format2;
  } else if (value2.size == value1.size) {
    // Checking for resolution when size equal
    const resolution1 = getResolution(value1.res);
    const resolution2 = getResolution(value2.res);
    if (resolution1 > resolution2) {
      return format1;
    } else {
      return format2;
    }
  }
  return format1; // default
};

const getResolution = (res: string) => {
  return parseInt(res.replace('p', ''));
};
