import { useState } from 'react';
import styled, { css } from 'styled-components';

import { IGoodsImage } from 'src/@types/Goods';
import { color } from 'src/theme/theme';
import { PREVIEW_IMAGE_URL } from 'src/constants/constants';

// ----------------------------------------------------------------------

const Image = styled.img`
  width: 186.5px;
  height: 226px;
`;

const SoldOutTextWrapper = styled.div<{ isSoldOut: boolean }>`
  display: none;
  position: absolute;
  width: 186.5px;
  height: 226px;

  ${(props) =>
    props.isSoldOut &&
    css`
      display: block;
      background-color: ${color.dimWhite80};
    `};
`;

const SoldOutText = styled.span`
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(0, -50%);
  width: 142.12px;
  height: 22px;
  color: ${color.darkGray};

  font-size: 20px;
  font-weight: 500;
  letter-spacing: 1px;
  line-height: 22px;
`;

export default function GoodsImage({ imageUrl, alt, linkUrl, isSoldOut }: IGoodsImage) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <a href={linkUrl} target='_blank' rel='noopener noreferrer'>
      <SoldOutTextWrapper isSoldOut={isSoldOut}>
        <SoldOutText>SOLD OUT</SoldOutText>
      </SoldOutTextWrapper>
      {imageError ? (
        <Image src={PREVIEW_IMAGE_URL} alt='기본 이미지' />
      ) : (
        <Image src={imageUrl} alt={alt} onError={handleImageError} />
      )}
    </a>
  );
};
