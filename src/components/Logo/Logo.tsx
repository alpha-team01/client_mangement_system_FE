import { Flex, FlexProps, theme, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { CSSProperties } from 'react';

import './styles.css';

type LogoProps = {
  color: CSSProperties['color'];
  imgSize?: {
    h?: number | string;
    w?: number | string;
  };
  asLink?: boolean;
  href?: string;
  bgColor?: CSSProperties['backgroundColor'];
} & Partial<FlexProps>;

export const Logo = ({
  asLink,
  color,
  href,
  imgSize,
  bgColor,
  ...others
}: LogoProps) => {
  const {
    token: { borderRadius },
  } = theme.useToken();

  return asLink ? (
    <Link to={href || '#'} className="logo-link">
      <Flex gap={others.gap || 'small'} align="center" {...others}>
        <img
          src="/logo-no-background.png"
          alt="design sparx logo"
          height={imgSize?.h || 48}
        />
      </Flex>
    </Link>
  ) : (
    <Flex gap={others.gap || 'small'} align="center" {...others}>
      <img
        src="/logo-no-background.png"
        alt="design sparx logo"
        height={imgSize?.h || 48}
      />
    </Flex>
  );
};
