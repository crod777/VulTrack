

export const accessControlList: any = {
  accessControl: {
    submitter: {
      view: ['poam', 'asset', 'label', 'collection', 'import'],
      create: ['poam', 'asset', 'label', 'collection', 'import'],
      approve: ['asset', 'label', 'import'],
      modify: ['poam', 'asset', 'label', 'collection', 'import'],
      delete: ['poam', 'asset', 'label' ],
    },
    approver: {
      view: ['poam', 'asset', 'label', 'collection', 'import'],
      create: ['poam', 'asset', 'label', 'collection', 'import'],
      approve: ['poam', 'asset', 'label', 'collection', 'import'],
      modify: ['poam', 'asset', 'label', 'collection', 'import'],
      delete: ['poam', 'asset', 'label', 'collection', 'import'],
    },
    admin: {
      view: ['poam', 'asset', 'label', 'collection', 'user', 'import'],
      create: ['poam', 'asset', 'label', 'collection', 'user', 'import'],
      approve: ['poam', 'asset', 'label', 'collection', 'user', 'import'],
      modify: ['poam', 'asset', 'label', 'collection', 'user', 'import'],
      delete: ['poam', 'asset', 'label', 'collection', 'user', 'import'],
    },
    viewer: {
      view: ['poam', 'asset', 'label', 'collection'],
      create: ['poam', 'asset', 'collection'],
      approve: [],
      modify: [],
      delete: [],
    }
  }
}
