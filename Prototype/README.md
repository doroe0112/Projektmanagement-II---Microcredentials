# Info
Code Repo für das Projekt MC.

<br />
<br />

## Update 01.05.2023
- Tabelle *skills.csv* hinzugefügt. Hier können wir alle Skills den jeweiligen Semester zuordnen.
- Ziele als Punkte definiert in *ziele.md*. Es handelt sich um eine .csv Datei die bestimmt, welche Skills in welchem Semester gelernt werden sollten. Bei Update könnte man automatisch das entsprechende Bitmuster gestalten lassen.

<br />
<br />

# Installation

## Config
MySql DB User und Password in Datei *db_config.py*

## Installation
1. Flask App starten
1. Route */create* aufrufen (erstellt Tabelle in Datenbank)

## Skills hinzufügen
Variable **skills** in Datei *v.py*. Bitmuster beschreibt in welchem Semester der Skill zur Verfügung steht.