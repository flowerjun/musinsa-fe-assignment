import { BASE_URL } from 'src/constants/constants';

// ----------------------------------------------------------------------

export const fetchGoods = async (page: number) => {
  try {
    const response = await fetch(`${BASE_URL}${page}.json`);
    const goodsList = await response.json().then((res) => res.data.list);

    return goodsList;
  } catch (error) {
    console.log(error);
    return [];
  }
};
