import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('classes', (table) => {
    table.increments('id').primary();
    table.string('subject').notNullable();
    table.decimal('cost').notNullable();
    
    table
      .integer('user_id').notNullable() 
      .references('id').inTable('users')      
      .onUpdate('CASCADE')  // updates info everywhere data is dependent on this relation
      .onDelete('CASCADE'); // handle what happens when teacher is deleted
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('classes');
}
