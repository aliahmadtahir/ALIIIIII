export interface Product {
  id: number;
  Name: string;
  Price: number;
  Description: string;
  discountPrice?: number;
  imageUrl: string;
  category: string;
}

export async function getProductsByCategory(): Promise<Record<string, Product[]>> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
    if (!baseUrl) throw new Error("STRAPI_URL is not defined");

    // Add pagination with a large pageSize to get all products at once
    const response = await fetch(`${baseUrl}/api/products?populate=*&pagination[pageSize]=100`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      next: {
        revalidate: 0
      }
    });
    
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const { data } = await response.json();

    const allProducts = (data as Array<{ id: number; Name: string; Description: string; Price: number; discountPrice?: number; category?: { Name: string }; Image?: { url: string } }>).map((item) => ({
      id: item.id,
      Name: item.Name,
      Description: item.Description,
      Price: item.Price,
      discountPrice: item.discountPrice,
      imageUrl: item.Image?.url ? `${baseUrl}${item.Image.url}` : '',
      category: item.category?.Name || 'Uncategorized',
    }));

    // Dynamically group products by category while maintaining order
    const grouped: Record<string, Product[]> = {};
    allProducts.forEach((product: Product) => {
      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }
      grouped[product.category].push(product);
    });

    return grouped;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return {};
  }
}
