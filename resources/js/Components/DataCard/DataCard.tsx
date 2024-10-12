import { PropsWithChildren } from "react";

const DataCard = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex bg-gray-100">
      <div className="flex lg:flex-row flex-col lg:space-x-4 space-x-0 lg:space-y-0 space-y-4 w-full">
        {children}
      </div>
    </div>
  );
};

const Box = ({ children }: PropsWithChildren) => {
  return (
    <div className="lg:w-1/2 w-full overflow-hidden bg-white rounded shadow">
      <div className="grid gap-8 p-8 lg:grid-cols-1">{children}</div>
    </div>
  );
};

DataCard.Box = Box;

export default DataCard;
