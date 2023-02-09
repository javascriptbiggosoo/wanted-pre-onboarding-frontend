const localStorage = window.localStorage;

export const getItem = (key, defaultValue = null) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : defaultValue;
};

export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
    alert(
      "로컬 스토리지에 저장할 수 없습니다. 데이터 총 용량이 5MB를 넘었을 수 있습니다."
    );
  }
};
