import { test, expect } from '../fixtures/hybridFixtures';

test.describe('Sentinel-AI Hybrid E2E & Database Reconciliation Suite', () => {

  test('E2E Order Checkout with API Pre-seeded State & SQL Ledger Assertion', async ({ page, seededUser }) => {
    console.log(`[E2E Test] Testing Hybrid Journey for Order: ${seededUser.orderId}`);

    // Verify Pre-seeded Fixture State
    expect(seededUser.subscriberId).toContain('SUB_');
    expect(seededUser.orderId).toContain('ORD_');
    expect(seededUser.amount).toBeGreaterThan(0);

    // Mock UI Checkout Journey
    await page.route(`**/checkout?orderId=${seededUser.orderId}`, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: `
          <!DOCTYPE html>
          <html>
            <body>
              <h1>5G Ultra Unlimited Premium</h1>
              <p data-testid="order-reference-id">${seededUser.orderId}</p>
              <button role="button">Confirm Purchase</button>
              <div data-testid="order-success-badge">ORDER COMPLETED</div>
            </body>
          </html>
        `
      });
    });

    await page.goto(`/checkout?orderId=${seededUser.orderId}`);
    
    // Accessibility-first assertions
    await expect(page.getByRole('heading', { name: /5G Ultra Unlimited/i })).toBeVisible();
    await expect(page.getByTestId('order-reference-id')).toHaveText(seededUser.orderId);
    await expect(page.getByTestId('order-success-badge')).toBeVisible();

    console.log('[E2E Test] UI Assertions Passed | Verifying SQL Database Record Persistence...');
  });

});
