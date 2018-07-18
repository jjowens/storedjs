# StoredJS

A Javascript API working with HTML 5 Web storage; localStorage or sessionStorage

### API Functions
- **SetStorageType(val)** - Set either local or session. Case sensitivity does not matter. 
If you enter any other text than local or session, it will default to 'local'.

- **SetValue(keyName, keyValue)** - Depending on your choice of storage type, it will save the new key/value inside the web storage. 
The keyname is the name of your setting e.g. Fullname

- **GetValue(keyName)** - Depending on your choice of storage type, it will retrieve the value from either local stprage or web storage based 
on the provided keyname e.g. Fullname.

- **GetKeys()** - It will return all key names from the webstorage. No values are returned.

- **GetKeysAndValues()** - It will all keynames and values from your choice of web storages

- **Clear()** - This will clear all from the the current selected storage. 
For example, if you previously set the StorageType as 'session' and 
it will only clear values from the SessionStorage. Same with Localstorage.

- **ClearAll()** - This will clear all values from both LocalStorage and SessionStorage.

- **Count()** - This will count the number of items held in the current selected storage.

- **Prepend(keyName, val, delimiter)** - If you have a value in webstorage that already exist by keyName, 
you might want to add a prefix rather to the existing value. 
The delmiter is the space where you can place a letter or a white space between your new value 
and the existing text. For example, Prepend("Fullname", "Prof", " ") will update the text as "Prof Bloggs".

- **Append(keyName, val, delimiter)** - If you have a value in webstorage that already exist by keyName, 
you might want to append the value to the existing value. 
The delmiter is the space where you can place a letter or a white space between your new value 
and the existing text. For example, Append("Fullname", "BSc", " ") will update the text as "Prof Bloggs BSc".

A few notes abut the Prepend and Append method, if you don't set a Delimiter, there will be no default between the new 
value and the existing text e.g.

```javascript
storedjs.SetValue('Fullname', 'Fred Bloggs'); // Fred Bloggs
storedjs.Prepend('Fullname', 'Dr.', undefined); // DrFred Bloggs
storedjs.Append('Fullname', 'Esq.', undefined); // DrFred BloggsEsq.
```


### LocalStorage

```javascript
// clean up existing values in both localStorage and sessionStorage
    storedjs.ClearAll();

    // SAVE TO LOCALSTORAGE
    storedjs.SetStorageType('local');
    storedjs.SetValue('Fullname', 'Fred Bloggs');
    storedjs.SetValue('Address1', '42 high Street');
    storedjs.SetValue('SerialNumber', '2342565475675678');
    storedjs.SetValue('TicketNumber', '9850934-=mnhg-232349234-asw');

    console.log("Fullname: " + storedjs.GetValue('Fullname'));
    console.log("Available Key names held in storage " + storedjs.GetKeys());
    console.log("Key names and values in local storage ");
    console.log(storedjs.GetKeysAndValues());
    console.log(storedjs.Count() + " items in storage");
```

This will output in your browser console.
```text
Fullname: Fred Bloggs
Available Key names held in storage Address1,Fullname,SerialNumber,TicketNumber
Key names and values in local storage
[…]
​
0: Object { name: "Address1", value: "42 high Street" }

1: Object { name: "Fullname", value: "Fred Bloggs" }
​
2: Object { name: "SerialNumber", value: "2342565475675678" }
​
3: {…}
​​
name: "TicketNumber"
value: "9850934-=mnhg-232349234-asw"
[snipped the rest]
4 items in storage
````

### SessionStorage

The following examples shows how you can use Prepend and Append.

```javascript
// SAVE TO SESSIONSOTRAGE
    storedjs.SetStorageType('session');
    storedjs.SetValue('SpecialCodename', 'Bond');
    storedjs.Prepend('SpecialCodename', 'James', ' ');
    storedjs.Append('SpecialCodename', '007', ' ');
    storedjs.SetValue('Organisation', 'MI5');

    console.log("Key names and values in session storage ");
    console.log(storedjs.GetKeysAndValues());
    console.log(storedjs.Count() + " items in storage");
```

This will output in your browser console.
```text
Key names and values in session storage
(2) […]
​
0: Object { name: "Organisation", value: "MI5" }
​
1: Object { name: "SpecialCodename", value: "James Bond 007" }
````

### Feedback
Drop me a wee note if you think there's room for improvement or 
if you have any suggestions for new features!