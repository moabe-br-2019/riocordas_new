interface Env {
  baserow_token: string;
}

interface FormData {
  "Nome do cliente": string;
  "Data do evento": string;
  "Local do evento": string;
  "Número de convidados": number;
  "Email": string;
  "Telefone": string;
  "Mensagem": string;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    // Parse the request body
    const data: FormData = await context.request.json();

    // Validate required fields
    if (!data["Nome do cliente"] || !data["Email"] || !data["Telefone"]) {
      return new Response(
        JSON.stringify({ error: "Campos obrigatórios não preenchidos" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Get the API token from environment variable
    const apiToken = context.env.baserow_token;

    if (!apiToken) {
      console.error("baserow_token not found in environment variables");
      return new Response(
        JSON.stringify({ error: "Configuração do servidor incorreta" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Submit to Baserow
    const response = await fetch(
      "https://api.baserow.io/api/database/rows/table/258308/?user_field_names=true",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Baserow API error:", errorData);
      return new Response(
        JSON.stringify({ error: "Erro ao enviar para Baserow", details: errorData }),
        {
          status: response.status,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const result = await response.json();

    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error processing form submission:", error);
    return new Response(
      JSON.stringify({
        error: "Erro interno do servidor",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
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
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
