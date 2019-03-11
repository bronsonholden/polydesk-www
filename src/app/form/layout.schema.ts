export const LAYOUT_SCHEMA = {
  type: 'object',
  required: [
    'presentation',
    'sections'
  ],
  properties: {
    presentation: {
      type: 'string',
      enum: [
        'standard'
      ]
    },
    sections: {
      type: 'array',
      items: {
        type: 'object',
        required: [
          'direction',
          'spacing',
          'fields'
        ],
        properties: {
          direction: {
            type: 'string',
            enum: [
              'row',
              'column',
              'row-reverse',
              'column-reverse'
            ]
          },
          spacing: {
            type: 'number',
            minimum: 0
          },
          fields: {
            type: 'array',
            items: {
              type: 'string'
            }
          }
        }
      }
    }
  }
};
