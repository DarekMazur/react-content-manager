import Heading from '../../components/Atoms/Heading/Heading.tsx';
import { faker } from '@faker-js/faker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { theme } from '../../utils/themes/theme.ts';

const Articles = () => {
  const fakeStatus = faker.datatype.boolean();
  const fakeSticky = faker.datatype.boolean();

  return (
    <main>
      <Heading tag="h2" align="center" size="l">
        Articles
      </Heading>
      <table
        style={{
          width: '95vw',
          maxWidth: '120rem',
          borderRadius: '0.7rem',
          border: `0.1rem solid ${theme.colors.darkBlue}`,
          borderSpacing: 0,
        }}
      >
        <thead
          style={{
            backgroundColor: theme.colors.darkBlue,
            color: theme.colors.white,
          }}
        >
          <tr>
            <th
              style={{
                fontWeight: theme.fontWeight.regular,
              }}
            ></th>
            <th
              style={{
                fontWeight: theme.fontWeight.regular,
              }}
            >
              ID
            </th>
            <th
              style={{
                fontWeight: theme.fontWeight.regular,
              }}
            >
              Title
            </th>
            <th
              style={{
                fontWeight: theme.fontWeight.regular,
              }}
            >
              Author
            </th>
            <th
              style={{
                fontWeight: theme.fontWeight.regular,
              }}
            >
              Status
            </th>
            <th
              style={{
                fontWeight: theme.fontWeight.regular,
              }}
            >
              Sticky
            </th>
            <th
              style={{
                fontWeight: theme.fontWeight.regular,
              }}
            >
              Categories
            </th>
            <th
              style={{
                fontWeight: theme.fontWeight.regular,
              }}
            >
              Comments
            </th>
            <th
              style={{
                fontWeight: theme.fontWeight.regular,
              }}
            >
              Likes
            </th>
            <th
              style={{
                fontWeight: theme.fontWeight.regular,
              }}
            >
              Published at
            </th>
            <th
              style={{
                fontWeight: theme.fontWeight.regular,
              }}
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
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
            <td>1</td>
            <td>{faker.lorem.sentence({ min: 2, max: 5 })}</td>
            <td>{faker.person.fullName()}</td>
            <td>
              <span
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '1.6rem',
                  height: '1.6rem',
                  borderRadius: '0.4rem',
                  border: `0.1rem solid ${theme.colors.darkBlue}`,
                  backgroundColor: fakeStatus
                    ? theme.colors.darkBlue
                    : 'transparent',
                  padding: '0.2rem',
                }}
              >
                {fakeStatus ? (
                  <FontAwesomeIcon
                    style={{
                      color: fakeStatus
                        ? theme.colors.white
                        : theme.colors.darkBlue,
                      fontSize: '1.4rem',
                    }}
                    icon={['fas', 'check']}
                  />
                ) : null}
              </span>
            </td>
            <td>
              <span
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '1.6rem',
                  height: '1.6rem',
                  borderRadius: '0.4rem',
                  border: `0.1rem solid ${theme.colors.darkBlue}`,
                  backgroundColor: fakeSticky
                    ? theme.colors.darkBlue
                    : 'transparent',
                  padding: '0.2rem',
                }}
              >
                {fakeSticky ? (
                  <FontAwesomeIcon
                    style={{
                      color: fakeSticky
                        ? theme.colors.white
                        : theme.colors.darkBlue,
                      fontSize: '1.4rem',
                    }}
                    icon={['fas', 'check']}
                  />
                ) : null}
              </span>
            </td>
            <td>
              {faker.lorem.word()}, {faker.lorem.word()}
            </td>
            <td>{faker.number.int({ min: 0, max: 100 })}</td>
            <td>{faker.number.int({ min: 0, max: 1000 })}</td>
            <td>23.11.2023, 21:28</td>
            <td>
              <FontAwesomeIcon icon={['fas', 'pen']} />
              <FontAwesomeIcon icon={['fas', 'trash']} />
            </td>
          </tr>
          <tr>
            <td>
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
            <td>2</td>
            <td>{faker.lorem.sentence({ min: 2, max: 5 })}</td>
            <td>{faker.person.fullName()}</td>
            <td>
              <span
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '1.6rem',
                  height: '1.6rem',
                  borderRadius: '0.4rem',
                  border: `0.1rem solid ${theme.colors.darkBlue}`,
                  backgroundColor: fakeStatus
                    ? theme.colors.darkBlue
                    : 'transparent',
                  padding: '0.2rem',
                }}
              >
                {fakeStatus ? (
                  <FontAwesomeIcon
                    style={{
                      color: fakeStatus
                        ? theme.colors.white
                        : theme.colors.darkBlue,
                      fontSize: '1.4rem',
                    }}
                    icon={['fas', 'check']}
                  />
                ) : null}
              </span>
            </td>
            <td>
              <span
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '1.6rem',
                  height: '1.6rem',
                  borderRadius: '0.4rem',
                  border: `0.1rem solid ${theme.colors.darkBlue}`,
                  backgroundColor: fakeSticky
                    ? theme.colors.darkBlue
                    : 'transparent',
                  padding: '0.2rem',
                }}
              >
                {fakeSticky ? (
                  <FontAwesomeIcon
                    style={{
                      color: fakeSticky
                        ? theme.colors.white
                        : theme.colors.darkBlue,
                      fontSize: '1.4rem',
                    }}
                    icon={['fas', 'check']}
                  />
                ) : null}
              </span>
            </td>
            <td>
              {faker.lorem.word()}, {faker.lorem.word()}
            </td>
            <td>{faker.number.int({ min: 0, max: 100 })}</td>
            <td>{faker.number.int({ min: 0, max: 1000 })}</td>
            <td>11.12.2023, 11:08</td>
            <td>
              <FontAwesomeIcon icon={['fas', 'pen']} />
              <FontAwesomeIcon icon={['fas', 'trash']} />
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};

export default Articles;
