import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IProduct, IProductArray } from "../../Type&Interface/ProductType";
import * as productService from "../../services/productSevice";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Pagination } from "antd";

const TypeProductPage = () => {
  const { state } = useLocation();
  console.log("state in type product-page ", state);

  const [typeProducts, setTypeProduct] = useState<IProductArray>([]);
  const [loading, setLoading] = useState(false);
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 5,
    total: 1,
  });
  const fetchProductType = async (type: any, page: any, limit: any) => {
    setLoading(true);
    const realPage = page > 0 ? page - 1 : 0;
    console.log("realPage", realPage);

    try {
      const res = await productService.getProductType(type, realPage, limit);
      setLoading(false);
      console.log("res fetchProductType", res);
      setTypeProduct(res?.data);
      setPanigate({ ...panigate, total: res?.totalPage });
    } catch (error) {
      console.log("error in fetchProductType ", error);
    }
    setLoading(false);
  };
  console.log("typeProducts", typeProducts.length);

  useEffect(() => {
    if (state) {
      fetchProductType(state, panigate.page, panigate.limit);
    }
  }, [state, panigate.page, panigate.limit]);

  const handlePageChange = (page: number) => {
    console.log("page change", page);
    setPanigate({ ...panigate, page: page });
  };

  return (
    <div>
      {typeProducts &&
        typeProducts.map((typeProduct: IProduct) => (
          <ProductCard product={typeProduct} />
        ))}

      <Pagination
        current={panigate.page}
        total={panigate.total}
        pageSize={panigate.limit}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default TypeProductPage;
