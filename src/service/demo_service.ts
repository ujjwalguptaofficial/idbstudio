import { BaseService } from './base_service';
import { ITable, DATA_TYPE, IDataBase } from 'jsstore';

export class DemoService extends BaseService {
    dbName = "Demo";
    isDemoDbExist() {
        return this.isDbExist(this.dbName);
    }

    createDemoDataBase() {
        return new Promise((resolve, reject) => {
            this.connection.initDb(this.getDbStructure()).then(() => {
                this.insertDemoDbData(resolve);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    insertDemoDbData(callBack) {
        const filesList = ["Customers", "Categories", "Employees", "OrderDetails",
            "Orders", "Products", "Shippers", "Suppliers"];
        var filesProcessed = 0;
        var onFileProcessed = function () {
            console.log('inserted file:', filesList[filesProcessed]);
            filesProcessed++;
            if (filesProcessed === filesList.length) {
                callBack();
            }
        };
        filesList.forEach((file) => {
            const url = `assets/demo_database/${file}.json?v=1`;
            fetch(url).then(response => {
                return response.json();
            }).then(response => {
                switch (file) {
                    case filesList[4]:
                        response.forEach(function (value) {
                            value.orderDate = new Date();
                        });
                        this.insert(file, response).then(onFileProcessed).catch(onFileProcessed);
                        break;
                    case filesList[2]:
                        response.forEach(function (value) {
                            value.birthDate = new Date();
                        });
                        this.insert(file, response).then(onFileProcessed).catch(onFileProcessed);
                        break;
                    case filesList[3]:
                        this.insertWithSkipDataCheck(file, response).then(onFileProcessed).catch(onFileProcessed);
                        break;
                    default:
                        this.insert(file, response).then(onFileProcessed).catch(onFileProcessed);
                }

            });
        });
    }

    insert(table: string, datas: any[]) {
        return new Promise((res, rej) => {
            this.connection.insert({
                into: table,
                values: datas
            }).then(res).catch((err) => {
                console.error('unable to insert data in table', table);
                rej();
            });
        })
    }

    insertWithSkipDataCheck(table: string, datas: any[]) {
        return this.connection.insert({
            into: table,
            skipDataCheck: true,
            values: datas
        });
    }

    getDbStructure() {
        const customers: ITable = {
            name: 'Customers',
            columns: {
                customerId: { primaryKey: true, autoIncrement: true },
                customerName: { notNull: true, dataType: DATA_TYPE.String },
                contactName: { notNull: true, dataType: DATA_TYPE.String },
                address: { notNull: true, dataType: 'string' },
                city: { notNull: true, dataType: 'string' },
                postalCode: { dataType: 'string' },
                country: { notNull: true, dataType: 'string' }
            }
        };

        const categories: ITable = {
            name: 'Categories',
            columns: {
                categoryId: { primaryKey: true, autoIncrement: true },
                categoryName: { notNull: true, dataType: 'string' },
                description: { notNull: true, dataType: 'string' }
            }
        };

        const employees: ITable = {
            name: 'Employees',
            columns: {
                employeeId: { primaryKey: true, autoIncrement: true },
                lastName: { notNull: true, dataType: 'string' },
                birthDate: { notNull: true, dataType: DATA_TYPE.DateTime },
                photo: { notNull: true, dataType: 'string' },
                notes: { dataType: 'string' },
                state: { notNull: true, dataType: 'string' },
                jobSuspendedFlag: { notNull: true, dataType: 'number' }
            }
        };

        var orderDetails: ITable = {
            name: 'OrderDetails',
            columns: {
                orderDetailId: { primaryKey: true, autoIncrement: true },
                orderId: { notNull: true, dataType: 'number' },
                productId: { notNull: true, dataType: 'number' },
                quantity: { notNull: true, dataType: 'number' },
            }
        };

        var orders: ITable = {
            name: 'Orders',
            columns: {
                orderId: { primaryKey: true },
                customerId: { notNull: true, dataType: DATA_TYPE.Number },
                employeeId: { notNull: true, dataType: 'number' },
                orderDate: { notNull: true, dataType: DATA_TYPE.DateTime },
                shipperId: { notNull: true, dataType: 'number' }
            }
        };

        var products: ITable = {
            name: 'Products',
            columns: {
                productId: { primaryKey: true, autoIncrement: true },
                productName: { notNull: true, dataType: 'string' },
                supplierId: { notNull: true, dataType: 'number' },
                categoryId: { notNull: true, dataType: 'number' },
                unit: { notNull: true, dataType: 'string' },
                price: { notNull: true, dataType: 'number' },
            }
        };

        var shippers: ITable = {
            name: 'Shippers',
            columns: {
                shipperId: { primaryKey: true, autoIncrement: true },
                shipperName: { notNull: true, dataType: 'string' },
                phone: { notNull: true, dataType: 'string' }
            }
        };

        var suppliers: ITable = {
            name: 'Suppliers',
            columns: {
                supplierId: { primaryKey: true, autoIncrement: true },
                supplierName: { notNull: true, dataType: 'string' },
                contactName: { notNull: true, dataType: 'string' },
                address: { notNull: true, dataType: 'string' },
                city: { notNull: true, dataType: 'string' },
                postalCode: { notNull: true, dataType: 'string' },
                country: { notNull: true, dataType: 'string' },
                phone: { notNull: true, dataType: 'string' },
            }
        };

        var dataBase: IDataBase = {
            name: this.dbName,
            tables: [
                customers,
                categories,
                employees,
                orderDetails,
                orders,
                products,
                shippers,
                suppliers
            ]
        };
        return dataBase;
    }
}