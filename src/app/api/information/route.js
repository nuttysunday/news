export async function GET(request) {
  const searchParams = request.nextUrl.searchParams
  const category = searchParams.get('category') || 'world';
  const lang = searchParams.get('lang') || 'en';
  const country = searchParams.get('country') || 'wo';
  
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
  let url = `https://newsdata.io/api/1/latest?apikey=${apiKey}&category=${category}&language=${lang}&removeduplicate=1`;

  if (country) {
    url += `&country=${country}`;
  }

  console.log('API Request URL:', url); // Log when API request is made

  // Fetch with revalidation every 12 hours
  const response = await fetch(url, { next: { revalidate: 3600 } })

  console.log(response)

  if (response.headers.get('x-vercel-cache') === 'HIT') {
    console.log('Cache hit'); // Log when the cache is used
  } else {
    console.log('Cache miss, API call made'); // Log when a fresh API call is made
  }

  const data = await response.json();

  return Response.json({ data });
}
