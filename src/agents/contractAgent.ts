import fs from 'fs';
import path from 'path';
import { validateSubscriberPayload, validateOrderPayload, validateBillingPayload } from '../api/schemaValidator';

export interface ContractDiffManifest {
  timestamp: string;
  generated_by: string;
  status: 'PASSED' | 'FAILED' | 'SCHEMA_DRIFT_DETECTED';
  total_endpoints_validated: number;
  schema_violations: Array<{
    endpoint: string;
    field: string;
    issue: string;
  }>;
}

export async function runContractAgent(): Promise<ContractDiffManifest> {
  console.log('[Contract Agent] Executing Runtime OpenAPI & Zod Schema Validation...');
  
  const seedOutputPath = path.resolve(__dirname, '../data/seed-output.json');
  const diffOutputPath = path.resolve(__dirname, '../data/schema-diff.json');

  if (!fs.existsSync(seedOutputPath)) {
    console.log('[Contract Agent] Seed output not found. Running seed fallback check...');
  }

  const seedData = JSON.parse(fs.readFileSync(seedOutputPath, 'utf-8'));

  const subValidation = validateSubscriberPayload(seedData.subscriber);
  const orderValidation = validateOrderPayload(seedData.order);
  const billingValidation = validateBillingPayload(seedData.billing);

  const violations: Array<{ endpoint: string; field: string; issue: string }> = [];

  if (!subValidation.success) {
    subValidation.error.issues.forEach(issue => {
      violations.push({ endpoint: '/api/subscribers', field: issue.path.join('.'), issue: issue.message });
    });
  }

  if (!orderValidation.success) {
    orderValidation.error.issues.forEach(issue => {
      violations.push({ endpoint: '/api/orders', field: issue.path.join('.'), issue: issue.message });
    });
  }

  if (!billingValidation.success) {
    billingValidation.error.issues.forEach(issue => {
      violations.push({ endpoint: '/api/billing', field: issue.path.join('.'), issue: issue.message });
    });
  }

  const manifest: ContractDiffManifest = {
    timestamp: new Date().toISOString(),
    generated_by: 'Sentinel-AI Contract Agent',
    status: violations.length === 0 ? 'PASSED' : 'SCHEMA_DRIFT_DETECTED',
    total_endpoints_validated: 3,
    schema_violations: violations
  };

  fs.writeFileSync(diffOutputPath, JSON.stringify(manifest, null, 2));
  console.log(`[Contract Agent] Contract Validation ${manifest.status} | Violations: ${violations.length}`);
  console.log(`[Contract Agent] Manifest Exported to: ${diffOutputPath}`);

  return manifest;
}

if (require.main === module) {
  runContractAgent().catch(err => {
    console.error('[Contract Agent] Error:', err);
    process.exit(1);
  });
}
