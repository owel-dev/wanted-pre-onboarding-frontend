export const handleError = (error, work) => {
  const keyValueString = Object.entries(error.response.data)
    .map(([key, value]) => `${key}: ${value}`)
    .join(',\n');
  alert(`${work}에 실패했습니다.\n${keyValueString}`);
};
