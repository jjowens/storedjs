var storedjs = new (function storedjs() {
    // SET INTERNAL NAME TO SAVE STORAGE TYPE
    var _storedJSTypeName = 'StoredJSStorageType';

    function SetStorageType(val) {
        if (val === undefined) {
            val = 'local';
        }

        // REMOVE CASE SENSIVITY
        val = val.toLowerCase();

        if ((val !== 'local') && (val !== 'session') ) {
            val = 'local';
        }

        // SAVE IT IN STORAGE TO PERSIST SETTING
        localStorage.setItem(_storedJSTypeName, val);
    }

    function GetStorageType() {
        return localStorage.getItem(_storedJSTypeName);
    }

    function GetStorage() {
        var stored;

        var storedType = localStorage.getItem(_storedJSTypeName);

        if (storedType === 'local') {
            stored = localStorage;
        } else {
            stored = sessionStorage;
        }

        return stored;
    }

    function SetValue(keyname, val) {
        var stored = GetStorage();

        stored.setItem(keyname, val);
    }

    function GetValue(keyname) {
        var stored = GetStorage();

        return stored.getItem(keyname);
    }

    function Remove(keyname) {
        var stored = GetStorage();

        return stored.removeItem(keyname);
    }

    function Count() {
        var stored = GetStorage();
        var storedType = GetStorageType();
        var total = stored.length;

        // COUNT ONE LESS ITEM DUE TO INTERNAL VARIABLE; STOREAGE TYPE
        if (storedType === 'local') {
            total = total - 1;
        }
        
        return total;
    }

    function Clear() {
        var stored = GetStorage();

        // GET INTERNAL SETTING FOR STOREDJS STORAGE TYPE, SO WE CAN RESTORE IT AFTER CLEARING IT
        var storedType = localStorage.getItem(_storedJSTypeName);

        stored.clear();

        // RESTORE STORAGE TYPE
        localStorage.setItem(_storedJSTypeName, storedType);
    }

    function ClearAll() {
        // GET INTERNAL SETTING FOR STOREDJS STORAGE TYPE, SO WE CAN RESTORE IT AFTER CLEARING IT
        var storedType = localStorage.getItem(_storedJSTypeName);

        localStorage.clear();
        sessionStorage.clear();

        // RESTORE STORAGE TYPE
        localStorage.setItem(_storedJSTypeName, storedType);
    }

    function GetKeys() {
        var stored = GetStorage();

        var arr = [];
        var total = stored.length;

        for(var i=0; i< total; i++) {

            // IGNORE INTERNAL KEYNAME
            if (stored.key(i) === _storedJSTypeName) {
                continue;
            }

            arr.push(stored.key(i));
        }

        arr = arr.sort();

        return arr;
    }

    function GetKeysAndValues() {
        var stored = GetStorage();

        var arr = [];
        var total = stored.length;

        for(var i=0; i< total; i++) {
            var keyName = stored.key(i);
            var keyValue = stored.getItem(keyName);

            // IGNORE INTERNAL KEYNAME
            if (keyName === _storedJSTypeName) {
                continue;
            }

            var newObj = {name : keyName, value: keyValue}
            arr.push(newObj);
        }

        // SORT WITH CUSTOM COMPARE FUNCTION
        arr = arr.sort(function (a, b) {
            var keyName1 = a.name.toLowerCase();
            var keyName2 = b.name.toLowerCase();

            if (keyName1 < keyName2) {
                return -1;
            }
            if (keyName1 > keyName2) {
                return 1;
            }
            return 0;
        });

        return arr;
    }

    function Prepend(keyname, val, delimiter) {
        var stored = GetStorage();

        var tempVal = stored.getItem(keyname);

        if (tempVal !== undefined) {
            if (delimiter !== undefined) {
                tempVal = val + delimiter + tempVal;
            } else {
                tempVal = val + tempVal;
            }

            stored.setItem(keyname, tempVal);
        }

    }

    function Append(keyname, val, delimiter) {
        var stored = GetStorage();

        var tempVal = stored.getItem(keyname);

        if (tempVal !== undefined) {
            if (delimiter !== undefined) {
                tempVal = tempVal + delimiter + val;
            } else {
                tempVal = tempVal + val;
            }

            stored.setItem(keyname, tempVal);
        }
    }

    return {
        SetStorageType: SetStorageType,
        GetStorageType: GetStorageType,
        SetValue: SetValue,
        GetValue: GetValue,
        Remove: Remove,
        Count: Count,
        Clear: Clear,
        ClearAll: ClearAll,
        GetKeys: GetKeys,
        GetKeysAndValues: GetKeysAndValues,
        Prepend: Prepend,
        Append: Append
    }

});