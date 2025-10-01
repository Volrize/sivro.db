# 🚀 Sivro.db

**Sivro.db** is a lightweight, feature-rich JSON-based database module for Node.js. It provides 37+ powerful functions for data management, import/export capabilities, encryption, search functionality, and much more!

## 🌟 Features

- ✅ **37+ Functions** - Complete database operations
- 🔒 **Encryption Support** - Secure your sensitive data
- 📁 **Multi-format Import** - JSON, CSV, SQL, TXT support
- 🔍 **Advanced Search** - Find data easily
- 📊 **Statistics & Analytics** - Database insights
- 🧮 **Math Operations** - Built-in calculations
- 📦 **Batch Operations** - Handle multiple data at once
- 💾 **Backup & Restore** - Never lose your data
- 🎯 **Zero Dependencies** - Pure Node.js

## 📦 Installation

```bash
npm install sivro.db
```

Or clone this repository:
```bash
git clone https://github.com/Volrize/sivro.db.git
cd sivro.db
```

## 🚀 Quick Start

```javascript
const db = require('./index.js');

// Basic operations
db.set('user', 'Kerem');
console.log(db.get('user')); // 'Kerem'

// Array operations
db.push('hobbies', 'coding');
db.push('hobbies', 'gaming');
console.log(db.get('hobbies')); // ['coding', 'gaming']

// Math operations
db.set('score', 100);
db.increment('score'); // 101
db.multiply('score', 2); // 202
```

## 📖 API Reference

### 🔧 Basic Operations
| Function | Description | Example |
|----------|-------------|---------|
| `set(key, value)` | Store data | `db.set('name', 'John')` |
| `get(key)` / `fetch(key)` | Retrieve data | `db.get('name')` |
| `delete(key)` | Delete data | `db.delete('name')` |
| `has(key)` / `check(key)` | Check if exists | `db.has('name')` |
| `all()` | Get all data | `db.all()` |
| `clear()` | Clear database | `db.clear()` |
| `size()` | Count entries | `db.size()` |
| `keys()` | Get all keys | `db.keys()` |
| `values()` | Get all values | `db.values()` |

### 📚 Array Operations
| Function | Description | Example |
|----------|-------------|---------|
| `push(key, value)` | Add to array | `db.push('list', 'item')` |
| `pull(key, value)` | Remove from array | `db.pull('list', 'item')` |
| `includes(key, value)` | Check array contains | `db.includes('list', 'item')` |

### 🧮 Math Operations
| Function | Description | Example |
|----------|-------------|---------|
| `add(key, number)` | Add number | `db.add('score', 10)` |
| `subtract(key, number)` | Subtract number | `db.subtract('score', 5)` |
| `multiply(key, number)` | Multiply | `db.multiply('score', 2)` |
| `divide(key, number)` | Divide | `db.divide('score', 2)` |
| `increment(key)` | Add 1 | `db.increment('score')` |
| `decrement(key)` | Subtract 1 | `db.decrement('score')` |
| `average(key)` | Array average | `db.average('numbers')` |
| `sum(key)` | Array sum | `db.sum('numbers')` |

### 📦 Batch Operations
| Function | Description | Example |
|----------|-------------|---------|
| `setMany(object)` | Set multiple | `db.setMany({a: 1, b: 2})` |
| `getMany(array)` | Get multiple | `db.getMany(['a', 'b'])` |
| `deleteMany(array)` | Delete multiple | `db.deleteMany(['a', 'b'])` |

### 🔒 Encryption
| Function | Description | Example |
|----------|-------------|---------|
| `setEncrypted(key, value, password)` | Store encrypted | `db.setEncrypted('secret', 'data', 'pass')` |
| `getDecrypted(key, password)` | Get decrypted | `db.getDecrypted('secret', 'pass')` |

### 🔍 Search & Analytics
| Function | Description | Example |
|----------|-------------|---------|
| `search(keyword)` | Search data | `db.search('john')` |
| `contains(value)` | Find by value | `db.contains('email.com')` |
| `stats()` | Database stats | `db.stats()` |

### 📁 Import/Export
| Function | Description | Example |
|----------|-------------|---------|
| `importJSON(file)` | Import JSON | `db.importJSON('data.json')` |
| `importCSV(file)` | Import CSV | `db.importCSV('data.csv')` |
| `importSQL(file)` | Import SQL | `db.importSQL('data.sql')` |
| `importTXT(file)` | Import TXT | `db.importTXT('data.txt')` |
| `exportTo(file)` | Export data | `db.exportTo('backup.json')` |

### 💾 Backup & Restore
| Function | Description | Example |
|----------|-------------|---------|
| `backup()` | Create backup | `db.backup()` |
| `restore()` | Restore backup | `db.restore()` |

## 🎯 Advanced Examples

### Encryption Example
```javascript
// Store encrypted data
db.setEncrypted('creditCard', '1234-5678-9012-3456', 'mySecretKey');

// Retrieve encrypted data
const cardNumber = db.getDecrypted('creditCard', 'mySecretKey');
console.log(cardNumber); // '1234-5678-9012-3456'
```

### Import Data Example
```javascript
// Import from different file types
db.importJSON('users.json');     // Import JSON data
db.importCSV('products.csv');    // Import CSV data
db.importSQL('backup.sql');      // Import SQL inserts
db.importTXT('logs.txt');        // Import text lines

// Export your database
db.exportTo('full_backup.json');
```

### Batch Operations Example
```javascript
// Set multiple values at once
db.setMany({
  name: 'John',
  age: 30,
  city: 'New York',
  score: 100
});

// Get multiple values
const userData = db.getMany(['name', 'age', 'city']);
console.log(userData); // {name: 'John', age: 30, city: 'New York'}
```

### Math Operations Example
```javascript
// Game score system
db.set('playerScore', 0);
db.add('playerScore', 50);      // +50 points
db.multiply('playerScore', 2);  // Double score
db.increment('playerScore');    // +1 bonus

console.log(db.get('playerScore')); // 101
```

## 📊 Database Statistics

```javascript
const stats = db.stats();
console.log(stats);
/*
{
  totalEntries: 15,
  types: { string: 8, number: 4, array: 3 },
  totalSize: '2.1 KB'
}
*/
```

## 🔍 Search Functionality

```javascript
// Search by keyword
const results = db.search('john'); // Finds all data containing 'john'

// Find by value
const emails = db.contains('@gmail.com'); // All gmail addresses
```

## 🛡️ Error Handling

Sivro provides clear error messages:

```javascript
try {
  db.get('nonexistent'); 
} catch (error) {
  console.log(error.message); // "Data Not Found"
}

try {
  db.add('textData', 5); 
} catch (error) {
  console.log(error.message); // "Data must be a number"
}
```

## 📁 Auto-Generated Files

- `database.json` - Main database file (auto-created)
- `backup.json` - Created when you run `db.backup()`

## 🤝 Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ for the Node.js community
- Inspired by the need for a simple yet powerful database solution
- Zero dependencies, maximum performance

## 📞 Support

If you have any questions or issues, please open an issue on GitHub.

---

**Made with ❤️ by Kerem (Volrize)**

⭐ Don't forget to star this repository if you found it helpful!
