interface Env {
  BASEROW_API_TOKEN: string;
}

interface PricingData {
  id: number;
  [key: string]: any;
}

export async function onRequestGet(context: { request: Request; env: Env }) {
  try {
    const apiToken = context.env.BASEROW_API_TOKEN;

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
    pricingData = pricingData.map((pricing: any) => ({
      ...pricing,
      packageSample: packageSampleData[pricing.id] || null,
    }));

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
