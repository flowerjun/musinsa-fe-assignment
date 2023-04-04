import { useState } from 'react';
import styled, { css } from 'styled-components';

import { IGoodsImage } from 'src/@types/Goods';
import { color } from 'src/theme/theme';
import { PREVIEW_IMAGE_URL } from 'src/constants/constants';

// ----------------------------------------------------------------------

const Image = styled.img<{ isSoldOut: boolean }>`
  width: 186.5px;
  height: 226px;

  ${(props) =>
    props.isSoldOut &&
    css`
      filter: opacity(20%);
    `};
`;

const SoldOutText = styled.span<{ isSoldOut: boolean }>`
  display: none;
  width: 186.5px;
  height: 226px;

  ${(props) =>
    props.isSoldOut &&
    css`
      display: block;
      position: absolute;
      top: calc(50% + 22px);
      left: 50%;
      transform: translate(-25%, -50%);

      font-size: 20px;
      font-weight: 500;
      letter-spacing: 1px;
      line-height: 22px;
      color: ${color.darkGray};
    `};
`;

export default function GoodsImage({ imageUrl, alt, linkUrl, isSoldOut }: IGoodsImage) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <a href={linkUrl} target="_blank" rel="noopener noreferrer">
      <SoldOutText isSoldOut={isSoldOut}>SOLD OUT</SoldOutText>
      {imageError ? (
        <Image isSoldOut={isSoldOut} src={PREVIEW_IMAGE_URL} alt="기본 이미지" />
      ) : (
        <Image isSoldOut={isSoldOut} src={imageUrl} alt={alt} onError={handleImageError} />
      )}
    </a>
  );
}
