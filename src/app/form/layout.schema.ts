export const LAYOUT_SCHEMA = {
  type: 'object',
  properties: {
    fields: {
      type: 'array',
      items: {
        type: 'object'
      }
    }
  },
  required: [
    'fields'
  ]
};
