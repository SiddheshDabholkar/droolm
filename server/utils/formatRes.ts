type formatResType = {
  data: any;
  isError: boolean;
  message: string;
};

const formatRes = ({ data, isError, message }: formatResType) => {
  return {
    data,
    isError,
    message,
  };
};

export { formatRes };
