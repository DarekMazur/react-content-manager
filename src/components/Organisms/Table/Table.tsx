import { ReactNode, FC } from 'react';
import { theme } from '../../../utils/themes/theme.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledTable } from './Table.styles.ts';

type DataTypes = {
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
  data: Array<DataTypes>;
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
              <span
                style={{
                  display: 'block',
                  width: '1.6rem',
                  height: '1.6rem',
                  borderRadius: '0.4rem',
                  border: `0.1rem solid ${theme.colors.darkBlue}`,
                }}
              />
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
              <span
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '1.6rem',
                  height: '1.6rem',
                  borderRadius: '50%',
                  backgroundColor: post.status
                    ? theme.colors.green
                    : theme.colors.brightBlue,
                  padding: '0.2rem',
                }}
              />
            </td>
            <td style={{ textAlign: 'left' }}>{post.title}</td>
            <td style={{ textAlign: 'left' }}>{post.author}</td>
            <td>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0 1rem',
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '1.6rem',
                    height: '1.6rem',
                    borderRadius: '0.4rem',
                    border: `0.1rem solid ${theme.colors.darkBlue}`,
                    backgroundColor: post.sticky
                      ? theme.colors.darkBlue
                      : 'transparent',
                    padding: '0.2rem',
                  }}
                >
                  {post.sticky ? (
                    <FontAwesomeIcon
                      style={{
                        color: post.sticky
                          ? theme.colors.white
                          : theme.colors.darkBlue,
                        fontSize: '1.4rem',
                      }}
                      icon={['fas', 'check']}
                    />
                  ) : null}
                </span>
              </span>
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
