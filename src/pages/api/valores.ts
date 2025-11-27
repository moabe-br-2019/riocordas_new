import type { APIRoute } from 'astro';

interface Env {
  baserow_token?: string;
  BASEROW_API_TOKEN?: string;
  [key: string]: any;
}

interface PricingData {
  id: number;
  [key: string]: any;
}

export const GET: APIRoute = async ({ locals }) => {
  try {
    // Get the token from environment
    // In production (Cloudflare Pages): from locals.runtime.env
    // In development: from process.env
    let apiToken = '';

    console.log('🔍 DEBUG: locals type:', typeof locals);

    // Try to get from Cloudflare context (production)
    if (locals && typeof locals === 'object' && 'runtime' in locals) {
      console.log('🔍 DEBUG: locals.runtime exists');
      const runtime = (locals as any).runtime;
      if (runtime && 'env' in runtime) {
        console.log('🔍 DEBUG: runtime.env exists, keys:', Object.keys(runtime.env || {}));
        const env = runtime.env as Env;
        // Try BASEROW_API_TOKEN first (standard), then baserow_token (lowercase)
        apiToken = env?.BASEROW_API_TOKEN || env?.baserow_token || '';
      }
    }

    // Fallback to process.env if runtime didn't work (development local)
    if (!apiToken) {
      console.log('🔍 DEBUG: Falling back to process.env');
      console.log('🔍 DEBUG: process.env keys containing "BASEROW" or "baserow":',
        Object.keys(process.env).filter(k => k.toLowerCase().includes('baserow')));
      apiToken = process.env.BASEROW_API_TOKEN || process.env.baserow_token || '';
    }

    console.log('🔐 Token check: ', apiToken ? `Found (${apiToken.substring(0, 10)}...)` : 'Not found');
    console.log('🔑 Token length:', apiToken.length);
    if (apiToken) {
      console.log('🔑 Token ends with:', JSON.stringify(apiToken.slice(-5)));
    }

    if (!apiToken) {
      console.error('BASEROW_API_TOKEN not found in environment variables');
      return new Response(
        JSON.stringify({ error: 'Configuração do servidor incorreta' }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    // Trim whitespace from token
    const cleanToken = apiToken.trim();
    console.log('🧹 Clean token:', cleanToken.substring(0, 10) + '...');

    // First request: Get package sample data with images from table 258305
    const packageSampleResponse = await fetch(
      'https://api.baserow.io/api/database/rows/table/258305/?user_field_names=true',
      {
        method: 'GET',
        headers: {
          'Authorization': `Token ${cleanToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Accept-Encoding': 'gzip, deflate, br',
        },
      }
    );

    if (!packageSampleResponse.ok) {
      const errorText = await packageSampleResponse.text();
      console.error('Package sample API error response:', errorText);
      throw new Error(`Package sample API error: ${packageSampleResponse.statusText}`);
    }

    const packageSampleContentType = packageSampleResponse.headers.get('content-type');
    console.log('📦 Package sample content-type:', packageSampleContentType);

    let packageSampleResult;
    try {
      packageSampleResult = await packageSampleResponse.json();
    } catch (parseError) {
      const bodyText = await packageSampleResponse.text();
      console.error('Failed to parse package sample response:', bodyText.substring(0, 500));
      throw new Error(`Failed to parse package sample response: ${parseError}`);
    }
    const packageSampleData: { [key: string]: any } = {};

    // Map package sample data by ID for easy lookup
    (packageSampleResult.results || []).forEach((pkg: any) => {
      packageSampleData[pkg.id] = pkg;
    });

    // Second request: Get pricing data from table 258304
    const pricingResponse = await fetch(
      'https://api.baserow.io/api/database/rows/table/258304/?user_field_names=true',
      {
        method: 'GET',
        headers: {
          'Authorization': `Token ${cleanToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Accept-Encoding': 'gzip, deflate, br',
        },
      }
    );

    if (!pricingResponse.ok) {
      const errorText = await pricingResponse.text();
      console.error('Pricing API error response:', errorText);
      throw new Error(`Pricing API error: ${pricingResponse.statusText}`);
    }

    const pricingContentType = pricingResponse.headers.get('content-type');
    console.log('💰 Pricing content-type:', pricingContentType);

    let pricingResult;
    try {
      pricingResult = await pricingResponse.json();
    } catch (parseError) {
      const bodyText = await pricingResponse.text();
      console.error('Failed to parse pricing response:', bodyText.substring(0, 500));
      throw new Error(`Failed to parse pricing response: ${parseError}`);
    }
    let pricingData: PricingData[] = pricingResult.results || [];

    console.log('📊 Package sample data loaded:', Object.keys(packageSampleData).length, 'items');
    console.log('💰 Pricing data loaded:', pricingData.length, 'items');

    if (pricingData.length > 0) {
      console.log('🔍 Sample pricing item:', JSON.stringify(pricingData[0], null, 2));
    }

    // Get the current year for filtering
    const currentYear = new Date().getFullYear();

    // Filter by current year (or the most recent year if current year not available)
    const yearFiltered = pricingData.filter((item: PricingData) =>
      item.year === currentYear || item['year'] === currentYear
    );

    if (yearFiltered.length > 0) {
      pricingData = yearFiltered;
    }

    // Enrich pricing data with package sample information
    // The packageSample relationship in Baserow may be stored as an array or object
    pricingData = pricingData.map((pricing: any) => {
      let packageSample = null;

      // Try different possible field names for the package sample relationship
      const packageRelation = pricing['Pacote Sample'] || pricing.packageSample || pricing['package_sample'] || pricing.package || null;

      if (packageRelation) {
        // If it's an array (Baserow may return related records as arrays), get the first item
        const packageItem = Array.isArray(packageRelation) ? packageRelation[0] : packageRelation;

        // Extract the ID from the relationship object if it has an 'id' field
        const packageId = packageItem?.id || packageItem;

        // Look up the full package data from packageSampleData
        packageSample = packageSampleData[packageId] || null;
      }

      return {
        ...pricing,
        packageSample: packageSample || null,
      };
    });

    console.log('✅ Returning', pricingData.length, 'pricing items with enriched package data');

    return new Response(
      JSON.stringify({
        success: true,
        pricing: pricingData,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Error fetching data:', errorMessage);

    // Return detailed error response for debugging
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Erro ao buscar dados',
        message: errorMessage,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
};

// Handle OPTIONS request for CORS preflight
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
