import P from '../../Atoms/Paragraph/P.tsx';

const FilterMenu = () => {
  return (
    <aside
      style={{
        width: '25rem',
        backgroundColor: 'lightBlue',
        padding: '1rem',
        margin: '0',
        borderRadius: '0 0.5rem 0.5rem 0',
        position: 'fixed',
        zIndex: '3',
        left: '-25rem',
        transform: 'translateX(0)',
        transition: 'translate 300ms ease-in-out',
        boxShadow: '0.2rem 0.2rem 0.5rem rgba(0, 0, 0, 0.15)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '2rem',
          left: '25rem',
          backgroundColor: 'lightblue',
          borderRadius: '0 0 0.5rem 0.5rem',
          margin: '0',
          padding: '0.2rem 2rem 0.5rem',
          transformOrigin: '0 0',
          transform: 'rotate(-90deg) translateX(-100%)',
          boxShadow: '-0.2rem 0.2rem 0.5rem rgba(0, 0, 0, 0.15)',
          cursor: 'pointer',
        }}
      >
        <P weight={'bold'}>Filters</P>
      </div>
      <div>
        <P weight={'bold'}>Label1</P>
        <ul style={{ listStyle: 'none' }}>
          <li>
            <input type={'checkbox'} /> Element 1
          </li>
          <li>
            <input type={'checkbox'} /> Element 2
          </li>
          <li>
            <input type={'checkbox'} /> Element 3
          </li>
          <li>
            <input type={'checkbox'} /> Element 4
          </li>
          <li>
            <input type={'checkbox'} /> Element 5
          </li>
        </ul>
        <P weight={'bold'}>Label2</P>
        <ul style={{ listStyle: 'none' }}>
          <li>
            <input type={'checkbox'} /> Element 1
          </li>
          <li>
            <input type={'checkbox'} /> Element 2
          </li>
          <li>
            <input type={'checkbox'} /> Element 3
          </li>
          <li>
            <input type={'checkbox'} /> Element 4
          </li>
          <li>
            <input type={'checkbox'} /> Element 5
          </li>
        </ul>
        <P weight={'bold'}>Label3</P>
        <ul style={{ listStyle: 'none' }}>
          <li>
            <input type={'checkbox'} /> Element 1
          </li>
          <li>
            <input type={'checkbox'} /> Element 2
          </li>
          <li>
            <input type={'checkbox'} /> Element 3
          </li>
          <li>
            <input type={'checkbox'} /> Element 4
          </li>
          <li>
            <input type={'checkbox'} /> Element 5
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default FilterMenu;
