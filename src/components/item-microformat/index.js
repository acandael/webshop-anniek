import DocumentItem from './document-item';
import ProductItem from './product-item';
import FolderItem from './folder-item';
import WebshopItem from './webshop-item';
import BrandItem from './brand-item';
import ProductLineItem from './productline-item';
import CategoryItem from './category-item';

export default function ItemMicroformat({ item }) {
  if (!item) {
    return null;
  }

  const types = {
    product: <ProductItem data={item} key={item.path} />,
    folder: <FolderItem data={item} key={item.path} />,
    document: <DocumentItem data={item} key={item.path} />,
    webshop: <WebshopItem data={item} key={item.path} />,
    brand: <BrandItem data={item} key={item.path} />,
    productline: <ProductLineItem data={item} key={item.path} />,
    category: <CategoryItem data={item} key={item.path} />
  };
  
  return types[item.type] || null;
}
