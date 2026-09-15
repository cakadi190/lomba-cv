#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/c88eba4519fc8a7710df97012f6e5468ad5dee68a2782003c91a4385b5ce9bf5/contract';
import endContract from '../../snapshots/c88eba4519fc8a7710df97012f6e5468ad5dee68a2782003c91a4385b5ce9bf5/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/fa27860884c05d246d924a40fc59c8bc29c7727dfb6700efbfada2ab0a2e84ef/contract';
import startContract from '../../snapshots/fa27860884c05d246d924a40fc59c8bc29c7727dfb6700efbfada2ab0a2e84ef/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  collMod,
  createCollection,
} from '@prisma/orm-mongo/target/migration';

class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      createCollection('post_categories', {
        validator: {
          $jsonSchema: {
            additionalProperties: false,
            bsonType: 'object',
            properties: {
              _id: { bsonType: 'objectId' },
              color: { bsonType: ['null', 'string'] },
              createdAt: { bsonType: 'date' },
              name: { bsonType: 'string' },
              updatedAt: { bsonType: 'date' },
            },
            required: ['_id', 'createdAt', 'name', 'updatedAt'],
          },
        },
        validationLevel: 'strict',
        validationAction: 'error',
      }),
      collMod(
        'posts',
        {
          validator: {
            $jsonSchema: {
              additionalProperties: false,
              bsonType: 'object',
              properties: {
                _id: { bsonType: 'objectId' },
                categoryIds: { bsonType: 'array', items: { bsonType: 'objectId' } },
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
                'categoryIds',
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
        },
        {
          id: 'validator.posts.update',
          label: 'Update validator on posts',
          operationClass: 'destructive',
        },
      ),
    ];
  }
}

export default M;
MigrationCLI.run(import.meta.url, M);
