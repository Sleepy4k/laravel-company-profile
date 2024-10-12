import { PropsWithChildren } from "react";

const TableBody = ({ children }: PropsWithChildren) => {
  return (
    <tbody className="divide-y divide-neutral-200 bg-white">
      {children}
    </tbody>
  );
};

const Row = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <tr
      className={className}
    >
      {children}
    </tr>
  );
}

const Content = ({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <td
      className={
        "whitespace-nowrap px-4 py-2 text-sm text-neutral-900 " + className
      }
    >
      {children}
    </td>
  );
};

TableBody.Row = Row;
TableBody.Content = Content;

export default TableBody;
