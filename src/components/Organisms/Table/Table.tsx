import { ReactNode, FC, useState } from 'react';
import { StyledTable } from './Table.styles.ts';
import Checkbox from '../../Molecules/Checkbox/Checkbox.tsx';
import StatusInfo from '../../Atoms/StatusInfo/StatusInfo.tsx';
import {
  addSelected,
  removeSelected,
  updateArticle,
} from '../../../store/index.ts';
import { useDispatch } from 'react-redux';
import TableActionIcons from '../../Molecules/TableActionIcons/TableActionIcons.tsx';

export type TablePostDataTypes = {
  title: string;
  author: string;
  status: boolean;
  sticky: boolean;
  categories: string;
  comments: number;
  likes: number;
  publishedAt: ReactNode;
  id: string;
};

interface TableProps {
  headers: Array<string>;
  data: Array<TablePostDataTypes>;
}

const Table: FC<TableProps> = ({ headers, data }) => {
  const dispatch = useDispatch();

  const [checkedArticles, setCheckedArticles] = useState<TablePostDataTypes[]>(
    [],
  );

  const handleClickSelect = (id: string) => {
    const checkedElement = data.find((post) => post.id === id);
    if (checkedElement && checkedArticles.includes(checkedElement)) {
      dispatch(removeSelected(checkedElement));
      setCheckedArticles(
        checkedArticles.filter((article) => article.id !== id),
      );
    } else if (checkedElement) {
      dispatch(addSelected(checkedElement));
      setCheckedArticles((prevState) => [...prevState, checkedElement]);
    }
  };

  const handleClickSticky = (id: string) => {
    const article = data.find((article) => article.id === id);
    const updateSticky = {
      ...article,
      sticky: !article?.sticky,
    };
    dispatch(updateArticle(updateSticky));
    // console.log(articles)
  };

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
              <Checkbox
                handleClick={handleClickSelect}
                id={post.id}
                isChecked={checkedArticles.includes(post)}
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
              <StatusInfo status={post.status} />
            </td>
            <td style={{ textAlign: 'left' }}>{post.title}</td>
            <td style={{ textAlign: 'left' }}>{post.author}</td>
            <td>
              <Checkbox
                isChecked={post.sticky}
                handleClick={handleClickSticky}
                id={post.id}
              />
            </td>
            <td>{post.categories}</td>
            <td>{post.comments}</td>
            <td>{post.likes}</td>
            <td>{post.status ? post.publishedAt : '-'}</td>
            <td style={{ textAlign: 'left' }}>
              <TableActionIcons postId={index + 1} />
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default Table;
