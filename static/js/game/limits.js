export class Limiter {
  constructor(limit) {
    this.limit = limit;
    this.framesPast = 0;
  }
  ready(shouldRestart) {
    const isReady = this.framesPast >= this.limit;
    if (!isReady) {
      return false;
    }
    if (shouldRestart) {
      this.restart();
    }
    return true;
  }
  restart() {
    this.framesPast = 0;
  }
  update() {
    if (this.framesPast >= this.limit) {
      return;
    }
    this.framesPast++;
  }
}
