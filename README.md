# EjazdyFrontend

Frontent v Angulare ku semestrálnej práci eJazdy. Backend
a inštrukcie na spustenie backendu sa nachádzajú v repozitáry ejazdy-backend.

## Popis semestrálnej práce

eJazdy má slúžiť ako registračný systém jázd pre autoškoly. S systéme sa nachádzajú
tri druhy používateľov: Administrátor, Inštruktor a Študent. Základný princíp
sýstému spočíva v tom, že inštruktor môže cez systém vypísať termíny jázd, na ktoré
sa následne môžu študenti prihlasovať. Odhlásenie študenta z jazdy je umožnené administrátorovi
a inštruktorom bez obmedzení, študenti sa môžu odhlásiť z jazy len do 24h
pre jej začatím. Hlavnou úlohou administrátora je správa účtov - pridať/odobrať
inštruktora alebo študenta. Pridanie nového používateľa je uskutočnené zaslaním emailovej 
pozvánky s vygenerovaným heslom. Pozvaný užívateľ je následne pri prvom prihlásení vyzvaný 
na zadanie osobných údajov a nového hesla. Administrátor taktiež môže prihlásiť študentov na
jazdy, ktoré boli vypísané inštruktorom.

### Technológie použité v semestrálnej práci:
- Spring Boot
- Amazon Cognito
- Amazon DynamoDb
- Angular

### Požiadavky na spustenie frontendu
- Node.js

### Inštalácia a spustenie
Naklonovanie repozitára
```
git clone [repo_url]
cd ejazdy-frontend
```

Inštalácia modulov
```
npm install
```

Spustenie webového servera
```
ng serve
```

Web by mal byť dostupný na localhost:4200
Ak je tento port obsadený, je možné zvoliť iný port
pridaním `--port [port]`

## Možné problémy
Ak ste menil nastavenia pre backend a ten je spustený
na inom porte ako bolo nastavené, je potrebné upraviť súbor environment.ts
```
apiBaseUrl = 'http://localhost:[port]'
