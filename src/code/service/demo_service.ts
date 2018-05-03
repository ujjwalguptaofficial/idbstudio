import { BaseService } from './base_service';
import { ITable, Column, COL_OPTION, DATA_TYPE, IDataBase } from 'jsstore';
declare var JsStore;
export class DemoService extends BaseService {
    dbName = "Demo";
    constructor() {
        super();
    }

    createDemoDataBase() {
        return new Promise((resolve, reject) => {
            this.isDbExist(this.dbName).then((exist) => {
                if (exist === false) {
                    this.connection.createDb(this.getDbSchema()).then(() => {
                        resolve();
                    });
                }
                else {
                    resolve();
                }
            }).catch((err) => {
                reject(err);
            });
        });
    }

    getDbSchema() {
        const customers: ITable = {
            name: 'Customers',
            columns: [
                new Column('customerId').options([COL_OPTION.PrimaryKey, COL_OPTION.AutoIncrement]),
                new Column('customerName').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.String),
                new Column('contactName').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.String),
                new Column('address').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.String),
                new Column('city').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.String),
                new Column('postalCode').setDataType(DATA_TYPE.String),
                new Column('country').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.String)
            ]
        };

        const categories: ITable = {
            name: 'Categories',
            columns: [
                new Column('categoryId').options([COL_OPTION.PrimaryKey, COL_OPTION.AutoIncrement]),
                new Column('categoryName').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.String),
                new Column('description').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.String),
            ]
        };

        const employees: ITable = {
            name: 'Employees',
            columns: [
                new Column('employeeId').options([COL_OPTION.PrimaryKey, COL_OPTION.AutoIncrement]),
                new Column('lastName').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.String),
                new Column('birthDate').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.DateTime),
                new Column('photo').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.String),
                new Column('notes').setDataType(DATA_TYPE.DateTime),
            ]
        };

        var order_details: ITable = {
            name: 'OrderDetails',
            columns: [
                new Column('orderDetailId').options([COL_OPTION.PrimaryKey, COL_OPTION.AutoIncrement]),
                new Column('orderId').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.Number),
                new Column('productId').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.Number),
                new Column('quantity').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.Number)
            ]
        };

        var orders: ITable = {
            name: 'Orders',
            columns: [
                new Column('orderId').options([COL_OPTION.PrimaryKey]),
                new Column('customerId').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.Number),
                new Column('employeeId').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.Number),
                new Column('orderDate').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.DateTime),
                new Column('shipperId').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.Number)
            ]
        };

        var products: ITable = {
            name: 'Products',
            columns: [
                new Column('productId').options([COL_OPTION.PrimaryKey, COL_OPTION.AutoIncrement]),
                new Column('productName').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.String),
                new Column('supplierId').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.Number),
                new Column('categoryId').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.Number),
                new Column('unit').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.String),
                new Column('price').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.Number)
            ]
        };

        var shippers: ITable = {
            name: 'Shippers',
            columns: [
                new Column('shipperId').options([COL_OPTION.PrimaryKey, COL_OPTION.AutoIncrement]),
                new Column('shipperName').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.String),
                new Column('phone').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.String),
            ]
        };

        var suppliers: ITable = {
            name: 'Suppliers',
            columns: [
                new Column('supplierId').options([COL_OPTION.PrimaryKey, COL_OPTION.AutoIncrement]),
                new Column('supplierName').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.String),
                new Column('contactName').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.String),
                new Column('address').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.String),
                new Column('city').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.String),
                new Column('postalCode').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.String),
                new Column('country').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.String),
                new Column('phone').options([COL_OPTION.NotNull]).setDataType(DATA_TYPE.String)
            ]
        };

        var dataBase: IDataBase = {
            name: this.dbName,
            tables: [
                customers,
                categories,
                employees,
                order_details,
                orders,
                products,
                shippers,
                suppliers
            ]
        };
        return dataBase;
    }
}