export interface Product {
  id: number;
  Name: string;
  Price: number;
  Description: string;
  discountPrice?: number;
  imageUrl: string;
  category: string;
}

// Define the expected shape of the Strapi product response
interface StrapiProduct {
  id: number;
  Name: string;
  Description: string;
  Price: number;
  discountPrice?: number;
  Image?: { url: string };
  category?: { Name: string };
}

export async function getProductsByCategory(): Promise<Record<string, Product[]>> {
  try {
    const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    if (!API_URL) throw new Error("NEXT_PUBLIC_STRAPI_API_URL is not defined");

    // Add pagination with a large pageSize to get all products at once
    const response = await fetch(`${API_URL}/api/products?populate=*`, {
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

    const allProducts = (data as StrapiProduct[]).map((item) => ({
      id: item.id,
      Name: item.Name,
      Description: item.Description,
      Price: item.Price,
      discountPrice: item.discountPrice,
      imageUrl: item.Image?.url || '', // Use the absolute URL from Strapi if present
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
