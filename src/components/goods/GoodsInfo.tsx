import styled from 'styled-components';

import { IGoodsInfo } from 'src/@types/Goods';
import { color, font } from 'src/theme/theme';
import GoodsLabel from './GoodsLabel';

// ----------------------------------------------------------------------

const GoodsInfoWrapper = styled.div`
  position: relative;
  flex-direction: column;
  width: 186.5px;
  height: 140px;
  padding: 20px 10px;

  p {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    margin: 0;

    -webkit-line-clamp: 2;
    work-break: break-all;
    white-space: pre-wrap;
  }

  a {
    color: ${color.black};
  }
`;

const GoodsBrandName = styled.a`
  font-size: ${font.subSize}px;
  line-height: 16px;
  font-weight: 400;
`;

const GoodsName = styled.p`
  height: 36px;
  margin-top: 8px;
  margin-bottom: 4px;

  font-size: ${font.defaultSize}px;
  line-height: 18px;
  font-weight: 700;
`;

const GoodsPrice = styled.span<{ isSale: boolean }>`
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;

  ${({ isSale }) =>
    isSale &&
    `
    position: absolute;
    bottom: 20px;

    font-size: ${font.subSize}px;
    line-height: 12px;
    font-weight: 500;
    text-decoration: line-through;
    color: ${color.oldGray6};
  `}
`;

const GoodsSaleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  justify-content: space-between;
`;

const GoodsSalePrice = styled.span`
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
`;

const GoodsSaleRate = styled.span`
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  color: ${color.fRed1};
`;

export default function GoodsInfo({
  goodsName,
  price,
  brandName,
  linkUrl,
  brandLinkUrl,
  normalPrice,
  isSale,
  saleRate,
  isSoldOut,
  isExclusive,
}: IGoodsInfo) {
  return (
    <GoodsInfoWrapper>
      <GoodsBrandName href={brandLinkUrl} target="_blank" rel="noopener noreferrer">
        {brandName}
      </GoodsBrandName>
      <a href={linkUrl} target="_blank" rel="noopener noreferrer">
        <GoodsName>{goodsName}</GoodsName>
        <GoodsPrice isSale={isSale}>{normalPrice.toLocaleString()}원</GoodsPrice>
        {isSale && (
          <GoodsSaleWrapper>
            <GoodsSalePrice>{Number(price).toLocaleString()}원</GoodsSalePrice>
            <GoodsSaleRate>{saleRate}%</GoodsSaleRate>
          </GoodsSaleWrapper>
        )}
        {isExclusive && <GoodsLabel label="단독" color={color.green} />}
      </a>
    </GoodsInfoWrapper>
  );
}
