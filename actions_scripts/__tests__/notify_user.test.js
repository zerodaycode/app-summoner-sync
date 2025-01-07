import { jest } from '@jest/globals';

const notifyUser = (await import('../notify_user.js')).default

describe('notifyUser', () => {
  it('should create a PR comment when running in a non-local environment', async () => {
    // Mock dependencies
    const mockGithub = {
      rest: {
        issues: {
          createComment: jest.fn().mockResolvedValue({ data: { id: 12345 } }),
        },
      },
    };

    const mockContextCloud = {
      repo: { owner: 'test-owner', repo: 'test-repo' },
      payload: { issue: { number: 42 } },
      actor: 'test-user',
    };

    const environment = 'test-env';
    const project = 'test-project';
    const infra = 'test-infra';

    // Call the function
    const result = await notifyUser({
      github: mockGithub,
      context: mockContextCloud,
      environment,
      project,
      infra,
    });

    // Assertions
    expect(mockGithub.rest.issues.createComment).toHaveBeenCalledWith({
      owner: 'test-owner',
      repo: 'test-repo',
      issue_number: 42,
      body: expect.stringContaining('🚀 Deployment action request received from user: test-user'),
    });
    expect(result).toEqual({ id: 12345, message: expect.any(String) });
  });

  it('should log a message when running in a local environment', async () => {
    const mockContext = {
      payload: { act: true, issue: { number: 42 } }, // Simulates a local run
      actor: 'test-user',
    };

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const result = await notifyUser({
      github: {},
      context: mockContext,
      environment: 'local-env',
      project: 'local-project',
      infra: 'local-infra',
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Action is being runned locally by \'ACT\'')
    );
    expect(result).toEqual({ id: 1010101010, message: expect.any(String) });

    consoleSpy.mockRestore();
  });
});
