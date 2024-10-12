import { FormEventHandler, PropsWithChildren } from "react";

const FormCard = ({
  onSubmit,
  children,
}: PropsWithChildren<{
  onSubmit?: FormEventHandler<HTMLFormElement> | undefined;
}>) => {
  return (
    <div className="w-full overflow-hidden">
      {onSubmit !== undefined ? (
        <form onSubmit={onSubmit} className="w-full">
          {children}
        </form>
      ) : (
        <div className="w-full">{children}</div>
      )}
    </div>
  );
};

const Box = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex lg:flex-row flex-col lg:space-x-4 space-x-0 lg:space-y-0 space-y-4">
      <div className="lg:w-1/2 w-full grid gap-8 p-8 lg:grid-cols-1 bg-white shadow">{children}</div>
    </div>
  );
};

const Button = ({
  className = "",
  children,
}: PropsWithChildren<{
  className?: string;
}>) => {
  return (
    <div
      className={
        "flex items-center justify-end shadow px-8 py-4 bg-gray-200 border-t border-gray-200 " +
        className
      }
    >
      {children}
    </div>
  );
};

FormCard.Box = Box;
FormCard.Button = Button;

export default FormCard;
