#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/4b83a98159a07f649387becac283bf973fcb69271dbe257f490b40e50ccb7b4a/contract';
import startContract from '../../snapshots/4b83a98159a07f649387becac283bf973fcb69271dbe257f490b40e50ccb7b4a/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/fa27860884c05d246d924a40fc59c8bc29c7727dfb6700efbfada2ab0a2e84ef/contract';
import endContract from '../../snapshots/fa27860884c05d246d924a40fc59c8bc29c7727dfb6700efbfada2ab0a2e84ef/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  createCollection,
  createIndex,
} from '@prisma/orm-mongo/target/migration';

class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      createCollection('posts', {
        validator: {
          $jsonSchema: {
            additionalProperties: false,
            bsonType: 'object',
            properties: {
              _id: { bsonType: 'objectId' },
              content: { bsonType: 'string' },
              coverImage: { bsonType: ['null', 'string'] },
              createdAt: { bsonType: 'date' },
              excerpt: { bsonType: ['null', 'string'] },
              published: { bsonType: 'bool' },
              publishedAt: { bsonType: ['null', 'date'] },
              slug: { bsonType: 'string' },
              tags: { bsonType: 'array', items: { bsonType: 'string' } },
              title: { bsonType: 'string' },
              updatedAt: { bsonType: 'date' },
            },
            required: [
              '_id',
              'content',
              'createdAt',
              'published',
              'slug',
              'tags',
              'title',
              'updatedAt',
            ],
          },
        },
        validationLevel: 'strict',
        validationAction: 'error',
      }),
      createIndex('posts', [{ direction: 1, field: 'slug' }], { unique: true }),
    ];
  }
}

export default M;
MigrationCLI.run(import.meta.url, M);
