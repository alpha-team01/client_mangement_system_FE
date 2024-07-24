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
          src="/Testify-logo-black.png"
          alt="design sparx logo"
          height={imgSize?.h || 48}
        />
        <Flex gap="none" justify='space-around' align='flex-start' vertical>
          <Typography.Title
            level={5}
            type="secondary"
            style={{
              color,
              margin: 0,
              fontSize: '14px',
              padding: `0px`,
              backgroundColor: bgColor,
              borderRadius,
            }}
          >
            Testify
          </Typography.Title>

          <Typography.Text
            style={{
              color: '#000',
              fontSize: '12px',
              padding: `0px`,
              backgroundColor: bgColor,
              borderRadius,
            }}
          >
            Knowledge Unleashed
          </Typography.Text>
        </Flex>
      </Flex>
    </Link>
  ) : (
    <Flex gap={others.gap || 'small'} align="center" {...others}>
      <img
        src="/Testify-logo-black.png"
        alt="design sparx logo"
        height={imgSize?.h || 48}
      />
      <Flex gap="none" justify='space-around' align='flex-start' vertical>
          <Typography.Title
            level={5}
            type="secondary"
            style={{
              color,
              margin: 0,
              fontSize: '14px',
              padding: `0px`,
              backgroundColor: bgColor,
              borderRadius,
            }}
          >
            Testify
          </Typography.Title>

          <Typography.Text
            style={{
              color,
              fontSize: '12px',
              padding: `0px`,
              backgroundColor: bgColor,
              borderRadius,
            }}
          >
            Knowledge Unleashed
          </Typography.Text>
        </Flex>
    </Flex>
  );
};
