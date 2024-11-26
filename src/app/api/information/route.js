//export const dynamic = 'force-dynamic'

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || 'world';
  const lang = searchParams.get('lang') || 'en';
  const country = searchParams.get('country') || 'wo';
  
  
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;;
  let url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&category=${category}&language=${lang}&removeduplicate=1`;

  if (country && country !== 'Global') {
   url += `&country=${country}`;
  }
 
  // Revalidate information every two hours
  const response = await fetch(url, { next: { revalidate: 43200 } });
  
  const data = await response.json();
  console.log(data)
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=14400, stale-while-revalidate=7200",
    },
  });
}