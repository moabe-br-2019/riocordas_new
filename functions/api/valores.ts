interface Env {
  BASEROW_API_TOKEN: string;
  baserow_token?: string;
}

interface PricingData {
  id: number;
  [key: string]: any;
}

export async function onRequestGet(context: { request: Request; env: Env }) {
  try {
    const apiToken = context.env.baserow_token || context.env.BASEROW_API_TOKEN;

    if (!apiToken) {
    console.error('baserow_token/BASEROW_API_TOKEN not found in environment variables');
    return new Response(JSON.stringify({ error: 'Configuração do servidor incorreta' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

    // First request: Get package sample data with images from table 258305
    const packageSampleResponse = await fetch(
      'https://api.baserow.io/api/database/rows/table/258305/?user_field_names=true',
      {
        method: 'GET',
        headers: {
          'Authorization': `Token ${apiToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!packageSampleResponse.ok) {
      throw new Error(`Package sample API error: ${packageSampleResponse.statusText}`);
    }

    const packageSampleResult = await packageSampleResponse.json();
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
          'Authorization': `Token ${apiToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!pricingResponse.ok) {
      throw new Error(`Pricing API error: ${pricingResponse.statusText}`);
    }

    const pricingResult = await pricingResponse.json();
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
      const packageRelation = pricing.packageSample || pricing['package_sample'] || pricing.package || null;

      if (packageRelation) {
        // If it's an array (Baserow may return related records as arrays), get the first item
        const packageId = Array.isArray(packageRelation) ? packageRelation[0] : packageRelation;
        // If it's a number/string ID, look it up; if it's already an object, use it directly
        packageSample = typeof packageId === 'object' ? packageId : packageSampleData[packageId];
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
}

// Handle OPTIONS request for CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
