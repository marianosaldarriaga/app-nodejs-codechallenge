import { ApiAuthGuard } from './api.auth.guard';

describe('ApiAuthGuard', () => {
  it('should be defined', () => {
    expect(new ApiAuthGuard()).toBeDefined();
  });
});
