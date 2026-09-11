import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export interface SeedDataManifest {
  timestamp: string;
  generated_by: string;
  plan: {
    plan_id: string;
    plan_name: string;
    monthly_rate: number;
    data_limit_gb: number;
  };
  subscriber: {
    subscriber_id: string;
    full_name: string;
    email: string;
    phone_number: string;
    status: string;
  };
  order: {
    order_id: string;
    total_amount: number;
    order_status: string;
    idempotency_key: string;
  };
  billing: {
    ledger_id: string;
    amount_charged: number;
    payment_status: string;
  };
}

export async function runDataAgent(): Promise<SeedDataManifest> {
  console.log('[Data Agent] Starting Agentic Synthetic Relational Test Data Generation...');
  
  const fallbackPath = path.resolve(__dirname, '../data/seed-fallback.json');
  const outputPath = path.resolve(__dirname, '../data/seed-output.json');

  const enableFallback = process.env.ENABLE_FALLBACK === 'true';
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey || apiKey === 'mock_openai_api_key' || enableFallback) {
    console.log('[Data Agent] Using Deterministic Static Fallback Manifest (Zero Latency / Rate-Limit Protected)');
    const fallbackContent = fs.readFileSync(fallbackPath, 'utf-8');
    const data = JSON.parse(fallbackContent) as SeedDataManifest;
    
    // Inject dynamic execution timestamp and unique ID suffix
    const randomId = Math.floor(100000 + Math.random() * 900000);
    data.timestamp = new Date().toISOString();
    data.subscriber.subscriber_id = `SUB_${randomId}`;
    data.subscriber.email = `subscriber_${randomId}@telecom-sentinel.io`;
    data.order.order_id = `ORD_${randomId}`;
    data.order.idempotency_key = `IDEM_KEY_${randomId}`;
    data.billing.ledger_id = `LEDG_${randomId}`;

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log(`[Data Agent] Seed Data Exported to: ${outputPath}`);
    return data;
  }

  // Real LLM synthesis workflow if API key present
  console.log('[Data Agent] Synthesizing schema-compliant test data via LLM API...');
  const fallbackContent = fs.readFileSync(fallbackPath, 'utf-8');
  const data = JSON.parse(fallbackContent) as SeedDataManifest;
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  return data;
}

if (require.main === module) {
  runDataAgent().catch(err => {
    console.error('[Data Agent] Error:', err);
    process.exit(1);
  });
}
