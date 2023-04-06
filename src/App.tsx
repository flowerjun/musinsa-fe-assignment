import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import { IFilter } from './@types/Filter';
import { IGoods } from './@types/Goods';
import { fetchGoods } from './api/fetchGoods';
import { iconImagePath, SVGIcon } from './assets/assets-path';
import GoodsImage from './components/goods/GoodsImage';
import GoodsInfo from './components/goods/GoodsInfo';
import HeaderFilters from './components/header/HeaderFilters';
import HeaderTitle from './components/header/HeaderTitle';
import useInfiniteScroll from './hooks/useInfinteScroll';
import GlobalStyle from './theme/GlobalStyle';
import { color } from './theme/theme';
import uuidv4 from './util/uuidv4';

// ----------------------------------------------------------------------

const AppWrapper = styled.div`
  flex-direction: column;
  width: 375px;
  height: auto;
  margin: 0 auto;
`;

const GoodsListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 115px;
`;

const rotate = keyframes`
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  position: relative;
`;

const Loading = styled.div`
  position: absolute;
  width: 14px;
  height: 14px;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);

  animation: ${rotate} 1s linear infinite;
`;

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 375px;
  height: calc(100vh - 50px);
  justify-content: center;
  align-items: center;

  color: ${color.oldGray6};
`;

export default function App() {
  const [page, setPage] = useState<number>(0);
  const [goodsList, setGoodsList] = useState<IGoods[]>([]);
  const [filteredGoodsList, setFilteredGoodsList] = useState<IGoods[]>([]);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filter, setFilter] = useState<IFilter>({
    exclusive: false,
    sale: false,
    soldOut: false,
    search: false,
    searchKeyword: '',
  });

  const intersectRef = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useInfiniteScroll(intersectRef, {
    rootMargin: '0px',
    threshold: 0.6,
  });

  useEffect(() => {
    fetchMoreGoods();
  }, []);

  useEffect(() => {
    if (!isLastPage && !isLoading && isIntersecting) fetchMoreGoods();
  }, [isLastPage, isLoading, isIntersecting]);

  useEffect(() => {
    const filteredGoods = goodsList.filter((goods: IGoods) => {
      if (
        filter.searchKeyword &&
        !(
          goods.goodsName.includes(filter.searchKeyword) ||
          goods.brandName.includes(filter.searchKeyword)
        )
      ) {
        return false;
      }

      if (filter.exclusive && !goods.isExclusive) {
        return false;
      }

      if (filter.sale && !goods.isSale) {
        return false;
      }

      if (!filter.soldOut && goods.isSoldOut) {
        return false;
      }

      return true;
    });

    setFilteredGoodsList(filteredGoods);
  }, [goodsList, filter]);

  const fetchMoreGoods = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const loadedGoods = await fetchGoods(page);

    if (loadedGoods.length === 0) {
      setIsLastPage(true);
    } else {
      setGoodsList((prev) => [...prev, ...loadedGoods]);
      setPage((prev) => prev + 1);
    }

    setIsLoading(false);
  };

  const handleFilterChange = (name: keyof IFilter) => {
    setFilter((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  return (
    <AppWrapper>
      <GlobalStyle />

      <HeaderTitle />
      <HeaderFilters
        goods={filteredGoodsList}
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />

      <GoodsListWrapper>
        {filteredGoodsList.length > 0 && !isLoading ? (
          filteredGoodsList.map((goods: IGoods) => (
            <div key={uuidv4()}>
              <GoodsImage
                imageUrl={goods.imageUrl}
                alt={goods.goodsName}
                linkUrl={goods.linkUrl}
                isSoldOut={goods.isSoldOut}
              />

              <GoodsInfo
                goodsName={goods.goodsName}
                price={goods.price}
                brandName={goods.brandName}
                linkUrl={goods.linkUrl}
                brandLinkUrl={goods.brandLinkUrl}
                normalPrice={goods.normalPrice}
                isSale={goods.isSale}
                saleRate={goods.saleRate}
                isExclusive={goods.isExclusive}
              />
            </div>
          ))
        ) : (
          <NotFoundWrapper>
            <SVGIcon
              icon={iconImagePath.notFoundIcon}
              size={90}
              style={{ marginBottom: '4px' }}
              boxSize={{ width: 90, height: 90 }}
              viewBox={{ width: 90, height: 90, minX: 0, minY: 0 }}
            />

            <span>검색 결과 없음</span>
          </NotFoundWrapper>
        )}
      </GoodsListWrapper>

      {!isLastPage && !isLoading && (
        <LoadingWrapper ref={intersectRef}>
          <Loading>
            <SVGIcon icon={iconImagePath.loadingIcon} size={16} />
          </Loading>
        </LoadingWrapper>
      )}
    </AppWrapper>
  );
};
