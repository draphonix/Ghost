const {createAddColumnMigration} = require('../../utils');

module.exports = createAddColumnMigration('tags', 'bonus', {
    type: 'bigInteger',
    nullable: false,
    defaultTo: 0
});
