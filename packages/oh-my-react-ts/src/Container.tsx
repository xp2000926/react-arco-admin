import { PropsWithChildren } from 'react';

type Props = {
  title: string;
};

export const Container = ({ title, children }: PropsWithChildren<Props>) => {
  return (
    <div style={{ border: '1px solid #000', padding: '0 15px 20px' }}>
      <h1>{title}</h1>
      <div>{children}</div>
    </div>
  );
};
