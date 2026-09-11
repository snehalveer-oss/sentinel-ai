import { test as base, request, APIRequestContext } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export interface SeedFixtureData {
  subscriberId: string;
  email: string;
  orderId: string;
  planId: string;
  amount: number;
}

type MyFixtures = {
  apiContext: APIRequestContext;
  seededUser: SeedFixtureData;
};

export const test = base.extend<MyFixtures>({
  apiContext: async ({}, use) => {
    const apiContext = await request.newContext({
      baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api',
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Authorization': 'Bearer mock_jwt_access_token_sentinel',
      },
    });
    await use(apiContext);
    await apiContext.dispose();
  },

  seededUser: async ({}, use) => {
    const seedPath = path.resolve(__dirname, '../data/seed-output.json');
    let seedData = {
      subscriber: { subscriber_id: 'SUB_994821', email: 'snehal.veer.test@telecom-sentinel.io' },
      order: { order_id: 'ORD_8849102', total_amount: 79.99 },
      plan: { plan_id: 'PLAN_5G_PREMIUM' }
    };

    if (fs.existsSync(seedPath)) {
      seedData = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));
    }

    const fixtureData: SeedFixtureData = {
      subscriberId: seedData.subscriber.subscriber_id,
      email: seedData.subscriber.email,
      orderId: seedData.order.order_id,
      planId: seedData.plan.plan_id,
      amount: seedData.order.total_amount,
    };

    console.log(`[Playwright Hybrid Fixture] Pre-seeded user context injected: ${fixtureData.subscriberId} (${fixtureData.email})`);
    await use(fixtureData);
  },
});

export { expect } from '@playwright/test';
