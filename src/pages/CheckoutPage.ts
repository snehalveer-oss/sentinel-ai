import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly planTitle: Locator;
  readonly confirmOrderButton: Locator;
  readonly orderSuccessBadge: Locator;
  readonly orderReferenceText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.planTitle = page.getByRole('heading', { name: /5G Ultra Unlimited/i });
    this.confirmOrderButton = page.getByRole('button', { name: /Confirm Purchase/i });
    this.orderSuccessBadge = page.getByTestId('order-success-badge');
    this.orderReferenceText = page.getByTestId('order-reference-id');
  }

  async goto(orderId: string) {
    await this.page.goto(`/checkout?orderId=${orderId}`);
  }

  async confirmOrder() {
    await this.confirmOrderButton.click();
  }
}
