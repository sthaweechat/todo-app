module.exports = (sequelize,DataTypes) => {
    const model = sequelize.define('TodoList',{
        title:{
            type:DataTypes.STRING(255)
        }
    },{
        tableName: 'todolist',
        timestamps: false,
    });

    return model;
}