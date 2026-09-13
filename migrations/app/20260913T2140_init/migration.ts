#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/4b83a98159a07f649387becac283bf973fcb69271dbe257f490b40e50ccb7b4a/contract';
import endContract from '../../snapshots/4b83a98159a07f649387becac283bf973fcb69271dbe257f490b40e50ccb7b4a/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  createCollection,
  createIndex,
} from '@prisma/orm-mongo/target/migration';

class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      createCollection('awards', {
        validator: {
          $jsonSchema: {
            additionalProperties: false,
            bsonType: 'object',
            properties: {
              _id: { bsonType: 'objectId' },
              award: { bsonType: 'string' },
              createdAt: { bsonType: 'date' },
              date: { bsonType: ['null', 'date'] },
              event: { bsonType: 'string' },
              icon: { bsonType: ['null', 'string'] },
              rank: { bsonType: ['null', 'int'] },
              updatedAt: { bsonType: 'date' },
              year: { bsonType: 'int' },
            },
            required: ['_id', 'award', 'createdAt', 'event', 'updatedAt', 'year'],
          },
        },
        validationLevel: 'strict',
        validationAction: 'error',
      }),
      createCollection('careers', {
        validator: {
          $jsonSchema: {
            additionalProperties: false,
            bsonType: 'object',
            properties: {
              _id: { bsonType: 'objectId' },
              company: { bsonType: 'string' },
              createdAt: { bsonType: 'date' },
              endDate: { bsonType: ['null', 'date'] },
              location: { bsonType: 'string' },
              position: { bsonType: 'string' },
              startDate: { bsonType: 'date' },
              updatedAt: { bsonType: 'date' },
            },
            required: [
              '_id',
              'company',
              'createdAt',
              'location',
              'position',
              'startDate',
              'updatedAt',
            ],
          },
        },
        validationLevel: 'strict',
        validationAction: 'error',
      }),
      createCollection('coffee_places', {
        validator: {
          $jsonSchema: {
            additionalProperties: false,
            bsonType: 'object',
            properties: {
              _id: { bsonType: 'objectId' },
              address: { bsonType: 'string' },
              close: { bsonType: ['null', 'string'] },
              createdAt: { bsonType: 'date' },
              description: { bsonType: ['null', 'string'] },
              image: { bsonType: ['null', 'string'] },
              mapCoordinate: { bsonType: ['null', 'string'] },
              mapUrl: { bsonType: ['null', 'string'] },
              name: { bsonType: 'string' },
              open: { bsonType: ['null', 'string'] },
              parkFee: { bsonType: ['null', 'int'] },
              price: { bsonType: 'string', enum: ['CHEAP', 'MEDIUM', 'EXPENSIVE'] },
              recomended: { bsonType: ['null', 'bool'] },
              region: { bsonType: ['null', 'string'] },
              updatedAt: { bsonType: 'date' },
              wifiProvider: { bsonType: ['null', 'string'] },
              wifiSpeed: { bsonType: 'string', enum: ['WEAK', 'MEDIUM', 'STRONG'] },
            },
            required: ['_id', 'address', 'createdAt', 'name', 'price', 'updatedAt', 'wifiSpeed'],
          },
        },
        validationLevel: 'strict',
        validationAction: 'error',
      }),
      createCollection('educations', {
        validator: {
          $jsonSchema: {
            additionalProperties: false,
            bsonType: 'object',
            properties: {
              _id: { bsonType: 'objectId' },
              academicScore: {
                oneOf: [
                  { bsonType: 'null' },
                  {
                    additionalProperties: false,
                    bsonType: 'object',
                    properties: {
                      label: { bsonType: 'string' },
                      scale: { bsonType: 'double' },
                      type: { bsonType: 'string' },
                      value: { bsonType: 'double' },
                    },
                    required: ['label', 'scale', 'type', 'value'],
                  },
                ],
              },
              createdAt: { bsonType: 'date' },
              department: { bsonType: ['null', 'string'] },
              end: { bsonType: ['null', 'date'] },
              grade: { bsonType: ['null', 'string'] },
              level: { bsonType: 'string' },
              logo: { bsonType: ['null', 'string'] },
              name: { bsonType: 'string' },
              place: { bsonType: 'string' },
              start: { bsonType: 'date' },
              studyProgram: { bsonType: ['null', 'string'] },
              updatedAt: { bsonType: 'date' },
              web: { bsonType: ['null', 'string'] },
            },
            required: ['_id', 'createdAt', 'level', 'name', 'place', 'start', 'updatedAt'],
          },
        },
        validationLevel: 'strict',
        validationAction: 'error',
      }),
      createCollection('organizations', {
        validator: {
          $jsonSchema: {
            additionalProperties: false,
            bsonType: 'object',
            properties: {
              _id: { bsonType: 'objectId' },
              createdAt: { bsonType: 'date' },
              desc: { bsonType: ['null', 'string'] },
              orgName: { bsonType: 'string' },
              period: { bsonType: 'string' },
              updatedAt: { bsonType: 'date' },
            },
            required: ['_id', 'createdAt', 'orgName', 'period', 'updatedAt'],
          },
        },
        validationLevel: 'strict',
        validationAction: 'error',
      }),
      createCollection('portfolio_categories', {
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
      createCollection('portfolios', {
        validator: {
          $jsonSchema: {
            additionalProperties: false,
            bsonType: 'object',
            properties: {
              _id: { bsonType: 'objectId' },
              careerIds: { bsonType: 'array', items: { bsonType: 'objectId' } },
              categoryIds: { bsonType: 'array', items: { bsonType: 'objectId' } },
              createdAt: { bsonType: 'date' },
              demoLink: { bsonType: ['null', 'string'] },
              desc: { bsonType: ['null', 'string'] },
              galleries: {
                bsonType: 'array',
                items: {
                  additionalProperties: false,
                  bsonType: 'object',
                  properties: {
                    createdAt: { bsonType: 'date' },
                    description: { bsonType: ['null', 'string'] },
                    id: { bsonType: 'string' },
                    imageUrl: { bsonType: 'string' },
                  },
                  required: ['createdAt', 'id', 'imageUrl'],
                },
              },
              image: { bsonType: 'string' },
              name: { bsonType: 'string' },
              private: { bsonType: 'bool' },
              ratings: {
                bsonType: 'array',
                items: {
                  additionalProperties: false,
                  bsonType: 'object',
                  properties: {
                    comment: { bsonType: ['null', 'string'] },
                    createdAt: { bsonType: 'date' },
                    id: { bsonType: 'string' },
                    rating: { bsonType: 'int' },
                  },
                  required: ['createdAt', 'id', 'rating'],
                },
              },
              shortDesc: { bsonType: ['null', 'string'] },
              slug: { bsonType: 'string' },
              sourceCode: { bsonType: ['null', 'string'] },
              techstack: { bsonType: 'array', items: { bsonType: 'string' } },
              updatedAt: { bsonType: 'date' },
            },
            required: [
              '_id',
              'careerIds',
              'categoryIds',
              'createdAt',
              'galleries',
              'image',
              'name',
              'private',
              'ratings',
              'slug',
              'techstack',
              'updatedAt',
            ],
          },
        },
        validationLevel: 'strict',
        validationAction: 'error',
      }),
      createCollection('users', {
        validator: {
          $jsonSchema: {
            additionalProperties: false,
            bsonType: 'object',
            properties: {
              _id: { bsonType: 'objectId' },
              createdAt: { bsonType: 'date' },
              email: { bsonType: 'string' },
              name: { bsonType: 'string' },
              password: { bsonType: 'string' },
              updatedAt: { bsonType: 'date' },
            },
            required: ['_id', 'createdAt', 'email', 'name', 'password', 'updatedAt'],
          },
        },
        validationLevel: 'strict',
        validationAction: 'error',
      }),
      createIndex('portfolios', [{ direction: 1, field: 'slug' }], { unique: true }),
      createIndex('users', [{ direction: 1, field: 'email' }], { unique: true }),
    ];
  }
}

export default M;
MigrationCLI.run(import.meta.url, M);
