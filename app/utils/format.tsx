import dayjs from "dayjs";

const formatUtils = {
  formatDate: (val: string) => {
    if (!val) return "";
    return dayjs(val).add(543, "year").format("DD-MM-YYYY");
  },
  numberFormat(val: any, digit?: number) {
    console.log('val : ',val)
    if (!val) return;
    let digitsOnly = val;
    if (digit) {
      const pureNumber = val.replace(/(?!-)[^0-9.]/g, '');
      digitsOnly =
        pureNumber.indexOf('.') >= 0
          ? pureNumber.substr(0, pureNumber.indexOf('.')) + pureNumber.substr(pureNumber.indexOf('.'), digit + 1)
          : pureNumber;
    } else digitsOnly = val.replace(/\D/g, '');
    return digitsOnly;
  },
};

export default formatUtils;
