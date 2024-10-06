//export const dynamic = 'force-dynamic'

export async function GET(req) {
  console.log(req.url)
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || 'world';
  console.log(category)
  const lang = searchParams.get('lang') || 'en';
  const country = searchParams.get('country') || 'wo';
  
  
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;;
  let url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&category=${category}&language=${lang}&removeduplicate=1`;

  if (country && country !== 'Global') {
   console.log(country);
   url += `&country=${country}`;
   console.log(url)
  }
 
  // Revalidate information every two hours
  const response = await fetch(url, { next: { revalidate: 7200 } });
  
  const data = await response.json();
  
  return Response.json({ data })
}