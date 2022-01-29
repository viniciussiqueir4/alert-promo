import axios from 'axios';
import cheerio from 'cheerio';

export const fetchData = async (url: string) => {
  console.log('Crawling data...');

  const response: any = await axios(url)
  .catch((err) => {
    console.log('Error:', err);
  });

  if(response.status !== 200) {
    console.log("Error occurred while fetching data");
    return;
  } 
  const html = response.data;
  const $ = cheerio.load(html); 
  const product_name = $('.ui-pdp-header__title-container').text();
  const product_price =$('.price-tag-text-sr-only').text();
  const product_image = $('.ui-pdp-image').attr("data-src");
  console.log('## PRODUCT_IMAGE ##', product_image);
  console.log('## PRODUCT_NAME ##', product_name);
  console.log('## PRODUCT_VALUE ##', product_price.split(' ')[0]);

  return response;
}