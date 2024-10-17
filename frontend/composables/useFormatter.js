import dayjs from "dayjs";

export default () => {
  return {
    date(value, fallback = null) {
      if (!value) return fallback;
      return dayjs(value).format("DD/MM/YYYY");
    },
  };
};
