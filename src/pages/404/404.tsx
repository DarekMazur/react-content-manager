import { Bg404, Styled404, Wrapper404 } from './404.styles.ts';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Page404 = () => {
  const { t } = useTranslation();

  return (
    <Styled404>
      <div>
        <Bg404>
          <h1>404</h1>
        </Bg404>
        <Wrapper404>
          <h3 className="h2">{t('404.header')}</h3>
          <p>{t('404.description')}</p>
          <Link to={'/'}>{t('404.cta')}</Link>
        </Wrapper404>
      </div>
    </Styled404>
  );
};

export default Page404;
