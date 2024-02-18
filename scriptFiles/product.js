


// Product.js



import { productsURL } from './urlCall.js';


fetch(productsURL)
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('thumbnail-image');

    data.forEach(product => {

      const anchor = document.createElement('a');
      
      anchor.href = `/sitePages/product-details.html?id=${product.id}`;
      
  
      const img = document.createElement('img');
      img.src = product.source_url;
      img.alt = product.alt_text || 'Product image';
      img.style.border = '1px solid rgba(59, 53, 48, 0.5)';
      img.style.margin = '1em';
      img.style.borderRadius = '50%';
   


      anchor.appendChild(img);
      
 
      container.appendChild(anchor);
    });
  })
  .catch(error => console.error('Could not fetch the product images:', error));


