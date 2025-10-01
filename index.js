const fs = require('fs')

class DB {

constructor(){
    // Auto create database.json
    if(!fs.existsSync('database.json')){
        fs.writeFileSync('database.json', JSON.stringify({}, null, 1))
        console.log('database.json file created')
    }
}

/* db.set('') */

set(veri, değer){

   const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
   dosya[veri] = değer 
   return fs.writeFileSync(`database.json`, JSON.stringify(dosya, null, 1)) 
}

/* db.fetch('') */ 
fetch(veri){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    if(!dosya[veri]) throw new TypeError("Data Not Found")
    return dosya[veri] 
}

delete(veri){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    if(!dosya[veri]) throw new TypeError("Data Not Found")
    delete dosya[veri]
    return fs.writeFileSync(`database.json`, JSON.stringify(dosya, null, 1))
}


backup(){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    fs.writeFileSync(`backup.json`, JSON.stringify(dosya, null, 1))
    return console.log("Backup created successfully!")
}

restore(){
    if(!fs.existsSync('backup.json')) throw new Error("Backup file not found!")
    const backupDosya = JSON.parse(fs.readFileSync(`backup.json`, `utf8`))
    fs.writeFileSync(`database.json`, JSON.stringify(backupDosya, null, 1))
    return console.log("Database restored from backup!")
}

/* db.add('', ) */
add(veri, miktar){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    if(!dosya[veri]) dosya[veri] = 0
    if(typeof dosya[veri] !== 'number') throw new TypeError("Data must be a number")
    dosya[veri] += miktar
    fs.writeFileSync(`database.json`, JSON.stringify(dosya, null, 1))
    return dosya[veri]
}

/* db.subtract('', ) */
subtract(veri, miktar){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    if(!dosya[veri]) dosya[veri] = 0
    if(typeof dosya[veri] !== 'number') throw new TypeError("Data must be a number")
    dosya[veri] -= miktar
    fs.writeFileSync(`database.json`, JSON.stringify(dosya, null, 1))
    return dosya[veri]
}

/* db.has('') */
has(veri){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    return dosya.hasOwnProperty(veri)
}

/* db.push('', value) */
push(veri, değer){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    if(!dosya[veri]) dosya[veri] = []
    if(!Array.isArray(dosya[veri])) throw new TypeError("Data must be an array")
    dosya[veri].push(değer)
    fs.writeFileSync(`database.json`, JSON.stringify(dosya, null, 1))
    return dosya[veri]
}

/* db.all() */
all(){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    return dosya
}

/* db.clear() */
clear(){
    fs.writeFileSync(`database.json`, JSON.stringify({}, null, 1))
    return console.log("Database cleared successfully!")
}

/* db.get('') - fetch ile aynı */
get(veri){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    if(!dosya[veri]) throw new TypeError("Data Not Found")
    return dosya[veri] 
}

/* db.check('') - has ile aynı */
check(veri){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    return dosya.hasOwnProperty(veri)
}

/* db.pull('', value) */
pull(veri, değer){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    if(!dosya[veri]) throw new TypeError("Data Not Found")
    if(!Array.isArray(dosya[veri])) throw new TypeError("Data must be an array")
    dosya[veri] = dosya[veri].filter(item => item !== değer)
    fs.writeFileSync(`database.json`, JSON.stringify(dosya, null, 1))
    return dosya[veri]
}

/* db.includes('', value) */
includes(veri, değer){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    if(!dosya[veri]) return false
    if(!Array.isArray(dosya[veri])) throw new TypeError("Data must be an array")
    return dosya[veri].includes(değer)
}

/* db.increment('') */
increment(veri){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    if(!dosya[veri]) dosya[veri] = 0
    if(typeof dosya[veri] !== 'number') throw new TypeError("Data must be a number")
    dosya[veri] += 1
    fs.writeFileSync(`database.json`, JSON.stringify(dosya, null, 1))
    return dosya[veri]
}

/* db.decrement('') */
decrement(veri){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    if(!dosya[veri]) dosya[veri] = 0
    if(typeof dosya[veri] !== 'number') throw new TypeError("Data must be a number")
    dosya[veri] -= 1
    fs.writeFileSync(`database.json`, JSON.stringify(dosya, null, 1))
    return dosya[veri]
}

/* db.size() */
size(){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    return Object.keys(dosya).length
}

/* db.keys() */
keys(){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    return Object.keys(dosya)
}

/* db.setEncrypted('', value, password) */
setEncrypted(veri, değer, şifre){
    const encrypted = Buffer.from(JSON.stringify(değer)).toString('base64') + şifre.split('').reverse().join('')
    return this.set(veri + '_encrypted', encrypted)
}

/* db.getDecrypted('', password) */
getDecrypted(veri, şifre){
    const encrypted = this.get(veri + '_encrypted')
    const reversePassword = şifre.split('').reverse().join('')
    const cleanData = encrypted.replace(reversePassword, '')
    return JSON.parse(Buffer.from(cleanData, 'base64').toString())
}

/* db.search(keyword) */
search(kelime){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    const results = {}
    for(let key in dosya){
        if(key.toLowerCase().includes(kelime.toLowerCase()) || 
           JSON.stringify(dosya[key]).toLowerCase().includes(kelime.toLowerCase())){
            results[key] = dosya[key]
        }
    }
    return results
}

/* db.contains(value) */
contains(değer){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    const results = {}
    for(let key in dosya){
        if(JSON.stringify(dosya[key]).includes(JSON.stringify(değer))){
            results[key] = dosya[key]
        }
    }
    return results
}

/* db.stats() */
stats(){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    const stats = {
        totalEntries: Object.keys(dosya).length,
        types: {},
        totalSize: JSON.stringify(dosya).length + ' bytes'
    }
    
    for(let key in dosya){
        const type = Array.isArray(dosya[key]) ? 'array' : typeof dosya[key]
        stats.types[type] = (stats.types[type] || 0) + 1
    }
    
    return stats
}

/* db.values() */
values(){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    return Object.values(dosya)
}

/* db.setMany({key1: value1, key2: value2}) */
setMany(objeler){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    for(let key in objeler){
        dosya[key] = objeler[key]
    }
    fs.writeFileSync(`database.json`, JSON.stringify(dosya, null, 1))
    return Object.keys(objeler).length + ' items added'
}

/* db.getMany(['key1', 'key2']) */
getMany(anahtarlar){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    const sonuc = {}
    anahtarlar.forEach(key => {
        if(dosya[key]) sonuc[key] = dosya[key]
    })
    return sonuc
}

/* db.deleteMany(['key1', 'key2']) */
deleteMany(anahtarlar){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    let silinensayisi = 0
    anahtarlar.forEach(key => {
        if(dosya[key]){
            delete dosya[key]
            silinensayisi++
        }
    })
    fs.writeFileSync(`database.json`, JSON.stringify(dosya, null, 1))
    return silinensayisi + ' items deleted'
}

/* db.multiply('', number) */
multiply(veri, çarpan){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    if(!dosya[veri]) throw new TypeError("Data Not Found")
    if(typeof dosya[veri] !== 'number') throw new TypeError("Data must be a number")
    dosya[veri] *= çarpan
    fs.writeFileSync(`database.json`, JSON.stringify(dosya, null, 1))
    return dosya[veri]
}

/* db.divide('', number) */
divide(veri, bölen){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    if(!dosya[veri]) throw new TypeError("Data Not Found")
    if(typeof dosya[veri] !== 'number') throw new TypeError("Data must be a number")
    if(bölen === 0) throw new Error("Cannot divide by zero")
    dosya[veri] /= bölen
    fs.writeFileSync(`database.json`, JSON.stringify(dosya, null, 1))
    return dosya[veri]
}

/* db.average('arrayKey') */
average(veri){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    if(!dosya[veri]) throw new TypeError("Data Not Found")
    if(!Array.isArray(dosya[veri])) throw new TypeError("Data must be an array")
    const numbers = dosya[veri].filter(item => typeof item === 'number')
    if(numbers.length === 0) throw new Error("No numbers found in array")
    return numbers.reduce((a, b) => a + b, 0) / numbers.length
}

/* db.sum('arrayKey') */
sum(veri){
    const dosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    if(!dosya[veri]) throw new TypeError("Data Not Found")
    if(!Array.isArray(dosya[veri])) throw new TypeError("Data must be an array")
    const numbers = dosya[veri].filter(item => typeof item === 'number')
    return numbers.reduce((a, b) => a + b, 0)
}

/* db.importJSON('file.json') */
importJSON(dosyaYolu){
    if(!fs.existsSync(dosyaYolu)) throw new Error("File not found: " + dosyaYolu)
    const dışDosya = JSON.parse(fs.readFileSync(dosyaYolu, 'utf8'))
    const mevcutDosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    
    let eklenenSayı = 0
    for(let key in dışDosya){
        mevcutDosya[key] = dışDosya[key]
        eklenenSayı++
    }
    
    fs.writeFileSync(`database.json`, JSON.stringify(mevcutDosya, null, 1))
    return `${eklenenSayı} items imported from JSON`
}

/* db.importCSV('file.csv') */
importCSV(dosyaYolu){
    if(!fs.existsSync(dosyaYolu)) throw new Error("File not found: " + dosyaYolu)
    const csvData = fs.readFileSync(dosyaYolu, 'utf8')
    const lines = csvData.split('\n').filter(line => line.trim())
    
    if(lines.length < 2) throw new Error("CSV must have header and data rows")
    
    const headers = lines[0].split(',').map(h => h.trim())
    const mevcutDosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    
    let eklenenSayı = 0
    for(let i = 1; i < lines.length; i++){
        const values = lines[i].split(',').map(v => v.trim())
        const rowKey = `csv_row_${i}`
        const rowData = {}
        
        headers.forEach((header, index) => {
            rowData[header] = values[index] || ''
        })
        
        mevcutDosya[rowKey] = rowData
        eklenenSayı++
    }
    
    fs.writeFileSync(`database.json`, JSON.stringify(mevcutDosya, null, 1))
    return `${eklenenSayı} CSV rows imported`
}

/* db.importSQL('file.sql') */
importSQL(dosyaYolu){
    if(!fs.existsSync(dosyaYolu)) throw new Error("File not found: " + dosyaYolu)
    const sqlData = fs.readFileSync(dosyaYolu, 'utf8')
    const mevcutDosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    
    // INSERT statements'ları bul
    const insertRegex = /INSERT INTO\s+(\w+)\s*\([^)]+\)\s*VALUES\s*\(([^)]+)\)/gi
    let match
    let eklenenSayı = 0
    
    while ((match = insertRegex.exec(sqlData)) !== null) {
        const tableName = match[1]
        const values = match[2].split(',').map(v => v.trim().replace(/['"]/g, ''))
        
        const key = `${tableName}_${eklenenSayı + 1}`
        mevcutDosya[key] = {
            table: tableName,
            data: values
        }
        eklenenSayı++
    }
    
    fs.writeFileSync(`database.json`, JSON.stringify(mevcutDosya, null, 1))
    return `${eklenenSayı} SQL records imported`
}

/* db.importTXT('file.txt', delimiter) */
importTXT(dosyaYolu, ayırıcı = '\n'){
    if(!fs.existsSync(dosyaYolu)) throw new Error("File not found: " + dosyaYolu)
    const txtData = fs.readFileSync(dosyaYolu, 'utf8')
    const lines = txtData.split(ayırıcı).filter(line => line.trim())
    const mevcutDosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    
    let eklenenSayı = 0
    lines.forEach((line, index) => {
        const key = `txt_line_${index + 1}`
        mevcutDosya[key] = line.trim()
        eklenenSayı++
    })
    
    fs.writeFileSync(`database.json`, JSON.stringify(mevcutDosya, null, 1))
    return `${eklenenSayı} text lines imported`
}

/* db.exportTo('output.json') */
exportTo(dosyaYolu){
    const mevcutDosya = JSON.parse(fs.readFileSync(`database.json`, `utf8`))
    fs.writeFileSync(dosyaYolu, JSON.stringify(mevcutDosya, null, 1))
    return `Database exported to ${dosyaYolu}`
}


}


module.exports = new DB()
