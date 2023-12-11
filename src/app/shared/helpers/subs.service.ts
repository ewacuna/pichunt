import {Subscription} from 'rxjs';

export class SubscriptionsContainer {
  private subs: Subscription[] = [];

  public set add(s: Subscription) {
    this.subs.push(s);
  }

  public dispose(): void {
    this.subs.forEach((s: Subscription) => s.unsubscribe());
  }
}
