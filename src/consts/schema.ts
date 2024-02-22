import { z } from 'zod';

const repositoryLinkSchema = z.string().optional();
const syncRepositorySchema = z.boolean().optional();
const repositoryCategorySchema = z.string().nullable();

const repositoryOptionsSchema = z.object({
  domain: z.string().optional(),
  sync: syncRepositorySchema,
  link: repositoryLinkSchema
});

const githubRepositoriesSchema = z.record(z.tuple([repositoryCategorySchema]).or(z.tuple([repositoryCategorySchema, repositoryOptionsSchema])));

const sshRepositorySchema = z
  .object({
    domain: z.string(),
    category: repositoryCategorySchema,
    git_ssh: z.string()
  })
  .merge(repositoryOptionsSchema.omit({ domain: true }));

export const configsSchema = z.object({
  path: z.string(),
  open_command: z.object({
    repository: z.string()
  }),
  github_repositories: z.record(githubRepositoriesSchema),
  ssh_repositories: z.array(sshRepositorySchema)
});

export type TConfigs = z.infer<typeof configsSchema>;
