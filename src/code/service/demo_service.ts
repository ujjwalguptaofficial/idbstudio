import {idb_con, BaseService} from './base_service';
import {IDataBaseOption, IError, ITableOption} from 'jsstore';
declare var JsStore;
export class DemoService extends BaseService
{
    _dbName = "Demo";
    constructor()
    {
        super();
    }

    createDemoDataBase()
    {
        this
            .isDbExist(this._dbName)
            .then((exist) => {
                if (exist === false) {
                    idb_con.createDb(this.getDbSchema());
                }
            })
            .catch((err) => {
                alert(err._message);
            });
    }

    getDbSchema() : IDataBaseOption
    {
        var customers : ITableOption = {
            Name: 'Customers',
            Columns: [
                {
                    Name: "CustomerID",
                    PrimaryKey: true,
                    AutoIncrement: true
                }, {
                    Name: "CustomerName",
                    NotNull: true,
                    DataType: JsStore.Data_Type.String
                }, {
                    Name: "ContactName",
                    NotNull: true,
                    DataType: JsStore.Data_Type.String
                }, {
                    Name: "Address",
                    NotNull: true,
                    DataType: JsStore.Data_Type.String
                }, {
                    Name: "City",
                    NotNull: true,
                    DataType: JsStore.Data_Type.String
                }, {
                    Name: "PostalCode",
                    DataType: JsStore.Data_Type.String
                }, {
                    Name: "Country",
                    NotNull: true,
                    DataType: JsStore.Data_Type.String
                }
            ]
        };

        var categories : ITableOption = {
            Name: 'Categories',
            Columns: [
                {
                    Name: "CategoryID",
                    PrimaryKey: true,
                    AutoIncrement: true
                }, {
                    Name: "CategoryName",
                    NotNull: true,
                    DataType: JsStore.Data_Type.String
                }, {
                    Name: "Description",
                    NotNull: true,
                    DataType: JsStore.Data_Type.String
                }
            ]
        };

        var employees : ITableOption = {
            Name: 'Employees',
            Columns: [
                {
                    Name: "EmployeeID",
                    PrimaryKey: true,
                    AutoIncrement: true
                }, {
                    Name: "LastName",
                    NotNull: true,
                    DataType: JsStore.Data_Type.String
                }, {
                    Name: "BirthDate",
                    NotNull: true,
                    DataType: JsStore.Data_Type.String
                }, {
                    Name: "Photo",
                    NotNull: true,
                    DataType: JsStore.Data_Type.String
                }, {
                    Name: "Notes",
                    DataType: JsStore.Data_Type.String
                }
            ]
        };

        var order_details : ITableOption = {
            Name: 'OrderDetails',
            Columns: [
                {
                    Name: "OrderDetailID",
                    PrimaryKey: true,
                    AutoIncrement: true
                }, {
                    Name: "OrderID",
                    NotNull: true,
                    DataType: JsStore.Data_Type.Number
                }, {
                    Name: "ProductID",
                    NotNull: true,
                    DataType: JsStore.Data_Type.Number
                }, {
                    Name: "Quantity",
                    NotNull: true,
                    DataType: JsStore.Data_Type.Number
                }
            ]
        };

        var orders : ITableOption = {
            Name: 'Orders',
            Columns: [
                {
                    Name: "OrderID",
                    PrimaryKey: true
                }, {
                    Name: "CustomerID",
                    NotNull: true,
                    DataType: JsStore.Data_Type.Number
                }, {
                    Name: "EmployeeID",
                    NotNull: true,
                    DataType: JsStore.Data_Type.Number
                }, {
                    Name: "OrderDate",
                    NotNull: true,
                    DataType: JsStore.Data_Type.String
                }, {
                    Name: "ShipperID",
                    NotNull: true,
                    DataType: JsStore.Data_Type.Number
                }
            ]
        };

        var products : ITableOption = {
            Name: 'Products',
            Columns: [
                {
                    Name: "ProductID",
                    PrimaryKey: true,
                    AutoIncrement: true
                }, {
                    Name: "ProductName",
                    NotNull: true,
                    DataType: JsStore.Data_Type.String
                }, {
                    Name: "SupplierID",
                    NotNull: true,
                    DataType: JsStore.Data_Type.Number
                }, {
                    Name: "CategoryID",
                    NotNull: true,
                    DataType: JsStore.Data_Type.Number
                }, {
                    Name: "Unit",
                    NotNull: true,
                    DataType: JsStore.Data_Type.String
                }, {
                    Name: "Price",
                    NotNull: true,
                    DataType: JsStore.Data_Type.Number
                }
            ]
        };

        var shippers : ITableOption = {
            Name: 'Shippers',
            Columns: [
                {
                    Name: "ShipperID",
                    PrimaryKey: true,
                    AutoIncrement: true
                }, {
                    Name: "ShipperName",
                    NotNull: true,
                    DataType: JsStore.Data_Type.String
                }, {
                    Name: "Phone",
                    NotNull: true,
                    DataType: JsStore.Data_Type.String
                }
            ]
        };

        var suppliers : ITableOption = {
            Name: 'Suppliers',
            Columns: [
                {
                    Name: "SupplierID",
                    PrimaryKey: true,
                    AutoIncrement: true
                }, {
                    Name: "SupplierName",
                    NotNull: true,
                    DataType: JsStore.Data_Type.String
                }, {
                    Name: "ContactName",
                    NotNull: true,
                    DataType: JsStore.Data_Type.String
                }, {
                    Name: "Address",
                    NotNull: true,
                    DataType: JsStore.Data_Type.String
                }, {
                    Name: "City",
                    NotNull: true,
                    DataType: JsStore.Data_Type.String
                }, {
                    Name: "PostalCode",
                    NotNull: true,
                    DataType: JsStore.Data_Type.String
                }, {
                    Name: "Country",
                    NotNull: true,
                    DataType: JsStore.Data_Type.String
                }, {
                    Name: "Phone",
                    NotNull: true,
                    DataType: JsStore.Data_Type.String
                }
            ]
        };

        var dataBase : IDataBaseOption = {
            Name: this._dbName,
            Tables: [
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