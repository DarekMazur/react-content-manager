import Heading from '../../components/Atoms/Heading/Heading.tsx';
import { faker } from '@faker-js/faker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { theme } from '../../utils/themes/theme.ts';
import { getDate } from '../../utils/methods/getDate.ts';
import InLink from '../../components/Atoms/InLink/InLink.tsx';
import styled from 'styled-components';
import { useState } from 'react';

const StyledTable = styled.table`
  width: 95vw;
  border-radius: 0.7rem;
  border: ${({ theme }) => `0.1rem solid ${theme.colors.darkBlue}`};
  border-spacing: 0;

  thead {
    tr {
      color: ${({ theme }) => theme.colors.white};
    }

    th {
      height: 4rem;
      font-weight: ${({ theme }) => theme.fontWeight.regular};
      background-color: ${({ theme }) => theme.colors.darkBlue};

      &:first-of-type {
        border-radius: 0.7rem 0 0 0;
      }

      &:last-of-type {
        border-radius: 0 0.7rem 0 0;
      }
    }
  }

  tbody {
    width: 90vw;

    tr {
      position: relative;

      &::after {
        position: absolute;
        content: '';
        left: 1vw;
        width: 93vw;
        border-bottom: ${({ theme }) =>
          `1px solid ${theme.colors.darkBlueTransparent}`};
      }
    }

    td {
      text-align: center;
      padding: 0 1rem;
    }
  }
`;

const Articles = () => {
  const Icons = () => {
    return (
      <>
        <InLink
          target={'/article/id=123'}
          name={
            <FontAwesomeIcon
              style={{ margin: '0 1rem' }}
              icon={['fas', 'pen']}
            />
          }
        />
        <InLink
          target={'/article/id=123?del'}
          name={
            <FontAwesomeIcon
              style={{ margin: '0 1rem' }}
              icon={['fas', 'trash']}
            />
          }
        />
      </>
    );
  };

  const tempFakePosts = [];

  for (let i = 0; i < 5; i++) {
    const post = {
      title: faker.lorem.sentence({ min: 2, max: 5 }),
      author: faker.person.fullName(),
      status: faker.datatype.boolean(),
      sticky: faker.datatype.boolean(),
      categories: `${faker.lorem.word()}, ${faker.lorem.word()}`,
      comments: faker.number.int({ min: 0, max: 100 }),
      likes: faker.number.int({ min: 0, max: 1000 }),
      publishedAt: getDate(faker.date.recent()),
      actions: Icons,
    };

    tempFakePosts.push(post);
  }

  const tableHeaders = [
    '',
    'ID',
    'Status',
    'Title',
    'Author',
    'Sticky',
    'Categories',
    'Comments',
    'Likes',
    'Published at',
    '',
  ];

  const [isExpand, setIsExpand] = useState(false);
  const [perPage, setPerPage] = useState(10);

  const handleExpand = () => {
    setIsExpand((prevState) => !prevState);
  };

  const handleChoseEntriesNumber = (value: number) => {
    setIsExpand(false);
    setPerPage(value);
  };

  return (
    <main>
      <Heading tag="h2" align="center" size="l">
        Articles
      </Heading>
      <div
        style={{
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StyledTable>
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tempFakePosts.map((post, index) => (
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
                <td style={{ textAlign: 'left' }}>{post.actions()}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </div>
      <div style={{ margin: '1rem 2.5vw', display: 'flex', gap: '1rem' }}>
        <div style={{ position: 'relative', width: '5rem' }}>
          <div
            role="select"
            onClick={handleExpand}
            style={{ cursor: 'pointer' }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '3rem',
                textAlign: 'right',
                paddingRight: '1rem',
              }}
            >
              {perPage}
            </span>
            <span>
              <FontAwesomeIcon
                style={{ fontSize: '1.2rem' }}
                icon={['fas', 'chevron-down']}
              />
            </span>
          </div>
          <ul
            style={{
              listStyle: 'none',
              display: isExpand ? 'block' : 'none',
              position: 'absolute',
              left: 0,
              top: '1rem',
              padding: 0,
              width: '5rem',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            {[10, 25, 50, 100].map((value) => (
              <li
                key={value}
                role="option"
                style={{
                  padding: '0.3rem 0',
                  color:
                    perPage === value
                      ? theme.colors.darkBlue
                      : theme.colors.blue,
                }}
                onClick={() => handleChoseEntriesNumber(value)}
                value={value}
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
        <span>articles per page</span>
      </div>
    </main>
  );
};

export default Articles;
