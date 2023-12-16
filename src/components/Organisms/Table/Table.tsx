import { ReactNode, FC } from 'react';
import { StyledTable } from './Table.styles.ts';
import Checkbox from '../../Molecules/Checkbox/Checkbox.tsx';
import StatusInfo from '../../Atoms/StatusInfo/StatusInfo.tsx';

export type TablePostDataTypes = {
  title: string;
  author: string;
  status: boolean;
  sticky: boolean;
  categories: string;
  comments: number;
  likes: number;
  publishedAt: ReactNode;
  actions: ReactNode;
};

interface TableProps {
  headers: Array<string>;
  data: Array<TablePostDataTypes>;
}

const Table: FC<TableProps> = ({ headers, data }) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((post, index) => (
          <tr key={index + 1}>
            <td
              style={{
                height: '6rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
              }}
            >
              <Checkbox isChecked={false} />
            </td>
            <td>{index + 1}</td>
            <td
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 1rem',
              }}
            >
              <StatusInfo status={post.status} />
            </td>
            <td style={{ textAlign: 'left' }}>{post.title}</td>
            <td style={{ textAlign: 'left' }}>{post.author}</td>
            <td>
              <Checkbox isChecked={post.sticky} />
            </td>
            <td>{post.categories}</td>
            <td>{post.comments}</td>
            <td>{post.likes}</td>
            <td>{post.status ? post.publishedAt : '-'}</td>
            <td style={{ textAlign: 'left' }}>{post.actions}</td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;
