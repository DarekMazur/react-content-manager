import { useTranslation } from 'react-i18next';
import { FC } from 'react';
import { StyledLanguageButton } from './LanguageButton.styles.ts';

interface ILangButtonTypes {
  lang: string;
  src: string;
  alt: string;
}

const LanguageButton: FC<ILangButtonTypes> = ({ lang, src, alt }) => {
  const { i18n } = useTranslation();

  return (
    <StyledLanguageButton
      $opacity={i18n.resolvedLanguage === lang}
      onClick={() => i18n.changeLanguage(lang)}
    >
      <img src={src} alt={alt} />
    </StyledLanguageButton>
  );
};

export default LanguageButton;
