import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Goods from "./@types/Goods";
import Header from "./components/Header";
import ProductImage from "./components/ProductImage";
import { BASE_URL, MAX_PAGE } from "./constants/constants";
import useInfiniteScroll from "./hooks/useInfinteScroll";

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Filter = styled.div`
  position: fixed;
  top: 50px;
  left: 0;
  width: 200px;
  background-color: #fff;
  z-index: 100;
  padding: 10px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
`;

const GoodsListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 70px;
  margin-left: 210px;
`;

interface IFilter {
  exclusive: boolean;
  sale: boolean;
  soldOut: boolean;
  searchKeyword: string;
}


export default function App() {
  const [goodsList, setGoodsList] = useState<Goods[]>([]);
  const [filteredGoodsList, setFilteredGoodsList] = useState<Goods[]>([]);
  const [page, setPage] = useState<number>(0);
  const [filter, setFilter] = useState<IFilter>({
    exclusive: false,
    sale: false,
    soldOut: false,
    searchKeyword: "",
  });

  const fetchGoods = async () => {
    try {
    if(page < MAX_PAGE){
      const response = await fetch(`${BASE_URL}${page}.json`);
      const goodsList = await response.json().then(res => res.data.list);

      setPage((prevPage) => prevPage + 1);
      setGoodsList((prevGoodsList) => [...prevGoodsList, ...goodsList]);
      setFilteredGoodsList(prev => [...prev, ...goodsList])
    }
    } catch (error) {
      console.log(error);
    }
  };
  
  const [loaderRef, isIntersecting] = useInfiniteScroll(fetchGoods);

  useEffect(() => {
    // 필터링 로직 구현
    const filteredGoods = goodsList.filter((goods) => {
      // 키워드 검색
      if (filter.searchKeyword && !goods.goodsName.includes(filter.searchKeyword)) {
        return false;
      }

      // 단독 상품 필터
      if (filter.exclusive && !goods.isExclusive) {
        return false;
      }

      // 세일 상품 필터
      if (filter.sale && !goods.isSale) {
        return false;
      }

      // 품절 상품 필터
      if (!filter.soldOut && goods.isSoldOut) {
        return false;
      }

      return true;
    });

    setFilteredGoodsList(filteredGoods);
  }, [goodsList, filter]);

  const handleFilterChange = (name: keyof IFilter) => {
    setFilter((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilter((prevState) => ({
      ...prevState,
      searchKeyword: value,
    }));
  };



  return (
    <AppWrapper>
      <Header/>
      <Filter>
        <div>
          <label htmlFor="search">검색</label>
          <input
            type="text"
            id="search"
            value={filter.searchKeyword}
            onChange={handleSearchInputChange}
          />
        </div>
        <div>
          <label htmlFor="sale">세일상품</label>
          <input
            type="checkbox"
            id="sale"
            checked={filter.sale}
            onChange={() => handleFilterChange("sale")}
          />
        </div>
        <div>
          <label htmlFor="exclusive">단독상품</label>
          <input
            type="checkbox"
            id="exclusive"
            checked={filter.exclusive}
            onChange={() => handleFilterChange("exclusive")}
          />
        </div>
        <div>
          <label htmlFor="soldOut">품절포함</label>
          <input
            type="checkbox"
            id="soldOut"
            checked={filter.soldOut}
            onChange={() => handleFilterChange("soldOut")}
          />
        </div>
      </Filter>

      <GoodsListWrapper>
        {filteredGoodsList.map((goods: Goods, i: number) => (
          <div key={goods.goodsNo + i}>
            <ProductImage imageUrl={goods.imageUrl} alt={goods.goodsName} />
            <p>{goods.goodsName}</p>
            <p>{goods.normalPrice}</p>
            {goods.isSale && <p style={{ backgroundColor: 'blue'}}>{goods.price}</p>}
            {goods.isExclusive && <p style={{ backgroundColor: 'yellow'}}>단독</p>}
            {goods.isSoldOut && <p style={{ backgroundColor: 'red'}}>Sold Out</p>}
          </div>
          ))
        }
      </GoodsListWrapper>

      <div ref={loaderRef}>
        {isIntersecting && page < MAX_PAGE && <p>Loading...</p>}
      </div>
    </AppWrapper>
  );
}
