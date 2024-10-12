import { PropsWithChildren } from 'react';

const TableHead = ({ children }: PropsWithChildren) => {
  return (
    <thead className="bg-neutral-50">
      <tr>
        {children}
      </tr>
    </thead>
  );
}

const Content = ({ children }: PropsWithChildren) => {
  return (
    <th
      scope="col"
      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-neutral-500"
    >
      {children}
    </th>
  );
}

TableHead.Content = Content;

export default TableHead;
